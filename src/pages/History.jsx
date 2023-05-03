import { useEffect, useState } from "react"
import { Polybase } from "@polybase/client";
import './history.css'
const db = new Polybase({
  defaultNamespace: "pk/0x47a23b1ec444e273743d6eff0b5f8af7f86be84af854baa085f8b398f2f6054744da8b74d9394644e428e6f527ff53a2b3039bdf1b3ba8ae60dd4df6eb1f7277/Huddle-911",
});

const Db_appointments = db.collection('appointment')

const History = ()=>{
    const [historyData, setHistoryData] = useState();
    const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
    useEffect(()=>{
        const getData = async()=>{
            console.log(window.ethereum.selectedAddress);
            await Db_appointments.where('customer','==',window.ethereum.selectedAddress).get()
            .then((res)=>{
                setHistoryData(res.data);
                console.log(res.data);
            })
        }
        getData();
    },[])
    return(
        <div>
            {historyData?.map((Hdata,index)=>(
                <div key={index} className="history-container">
                    {/* Date */}
                    <label><b>Date/Time: </b></label>
                    {new Date(Hdata.data['id']).getDay()}<span> </span>
                    {months[new Date(Hdata.data['id']).getMonth()]}<span> </span>
                    {new Date(Hdata.data['id']).getFullYear()}<span>, </span>
                    {new Date(Hdata.data['id']).toLocaleTimeString()}<br/>
                    
                    <label><b>Doctor Address: </b></label>
                    {Hdata.data['doctor']}<br/>


                    {/* view documents */}
                    {Hdata.data['Uploaded_bill'] ? <a href={Hdata.data['Uploaded_bill']}>View Bill</a>: <div>DNE</div>}
                    {Hdata.data['Uploaded_prescription'] ? <a href={Hdata.data['Uploaded_prescription']}>View Prescription</a>: <div>DNE</div>}
                    {Hdata.data['Uploaded_report'] ? <a href={Hdata.data['Uploaded_report']}>View Report</a>: <div>DNE</div>}

                </div>
            ))}
        </div>
    )
}

export default History