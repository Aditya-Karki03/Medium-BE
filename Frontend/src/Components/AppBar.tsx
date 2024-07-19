import { useNavigate,Link } from "react-router-dom"
import { useState } from "react"
import UseBlogImporter from "../Hooks/UseBlogImporter"
import Skeleton from "./Skeleton"

//need first and lastname of the logged in user here
export default function AppBar({publishABlog=true}:{publishABlog:Boolean}){
    const navigate=useNavigate()
    const{loggedInUser,loading}=UseBlogImporter()
    const[showProfile,setShowProfile]=useState(false)
    
   
    function handleClick(){
        setShowProfile(prev=>!prev)
    }

    function handleProfileBookMarksLikedPost(route:string){
        navigate(`/user/${route}`)
    }
    
    function handleSignOut(){
        localStorage.clear()
        navigate('/signin')
    }

    if(loading){
        <Skeleton/>
    }
    // console.log(loggedInUser.firstname)

    return(
        <div className="flex fixed z-20 top-0 left-0 bg-white w-full justify-between px-4 h-12 items-center shadow-sm ">
            <Link to={'/blogs/bulk'}><p className="font-extrabold text-xl cursor-pointer">Medium</p></Link>
            <div className="flex gap-4 items-center">
                {
                    publishABlog && <button onClick={()=>{navigate('/blogs/createBlog')}} className="bg-green-700 text-sm text-white px-2 rounded-lg h-8 hover:bg-green-800">Publish A Blog</button>
                }    
             <div className="flex flex-col">            
                <div onClick={handleClick} className="h-10 w-10 relative rounded-full flex justify-center items-center border hover:bg-gray-200 hover:cursor-pointer transition-all">{`${loggedInUser &&  loggedInUser.firstname[0]}${loggedInUser && loggedInUser.lastname[0]}`}</div>
                
                    {
                        showProfile && <div className="flex flex-col absolute top-12 bg-slate-200 text-black right-1 rounded-md">
                            <button onClick={()=>handleProfileBookMarksLikedPost('profile')} className=" border border-b-white hover:bg-slate-400 cursor-pointer rounded-md px-3 py-1 transition-all">Your Profile</button>
                            <button onClick={()=>handleProfileBookMarksLikedPost('bookmarks')} className=" border border-b-white hover:bg-slate-400 cursor-pointer rounded-md px-3 py-1 transition-all">Your Bookmarks</button>
                            <button onClick={()=>handleProfileBookMarksLikedPost('likedPost')} className=" border border-b-white hover:bg-slate-400 cursor-pointer rounded-md px-3 py-1 transition-all">Your Liked Post</button>
                            <button onClick={handleSignOut} className=" border border-b-white hover:bg-slate-400 cursor-pointer rounded-md px-3 py-1 transition-all">Sign Out</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}