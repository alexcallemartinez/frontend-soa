import React, { useEffect, useState } from 'react'
import { getProducto } from '../services/ProductoService';
import ProductosContext from './productosContext';


const ProductosState = ({ children }) => {


    const [productos, setProductos] = useState([]);
    const [cargandoProductos, setCargandoProductos] = useState(true);
    const [modalAgregar,setModalAgregar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [productoEditar, setProductoEditar]=useState({});
    const [carrito,setCarrito]=useState([]);
    

    

    const obtenerProductos = () => {
        setCargandoProductos(true);
        getProducto().then(data => {
            console.log("llegó la data");
           
            setProductos(data.content);
            setCargandoProductos(false);
            
            
        });
    }



    useEffect(() => {
        obtenerProductos();
    }, [])

    return (
        <ProductosContext.Provider value={{
            productos: productos,
            cargandoProductos: cargandoProductos,
            modalAgregar:modalAgregar,
            modalEditar:modalEditar,
            productoEditar:productoEditar,
            carrito:carrito,
            setCarrito:setCarrito,
            setProductoEditar:setProductoEditar,
            setModalAgregar:setModalAgregar,
            setModalEditar:setModalEditar,
            obtenerProductos: obtenerProductos
        }}>
            {children}

        </ProductosContext.Provider>
    )
}

export default ProductosState
