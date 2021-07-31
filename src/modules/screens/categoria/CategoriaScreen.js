import React, {useContext} from 'react'
import CategoriasContext from '../../../context/categoriasContext';
import Categoria from './components/Categoria';
import CategoriaForm from './components/CategoriaForm';
import { Modal } from "react-bootstrap";
import CategoriaFormEditar from './components/CategoriaFormEditar';




const CategoriaScreen = () => {

const {modalAgregar,modalEditar,setModalAgregar,setModalEditar}=useContext(CategoriasContext)


    return (
        <main className="container">
            
        <div className="row">
            <Categoria/>
            

        </div>

{/* Modal Agregar */}
    <Modal show={modalAgregar} onHide={() => {
        setModalAgregar(false);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoriaForm/>
        </Modal.Body>

      </Modal>


{/* Modal Editar */}

<Modal show={modalEditar} onHide={() => {
        setModalEditar(false);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoriaFormEditar/>
        </Modal.Body>

      </Modal>

        </main>
    )
}

export default CategoriaScreen
