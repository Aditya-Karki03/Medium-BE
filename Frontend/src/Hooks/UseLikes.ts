import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface LikesOrBookMarksOnWhichPostTypes{
    authorId:number,
    bookmarkedByCurrentUser:boolean,
    content:string,
    date:string,
    id:number,
    likedByCurrentUser:boolean,
    title:string
}
interface likeType {
    LikesOnWhichPost: LikesOrBookMarksOnWhichPostTypes;
}

interface returnTypeOfUseLikes{
    loading:boolean,
    likes:likeType[] | null
}

export default function UseLikes():returnTypeOfUseLikes{
    const[loading,setLoading]=useState(true)
    const[likes,setLikes]=useState<likeType[]| null>(null)

    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/user/blog/likes`,{
            headers:{
                authorization:localStorage.getItem('token') || ''
            }
        })
        .then((res)=>{
            // console.log(res.data)
            setLikes(res.data.data)
            setLoading(false)
        })
    },[])

    return({
        loading,
        likes
    })
}