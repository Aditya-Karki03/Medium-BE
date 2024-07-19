import { FaHeart,FaBookmark } from "react-icons/fa";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState } from "react";

interface HeartAndBookMarkTypes{
    id:string | number,
    authorId:string,
    userHasLiked:Boolean,
    userHasBookMarked:Boolean
}



export default function HeartAndBookmark({id,authorId,userHasLiked=false,userHasBookMarked=false}:HeartAndBookMarkTypes){
    const[bookmarkColor,setBookmarkColor]=useState(userHasBookMarked)
    const[liked,setLiked]=useState(userHasLiked)


    async function handlePostRequest(whichRequest:string){
        await axios.post(`${BACKEND_URL}api/v1/user/blog/${whichRequest}`,{
             postId:id,
             authorId,
         },{
             headers:{
                 authorization:localStorage.getItem('token')|| ""
             }
         })
     }

     
     
     function handleLike(){
        setLiked((prev)=>!prev)
         handlePostRequest('likes')
     }

     function handleBookmark(){
         setBookmarkColor(prev=>!prev)
         handlePostRequest('bookmarks')
     }
 
    return(
        <div className="flex flex-col gap-2">
                    <FaHeart onClick={handleLike} className={`${liked?'text-red-500':'text-slate-200'} hover:text-red-500 cursor-pointer`}  />
                    <FaBookmark onClick={handleBookmark} className={`${bookmarkColor?'text-black':'text-slate-200'} hover:text-black cursor-pointer`}/>
        </div>
    )
}