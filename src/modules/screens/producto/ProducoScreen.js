import React,{useContext} from 'react'
import ProductoForm from './components/ProductoForm'
import Productos from './components/Productos'
import { Modal } from "react-bootstrap";
import ProductosContext from '../../../context/productosContext';
import ProductoFormEditar from './components/ProductoFormEditar';



const ProducoScreen = () => {



const {modalAgregar,modalEditar,setModalAgregar,setModalEditar} = useContext(ProductosContext);

    return (
        <main className="container">
            <div className="row ">
               
                <Productos/>
                </div>

            {/* modal agregar */}

 <Modal show={modalAgregar} onHide={() => {
        setModalAgregar(false);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
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
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductoFormEditar/>
                </Modal.Body>
                
            </Modal>
            

        </main>
    )
}

export default ProducoScreen
