import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";

interface ProtectedPropsTypes{
    Props: React.ComponentType
}

const Protected: React.FC<ProtectedPropsTypes> = ({ Props }) => {
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')==null){
            navigate('/signin')
        }
    })
    return <Props />;
};

export default Protected;
