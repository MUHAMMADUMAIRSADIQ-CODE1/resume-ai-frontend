import { useContext } from "react"
import { resumeAnalyzeApi } from "../services/resumeAnalyze"
import { context } from "../../store/context"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


export let useResume = () => {
    const navigate = useNavigate()
    let { setFile, setLoader, setLoaderText, setresumeAnalyze } = useContext(context)

    let resumeAnalyze = async (formData) => {

        try {
            setFile(null)
            setLoaderText({
                mainText: "Analyzing your resume...",
                subText: "Our AI is evaluating your skills, experience, and overall profile."
            });
            setLoader(true)
            let data = await resumeAnalyzeApi(formData)
            setresumeAnalyze(data.resAI)
            console.log(data?.resAI);
            setTimeout(() => {
                toast.success(data?.resAI?.message ? data?.resAI?.message : data?.resAI.meta.message)
                navigate('/dashboard')
            }, 3200);
        }
        catch (err) {
            console.log(err)
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
    return { resumeAnalyze }
}