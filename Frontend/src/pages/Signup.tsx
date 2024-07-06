import Input from "../Components/Input";
import Quote from "../Components/Quote";////w-1/2

export default function Signup(){
    return(
        <div className="flex w-screen h-screen flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                <Input/>
            </div>
            <div className="w-full md:w-1/2">
                <Quote />
            </div>
        </div>
    )
}