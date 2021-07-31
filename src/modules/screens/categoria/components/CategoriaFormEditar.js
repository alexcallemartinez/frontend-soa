import React, { useContext, useState } from 'react'
import Swal from "sweetalert2";
import CategoriasContext from '../../../../context/categoriasContext';
import { putCategoria } from '../../../../services/categoriaService';


const CategoriaFormEditar = () => {

    const {categoriaEditar,setModalEditar,obtenerCategorias}=useContext(CategoriasContext);
    const [formulario,setFormulario]=useState(categoriaEditar);

    const handleChange = e => {
        setFormulario({
          ...formulario,
          [e.target.name]: e.target.value
        });
      }

      const submit = (e) => {
        e.preventDefault();
    
        Swal.fire({
          title: `¿Seguro de editar la categoria ${categoriaEditar.categoriaNombre} por ${formulario.categoriaNombre}?`,
          icon: "question",
          text: "Los cambios se guardarán en la base de datos",
          showCancelButton: true
        }).then(rpta => {
          if (rpta.isConfirmed) {
            putCategoria(formulario).then(data => {
              if (data.success) {
                
                obtenerCategorias();
                Swal.fire({
                  title: "Editado!",
                  icon: "success",
                  text: "La categoria se actualizo correctamente",
                  timer: 700,
                  showCancelButton: false
                  
                });
                setModalEditar(false);
               
              }
              else {
                Swal.fire({
                  title: "Error!",
                  text: "No se pudo actualizar categoria",
                  icon: "error",
                  showCancelButton: false,
                  timer: 800,
                });
                
              }
            });
          }
        });
    
      }

    return (
        <form onSubmit={submit}>

        <div className="form-group">
          <label htmlFor="categoriaId">Id:</label>
          <input type="text"
            id="categoriaId"
            name="categoriaId"
            className="form-control"
            value={formulario.categoriaId}
            onChange={handleChange} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="categoriaNombre">Nombre:</label>
          <input type="text"
            id="categoriaNombre"
            name="categoriaNombre"
            placeholder="Ejm: Panaderia"
            className="form-control"
            value={formulario.categoriaNombre}
            onChange={handleChange} />
        </div>
        <div className="form-group">
        <button className="btn btn-primary"
          type="submit">Editar Producto</button>
      </div>

        </form>
    )
}

export default CategoriaFormEditar
