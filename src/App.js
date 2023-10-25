import React, { useState } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import StudentHome from './components/StudentHome';
import AdminHome from './components/AdminHome';
import ShowSchedule from './components/ShowSchedule';
import Login from './components/Login';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [Role,setRole] = useState("")

  return (
    <div className="App">
      {!loggedIn ? (
       <Login setLoggedIn={setLoggedIn}
              setRole={setRole} />
      ) : (
        <>
          <h2>Registration Service</h2>
        
            <div>
              { Role === "ADMIN" ?
               <BrowserRouter>
                <Link to="/">Admin</Link>
                <Switch>
                <Route exact path="/" component={AdminHome} />
                <Route render={() => <h1>Page not found</h1>} />
                </Switch>
              </BrowserRouter>
              : 
             <BrowserRouter>
              <Link to="/">Student</Link> 
               <Switch>
               <Route exact path="/" component={StudentHome} />
               <Route path="/schedule" component={ShowSchedule} />
               <Route render={() => <h1>Page not found</h1>} />
               </Switch>
             </BrowserRouter>
              }
            
            </div>
        
        </>
      )}
    </div>
  );
}

export default App;