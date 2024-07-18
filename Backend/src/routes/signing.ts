import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  sign } from 'hono/jwt'
import { signUpSchema } from '@aditya_karki_03/medium-common-folder'
import { signInSchema } from '@aditya_karki_03/medium-common-folder'


const signing=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        SECRET_KEY:string
    }
}>();



signing.post('/signup',async(c)=>{
    //check whether the email and the password are valid
    //for that we need to use zod
    //fname,lname,email & password should be used
    const{firstname,lastname,email,password}=await c.req.json();

  

    try {
        const valid=signUpSchema.safeParse({
            firstname,
            lastname,
            email,
            password
        })
       if(!valid.success){
            c.status(411);
            return c.json({
                messge:'Wrong input!! Please try again'
            })
       }
    } catch (error) {
        c.status(411);
            return c.json({
                messge:'Unkown Error!! Please try again'
            })
    }

    //inserting data into db using Prisma ORM
    const prisma=new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const userId=await prisma.user.create({
            data:{
                firstname,
                lastname,
                email,
                password
            }
        })
        const token=await sign(userId,c.env.SECRET_KEY)
        return c.text(token)
    } catch (error) {
        c.status(411);
        console.log(error)
        return c.text('Invalid!! Please try again');
      
    }

    
})

signing.post('/signin',async (c)=>{
    //sign in using email and password
    const{email,password}=await c.req.json();
    
    try {
        const ok=signInSchema.safeParse(email,password)
        if(!ok.success){
            c.json({
                msg:'Email format is wrong!!'
            })
        }
    } catch (error) {
        c.status(411);
        c.text('Invalid Input Please try again')
    }

    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const existingUser=await prisma.user.findFirst({
            where:{
                email,
                password
            }
        })
        if(!existingUser){
            c.status(403);
            return c.text('User not found!! Please try signing Up')
        }
        
        const token=await sign({
            id:existingUser.id
        },c.env.SECRET_KEY)

        return c.text(token)

    } catch (error) {
        c.status(404);
        return c.text('User not found!! Please try signing Up')
    }
})

export default signing;