import React, {useContext, useState} from 'react'
import Swal from "sweetalert2";
import CategoriasContext from '../../../../context/categoriasContext';
import { postCategoria } from '../../../../services/categoriaService';




const formularioVacio={

  categoriaNombre:"",
}

const CategoriaForm = () => {


    const [formulario, setFormulario]=useState({...formularioVacio});
    const {obtenerCategorias,setModalAgregar}=useContext(CategoriasContext);
    

    const handleChange = e => {
        setFormulario({
          ...formulario,
          [e.target.name]: e.target.value
        });
        console.log(formulario);
      }

      const submit = (e) => {
        e.preventDefault();
        Swal.fire({
          title: "¿Seguro de crear el categoria?",
          icon: "question",
          text: "Los cambios se guardarán en la base de datos",
          showCancelButton: true
        }).then(rpta => {
          if (rpta.isConfirmed) {
            //consumir el servicio
            postCategoria({ ...formulario}).then(data => {
              //verificando que un producto se haya creado
              if (data.success) {
                setFormulario(formularioVacio);
                obtenerCategorias();
                
                Swal.fire({
                  title: "Hecho!",
                  text: "La categoria ha sido creado con éxito",
                  icon: "success",
                  timer: 700,
                  showCancelButton: false,
                  
                });
                setModalAgregar(false);
              }else {
                  Swal.fire({
                    title: "Error!",
                    text: "No se pudo registrar Paciente",
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
                <label htmlFor="categoriaNombre">Nombre:</label>
                <input type="text"
                  id="categoriaNombre"
                  name="categoriaNombre"
                  placeholder="Tecnologia"
                  className="form-control"
                  value={formulario.categoriaNombre}
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary"
                  type="submit">Crear Categoria</button>
              </div>
            </form>
  
    )
}

export default CategoriaForm
