import UseLikes from "../Hooks/UseLikes"
import AppBar from "./AppBar"
import Skeleton from "./Skeleton"
import { bookmarksAndLikesType } from "../Hooks/UseBookMarks"
import BlogCard from "./BlogCard"


export default function LikedPost(){
    const{loading,likes}=UseLikes()
    if(loading){
        return <Skeleton/>
    }
    console.log(likes)
    return(
    <div className="mt-20">
        <AppBar publishABlog={true}/>
        {
                likes && likes.map((like:bookmarksAndLikesType)=>
                    
                    <BlogCard key={like.id} id={like.id} authorId={like.authorId} CurrentUserHasLiked={like.likedByCurrentUser} CurrentUserBookMarkedPost={like.bookmarkedByCurrentUser}  date={like.date} title={like.title} content={like.content}/>
                )
            }
    </div>
    )
}