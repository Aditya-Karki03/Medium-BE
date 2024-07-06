import { useState } from "react"
import { Link } from "react-router-dom"
import { SignUpSchema } from "@aditya_karki_03/medium-common-folder"

interface typeOfProps{
    type:'signup'|'signin'
}
export default function Input({type}:typeOfProps){
    const[postReq,setPostReq]=useState<SignUpSchema>({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })
    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {
                type==='signup'?(
                    <div className="">
                        <div className="font-extrabold">Create an account</div>
                        <p className="font-semibold">Already have an account? <span className="">Login</span></p>
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
                <InputBoxes name={'Firstname'} typeOfBox={'text'} placeholderVal={'John'} valueChanger={e=>{
                    setPostReq({
                        ...postReq,
                        firstname:e.target.value
                    })
                }}/>
                <InputBoxes name={'Lastname'} typeOfBox={'text'} placeholderVal={'Doe'} valueChanger={(e)=>{
                    setPostReq({
                        ...postReq,
                        lastname:e.target.value
                    })
                }}/>
                <InputBoxes name={'Password'} typeOfBox={'password'} placeholderVal={'password'} valueChanger={(e)=>{
                    setPostReq({
                        ...postReq,
                        password:e.target.value
                    })
                }}/>
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