import { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import { Polybase } from '@polybase/client'
import { ethers } from 'ethers'
import axios from 'axios'
import { contractAdd, contractABI } from '../constants/contract'
import { parseEther } from 'ethers/lib/utils.js'
import './consult.css'

const db = new Polybase({
  defaultNamespace:
    'pk/0x47a23b1ec444e273743d6eff0b5f8af7f86be84af854baa085f8b398f2f6054744da8b74d9394644e428e6f527ff53a2b3039bdf1b3ba8ae60dd4df6eb1f7277/Huddle-911'
})

const Db_Doctors = db.collection('Doctor')
const Db_appointments = db.collection('appointment')

const Consult = () => {
  const [date, setDate] = useState()
  const [doc_records, setDocRecord] = useState()
  const [currentAdd, setCurAdd] = useState()

  const payWithMetamask = async (receiver, strEther) => {
    const _provider = new ethers.providers.Web3Provider(window.ethereum)
    const _signer = await _provider.getSigner()

    console.log(
      `payWithMetamask(receiver=${receiver}, sender=${_signer.address}, strEther=${strEther})`
    )

    const tx = {
      from: currentAdd,
      to: receiver,
      value: parseEther('0.1'),
      nonce: await _provider.getTransactionCount(currentAdd, 'latest')
    }

    const transaction = await _signer.sendTransaction(tx).then(transaction => {
      _provider.once(transaction.hash, async transaction => {
        console.log('paid')
      })
    })
  }
  const handleSubmit = async (doc_name, doc_add, price) => {
    console.log(date)
    console.log(date.toISOString())
    console.log(process.env.REACT_APP_HUDDLE)
    await payWithMetamask(
      '0x63DAc31bF8c2C972903f2bc303a502587268954d',
      String(price)
    )
    await axios
      .post(
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
      )
      .then(async res => {
        const room = res.data.data.roomId
        const meetLinkMsg =
          '"http://localhost:3000/meet?id=' + room + '&date=' + date.toISOString()+"\". At "+date.toString()
        await Db_appointments.create([currentAdd, doc_add, meetLinkMsg, date.toISOString()])
        await ScheduleMeet(doc_add, currentAdd, meetLinkMsg)
      })
  }

  // contract interactions
  const alchemyKey = process.env.REACT_APP_ALCHEMY_API_KEY
  const privateKey = process.env.REACT_APP_PRIVATE_KEY
  const provider = new ethers.providers.AlchemyProvider('maticmum', alchemyKey)
  const signer = new ethers.Wallet(privateKey, provider)
  const ScheduleMeet = async (doc_add, client_add, meetLink) => {
    const contract = new ethers.Contract(contractAdd, contractABI, signer)
    const address = signer.address

    // @change value to props.value or something
    const tx = await contract.ScheduleMeetClient(
      doc_add,
      client_add,
      meetLink,
      { value: parseEther('0.1') }
    )
    const tx2 = await contract.NotifyDoc(doc_add, meetLink)
  }

  useEffect(() => {
    const getData = async () => {
      const res = await Db_Doctors.get()
      console.log(res.data, window.ethereum.selectedAddress)
      setCurAdd(window.ethereum.selectedAddress)
      setDocRecord(res.data)
    }
    getData()
  }, [])

  return (
    <div>
      {doc_records?.map((doctor, index) => (
        <div key={index} className='doc-container'>
          <h1>{doctor.data['name']}</h1>
          <br></br>
          <p>
            <b>Specialization:</b> {doctor.data['speciality']}
          </p>
          <p>
            Hourly Cost: <br /> <b> {doctor.data['CPH']} MATIC</b>
          </p>
          <a href={doctor.data['certification']} target='_blank'>
            view certificate
          </a>
          <br />
          <Popup
            trigger={<button> Book Appointment </button>}
            position='bottom center'
          >
            <Datetime
              closeOnSelect='true'
              value={date}
              onChange={newValue => setDate(newValue)}
            />
            <button
              onClick={() =>
                handleSubmit(
                  doctor.data['name'],
                  doctor.data['id'],
                  doctor.data['CPH']
                )
              }
            >
              Submit
            </button>
          </Popup>
        </div>
      ))}
    </div>
  )
}

export default Consult
