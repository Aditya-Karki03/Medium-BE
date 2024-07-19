import { useState, useEffect } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { LikesOrBookMarksOnWhichPostTypes } from "./UseLikes"
// import { PropsTypes } from "../Components/BlogCard"

interface bookMarkType{
    BookMarkedPost:LikesOrBookMarksOnWhichPostTypes
}

// export interface bookmarksAndLikesType{
//     id:string | number,
//     authorId:string,
//     likedByCurrentUser:boolean,
//     bookmarkedByCurrentUser:boolean,
//     date:string,
//     title:string,
//     content:string,
// }

interface returnTypeofUseBookMarks{
    loading:Boolean,
    bookmarks:bookMarkType[] | null
}

export default function UseBookMarks():returnTypeofUseBookMarks{
    const[loading,setLoading]=useState(true)
    const[bookmarks,setBookMarks]=useState<bookMarkType[] | null>(null)
    
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