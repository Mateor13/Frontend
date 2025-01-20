import {createContext, useState} from 'react'
import axios from 'axios'

const tratamientosContext = createContext()

const TratamientosProvider= ({children})=>{

    const [tratamientos, setTratamientos] = useState([])
    const [modal, setModal] = useState(false)

    const handleModal = () =>{
        setModal(!modal)
    }

    const registrarTratamientos = async (data) =>{
        console.log(data)
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, data, options)
            setTratamientos([respuesta.data.tratamiento, ...tratamientos])
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarTratamientos = async (data) =>{
        console.log(data)
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuestaTratamientos = await axios.delete(url, options)
            const tratamientosActualizados = respuestaTratamientos.filter(rt => rt._id !== id)
            setTratamientos(tratamientosActualizados)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <tratamientosContext.Provider value={
            {
            //Contenido
            modal,
            setModal,
            handleModal,
            registrarTratamientos,
            tratamientos,
            setTratamientos
            }

        }>
        {children}
        </tratamientosContext.Provider>
    )}
export {TratamientosProvider}
export default tratamientosContext