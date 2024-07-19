
import AppBar from "../Components/AppBar"
import BlogCard from "../Components/BlogCard"
import UseBlogImporter from "../Hooks/UseBlogImporter"
import Skeleton from "../Components/Skeleton";
// import UseLikes from "../Hooks/UseLikes";
// import UseBookMarks from "../Hooks/UseBookMarks";

// import { addBlog } from "../utils/blogSlice";




export interface BlogType{
    
            "id": number,
            "title": string,
            "content": string,
            "date": string,
            "likedByCurrentUser":boolean,
            "bookmarkedByCurrentUser":boolean,
            "NumberOfLikes": number,
            "author": {
                "id":string
                "firstname": string,
                "lastname": string
            }
            "likes":[
                {
                    LikedById:number
                }
            ] | [],
            "PostsBookMarked":[
                {
                    "BookMarkerId":number
                }
            ] | [],
            "currentlyLoggedInUser":string
        } 

// type newDataType=(BlogType | CurrentlyLoggedInUser)

export default function Blogs(){
    const{loading,blogs,loggedInUser}=UseBlogImporter();
    // const{likes}=UseLikes()
    // const{bookmarks}=UseBookMarks()
    
    if(loading){
        return(
            <Skeleton/>
        )
    }
    console.log(blogs)

//     const likedBlogs=blogs.filter((blog)=>)

// console.log(likes)
//     console.log(bookmarks)
    
    return(
        <div className="">
            <AppBar publishABlog={true} firstname={loggedInUser.firstname} lastname={loggedInUser.lastname}/>
            {
                
                blogs && blogs.map((blog:(BlogType))=>{
                   const BloglikedByCurrentUser=blog.likes.findIndex((like)=>like.LikedById==parseInt(blog.currentlyLoggedInUser))
                   const BlogBookMarkedByCurrentUser=blog.PostsBookMarked.findIndex((bookmarked)=>bookmarked.BookMarkerId==parseInt(blog.currentlyLoggedInUser))
                    return(
                        <BlogCard key={blog.currentlyLoggedInUser}  authorId={blog.author.id} id={blog.id} CurrentUserHasLiked={BloglikedByCurrentUser==-1?false:true} CurrentUserBookMarkedPost={BlogBookMarkedByCurrentUser==-1?false:true} firstname={blog.author.firstname} lastname={blog.author.lastname} date={blog.date} title={blog.title} content={blog.content}/>
                    )
                }
                )
            }
           
            
        </div>
    )
}