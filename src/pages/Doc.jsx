import { useEffect, useState } from "react";
import lighthouse from '@lighthouse-web3/sdk'
import { Polybase } from "@polybase/client";
import { ethers } from "ethers";
import {Axios} from 'axios'

const provider = new ethers.providers.Web3Provider(window.ethereum)

const db = new Polybase({
    defaultNamespace: "pk/0x47a23b1ec444e273743d6eff0b5f8af7f86be84af854baa085f8b398f2f6054744da8b74d9394644e428e6f527ff53a2b3039bdf1b3ba8ae60dd4df6eb1f7277/Huddle-911",
  });

const Db_Doctors = db.collection("Doctor"); 
const Doc = ()=>{

    const [name,setName] = useState('');
    const [spec, setSpec] = useState('');
    const [cph, setCph] = useState(0);
    const [email,setEmail] = useState('');
    const [certi, setCerti] = useState(); //certificate hash
    const [add, setAdd] = useState();
    
    const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
      };
      const handleSubmit = async (event)=>{
        event.preventDefault();
        if(window.ethereum)
        {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = await provider.getSigner()
          const msg = `Become a affiliated huddle-911 doc`
          const sig = await signer.signMessage(msg);
          const currAdd = await signer.getAddress().then((address)=>setAdd(address));
          console.log("adding doc to polybase");
          console.log(window.ethereum.selectedAddress);
          await Db_Doctors.create([window.ethereum.selectedAddress,name,spec,email,certi,Number(cph)]);
          event.preventDefault();
          console.log(certi);
      }
        
        
    }
    const uploadFile = async(e) =>{
        const output = await lighthouse.upload(e, process.env.REACT_APP_LHAPI, progressCallback);
        setCerti('https://gateway.lighthouse.storage/ipfs/'+output.data.Hash);
        console.log('File Status:', output);
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
      }

    useEffect(()=>{
        setAdd(window.ethereum.selectedAddress);
        console.log(add);
    },[])
    
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
            <input type="text" placeholder="speciality" onChange={(e)=>{setSpec(e.target.value)}}/>
            <input type="number" placeholder="CPH" onChange={(e)=>{setCph(e.target.value)}}/>
            <input type="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="file" onChange={(e)=>{
                e.preventDefault();
                uploadFile(e);
                }}/>
            <button type="submit">submit</button>
        </form>
    )
}

export default Doc