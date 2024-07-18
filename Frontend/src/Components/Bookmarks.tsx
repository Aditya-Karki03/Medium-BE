import UseBookMarks from "../Hooks/UseBookMarks";
import AppBar from "./AppBar";
import BlogCard from "./BlogCard";
import Skeleton from "./Skeleton";
import { bookmarksAndLikesType } from "../Hooks/UseBookMarks";
//BlogCard({id,authorId,CurrentUserHasLiked,CurrentUserBookMarkedPost,firstname,lastname,date,title,content}:PropsTypes){

export default function Bookmarks(){
    const{loading,bookmarks}=UseBookMarks()
    if(loading && !bookmarks){
        return <Skeleton/>
    }
    
    return(
        <div className="">
            <AppBar publishABlog={true}/>
            {
                bookmarks && bookmarks.map((bookmark:bookmarksAndLikesType)=>
                    
                    <BlogCard key={bookmark.id} id={bookmark.id} authorId={bookmark.authorId} CurrentUserHasLiked={bookmark.likedByCurrentUser} CurrentUserBookMarkedPost={bookmark.bookmarkedByCurrentUser}  date={bookmark.date} title={bookmark.title} content={bookmark.content}/>
                )
            }
        </div>
    )
}