import axios from "axios"
let api = axios.create({
    baseURL:"https://caring-wholeness-production-7d67.up.railway.app",
    withCredentials: true
})
export const register = async ({ userName, email, password }) => {
    const response = await api.post("/auth/register", {
        userName, email, password
    })
    return response.data
}
export const login = async ({ userName, email, password }) => {
    let response = await api.post("/auth/login", {
        userName, email, password
    })
    return response.data
}


export const logout = async () => {
    const response = await api.post("/auth/logout")
    return response.data
}

export  const getMe = async () => {
    const response = await api.get("/auth/getMe")
    return response.data

}
export const profileImage = async (formData) => {
    const response = await api.post("/auth/image",formData)
    return response.data
}