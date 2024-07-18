
import AppBar from "../Components/AppBar"
import BlogCard from "../Components/BlogCard"
import UseBlogImporter from "../Hooks/UseBlogImporter"
import Skeleton from "../Components/Skeleton";

// import { addBlog } from "../utils/blogSlice";

export interface BlogType{
    
            "id": string,
            "title": string,
            "content": string,
            "date": string,
            'likedByCurrentUser':boolean,
            'bookmarkedByCurrentUser':boolean,
            "author": {
                "id":string
                "firstname": string,
                "lastname": string
            }
            "likes":[
                {
                    LikedById:string
                }
            ]
        }
  

export default function Blogs(){
    const{loading,blogs}=UseBlogImporter();
  
    
    // if(!loading){
        
    // }
    // console.log(blogs)
    if(loading){
        return(
            <Skeleton/>
        )
    }
    console.log(blogs)
    
    return(
        <div className="">
            <AppBar publishABlog={true}/>
            {
                blogs && blogs.map((blog:BlogType)=>
                  <BlogCard key={blog.id}  authorId={blog.author.id} id={blog.id} CurrentUserHasLiked={blog.likedByCurrentUser} CurrentUserBookMarkedPost={blog.bookmarkedByCurrentUser} firstname={blog.author.firstname} lastname={blog.author.lastname} date={blog.date} title={blog.title} content={blog.content}/>
                )
            }
           
            
        </div>
    )
}