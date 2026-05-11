import axios from "axios"
let api = axios.create({
    baseURL:"https://caring-wholeness-production-7d67.up.railway.app",
    withCredentials: true
})
export const resumeAnalyzeApi = async (formData) => {
    const response = await api.post("/api/resume",formData)
    return response.data
}