import React,{useContext, useState} from 'react'
import Swal from "sweetalert2";
import CategoriasContext from '../../../../context/categoriasContext';
import ProductosContext from '../../../../context/productosContext';
import { postProducto } from '../../../../services/ProductoService';

const formularioVacio = {
    productoNombre:"",
    productoStock:"",
    productoPrecio:"",
    categoria:"",
      
    }



const ProductoForm = () => {

const   [formulario,setFormulario]= useState({...formularioVacio});

const {obtenerProductos,setModalAgregar}=useContext(ProductosContext);
const {categorias} =useContext(CategoriasContext)

const handleChange=e=>{
    setFormulario({
        ...formulario,
        [e.target.name]: e.target.value
    });
}
const submit=(e)=>{
    e.preventDefault();
    Swal.fire({
        title:"¿Seguro de crear el producto",
        icon:"question",
        text:"Los cambios se guardaran en la base de datos",
        showCancelButton:true
    }).then(rpta=>{
        if (rpta.isConfirmed){
            //consumir el servicio
            postProducto({...formulario}).then(data =>{
                if(data.success){
                    setFormulario(formularioVacio);
                    obtenerProductos();
                       
                        Swal.fire({
                            title:"Hecho!",
                            text:"EL producto a sido creado con exito",
                            icon:"success",
                            showCancelButton:false,
                            timer:700,
                           
                        })
                        setModalAgregar(false);
                       } else {
                            Swal.fire({
                              title: "Error!",
                              text: "No se pudo registrar Producto",
                              icon: "error",
                              showCancelButton: false,
                              timer: 800,
                            });
                }
            })
        }    
    
    })


}

    return (
       
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="productoNombre" >Nombre</label>
                            <input className="form-control" type="text" id="productoNombre" placeholder="Ejm Colagerno" name="productoNombre" value={formulario.productoNombre} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productoStock" >stock</label>
                            <input className="form-control" type="number" id="productoStock" name="productoStock" value={formulario.productoStock} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label  htmlFor="productoPrecio">Precio</label>
                            <input className="form-control" type="number" id="productoPrecio" name="productoPrecio" value={formulario.productoPrecio} onChange={handleChange}  required />
                        </div>
                        
                      
                        <div className="form-group">
                            <label htmlFor="categoria">Categoria</label>
                            <select required name="categoria" id="categoria" value={formulario.categoria}
                            className="form-control" onChange={handleChange}>
                                <option  value="">--Selecione--</option>
                                {
                                    categorias.map(objCategoria=>{
                                        return <option value={objCategoria.categoriaId} key={objCategoria.categoriaId}>
                                            {objCategoria.categoriaNombre}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
              
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Crear producto</button>
                        </div>
                    </form>
               
    )
}

export default ProductoForm
