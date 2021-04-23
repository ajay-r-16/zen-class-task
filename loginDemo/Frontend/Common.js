
import React,{ useState, useRef } from 'react';
import axios from 'axios';
import "./Common.css";

export default function Common(){
    const [showLogin, setLogin ] = useState(true);
    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [Cpassword, setCPassword ] = useState("");
    const alert = useRef();
    const loading = useRef();

    function changeShow(bool){
        setLogin(bool);
    }
    function handleNameChange(event){
        setName(event.target.value);
    }

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }
    function handleCPasswordChange(event){
        setCPassword(event.target.value);
    }

    async function register(){
        loading.current.classList.remove("load");
        alert.current.classList.remove("show");
        let details= { name: name , email : email, password: password };
        let data = await axios.post( "https://logindemo16.herokuapp.com/register" , details );
        loading.current.classList.add("load");
        alert.current.innerHTML = "<b>"+data.data.message+"</b>";
        if(data.data.message !== "User registered"){
            alert.current.classList.add("alert-danger");
        }
        else{
            alert.current.classList.remove("alert-danger");
        }
        alert.current.classList.add("show");
        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
    }

    async function login(){
        loading.current.classList.remove("load");
        alert.current.classList.remove("show");
        let credential = { email:email, password:password};
        let data = await axios.post( "https://logindemo16.herokuapp.com/login",credential);
        loading.current.classList.add("load");
        alert.current.innerHTML = "<b>"+data.data.message+"</b>";
        if(data.data.message !== "Login Successful"){
            alert.current.classList.add("alert-danger");
        }
        else{
            alert.current.classList.remove("alert-danger");
        }
        alert.current.classList.add("show");
        
        setEmail("");
        setPassword("");
        
    }
    
    return(
        <>
            <nav class="navbar navbar-expand-lg text-white bg-light">
                <div class="container-fluid">
                    <h2 class="navbar-brand text-dark pl-3">Login Demo</h2>
                </div>
            </nav>
            
            <div class="container">
                <div class="container-fluid1 bg-light">
                    <button class="btn btn-block col-6 p-3" style={{ backgroundColor: showLogin ? "#ffcc00" : "white" }} onClick={()=>{changeShow(true)}}><b>Login</b></button>
                    <button class="btn btn-block col-6 p-3" style={{ backgroundColor: !showLogin ? "#ffcc00" : "white" }} onClick={()=>{changeShow(false)}}><b>Register</b></button>
                </div>
                { !showLogin && <div class="card p-3">
                    <div class="card-body">
                        <div ref={loading} class="spinner-border load" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>

                        <div ref={alert} class="alert alert-success alert-dismissible fade " role="alert">
                            
                        </div>
                        <form>
                            <div class="mb-3">
                                <label for="fullname" class="form-label">Full Name</label>
                                <input type="text" onChange={ handleNameChange } class="form-control" id="fullname" value={name} />
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="text" onChange={ handleEmailChange } class="form-control" id="email" value={email} />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" onChange={ handlePasswordChange } class="form-control" id="password" value={password} />
                            </div>
                            <div class="mb-3">
                                <label for="confirmPassword" class="form-label">Confirm Password</label>
                                <input type="password" onChange={ handleCPasswordChange } class="form-control" id="confirmPassword" value={Cpassword} />
                            </div>
                            <button type="button" class="btn btn-warning text-black" onClick={register}>Register</button>
                        </form>
                    </div>
                </div> }
            

            
            
                { showLogin && <div class="card p-3" style={{width: "25rem"}}>
                    <div class="card-body">
                        <div ref={loading} class="spinner-border load" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>

                        <div ref={alert} class="alert alert-success alert-dismissible fade " role="alert">
                        </div>
                        
                        <form>
                            
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="text" onChange={handleEmailChange} class="form-control" id="email" value={email} />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" onChange={handlePasswordChange} class="form-control" id="password" value={password} />
                            </div>
                            
                            <button type="button" onClick={login} class="btn btn-warning text-black">Login</button>
                        </form>
                    </div>
                </div> }
            </div>
                    
        </>
    )
    
}