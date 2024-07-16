import axios from "axios";
import { useEffect,useState } from "react";
import { BACKEND_URL } from "../config";

export default function UseLikeImporter(){
    const[likes,setLikes]=useState([])
    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/user/blog/bulk`,{
            headers:{
                authorization:localStorage.getItem('token')
            }
        })
        .then((res)=>{
            setLikes(res.data.allPostLikedByUser)
        })
    },[])

    return {
        likes
    };
}