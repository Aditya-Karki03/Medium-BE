import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../utils/blogSlice";
import axios from 'axios'
import { BACKEND_URL } from "../config";

export default function UseBlogImporter(){
    const[loading,setLoading]=useState(true)
    const[blogs,setBlogs]=useState([])
    const dispatch=useDispatch()

   
    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/user/blog/bulk`,{
            headers:{
                authorization:localStorage.getItem('token')
            }
        })
        .then((res)=>{
            setBlogs(res.data.data)
            setLoading(false)
            dispatch(addBlog(res.data.data))
        })
        
    },[])

  
    return({
        loading,
        blogs
    })
}