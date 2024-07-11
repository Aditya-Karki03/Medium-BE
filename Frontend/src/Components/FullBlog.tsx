import UseBlogImporter from "../Hooks/UseBlogImporter"
import AppBar from "./AppBar"
import { useParams } from "react-router-dom";
import { BlogType } from "../pages/Blogs";

export default function FullBlog ()  {
    const{id}=useParams();
    const{loading,blogs}=UseBlogImporter();
    const Blog:[]=blogs.filter((blog:BlogType)=>blog.id==id)
    if(loading){
        return 'Loading...'
    }
  return(
    <div className="w-full">
        <AppBar publishABlog={false}/>
        

            <div key={Blog.id} className="flex flex-col px-8  lg:flex-row lg:justify-center gap-10 mt-20 ">
                <div className="lg:w-[550px] flex flex-col gap-2 ">
                <div className="text-4xl font-extrabold">{blog.title}</div>
                <div className="font-extralight">{blog.date}</div>
                <div className="mt-2">{blog.content}</div>
            </div>
            <div className="lg:w-[400px] flex flex-col ">
                <div className="font-bold">Author</div>
                    <div className="flex gap-4  items-center py-2 mb-6">
                        <div className="w-10 h-10 p-3 flex justify-center items-center rounded-full bg-slate-200">{`${blog.author.firstname[0]}${blog.author.lastname[0]}`}</div>
                        <div className="flex flex-col gap-2">
                            <div className="font-extrabold">{`${blog.author.firstname}${blog.author.lastname}`}</div>
                            <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eaque consectetur quis totam odit error.</div>
                        </div>
                    </div>
                </div>
            </div>
        
        
    </div>
  )
}

