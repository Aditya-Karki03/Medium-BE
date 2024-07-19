import UseUserInfo from "../Hooks/UseUserInfo";
import AppBar from "../Components/AppBar";
import ProfileSkeleton from "../Components/ProfileSkeleton";

// interface userInfoTypes{
//     firstname:string,
//     lastname:string,
//     email:string
// }

export default function Profile(){
    const{userInfo,loading}=UseUserInfo()
    
    if(loading){
        return <ProfileSkeleton/>
    }
    if(!userInfo){
        return <div className="">User Information Not Available</div>
    }
 
    const{firstname,lastname,email,bookmarks,likes}=userInfo

    
    return(
        <div className="h-3/4 w-screen">
            <AppBar publishABlog={true}/>
            <div className="mt-16 w-screen h-full flex flex-col justify-center items-center">
                <div className="h-30 w-30 p-14 text-4xl bg-slate-200 relative rounded-full flex justify-center items-center border hover:bg-gray-400 hover:cursor-pointer transition-all">{`${firstname[0]}${lastname[0]}`}</div>
                <div className="text-xl font-serif font-bold text-[#333] mt-2">{`${firstname} ${lastname}`}</div>
                {/* <div className="md:w-4/12 p-2 text-[#666] italic text-center">Bio Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas cumque reprehenderit delectus magnam excepturi quia nobis, in ipsam corporis neque.</div> */}
                <div className="font-mono text-[16px] text-[#555] underline mt-2">{email}</div>
                <div className="font-sans italic text-[22px] mt-2  text-black">Total Bookmarks: {bookmarks.length}</div>
                <div className="font-sans italic text-[22px]  text-black">Total Liked Blogs: {likes.length}</div>
            </div>
        </div>
    )
}