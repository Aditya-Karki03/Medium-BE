import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import zod from 'zod'

const signing=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        SECRET_KEY:string
    }
}>();

const signUpSchema=zod.object({
    firstname:zod.string(),
    lastname:zod.string().optional(),
    email:zod.string().email({message:'Invalid Email address'}),
    password:zod.string().min(7,{message:'Minimum length should be 7 with special characters'})
})

const signInSchema=zod.object({
    email:zod.string(),
    password:zod.string()
})

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
            return c.json({
                messge:'Wrong input!! Please try again'
            })
       }
    } catch (error) {
        console.log(error)
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

//postgresql://neondb_owner:er7OUVWAI3jv@ep-steep-night-a5384o21.us-east-2.aws.neon.tech/neondb?sslmode=require
//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMWM0Yzc5OTctM2Q1Mi00NjZkLThmZjctZjRhMmZkMjdlNzViIiwidGVuYW50X2lkIjoiYzRiNGQ2MDNmZDRmZjJmMWU4YzVkZTEyMjY4ZTAyOWEyMTAyZWM0YmQ3NTE2NjRhMTQzOGQ3Y2NkOGIzNTVhZiIsImludGVybmFsX3NlY3JldCI6ImM4ZDRiYzM3LWI0MTgtNDJkMy1iNzE0LWYzMjIxNzliMGU2MSJ9.wLN_KaRRZdyBx6Hx163YtpBh9dZtIf1_hPBaF4d_9fo"

export default signing;