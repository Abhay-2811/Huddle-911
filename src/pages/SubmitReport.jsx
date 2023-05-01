const { useState } = require("react");
import lighthouse from '@lighthouse-web3/sdk'

const SubmitReport = ()=>{

    const [bill, setBill] = useState();
    const [report, setReport] = useState();
    const [pres, setPres] = useState();

    const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
      };
    const uploadReport = async(e) =>{
        const output = await lighthouse.upload(e, process.env.REACT_APP_LHAPI, progressCallback);
        console.log('File Status:', output);
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
        const link = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
        setReport(link);
      }
      const uploadBill = async(e) =>{
        const output = await lighthouse.upload(e, process.env.REACT_APP_LHAPI, progressCallback);
        console.log('File Status:', output);
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
        const link = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
        setBill(link);
      }
      const uploadPrescription = async(e) =>{
        const output = await lighthouse.upload(e, process.env.REACT_APP_LHAPI, progressCallback);
        console.log('File Status:', output);
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
        const link = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash;
        setPres(link);
      }
    return(
        <div>
            <form action="">
                <label>Upload Bill:</label>
                <input type="file" label="bill "onChange={(e)=>{
                    e.preventDefault();
                    uploadBill(e);
                    }}/>
                <label>Upload Report:</label>
                <input type="file" onChange={(e)=>{
                    e.preventDefault();
                    uploadReport(e);
                    }}/>
                <label>Upload Prescription:</label>
                <input type="file" onChange={(e)=>{
                    e.preventDefault();
                    uploadPrescription(e);
                    }}/>
            </form>
        </div>
    )
}

export default SubmitReport