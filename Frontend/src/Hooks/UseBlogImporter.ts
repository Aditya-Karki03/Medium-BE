import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../utils/blogSlice";
import axios from 'axios'
import { BACKEND_URL } from "../config";

interface loggedInUserType{
    firstname:string,
    lastname:string
}

export default function UseBlogImporter(){
    const[loading,setLoading]=useState(true)
    const[blogs,setBlogs]=useState([])
    const[loggedInUser,setLoggedInUser]=useState<loggedInUserType | ''>('');
    const dispatch=useDispatch()

   
    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/user/blog/bulk`,{
            headers:{
                authorization:localStorage.getItem('token')
            }
        })
        .then((res)=>{
           
            setLoggedInUser(res.data.loggedInUser)
            setBlogs(res.data.data)
            setLoading(false)
            dispatch(addBlog(res.data.data))
        })
        
    },[])
    
  
    return({
        loading,
        blogs,
        loggedInUser
    })
}