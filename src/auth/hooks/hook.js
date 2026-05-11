import { useContext } from "react";
import { context } from "../../store/context";
import { getMe, login, logout, profileImage, register } from "../services/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";





export let useAuth = () => {
    let navigate = useNavigate()
    let { setUser, user, setLoader, setLoaderText, setState } = useContext(context)
    const handleError = (err) => {
        const message = err?.response?.data?.message;
        if (message) {
            toast.error(message);
        } else {
            toast.error("Server is not responding");
            // navigate('/');
            setUser(null);
        }
    };
    let handleLogin = async ({ userName, email, password }) => {
        try {
            setLoaderText({ mainText: "Signing you in...", subText: "Please wait while we verify your credentials." })
            setLoader(true)
            let data = await login({ userName, email, password })
            setTimeout(() => {
                toast.success(data?.message)
                setState("")
            }, 3200);
            setUser(data.user);
        }
        catch (err) {
            setTimeout(() => {
                toast.error(err?.response?.data?.message || "Server is not responding")
            }, 3200);
        }
        finally {
            setTimeout(() => {
                setLoader(false)
            }, 3000);
        }

    }
    let handleRegister = async ({ userName, email, password }) => {
        try {
            setLoaderText({ mainText: "Creating your account...", subText: "Please wait while we set things up for you." })
            setLoader(true)
            let data = await register({ userName, email, password })
            console.log(data.request)
            setTimeout(() => {
                toast.success(data?.message)
                setState("")
            }, 3200);
            setUser(data?.user);
        }
        catch (err) {
            setTimeout(() => {
                toast.error(err?.response?.data?.message || "Server is not responding")
            }, 3200);
        }
        finally {
            setTimeout(() => {
                setLoader(false)
            }, 3000);
        }
    }
    let handleLogout = async () => {
        try {
            setLoaderText({
                mainText: "Logging out...",
                subText: "Ending your session securely. Please wait..."
            });
            setLoader(true)
            let data = await logout()
            setUser(null);
            setTimeout(() => {
                localStorage.setItem("url", '')
                toast.success(data?.message)
            }, 3200);
        }
        catch (err) {
            setTimeout(() => {
                handleError(err)
            }, 3200);
        }
        finally {
            setTimeout(() => {
                setLoader(false)
            }, 3000);
        }
    }
    let handlegetMe = async () => {
        try {
            setLoaderText({
                mainText: "Refreshing content...",
                subText: "Updating your data to show the latest changes."
            });
            setLoader(true)
            let data = await getMe()
            setUser(data.user);
            setTimeout(() => {
                toast.success(data?.message)
            }, 3200);
        }
        catch (err) {
            setTimeout(() => {
                console.log(err?.response?.data?.message)
                if ((err?.response?.data?.message === "Login Plz") ||
                    (err?.response?.data?.message === "Token Blacklisted")
                    || (err?.response?.data?.message === "Token Invalid")) {
                    // navigate('/')
                    setUser(null)
                    localStorage.setItem("url", '')
                }
                else {
                handleError(err)
                }
            }, 3200);
        }
        finally {
            setTimeout(() => {
                setLoader(false)
            }, 3000);
        }
    }
    let handleProfile = async (formData) => {
        try {
            setLoaderText({
                mainText: "Updating profile image...",
                subText: "Please wait while we save your changes."
            });
            setLoader(true)
            let data = await profileImage(formData)
            setUser(data.user);
            setTimeout(() => {
                toast.success(data?.message)
            }, 3200);
        }
        catch (err) {
            setTimeout(() => {
                if ((err?.response?.data?.message === "Login Plz") ||
                    (err?.response?.data?.message === "Token Blacklisted")
                    || (err?.response?.data?.message ==="Invalid Token")) {
                    navigate('/')
                    toast.error(err?.response?.data?.message)
                    setUser('')
                    localStorage.setItem("url", '')
                    localStorage.setItem("profile", false)

                }
                else {
                   handleError(err)
                }
            }, 3200);
        }
        finally {
            setTimeout(() => {
                setLoader(false)
            }, 3000);
        }
    }


    return { setUser, setLoader, handleLogout, handleRegister, handleLogin, handlegetMe, user, handleProfile }
}