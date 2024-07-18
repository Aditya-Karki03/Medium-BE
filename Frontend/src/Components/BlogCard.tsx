import { Link } from "react-router-dom"
import HeartAndBookmark from "./HeartAndBookmark";


export interface PropsTypes{
    id:string | number,
    authorId:string,
    CurrentUserHasLiked:boolean,
    CurrentUserBookMarkedPost:boolean,
    date:string,
    title:string,
    content:string,
    firstname?:string,
    lastname?:string,
}


export default function BlogCard({id,authorId,CurrentUserHasLiked,CurrentUserBookMarkedPost,date,title,content,firstname,lastname}:PropsTypes){
    console.log(CurrentUserHasLiked)
 
    return(
            <div  className="flex justify-center  items-center">
                <Link  to={`/blogs/fullblog/${id}`}>
                    <div className="flex justify-center mt-16 border-b-2 cursor-pointer px-4 ">
                        <div className="w-[700px] flex flex-col  pb-7">
                            <div className="flex items-center ">
                                    {
                                        firstname && lastname && <div className="h-10 w-10 rounded-full cursor-pointer border flex justify-center items-center">{`${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`}</div>
                                    }
                                    <div className="h-1 w-1 rounded-full bg-black mx-2"></div>
                                    <div className="">{date}</div>
                            </div>
                            <div className="text-2xl font-extrabold mt-2">
                                {title}
                            </div>
                            <div className="font-extralight mt-2">{`${content.substring(0,100)}...`}</div>
                            <div className="text-sm font-light text-gray-600 mt-2">{`${Math.round(content.length/100)} minute read`}</div>
                        </div>
                
                    </div>
                 </Link>
                 <HeartAndBookmark userHasLiked={CurrentUserHasLiked} userHasBookMarked={CurrentUserBookMarkedPost} id={id} authorId={authorId}/>       

            </div>
            )
       
    }
 