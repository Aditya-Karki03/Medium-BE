import AppBar from "./AppBar"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { BlogType } from "../pages/Blogs";

export default function FullBlog ()  {
    const{id}=useParams();
    const blogs=useSelector((store:any)=>store.blog)
    const{BlogItems}=blogs;

    let blog
    if(BlogItems[1].length>0){
        blog=BlogItems[1].filter((blog:any)=>(blog.id==id))
       
    }
   
    
  return(
    <div className="w-full">
        <AppBar publishABlog={false}/>
        

            <div key={blog.id} className="flex flex-col px-8  lg:flex-row lg:justify-center gap-10 mt-20 ">
                <div className="lg:w-[550px] flex flex-col gap-2 ">
                <div className="text-4xl font-extrabold">{blog[0].title}</div>
                <div className="font-extralight">{blog[0].date}</div>
                <div className="mt-2">{blog[0].content}</div>
            </div>
            <div className="lg:w-[400px] flex flex-col ">
                <div className="font-bold">Author</div>
                    <div className="flex gap-4  items-center py-2 mb-6">
                        <div className="w-10 h-10 p-3 flex justify-center items-center rounded-full bg-slate-200">{`${blog[0].author.firstname[0]}${blog[0].author.lastname[0]}`}</div>
                        <div className="flex flex-col gap-2">
                            <div className="font-extrabold">{`${blog[0].author.firstname}${blog[0].author.lastname}`}</div>
                            <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eaque consectetur quis totam odit error.</div>
                        </div>
                    </div>
                </div>
            </div>
        
        
    </div>
  )
}

