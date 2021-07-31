import React,{useContext, useState} from 'react'
import Swal from "sweetalert2";
import CategoriasContext from '../../../../context/categoriasContext';
import ProductosContext from '../../../../context/productosContext';
import { putProducto } from '../../../../services/ProductoService';



const ProductoFormEditar = () => {

    const {productoEditar,setModalEditar,obtenerProductos}=useContext(ProductosContext)
    const {categorias}=useContext(CategoriasContext);
    const   [formulario,setFormulario]= useState({...productoEditar});
    



    const handleChange=e=>{
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    }

    const submit=(e)=>{
        e.preventDefault();
        Swal.fire({
            title:`¿Seguro de editar el producto ${productoEditar.productoNombre} por ${formulario.productoNombre}?`,
            icon:"question",
            text:"Los cambios se guardaran en ña base de datos",
            showCancelButton:true
        }).then(rpta=>{
            if (rpta.isConfirmed){
                //consumir el servicio de editar

                putProducto({...formulario}).then(data=>{
                        if(data.success){
                            setModalEditar(false);
                            obtenerProductos();


                            Swal.fire({
                                title:"Editado!",
                                icon:"success",
                                timer:700,
                                showCancelButton:false
                            })
                        }
                        else {
                            Swal.fire({
                              title: "Error!",
                              text: "No se pudo registrar Producto",
                              icon: "error",
                              showCancelButton: false,
                              timer: 800,
                            });
                        }
                });
                
            }    
        
        })
    
    
    }

    return (
        <form onSubmit={submit}>
              <div className="form-group">
                            <label htmlFor="productoId" >ID</label>
                            <input className="form-control" type="text" id="productoId" name="productoId" value={formulario.productoId} onChange={handleChange} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productoNombre" >Nombre</label>
                            <input className="form-control" type="text" id="productoNombre" placeholder="Ejm colageno" name="productoNombre" value={formulario.productoNombre} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productoStock" >stock</label>
                            <input className="form-control" type="number" id="productoStock" name="productoStock" value={formulario.productoStock} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label  htmlFor="productoPrecio">Precio</label>
                            <input className="form-control" type="number" id="productoPrecio" value={formulario.productoPrecio} onChange={handleChange} name="productoPrecio"    />
                        </div>
                        
     
                        <div className="form-group">
                            <label htmlFor="categoria">Categoria</label>
                            <select  className="form-control" type="number" id="categoria" name="categoria" value={formulario.categoria} onChange={handleChange} readOnly >
                                <option value="0">--Seleccione--</option>
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
                            <button className="btn btn-primary" type="submit">Editar producto</button>
                           
                        </div>
                        
                    </form>
    )
}

export default ProductoFormEditar
