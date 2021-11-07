import React from 'react'
import { Authcontext } from "../../context/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";



const Navb = () => {
  const isAuth = useContext(Authcontext);

    return (
        <div>
           <div style={{ marginLeft: "60%",flexDirection: "ligne", }}>
           <Link to="/" style={{ paddingRight: "10%", fontWeight:"bolder",color:"#273746"}}  >
                  
                    Acceuil
                  
                </Link>
    
                <Link to="/Profileadmin" style={{ paddingRight: "10%", fontWeight:"bolder",color:"#273746"}}>
                   
                    Mon Profile
                  
                </Link>
                <Link to="/" >
                  <a href="#"  onClick={() => {
                  isAuth.logout();
                }} style={{ paddingRight: "10%", fontWeight:"bolder",color:"#273746"}}>
                    Déconnexion
                  </a>
                </Link>
                </div>
             
        </div>
    )
}

export default Navb
