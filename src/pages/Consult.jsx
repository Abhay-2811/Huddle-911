import { useState } from "react";
import { doctors } from "../constants/test_docs"
import Popup from 'reactjs-popup';
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
const Consult = ()=>{
    
    const [date,setDate] = useState();

    const handleSubmit = ()=>{
        console.log(date);
        console.log(date.toISOString());
        // sign messege using metamask and then store in polybase in format : C_id (address) , Doctor (address), meeting link
    }

    
    return(
        <div>
            {doctors.map((doctor,index)=>(
                <div key={index}>
                    <h2>{doctor["Doctor name"]}</h2>
                    <p>Specialization: {doctor["Specialization"]}</p>
                    <p>Consultancy Price Per Hour (CPPH): ${doctor["PerHR"]}</p>
                    <Popup trigger=
                        {<button> Book Appointment </button>}
                        position="right center">
                        {/* <input type="date" onChange={(e)=>{setDate(e.target.value)}} /> */}
                        <Datetime closeOnSelect='true' value={date} onChange={(newValue)=>setDate(newValue)}/>
                        <button onClick={handleSubmit}>Submit</button>
                    </Popup>
                    <p>-------------------------------</p>
                </div>
            ))}
        </div>
    )
}

export default Consult