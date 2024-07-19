import axios from "axios";
import { useEffect,useState } from "react";
import { BACKEND_URL } from "../config";

interface userInfoType{
    id:string,
    firstname:string,
    lastname:string,
    email:string,
    bookmarks:string[],
    likes:string[]
}

interface returnTypeOfUseUserInfo{
    loading:Boolean,
    userInfo:userInfoType | null
}

export default function UseUserInfo():returnTypeOfUseUserInfo{
   const[loading,setLoading]=useState(true)
   const[userInfo,setUserInfo]=useState<userInfoType | null>(null)
    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/user/blog/userInfo`,{
            headers:{
                authorization:localStorage.getItem('token')
            }
        })
        .then((res)=>{
            setUserInfo(res.data.data)
            setLoading(false)
        })
    },[])

    return{
        loading,
        userInfo
    }
        
}