import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../utils/blogSlice";
import axios from 'axios'
import { BACKEND_URL } from "../config";

export default function UseBlogImporter(){
    const[loading,setLoading]=useState(true)
    const[blogs,setBlogs]=useState([])
    const dispatch=useDispatch()

    const start=Date.now();
    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/user/blog/bulk`,{
            headers:{
                authorization:localStorage.getItem('token')
            }
        })
        .then((res)=>{
            // console.log(Math.floor((Date.now()-start)/1000))
            setBlogs(res.data.data)
            setLoading(false)
            dispatch(addBlog(res.data.data))
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