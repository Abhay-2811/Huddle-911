import { useState, useEffect } from 'react'
import lighthouse from '@lighthouse-web3/sdk'
import { useSearchParams } from 'react-router-dom'
import { Polybase } from "@polybase/client";
import './submitReport.css'
const db = new Polybase({
  defaultNamespace: "pk/0x47a23b1ec444e273743d6eff0b5f8af7f86be84af854baa085f8b398f2f6054744da8b74d9394644e428e6f527ff53a2b3039bdf1b3ba8ae60dd4df6eb1f7277/Huddle-911",
});

const Db_appointments = db.collection('appointment')

const SubmitReport = () => {
  const [bill, setBill] = useState()
  const [report, setReport] = useState()
  const [pres, setPres] = useState()
  const [id, setId] = useState()
  const [searchParams] = useSearchParams()

  const progressCallback = progressData => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
    console.log(percentageDone)
  }
  const uploadReport = async e => {
    const output = await lighthouse.upload(
      e,
      process.env.REACT_APP_LHAPI,
      progressCallback
    )
    console.log('File Status:', output)
    console.log(
      'Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    )
    const link = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    setReport(link)
  }
  const uploadBill = async e => {
    const output = await lighthouse.upload(
      e,
      process.env.REACT_APP_LHAPI,
      progressCallback
    )
    console.log('File Status:', output)
    console.log(
      'Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    )
    const link = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    setBill(link)
  }
  const uploadPrescription = async e => {
    const output = await lighthouse.upload(
      e,
      process.env.REACT_APP_LHAPI,
      progressCallback
    )
    console.log('File Status:', output)
    console.log(
      'Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    )
    const link = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    setPres(link)
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    await Db_appointments.record(id).call("updateFiles",[pres,bill,report])
  }
  useEffect(()=>{
    setId(searchParams.get('id'));
    console.log(id);
  },[])
  return (
    <div className='sr-container'>
      <h1>Update Documents for meeting at <br/>{new Date(id).toUTCString()}</h1>
      <form onSubmit={handleSubmit}>
        <label>Upload Bill:</label><br/>
        <input
          type='file'
          label='bill'
          onChange={e => {
            e.preventDefault()
            uploadBill(e)
          }}
        /><br/>
        <label>Upload Report:</label><br/>
        <input
          type='file'
          label='report'
          onChange={e => {
            e.preventDefault()
            uploadReport(e)
          }}
        /><br/>
        <label>Upload Prescription:</label><br/>
        <input
          type='file'
          label='pres'
          onChange={e => {
            e.preventDefault()
            uploadPrescription(e)
          }}
        /><br/>
        <button type="submit">Submit Files</button>
      </form>
    </div>
  )
}

export default SubmitReport
