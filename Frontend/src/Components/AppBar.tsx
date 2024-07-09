export default function AppBar(){
    //I need user's firstname and lastname here
    return(
        <div className="flex fixed top-0 left-0 bg-white w-full justify-between px-4 h-12 items-center shadow-sm ">
            <p className="font-extrabold text-xl cursor-pointer">Medium</p>
            <div className="h-10 w-10 rounded-full flex justify-center items-center border hover:bg-gray-200 hover:cursor-pointer transition-all">AK</div>
        </div>
    )
}