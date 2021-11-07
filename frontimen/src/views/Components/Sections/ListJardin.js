import React,{useEffect, useState} from "react";
import Jardin from './Jardin';
import "./ListJardin.css";
const ListJardin = () => {
    const [list, setList] = useState();
    const [error, seterror] = useState(null);
    const [success, setsuccess] = useState(null);
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/jardin/`);
    
            const responseData = await response.json();
            if (!response.ok) {
              throw new Error(responseData.message);
            }
    
            setList(responseData.existingJardin);
          } catch (err) {
            seterror(err.message);
          }
        };
    
        sendRequest();
      }, []);
      console.log(list);

    return (
        <div classeName="listJardin" 
        style= {{width: "80%",
            marginTop: "20%" ,
            display:"flex" ,
            flexWrap: "wrap",
            margin:"10%",
            justifyContent: "space-between" ,
            padding: "10%"}}>
      {list &&
        list.map((jardin)=> 
    <Jardin jardin ={jardin} key={jardin.id}/>
      )}
    </div>
  );
}
       
    

export default ListJardin
