import React from 'react';
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignUpSchema } from "@aditya_karki_03/medium-common-folder"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'





interface typeOfProps{
    type:'signup'|'signin'
}
export default function Input({type}:typeOfProps){
    const navigate=useNavigate()
    const[postReq,setPostReq]=useState<SignUpSchema>({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })


     async function handleSignInClick(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        const id=toast.loading('Hold On!',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
        try {
                const response=await axios.post(`${BACKEND_URL}api/v1/user/signin`,{
                    email:postReq.email,
                    password:postReq.password
                })
                toast.update(id, { render: "All is good", type: "success", isLoading: false,autoClose: 5000 });
                localStorage.setItem('token',response.data)
                navigate('/blogs/bulk')
            } catch (error) {
                //alert user with the error by 'request failed'
                toast.update(id, { render: " Please try Again!", type: "error", isLoading: false,autoClose: 5000  });                    
                
                return;
            }
        }

        async function handleSignUpClick(e:React.MouseEvent<HTMLButtonElement>){
            e.preventDefault();
            const id=toast.loading('Hold On!',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            try {
                
                const response=await axios.post(`${BACKEND_URL}api/v1/user/signup`,{
                    email:postReq.email,
                    firstname:postReq.firstname,
                    lastname:postReq.lastname,
                    password:postReq.password
                })
                console.log(response)
                toast.update(id, { render: "All is good", type: "success", isLoading: false,autoClose: 5000});
                localStorage.setItem('token',response.data)
                navigate('/blogs/bulk')
                
            } catch (error) {
                //alert user with the error by 'request failed'
                toast.update(id, { render: "Already registered Username! Please try signing in!", type: "error", isLoading: false,autoClose: 5000}); 
                
            }
        }
    
    

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {
                type==='signup'?(
                    <div className="flex flex-col justify-center items-center mb-3">
                        <div className="font-extrabold text-2xl">Create an account</div>
                        <p className="font-semibold">Already have an account? <Link to={'/signin'} className="underline">Login</Link></p>
                    </div>
                ):
                <p className="font-semibold mb-4 text-1xl">Don't have an account? <Link className="underline" to={'/signup'} >Sign Up</Link></p>

            }
                <InputBoxes name={'Username'} typeOfBox={'text'} placeholderVal={'johndoe@gmail.com'} valueChanger={(e)=>{
                    setPostReq({
                        ...postReq,
                        email:e.target.value
                    })
                }}/>
                {
                    type==='signup' && <InputBoxes name={'Firstname'} typeOfBox={'text'} placeholderVal={'John'} valueChanger={e=>{
                                setPostReq({
                                    ...postReq,
                                    firstname:e.target.value
                                })
                    }}/>
                }
                {
                    type==='signup' && <InputBoxes name={'Lastname'} typeOfBox={'text'} placeholderVal={'Doe'} valueChanger={(e)=>{
                                setPostReq({
                                    ...postReq,
                                    lastname:e.target.value
                                })
                    }}/>
                }
                <InputBoxes name={'Password'} typeOfBox={'password'} placeholderVal={'password'} valueChanger={(e)=>{
                    setPostReq({
                        ...postReq,
                        password:e.target.value
                    })
                }}/>
                <div className="w-full flex justify-center items-center">
                    <button onClick={(e)=>{
                        type=='signin'?handleSignInClick(e):handleSignUpClick(e)
                    }} className="bg-slate-400 hover:bg-slate-700 text-white w-full font-bold py-2 px-4 rounded">
                        {
                            type==='signup'?'Sign Up':'Sign In'
                        }
                    </button>
                    <ToastContainer />
                </div>
            </form>
        </div>
    )
}

function InputBoxes({name,typeOfBox,placeholderVal,valueChanger}:{name:string,typeOfBox:string,placeholderVal:string,valueChanger:(e:React.ChangeEvent<HTMLInputElement>)=>void}){
    return (
<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" >
        {name}
    </label>
    <input onChange={valueChanger} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type={typeOfBox} placeholder={placeholderVal}/>
</div>                    
    )
}