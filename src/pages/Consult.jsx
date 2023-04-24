import { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import { Polybase } from '@polybase/client'
import { ethers } from 'ethers'
import axios from 'axios'

const db = new Polybase({
  defaultNamespace:
    'pk/0x47a23b1ec444e273743d6eff0b5f8af7f86be84af854baa085f8b398f2f6054744da8b74d9394644e428e6f527ff53a2b3039bdf1b3ba8ae60dd4df6eb1f7277/Huddle-911'
})

const Db_Doctors = db.collection('Doctor')
const Db_appointments = db.collection('appointment')

const Consult = () => {
  const [date, setDate] = useState()
  const [doc_records, setDocRecord] = useState()

  const handleSubmit = async (doc_name, doc_add) => {
    console.log(date)
    console.log(date.toISOString())
    console.log(process.env.REACT_APP_HUDDLE);
    // sign messege using metamask and then store in polybase in format : C_id (address) , Doctor (address), meeting link
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()
      const msg = `Book appointment with ${doc_name} on ${date}`
      const sig = await signer.signMessage(msg)
      console.log(sig)
      await axios.post(
        'https://iriko.testing.huddle01.com/api/v1/create-room',
        {
          title: 'Huddle01-Test',
          hostWallets: [doc_add],
          startTime: date.toISOString(),
          roomLocked: true
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_HUDDLE
          }
        }
      ).then(async (res) => {
        console.log(res)
        // await Db_appointments.create([
        //   signer.getAddress(),
        //   doc_add,
        //   res.data.meetingLink,
        //   date.toISOString()
        // ])
    })
    }
  }

  const createMeet = async () => {}
  useEffect(() => {
    const getData = async () => {
      const res = await Db_Doctors.get()
      console.log(res.data)
      setDocRecord(res.data)
    }
    getData()
  }, [])

  return (
    <div>
      {doc_records?.map((doctor, index) => (
        <div key={index}>
          <h2>{doctor.data['name']}</h2>
          <p>Specialization: {doctor.data['speciality']}</p>
          <p>Consultancy Price Per Hour (CPPH): ${doctor.data['CPH']}</p>
          <a href={doctor.data['certification']} target='_blank'>
            view certificate
          </a>
          <br />
          <Popup
            trigger={<button> Book Appointment </button>}
            position='right center'
          >
            <Datetime
              closeOnSelect='true'
              value={date}
              onChange={newValue => setDate(newValue)}
            />
            <button
              onClick={() =>
                handleSubmit(doctor.data['name'], doctor.data['id'])
              }
            >
              Submit
            </button>
          </Popup>
          <p>-------------------------------</p>
        </div>
      ))}
    </div>
  )
}

export default Consult
