import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/hooks/hook";
import { useEffect } from "react";

const GetUser = () => {
    let location = useLocation()
    let { handlegetMe, user } = useAuth()
    let navigate = useNavigate()
    useEffect(() => {
       if(user) localStorage.setItem("url", location.pathname)
        console.log(location.pathname)
    }, [location.pathname])
    useEffect(() => {
        const loadUser = async () => {
            await handlegetMe();

        };
        loadUser();

    }, [])
    useEffect(() => {
        if (user) {
            localStorage.getItem('url') ? navigate(localStorage.getItem('url')) : navigate('/dashboard')
        }
        else{
            navigate('/')
        }

    }, [user])

    return (
        <></>
    )
}

export default GetUser;