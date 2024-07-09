import Input from "../Components/Input"
import Quote from "../Components/Quote"
export default function Signin(){
    return(
        <div className="flex w-screen h-screen flex-col md:flex-row ">
            <div className="w-full md:w-1/2">
                <Input type="signin"/>
            </div>
            <div className="w-full md:w-1/2">
                <Quote />
            </div>
        </div>
    )
}