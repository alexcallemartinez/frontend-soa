import React,{useContext} from 'react'
import Swal from "sweetalert2";
import CategoriasContext from '../../../../context/categoriasContext';
import { deleteCategoria } from '../../../../services/categoriaService' ;
import { MDBDataTableV5 } from 'mdbreact';


const Categoria = () => {
  const {categorias,cargandoCategorias,obtenerCategorias,setModalAgregar,setModalEditar,setCategoriaEditar}=useContext(CategoriasContext);


 

  const eliminar = cat_id => {
        Swal.fire({
          title:"¿Seguro de eliminar la categoria?",
          icon: "error",
          text: "Los cambios serán irreversibles joven!",
          showCancelButton: true
        }).then(rpta => {
          if (rpta.isConfirmed) {
            deleteCategoria(cat_id).then(data => {
              if (data.success) {
                obtenerCategorias();
                Swal.fire({
                  title: "Eliminado!",
                  icon: "success",
                  timer: 700,
                  showCancelButton: false
                  
                })
              }
            })
          }
        })
      }


  const datatable ={
    columns: [
        { label: "Id", field: "categoriaId" },
        { label: "Nombre", field: "categoriaNombre" },
        { label: "acciones", field: "acciones" },
        
    ],
    rows: categorias.map((objCategoria)=>{
     
      return{
        ...objCategoria,
        categoriaId:+objCategoria.categoriaId,
        categoriaNombre:objCategoria.categoriaNombre,
        acciones:(
        <>
        <div className="d-flex">
        <button className="btn btn-secondary mr-2" onClick={() => {
      setCategoriaEditar(objCategoria);
      setModalEditar(true);
    }}>
      <i className="fas fa-edit"></i>
    </button>
    <button className="btn btn-danger" onClick={() => {
      eliminar(objCategoria.categoriaId);
    }}>
      <i className="fas fa-times"></i>
    </button>
 
        </div>
        </>
        )
       }
    })
};

    
    return (
        <section className="col">
        <div className="card shadow">
            <div className="card-body">
              
            <button className="btn btn-primary success" onClick={() => {
                    setModalAgregar(true);
                  }}>
                      
                  <i className="fas fa-plus-circle"></i>
                  </button>
                  
             {
                 
                 cargandoCategorias ?
                 <div>...cargando</div> :
                 (
                 <>
                 <button className="btn btn-success" onClick={()=>{
                    obtenerCategorias();
                }}><i className="fas fa-sync-alt"></i></button>
                <hr/>

                  <MDBDataTableV5 data={datatable} searchTop
                  searchBottom={false}
                  responsive
                  striped
                  bordered
                  pagingTop
                 infoLabel={["Mostrando","a","de","categorias"]}
                 fixed
                 searchLabel="Buscar"/>

            

                 </>


                 )
             }
                
            </div>
        </div>

     </section>
    )
}

export default Categoria
