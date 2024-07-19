import UseBookMarks from "../Hooks/UseBookMarks";
import AppBar from "./AppBar";
import BlogCard from "./BlogCard";
import Skeleton from "./Skeleton";
import { LikesOrBookMarksOnWhichPostTypes } from "../Hooks/UseLikes";

interface bookmarkType{
    BookMarkedPost:LikesOrBookMarksOnWhichPostTypes
}

export default function Bookmarks(){
    const{loading,bookmarks}=UseBookMarks()
    if(loading && !bookmarks){
        return <Skeleton/>
    }
    
    return(
        <div className="">
            <AppBar publishABlog={true} />
            {
                bookmarks && bookmarks.map((bookmark:bookmarkType)=>{
                    const{authorId,bookmarkedByCurrentUser,likedByCurrentUser,content,date,id,title}=bookmark.BookMarkedPost                    
                    
                    return(
                        <BlogCard key={id} id={id} authorId={JSON.stringify(authorId)} CurrentUserHasLiked={likedByCurrentUser} CurrentUserBookMarkedPost={bookmarkedByCurrentUser}  date={date} title={title} content={content}/>
                    )
                }
                    
                   
                )
            }
        </div>
    )
}