import { useState, useEffect } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
// import { PropsTypes } from "../Components/BlogCard"

export interface bookmarksAndLikesType{
    id:string | number,
    authorId:string,
    likedByCurrentUser:boolean,
    bookmarkedByCurrentUser:boolean,
    date:string,
    title:string,
    content:string,
}

interface returnTypeofUseBookMarks{
    loading:Boolean,
    bookmarks:bookmarksAndLikesType[] | null
}

export default function UseBookMarks():returnTypeofUseBookMarks{
    const[loading,setLoading]=useState(true)
    const[bookmarks,setBookMarks]=useState<bookmarksAndLikesType[] | null>(null)
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/user/blog/bookmarks`,{
            headers:{
                authorization:localStorage.getItem('token') || ''
            }
        })
        .then((res)=>{
            setBookMarks(res.data.data),
            setLoading(false)
        })
    },[])

    return({
        loading,
        bookmarks
    })
}