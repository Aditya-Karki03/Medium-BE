import AppBar from "../Components/AppBar";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";

interface responseObj{
    id:string
}

export default function BlogPublisher(){
    const[title,setTitle]=useState('');
    const[content,setContent]=useState('')
    const navigate=useNavigate()
    if(localStorage.getItem('token')===null){
        navigate('/signin')
    }
    async function handlePublish(){
        const id=toast.loading('We are publishing it! Please Hold Tight!',{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
        try {
            const response = await axios.post<responseObj>(`${BACKEND_URL}api/v1/user/blog`, {
                title,
                content,
                published:true,
                date: new Date().toDateString(),
              }, {
                headers: {
                  'authorization': localStorage.getItem('token') || ""
                }
              });
            if(response.data.id){
                toast.update(id, { render: "Congratulations! Your Article is Published", type: "success", isLoading: false,autoClose: 5000  })
               
            }
            
        } catch (error) {
            toast.update(id, { render: "Please Try again!!", type: "error", isLoading: false,autoClose: 5000  })
            return;
        }   

        setTitle('');
            setContent('')
    }
    
    return(
        <div className="flex flex-col justify-center items-center">
            <AppBar publishABlog={false}/>
            <div className=" border-black flex flex-col mt-40 w-8/12  justify-center items-center">
                <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder="Title" className="  border-l-2 outline-none text-2xl font-thin p-2 w-full"/>
                <textarea onChange={(e)=>{setContent(e.target.value)}} value={content}  placeholder="Tell Your Story" className="font-extralight p-2 w-full outline-none border-b-2 "></textarea>
                <div className="flex w-full justify-end mt-2">
                    <button onClick={handlePublish}className="bg-green-700 text-sm text-white px-2 rounded-lg h-8 hover:bg-green-800">Publish</button>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    )
}
