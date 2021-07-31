import React , { useContext } from 'react'
import Swal from 'sweetalert2';
import PedidosContext from '../../../../context/pedidoContext';
import { deletePedido } from '../../../../services/ventaService';
import { MDBDataTableV5 } from 'mdbreact';

const Pedidos = () => {
    const { pedidos, cargandoPedidos, obtenerPedidos, setModalAgregar, setModalEditar, setPedidoEditar } = useContext(PedidosContext);


 

     /*  const link="https://eccomerce-final.herokuapp.com/" */
      
    const eliminar = ped_id => {
        Swal.fire({
            title: "¿Seguro de eliminar el producto",
            icon: "error",
            text: "Los cambios serán irreversibles ",
            showCancelButton: true
        }).then(rpta => {
            if (rpta.isConfirmed) {
                deletePedido(ped_id).then(data => {
                    if (data.success) {
                        obtenerPedidos();
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
            { label: "Id", field: "pedidoId" },
            { label: "Nombre", field: "productoNombre" },
            { label: "Precio", field: "productoPrecio" },
            { label: "Fecha", field: "pedidoFecha" },
            { label: "Pago", field: "pedidoTipoPago" },
            { label: "Cantidad", field: "pedidoCantidad" },
            { label: "Usuario", field: "usuario" },
            /* { label: "Imagen", field: "productoFoto" }, */
            { label: "acciones", field: "acciones" },

        ],
        rows: pedidos.map((objPedidos) => {
            return {
                ...objPedidos,
                pedidoId: +objPedidos.pedidoId,
                productoNombre: objPedidos.producto.productoNombre,
                productoPrecio:objPedidos.producto.productoPrecio,
                pedidoFecha:objPedidos.pedidoFecha,
                pedidoTipoPago:objPedidos.pedidoTipoPago,
                pedidoCantidad:objPedidos.pedidoCantidad,
                usuario:objPedidos.usuario.usuarioNombre,
             
               /*  productoFoto:<img src=  {link+objProductos.productoFoto} alt="" width="65"/>, */

                acciones: (
                    <>
                        <div className="d-flex">
                            <button className="btn btn-secondary mr-2" onClick={() => {
                                setPedidoEditar(objPedidos,objPedidos.usuario.usuarioNombre);
                                console.log(objPedidos.usuario.usuarioNombre);
                                setModalEditar(true);
                            }}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger" onClick={() => {
                                eliminar(objPedidos.pedidoId);
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
                    cargandoPedidos ?
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
                                    obtenerPedidos();
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

export default Pedidos
