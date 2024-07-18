import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { bookmarksAndLikesType } from "./UseBookMarks";

interface returnTypeOfUseLikes{
    loading:Boolean,
    likes:bookmarksAndLikesType[] | null
}

export default function UseLikes():returnTypeOfUseLikes{
    const[loading,setLoading]=useState(true)
    const[likes,setLikes]=useState<bookmarksAndLikesType[]| null>(null)

    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/user/blog/likes`,{
            headers:{
                authorization:localStorage.getItem('token') || ''
            }
        })
        .then((res)=>{
            console.log(res.data.data)
            setLikes(res.data.data)
            setLoading(false)
        })
    },[])

    return({
        loading,
        likes
    })
}