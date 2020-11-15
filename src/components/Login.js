import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Login(){

    const [user, setUser] = useState({username: '', password: ''});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    inputChanged = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = (username,password) => {
        
    }

    return(
        <div>
            <TextField name="username" placeholder="Username" value={username}
            onChange={inputChanged} /> <br/>

            <TextField name="password" placeholder="Password" value={password}
            onChange={inputChanged} /> <br/> <br/>

            <Button variant="raised" color="primary"
            onClick={login}>
                Login
            </Button>
        </div>
    );
}