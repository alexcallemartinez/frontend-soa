import React, { useEffect, useState } from 'react'
import { getCategorias } from '../services/categoriaService';
import CategoriasContext from './categoriasContext';

const CategoriaState = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [cargandoCategorias, setCargandoCategorias] = useState(true);
    const [modalAgregar, setModalAgregar]=useState(false);
    const [modalEditar,setModalEditar]=useState(false);
    const [categoriaEditar,setCategoriaEditar ]=useState({});

     const obtenerCategorias=()=>{
           setCargandoCategorias(true);
           getCategorias().then(data=>{
           setCategorias(data.content);
           setCargandoCategorias(false);

     });
 }

 useEffect(()=>{
     obtenerCategorias();

 },[]);

    return (
        <CategoriasContext.Provider value={{
            categorias:categorias,
            cargandoCategorias:cargandoCategorias,
            modalAgregar:modalAgregar,
            categoriaEditar:categoriaEditar,
            modalEditar:modalEditar,
            setModalAgregar:setModalAgregar,
            setCategoriaEditar:setCategoriaEditar,
            setModalEditar:setModalEditar,

            obtenerCategorias:obtenerCategorias
        }}>
            {children}

        </CategoriasContext.Provider>
    )
}

export default CategoriaState
