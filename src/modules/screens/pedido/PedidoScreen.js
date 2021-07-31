import React,{useContext} from 'react'
import ProductoForm from './components/PedidoForm'
import Pedidos from './components/Pedidos'; 
import { Modal } from "react-bootstrap";
import PedidosContext from '../../../context/pedidoContext';
import ProductoFormEditar from './components/PedidoFormEditar';



const PedidoScreen = () => {



const {modalAgregar,modalEditar,setModalAgregar,setModalEditar} = useContext(PedidosContext);

    return (
        <main className="container">
            <div className="row ">
               
                <Pedidos/>
                </div>

            {/* modal agregar */}

 <Modal show={modalAgregar} onHide={() => {
        setModalAgregar(false);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductoForm/>
        </Modal.Body>

      </Modal>


      {/* modal editar */}


            <Modal show={modalEditar} onHide={()=>{
                setModalEditar(false);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductoFormEditar/>
                </Modal.Body>
                
            </Modal>
            

        </main>
    )
}

export default PedidoScreen