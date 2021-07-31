import React, {  } from 'react'
import { Link, NavLink } from 'react-router-dom'


const AdminHeader = () => {

   

  return (
    <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark border">
            <Link className="navbar-brand" to="#">Mantenimiento</Link>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation"></button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                 
                    <li className="nav-item ">
                        <NavLink className="nav-link active"  to="/categoria">Categorias </NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link active"  to="/producto">Productos </NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link active"  to="/pedido">Pedido </NavLink>
                    </li>
                    
                </ul>
                <form className="form-inline my-2 my-lg-0">
               
                
                </form>
            </div>
        </nav>
    </header>
  )
}

export default AdminHeader
