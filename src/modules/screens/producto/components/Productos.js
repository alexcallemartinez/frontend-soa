import React, { useContext } from 'react'
import Swal from 'sweetalert2';
import CategoriasContext from '../../../../context/categoriasContext';
import ProductosContext from '../../../../context/productosContext';
import { deleteProducto } from '../../../../services/ProductoService';
import { MDBDataTableV5 } from 'mdbreact';


const Productos = () => {
    const { productos, cargandoProductos, obtenerProductos, setModalAgregar, setModalEditar, setProductoEditar } = useContext(ProductosContext);

    const { categorias } = useContext(CategoriasContext);

    const nombreCategoria = (id_cat) => {
        const cat = categorias.find((cat) => +cat.categoriaId === +id_cat);
        return cat ? ` ${cat.categoriaNombre}` : "S/N";
      };

     /*  const link="https://eccomerce-final.herokuapp.com/" */
      
    const eliminar = prod_id => {
        Swal.fire({
            title: "¿Seguro de eliminar el producto",
            icon: "error",
            text: "Los cambios serán irreversibles ",
            showCancelButton: true
        }).then(rpta => {
            if (rpta.isConfirmed) {
                deleteProducto(prod_id).then(data => {
                    if (data.success) {
                        obtenerProductos();
                        Swal.fire({
                            title: "Eliminado",
                            icon: "success",
                            timer: 700,
                            showCancelButton: false,

                        })
                    }
                })
            }
        })
    }

    // -----inicia la tabla

    const datatable = {
        columns: [
            { label: "Id", field: "productoId" },
            { label: "Nombre", field: "productoNombre" },
            { label: "Stock", field: "productoStock" },
            { label: "Precio", field: "productoPrecio" },
            { label: "Categoria", field: "categoria" },
            /* { label: "Imagen", field: "productoFoto" }, */
            { label: "acciones", field: "acciones" },

        ],
        rows: productos.map((objProductos) => {
            return {
                ...objProductos,
                productoId: +objProductos.productoId,
                productoNombre: objProductos.productoNombre,
                productoStock:objProductos.productoStock,
                productoPrecio:objProductos.productoPrecio,
                categoria:nombreCategoria(objProductos.categoria),
               /*  productoFoto:<img src=  {link+objProductos.productoFoto} alt="" width="65"/>, */

                acciones: (
                    <>
                        <div className="d-flex">
                            <button className="btn btn-secondary mr-2" onClick={() => {
                                setProductoEditar(objProductos);
                                setModalEditar(true);
                            }}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger" onClick={() => {
                                eliminar(objProductos.productoId);
                            }}>
                                <i className="fas fa-times"></i>
                            </button>

                        </div>
                    </>
                )
            }
        })
    };

    // termina la tabla

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
                        cargandoProductos ?
                            <div className="alert alert-info text-center" role="alert">
                                <h4 className="alert-heading">Cargando producto</h4>

                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                            :
                            (
                                <>

                                    <button className="btn btn-success" onClick={() => {
                                        obtenerProductos();
                                    }}><i className="fas fa-sync-alt"></i></button>
                                    <hr />
                                    {/* aquiva */}
                                    <MDBDataTableV5 data={datatable} searchTop
                                        searchBottom={false}
                                        responsive
                                        striped
                                        bordered
                                        pagingTop
                                        infoLabel={["Mostrando", "a", "de", "productos"]}
                                        fixed
                                        searchLabel="Buscar" />

                                </>


                            )
                    }

                </div>
            </div>

        </section>
    )
}

export default Productos
