import { FaHeart,FaBookmark } from "react-icons/fa";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState } from "react";

interface HeartAndBookMarkTypes{
    id:string,
    authorId:string,
    postId:string,
    LikedById:string
}



export default function HeartAndBookmark({id,authorId,LikedById,postId}:HeartAndBookMarkTypes){
    const[likeColor,setLikeColor]=useState('text-slate-200')
    const[bookmarkColor,setBookmarkColor]=useState('text-slate-200')




    async function handlePostRequest(){
        await axios.post(`${BACKEND_URL}api/v1/user/blog/likes`,{
             likeColor,
             postId:id,
             authorId,
         },{
             headers:{
                 authorization:localStorage.getItem('token')|| ""
             }
         })
     }
     
     function handleLike(){
         if(likeColor=='text-red-500'){
             setLikeColor('text-slate-200')
         }
         else{
             setLikeColor('text-red-500')
         }
         handlePostRequest()
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
        <div className="flex flex-col gap-2">
                    <FaHeart onClick={handleLike} className={`${LikedById==authorId && postId==id?'text-red-500':'text-slate-200'} hover:text-red-500 cursor-pointer`}  />
                    <FaBookmark onClick={handleBookmark} className={`${bookmarkColor} hover:text-black cursor-pointer`}/>
        </div>
    )
}