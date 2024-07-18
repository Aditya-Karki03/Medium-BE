export default function ProfileSkeleton(){
    return(
        <div className="flex  flex-col gap-14  border animate-pulse  black items-center justify-center mt-20 cursor-pointer">
             <div className="h-30 w-30 p-20 rounded-full bg-gray-200  dark:bg-gray-400  mb-4"></div>
            <div role="status" className="w-8/12 animate-pulse text-center">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[360px]"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}