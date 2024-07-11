import { useEffect,useState } from "react";
import axios from 'axios'
import { BACKEND_URL } from "../config";

export default function UseBlogImporter(){
    const[loading,setLoading]=useState(true)
    const[blogs,setBlogs]=useState([])


    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/user/blog/bulk`,{
            headers:{
                authorization:localStorage.getItem('token')
            }
        })
        .then((res)=>{
            setBlogs(res.data.data)
            setLoading(false)
        })
    },[])

    // if(id.length>0){
    //     const filteredBlog=blogs.filter((blog:BlogType)=>blog.id===id)    
    //     setBlogs(filteredBlog)
    // }

    return({
        loading,
        blogs
    })
}