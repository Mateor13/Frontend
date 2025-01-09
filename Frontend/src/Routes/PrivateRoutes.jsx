import { Navigate } from "react-router-dom"

export const PrivateRoutes =({children}) =>{
    const autenticado = localStorage.getItem('token')
    return (autenticado) ? children : <Navigate to='/login'/>
}