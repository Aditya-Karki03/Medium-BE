import { useState } from "react";
import { Link } from "react-router-dom"
import { FaHeart,FaBookmark } from "react-icons/fa";

interface PropsTypes{
    id:string,
    firstname:string,
    lastname:string,
    date:string,
    title:string,
    content:string,
}


export default function BlogCard({id,firstname,lastname,date,title,content}:PropsTypes){
    //need name of the blog writer
    const[likeColor,setLikeColor]=useState('text-slate-200')
    const[bookmarkColor,setBookmarkColor]=useState('text-slate-200')
    
    function handleLike(){
        if(likeColor=='text-red-500'){
            setLikeColor('text-slate-200')
        }
        else{
            setLikeColor('text-red-500')
        }
    }
    function handleBookmark(){
        if(bookmarkColor=='text-slate-200'){
            setBookmarkColor('text-black')
        }
        else{
            setBookmarkColor('text-slate-200')
        }
    }

    return(
        <div className="flex justify-center  items-center">
            <Link to={`/blogs/fullblog/${id}`}>
            <div className="flex justify-center mt-16 border-b-2 cursor-pointer px-4 ">
                <div className="w-[700px] flex flex-col  pb-7">
                        <div className="flex items-center ">
                                <div className="h-10 w-10 rounded-full cursor-pointer border flex justify-center items-center">{`${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`}</div>
                                <div className="h-1 w-1 rounded-full bg-black mx-2"></div>
                                <div className="">{date}</div>
                        </div>
                        <div className="text-2xl font-extrabold mt-2">
                            {title}
                        </div>
                        <div className="font-extralight mt-2">{`${content.substring(0,100)}...`}</div>
                        <div className="text-sm font-light text-gray-600 mt-2">{`${Math.round(content.length/100)} minute read`}</div>
                </div>
                
            </div>
        </Link>
        <div className="flex flex-col gap-2">
                <FaHeart onClick={handleLike} className={`${likeColor} hover:text-red-500 cursor-pointer`}  />
                <FaBookmark onClick={handleBookmark} className={`${bookmarkColor} hover:text-black cursor-pointer`}/>
        </div>
    </div>
    )
}