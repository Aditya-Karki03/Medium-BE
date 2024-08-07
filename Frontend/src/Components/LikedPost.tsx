import UseLikes from "../Hooks/UseLikes"
import AppBar from "./AppBar"
import Skeleton from "./Skeleton"
import BlogCard from "./BlogCard"

interface LikesOnWhichPostTypes{
    authorId:number,
    bookmarkedByCurrentUser:boolean,
    content:string,
    date:string,
    id:number,
    likedByCurrentUser:boolean,
    title:string
}

// interface returnTypeOfUseLikes{
//     loading:boolean,
//     likes:LikesOnWhichPostTypes[] | null
// }
interface likeType {
    LikesOnWhichPost: LikesOnWhichPostTypes;
}

export default function LikedPost(){
    const{loading,likes}=UseLikes()
    if(loading ){
        return <Skeleton/>
    }
    
    return(
    <div className="mt-20">
        <AppBar publishABlog={true}/>
        {
            likes?.length==0 && <div className="mt-80 font-mono w-screen flex justify-center">You Have Not Liked any Post yet!!</div>
        }
        {
                likes && likes.map((like:likeType)=>{
                    const{authorId,bookmarkedByCurrentUser,content,date,id,likedByCurrentUser,title}=like.LikesOnWhichPost
                    return(
                        
                    <BlogCard key={id} id={id} authorId={JSON.stringify(authorId)} CurrentUserHasLiked={likedByCurrentUser} CurrentUserBookMarkedPost={bookmarkedByCurrentUser}  date={date} title={title} content={content}/>
                    )
                }
                    
                )
            }
    </div>
    )
}