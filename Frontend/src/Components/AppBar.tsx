import { useNavigate,Link } from "react-router-dom"

export default function AppBar({publishABlog=true}:{publishABlog:Boolean}){
    const navigate=useNavigate()
    //I need user's firstname and lastname here
    return(
        <div className="flex fixed top-0 left-0 bg-white w-full justify-between px-4 h-12 items-center shadow-sm ">
            <Link to={'/blogs/bulk'}><p className="font-extrabold text-xl cursor-pointer">Medium</p></Link>
            <div className="flex gap-4 items-center">
                {
                    publishABlog && <button onClick={()=>{navigate('/blogs/createBlog')}} className="bg-green-700 text-sm text-white px-2 rounded-lg h-8 hover:bg-green-800">Publish A Blog</button>
                }                
                <div className="h-10 w-10 rounded-full flex justify-center items-center border hover:bg-gray-200 hover:cursor-pointer transition-all">AK</div>
            </div>
        </div>
    )
}