import React,{useContext, useState} from 'react'
import Swal from "sweetalert2";
import PedidosContext from '../../../../context/pedidoContext' ;
import {putPedido} from '../../../../services/ventaService';
import ProductosContext from '../../../../context/productosContext';



const PedidoFormEditar = () => {

    const{pedidoEditar,obtenerPedidos,setModalEditar}=useContext(PedidosContext);
    const   [formulario,setFormulario]= useState({...pedidoEditar});
    const { productos } = useContext(ProductosContext);
    const handleChange=e=>{
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
            
        });
    }
    console.log(formulario);
    const submit=(e)=>{
        e.preventDefault();
        Swal.fire({
            title:`¿Seguro de editar el editar ${pedidoEditar.pedidoFecha} por ${formulario.pedidoFecha}?`,
            icon:"question",
            text:"Los cambios se guardaran en la base de datos",
            showCancelButton:true
        }).then(rpta=>{
            if (rpta.isConfirmed){
                //consumir el servicio de editar

                putPedido({...formulario}).then(data=>{
                        if(data.success){
                            setModalEditar(false);
                            obtenerPedidos();


                            Swal.fire({
                                title:"Editado!",
                                icon:"success",
                                timer:700,
                                showCancelButton:false
                            })
                        }
                });
                
            }    
        
        })
    
    
    }
    return (
        <form onSubmit={submit}>
        <div className="form-group">
            <label htmlFor="pedidoFecha" >Fecha</label>
            <input className="form-control" type="date" id="pedidoFecha" placeholder="Ejm Colagerno" name="pedidoFecha" value={formulario.pedidoFecha} onChange={handleChange}  />
        </div>
        <div className="form-group">
            <label htmlFor="producto">producto</label>
            <select name="producto" id="producto" value={formulario.producto}
            className="form-control" onChange={handleChange} required>
                <option value="">--Selecione--</option>
                {
                    productos.map(objPedido=>{
                        return <option value={objPedido.productoId} key={objPedido.productoId}>
                            {objPedido.productoNombre}
                        </option>
                    })
                }
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="pedidoCantidad" >Cantidad</label>
            <input className="form-control" type="number" id="pedidoCantidad" name="pedidoCantidad" value={formulario.pedidoCantidad} onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <select name="usuario" id="usuario" value={formulario.usuario}
            className="form-control" onChange={handleChange} required>
                <option value="">--Selecione--</option>
                <option value="1">Alex</option>
                </select>
        </div>
        <div className="form-group">
            <label htmlFor="pedidoTipoPago">Tipo de pago</label>
            <select name="pedidoTipoPago" id="pedidoTipoPago" value={formulario.pedidoTipoPago}
            className="form-control" onChange={handleChange}>
                <option value="0">--Selecione--</option>
                <option value="1">Efectivo</option>
                <option value="2">Tarjeta</option>
               
            </select>
        </div>
        
      
    

        <div className="form-group">
            <button className="btn btn-primary" type="submit">Editar producto</button>
        </div>
    </form>
    )
}


export default PedidoFormEditar
