import React from 'react'
import { Switch, Route } from "react-router-dom";
import CategoriaState from '../../context/categoriaState';
import PedidosState from '../../context/pedidoState';
import ProductosState from '../../context/productosState';
import AdminHeader from '../components/AdminHeader';
import CategoriaScreen from './categoria/CategoriaScreen';
import PedidoScreen from './pedido/PedidoScreen';
//import HomeScreen from './screens/home/HomeScreen';
import ProducoScreen from './producto/ProducoScreen';

const AdminRouter = () => {
  return (
    <>
      <AdminHeader />
      <ProductosState>
        <CategoriaState>
          <PedidosState>
         <Switch>
        
        <Route path="/categoria" component={CategoriaScreen} />
         <Route path="/producto" component={ProducoScreen} /> 
         <Route path="/pedido" component={PedidoScreen} /> 
      </Switch>
      </PedidosState>
      </CategoriaState>
      </ProductosState>
    </>
  )
}

export default AdminRouter
