
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
            "author": {
                "firstname": string,
                "lastname": string
            }
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
    
    return(
        <div className="">
            <AppBar publishABlog={true}/>
            {
                blogs && blogs.map((blog:BlogType)=>
                  <BlogCard key={blog.id} id={blog.id} firstname={blog.author.firstname} lastname={blog.author.lastname} date={blog.date} title={blog.title} content={blog.content}/>
                )
            }
           
            
        </div>
    )
}