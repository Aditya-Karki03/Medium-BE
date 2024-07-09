import { Outlet } from "react-router-dom"
import AppBar from "../Components/AppBar"
import BlogCard from "../Components/BlogCard"

export default function Blogs(){
    return(
        <div className="">
            <AppBar publishABlog={true}/>
            <Outlet/>
            <BlogCard firstname="Aditya" lastname="Karki" date="Dec 3,2023" title="How an Ugly Single Page Website" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi commodi animi totam amet, accusantium quis tenetur, dicta qui, tempore vel laboriosam ut repudiandae repellat maxime autem perspiciatis officiis hic ducimus!"/>
            <BlogCard firstname="Aditya" lastname="Karki" date="Dec 3,2023" title="How an Ugly Single Page Website" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi commodi animi totam amet, accusantium quis tenetur, dicta qui, tempore vel laboriosam ut repudiandae repellat maxime autem perspiciatis officiis hic ducimus!"/>
            <BlogCard firstname="Aditya" lastname="Karki" date="Dec 3,2023" title="How an Ugly Single Page Website" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi commodi animi totam amet, accusantium quis tenetur, dicta qui, tempore vel laboriosam ut repudiandae repellat maxime autem perspiciatis officiis hic ducimus!"/>
            <BlogCard firstname="Aditya" lastname="Karki" date="Dec 3,2023" title="How an Ugly Single Page Website" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi commodi animi totam amet, accusantium quis tenetur, dicta qui, tempore vel laboriosam ut repudiandae repellat maxime autem perspiciatis officiis hic ducimus!"/>
            <BlogCard firstname="Aditya" lastname="Karki" date="Dec 3,2023" title="How an Ugly Single Page Website" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi commodi animi totam amet, accusantium quis tenetur, dicta qui, tempore vel laboriosam ut repudiandae repellat maxime autem perspiciatis officiis hic ducimus!"/>
        </div>
    )
}