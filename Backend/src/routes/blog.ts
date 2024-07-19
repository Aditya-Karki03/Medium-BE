import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { blogCreationSchema } from '@aditya_karki_03/medium-common-folder'
import { blogUpdationSchema } from '@aditya_karki_03/medium-common-folder'

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
        c.set('userId',userData)
        await next();
    } else{
        c.status(403);
        return c.text('User does not exist')
    }
})

blogRouter.post('/',async (c)=>{
    
    const{title,content,date,published}=await c.req.json();

   try {
        const {success}=blogCreationSchema.safeParse({
            title,
            content
        })
        if(!success){
            c.status(411);
            return c.text('Unable to post the blog!! Please try again!!')
        }
   } catch (error) {
        c.status(411);
        return c.text('Error while posting! Please try again!!')
   }

    const userId=c.get('userId');

    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())


    try {
        const blog=await prisma.post.create({
            data:{
                title,
                content,
                published,
                date,
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

    try {
        const {success}=blogUpdationSchema.safeParse({
            id,
            title,
            content
        })
        if(!success){
            c.status(411);
            return c.text('Unable to update the blog!! Please try again!!')
        }
    } catch (error) {
        c.status(411);
        return c.text('Unable to update the text!! Please try again!!')
    }

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

blogRouter.post('/likes',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const{postId}=await c.req.json()
    // console.log(`${postId} ${authorId}`)
    const userId=await c.get('userId')
    try {
       
            const userWithLikeOnSamePostExist=await prisma.likedPost.findFirst({
                where:{
                    PostId:Number(postId),
                    LikedById:Number(userId)
                }
            })

            if(userWithLikeOnSamePostExist){
                const deleteLike=await prisma.likedPost.delete({
                    where:{
                        id:userWithLikeOnSamePostExist.id
                    }
                })
                await prisma.post.update({
                    where:{
                        id:Number(userWithLikeOnSamePostExist.PostId),
                    },
                    data:{
                        NumberOfLikes:{
                            decrement:1
                        },
                        likedByCurrentUser:false
                    }
                })
            }
            else{
                await prisma.likedPost.create({
                    data:{
                        LikedById:Number(userId),
                        PostId:Number(postId)
                    }
                })
                await prisma.post.update({
                    where:{
                        id:Number(postId)
                    },
                    data:{
                        NumberOfLikes:{
                            increment:1
                        },
                        likedByCurrentUser:true
                    }
                })
            }
           
        return c.json({
            msg:"Post has been successfully liked"
        })
    } catch (error) {
        console.log('Hello from the error')
        c.status(411);
        return c.json({
            msg:"Could not like post! Please try again"
        })
    }
})

blogRouter.post('/bookmarks',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const userId=c.get('userId')
    const{postId}=await c.req.json();
    try {
        const UserHasAlreadyBookMarkedPost=await prisma.bookMarkedPost.findFirst({
            where:{
                BookMarkerId:Number(userId),
                BookMarkedPostId:Number(postId)
            }
        })
        if(UserHasAlreadyBookMarkedPost){
            const deleteBookMarkedPost=await prisma.bookMarkedPost.delete({
                where:{
                    id:Number(UserHasAlreadyBookMarkedPost.id)
                }
            })
            const updateBookMarkPost=await prisma.post.update({
                where:{
                    id:Number(UserHasAlreadyBookMarkedPost.BookMarkedPostId)
                },
                data:{
                    bookmarkedByCurrentUser:false
                }
                
            })
        }else{
            const createBookMarkedPost=await prisma.bookMarkedPost.create({
                data:{
                    BookMarkerId:Number(userId),
                    BookMarkedPostId:Number(postId)
                }
            })
            const updateBookMarkPost=await prisma.post.update({
                where:{
                    id:createBookMarkedPost.BookMarkedPostId
                },
                data:{
                    bookmarkedByCurrentUser:true
                }
            })
        }
        return c.json({
            msg:'Successfully Bookmarked!!'
        })
    } catch (error) {
        return c.json({
            msg:'Bookmarking Failed!! Please try again!'
        })
    }
})

//Better to add pagination to the below route
blogRouter.get('/bulk',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId=c.get('userId')
    

    try {
        const allData=await prisma.post.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                date:true,
                likedByCurrentUser:true,
                bookmarkedByCurrentUser:true,
                NumberOfLikes:true,
                author:{
                    select:{
                        id:true,
                        firstname:true,
                        lastname:true
                    }
                },
                likes:{
                    select:{
                        LikedById:true
                    }
                },
                PostsBookMarked:{
                    select:{
                        BookMarkerId:true
                    }
                }
            },
            where:{
                published:true,
            }
        });

        const signedInUser=await prisma.user.findFirst({
            select:{
                firstname:true,
                lastname:true
            }
            ,where:{
                id:Number(userId)
            }
        })



            // Trial

            // const newData=await prisma.user.findMany({
            //     select:{
            //         posts:{
            //             select:{
            //                 id:true,
            //                 title:true,
            //                 content:true,
            //                 date:true,
            //                 likedByCurrentUser:true,
            //                 bookmarkedByCurrentUser:true,
            //                 NumberOfLikes:true,author:{
            //                     select:{
            //                         id:true,
            //                         firstname:true,
            //                         lastname:true
            //                     }
            //                 },
            //                 likes:{
            //                     select:{
            //                         LikedById:true
            //                     }
            //                 },
            //             },
            //             where:{
            //                 published:true
            //             }
            //         }
            //     },
            //     where:{
            //         id:Number(userId)
            //     }
            // })
            const dataWithUserId = allData.map((data) => {
                return {
                    ...data,
                    currentlyLoggedInUser: userId
                };
            });
            
            
        // const dataWithUserId=[...allData,{currentlyLoggedInUser:userId}]
        return c.json({
            data:dataWithUserId,
            loggedInUser:signedInUser
        })
    } catch (error) {
        c.status(404);
        c.text('Unable to fetch data!! Please try again!')
    }
})
blogRouter.get('/userInfo',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const userId=c.get('userId')
    try {
          const userInfo=await prisma.user.findFirst({
            select:{
                firstname:true,
                lastname:true,
                email:true,
                likes:true,
                bookmarks:true   
            },
            where:{
                id:Number(userId)
            }
          })
          return c.json({
            data:userInfo
          })
    } catch (error) {
        return c.json({
            msg:'Unforseen Error!! Please try again'
        })
    }
})

blogRouter.get('/bookmarks',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId=c.get('userId');
    
    
    try {
        const bookmarkedPosts=await prisma.bookMarkedPost.findMany({
            select:{
                BookMarkedPost:{
                    select:{
                        id:true,
                        authorId:true,
                        bookmarkedByCurrentUser:true,
                        date:true,
                        title:true,
                        content:true
                    }
                }
            },
            where:{
                BookMarkerId:Number(userId)
            }
        }) 
      
        return c.json({
            data:bookmarkedPosts
        }) 
    } catch (error) {
        return c.json({
            msg:'Something went wrong!! Please Try again'
        })
    }
})

blogRouter.get('/likes',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId=c.get('userId')
    try {
        // const likedByUser=await prisma.post.findMany({
        //     // where:{
        //     //      authorId:Number(userId),
        //     //      likedByCurrentUser:true
        //     // }
        //     select:{
        //         likes:{
        //             where:{
        //                 LikedById:Number(userId)
        //             }
        //         },
                
        //     }
        //  })
        const likedByUser=await prisma.likedPost.findMany({
            select:{
                LikesOnWhichPost:{
                    select:{
                        id:true,
                        authorId:true,
                        likedByCurrentUser:true,
                        date:true,
                        title:true,
                        content:true
                    }
                
                },
                
            },
            where:{
                LikedById:Number(userId)
            }
        //    where:{
        //         authorId:Number(userId),
        //         likedByCurrentUser:true
        //    }
        })


        // const likedByUser=await prisma.post.findMany({
        //     where:{
        //         likes:{
        //             some:{
        //                 LikedById:Number(userId)
        //             }

        //         }
        //     }
        // })
        return c.json({
            data:likedByUser
        })
    } catch (error) {
        return c.json({
            msg:'Unknown Error!! Please try again!'
        })
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