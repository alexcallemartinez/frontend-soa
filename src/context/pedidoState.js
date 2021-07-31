import React, { useEffect, useState } from 'react'
import { getPedido } from '../services/ventaService';
import PedidosContext from './pedidoContext';



const PedidosState = ({ children }) => {


    const [pedidos, setPedidos] = useState([]);
    const [cargandoPedidos, setCargandoPedidos] = useState(true);
    const [modalAgregar,setModalAgregar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [pedidoEditar, setPedidoEditar]=useState({});
    const [carrito,setCarrito]=useState([]);
    

    

    const obtenerPedidos = () => {
        setCargandoPedidos(true);
        getPedido().then(data => {
            console.log(data.content);
           
            setPedidos(data.content);
            setCargandoPedidos(false);
            
            
        });
    }



    useEffect(() => {
        obtenerPedidos();
    }, [])

    return (
        <PedidosContext.Provider value={{
            pedidos: pedidos,
            cargandoPedidos: cargandoPedidos,
            modalAgregar:modalAgregar,
            modalEditar:modalEditar,
            pedidoEditar:pedidoEditar,
            carrito:carrito,
            setCarrito:setCarrito,
            setPedidoEditar:setPedidoEditar,
            setModalAgregar:setModalAgregar,
            setModalEditar:setModalEditar,
            obtenerPedidos: obtenerPedidos
        }}>
            {children}

        </PedidosContext.Provider>
    )
}

export default PedidosState
