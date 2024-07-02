import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  jwt, verify } from 'hono/jwt'

const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        SECRET_KEY:string;
    },
    Variables:{
        userId:string;
    }
}>();

blogRouter.use('/*',async(c,next)=>{
    //verify jwt and pass the authorId down the line
    const token=c.req.header('authorization') || "";
    const user= await verify(token,c.env.SECRET_KEY)
    if(user){
        const userData:string=JSON.stringify(user.id) ;
        console.log(userData)
        c.set('userId',userData)
        await next();
    } else{
        c.status(403);
        return c.text('User does not exist')
    }
})

blogRouter.post('/',async (c)=>{

    const{title,content}=await c.req.json();
    const userId=c.get('userId');

    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())


    try {
        const blog=await prisma.post.create({
            data:{
                title,
                content,
                authorId:Number(userId) //it will be passed from the universal middleware
            }
        })
        return c.json({
            id:blog.id
        })
    } catch (error) {
        c.status(404);
        return c.text('Unknown error happened Please try again!!')
    }
})

blogRouter.put('/',async(c)=>{
    //id of the blog will come into the post request
    const{id,title,content}= await c.req.json();

    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const updatedData=await prisma.post.update({
            where:{
                id
            },
            data:{
                title,
                content
            }
        })
        return c.json({
            id:updatedData.id
        })
    } catch (error) {
        c.status(411);
        return c.text('Unable to update the data!! Please try again!')
    }
})

//Better to add pagination to the below route
blogRouter.get('/bulk',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const allData=await prisma.post.findMany();
        return c.json({
            data:allData
        })
    } catch (error) {
        c.status(404);
        c.text('Unable to fetch data!! Please try again!')
    }
})

blogRouter.get('/:id',async(c)=>{
    const id= c.req.param("id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const foundData=await prisma.post.findFirst({
            where:{
                id:Number(id)
            }
        })
        return c.json({
            title:foundData?.title,
            content:foundData?.content
        })
    } catch (error) {
        c.status(404);
        return c.text('Unable to find data!! Please try again!')
    }

})




export default blogRouter;