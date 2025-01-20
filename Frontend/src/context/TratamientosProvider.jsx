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

    const eliminarTratamientos = async (id) =>{
        try {
            const confirmar = confirm("Vas a eliminar, ¿Estás seguro?")
            if (confirmar){
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.delete(url, options)
            const tratamientosActualizados = tratamientos.filter(t => t._id !== id)
            setTratamientos(tratamientosActualizados)}
        } catch (error) {
            console.log(error)
        }
    }

    const cambiarTratamientos = async (id) =>{
        try {
            const confirmar = confirm("Vas a cambiar el estado, ¿Estás seguro?")
            if (confirmar){
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/estado/${id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post(url, {},options)
            const tratamientosActualizados = tratamientos.filter(t => t._id !== id)
            setTratamientos(tratamientosActualizados)}
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
            setTratamientos, 
            eliminarTratamientos,
            cambiarTratamientos
            }

        }>
        {children}
        </tratamientosContext.Provider>
    )}
export {TratamientosProvider}
export default tratamientosContext