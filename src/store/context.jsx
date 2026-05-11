import { createContext, useEffect, useState } from "react";

export let context = createContext(null)
function ContextProvider({ children }) {
    const [theme, setTheme] = useState("dark");
    let [user, setUser] = useState()
    const [state, setState] = useState("")
    const [loader, setLoader] = useState(true)
    let [resumeAnalyze, setresumeAnalyze] = useState(null)
    let [file, setFile] = useState(null)
    let [loaderText, setLoaderText] = useState({
        mainText: "",
        subText: ""
    })
    const [profile, setProfile] = useState(
        JSON.parse(localStorage.getItem('profile')) || false
    )
    let [sidebar, setSidebar] = useState(true)
    let [width, setWidth] = useState()
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        console.log(width);
        if (width < 800) setSidebar(false)
        else setSidebar(true)
    }, [width]);
    return (
        <>
            <context.Provider value={{
                theme, setTheme, state, setState, setLoader, loader, user, setUser
                , loaderText, setLoaderText, sidebar, setSidebar, setProfile, profile, width, setWidth
                , file, setFile,setresumeAnalyze,resumeAnalyze
            }}>
                {children}
            </context.Provider>

        </>
    )
}
export default ContextProvider;