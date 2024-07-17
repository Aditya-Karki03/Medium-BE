import { FaHeart,FaBookmark } from "react-icons/fa";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState } from "react";

interface HeartAndBookMarkTypes{
    id:string,
    authorId:string,
    userHasLiked:Boolean
}



export default function HeartAndBookmark({id,authorId,userHasLiked=false}:HeartAndBookMarkTypes){
    const[bookmarkColor,setBookmarkColor]=useState('text-slate-200')
    const[liked,setLiked]=useState(userHasLiked)

    // if(!userHasLiked){
    //     setLikeColorByUser()
    // }
    console.log(userHasLiked)


    async function handlePostRequest(){
        await axios.post(`${BACKEND_URL}api/v1/user/blog/likes`,{
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
                    <FaHeart onClick={handleLike} className={`${liked?'text-red-500':'text-slate-200'} hover:text-red-500 cursor-pointer`}  />
                    <FaBookmark onClick={handleBookmark} className={`${bookmarkColor} hover:text-black cursor-pointer`}/>
        </div>
    )
}