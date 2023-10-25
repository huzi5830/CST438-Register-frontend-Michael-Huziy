import React, {useState} from 'react';
import '../App.css'

function Login(props) {
    const[user, setUser] = useState({username:'', password:''});
    const[isAuthenticated, setAuth] = useState(false);

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = () => {
        console.log("INLOGIN")
        
        //props.setLoggedIn(true)
        fetch('http://localhost:8080/login', {
            method:'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => { 
            const jwtToken = res.headers.get('Authorization');
            const contentType = res.headers.get('content-type');
            const role = res.headers.get("Role");
            res.headers.forEach((value, name) => {
                //console.log(`${name}: ${value}`);
            });

            if (jwtToken !== null) {
                //console.log('JWT Token: ', jwtToken);
                console.log('Users Role: ', role);
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
                props.setLoggedIn(true)
                props.setRole(role);
            }
        })
        .catch(err => console.log(err));
    }
        return (
            <div className="App">
            <table id ="loginTable">
            <tbody>
            <tr><td>
            <label htmlFor="username">UserName</label>
            </td><td>
            <input type="text" name="username" value={user.username} onChange={onChange} />
            </td></tr>
            <tr><td>
            <label htmlFor="password">Password</label>
            </td><td>
            <input type="text" name="password" value={user.password} onChange={onChange} />
            </td></tr>
            </tbody>
            </table>
            
          
            <button id="submit" onClick={login}>Login</button>
                </div>
        );
    }

export default Login;