import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

import {HashRouter,Route,Switch} from "react-router-dom";
import AdminRouter from './modules/screens/AdminRouter';
const App = () => {
  return (
    
      <HashRouter>
        
          <Switch>
            {/* <Route path="/auth" component={AuthRouter} /> */}
           
            {/* <Redirect to="/auth/login"/>  */}
  
            <Route path="/" component={AdminRouter} />
          </Switch>
        
      </HashRouter>
    );
  
};

export default App
