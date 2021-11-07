import React from 'react';
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";
//import { Authadmin } from "../../context/Authadmin";
import { useContext } from "react";
import Navb from './Navb';


export const Profileadmin = () => {

  return (
    <div style={{  backgroundColor: "#FDEDEC"}}>
      <header style={{  backgroundColor: "#AED6F1",padding:"50px", fontsize: "25px"}}>
      <Navb/>
     
           
              </header>
      
      
            <h1>Admin Profile</h1>
         
          <div style={{ fontFamily: "fantasy", margin: "3%", marginTop:"5%"  }}>
           
            
          </div>
          <center>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "2%",
                height: "60%",
              }}
            >
              <Link to="/Listparent">
                <Button
                  style={{ margin: "2%", width: "30%", fontSize: "1.2rem" }}
                >
                Liste des parents
                </Button>
              </Link>
              <Link to="/List">
                <Button
                  style={{ margin: "2%", width: "30%", fontSize: "1.2rem",cursor: "pointer" ,
                  fontsize: "14px",
                  letterspacing:"2px",
                  texttransform: "uppercase",
                  padding: "10px 30px",
                  borderradius: "5px",
                textcolor:"#17202A"
                }}
                >
                  Liste des jardins
                </Button>
              </Link>
              <Link to="/Confirmeinscription">
                <Button
                  style={{ margin: "2%", width: "30%", fontSize: "1.2rem" }}
                >
                  Confirme Inscription
                </Button>
              </Link>
              <Link to="/Reclamation">
                <Button
                  style={{ margin: "2%", width: "30%", fontSize: "1.2rem" }}
                >
                    Liste des réclammations
                </Button>
              </Link>
            </div>
          </center>
    </div>
  )
}
export default Profileadmin;