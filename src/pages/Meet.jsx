import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ethers } from 'ethers'
import { contractABI, contractAdd } from '../constants/contract'
import './meet.css'
import CountdownTimer from "../components/Timer";

import { useHuddle01, useEventListener } from '@huddle01/react'
import {
  useLobby,
  useAudio,
  useVideo,
  useRoom,
  useMeetingMachine,
  usePeers
} from '@huddle01/react/hooks'
import { Audio, Video } from '@huddle01/react/components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x47a23b1ec444e273743d6eff0b5f8af7f86be84af854baa085f8b398f2f6054744da8b74d9394644e428e6f527ff53a2b3039bdf1b3ba8ae60dd4df6eb1f7277/Huddle-911",
});

const Db_appointments = db.collection('appointment')

const Meet = () => {
  const [searchParams] = useSearchParams()
  const [roomID, setRoomId] = useState('')
  const [dateParam, setDateParam] = useState('');
  const [doctor, setDoctor] = useState('');
  const [customer, setCustomer] = useState('');
  //timer section

  const ten_sec = 20 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAftertenSec = NOW_IN_MS + ten_sec;

  // Huddle integration section

  const [lobbyJoined, setLobbyJoined] = useState(false)
  const [roomjoined, setRoomJoined] = useState(false)

  const { initialize, isInitialized } = useHuddle01()
  const { joinLobby } = useLobby()
  const {
    fetchAudioStream,
    stopAudioStream,
    error: camError,
    produceAudio,
    stopProducingAudio,
    stream: audioStream
  } = useAudio()
  const {
    fetchVideoStream,
    stopVideoStream,
    error: micError,
    produceVideo,
    stopProducingVideo,
    stream: videoStream
  } = useVideo()
  const { meId } = useHuddle01()
  const { joinRoom, leaveRoom } = useRoom()
  const { state } = useMeetingMachine()
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const { peerIds, peers } = usePeers()

  useEventListener('lobby:cam-on', () => {
    if (state.context.camStream && videoRef.current) {
      videoRef.current.srcObject = state.context.camStream
    }
  })
  useEventListener('lobby:mic-on', () => {
    if (state.context.micStream && audioRef.current) {
      audioRef.current.srcObject = state.context.audioStream
    }
  })
  useEventListener('lobby:joined', () => {
    fetchAudioStream()
    fetchVideoStream()
    setLobbyJoined(true)
  })

  const Doc_claim = async (doc_add,client_add)=>{
    const alchemyKey = process.env.REACT_APP_ALCHEMY_API_KEY
    const privateKey = process.env.REACT_APP_PRIVATE_KEY
    const provider = new ethers.providers.AlchemyProvider(
      'maticmum',
      alchemyKey
    )
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAdd,contractABI,signer)
    // @change value to props.value or something
    const tx = await contract.ClaimAmount(doc_add, client_add)
  }

  useEventListener('room:joined',async()=>{
    setRoomJoined(true);
    if (state.context.camStream && videoRef.current) {
        videoRef.current.srcObject = state.context.camStream
      }
    if (doctor === window.ethereum.selectedAddress){
        await Doc_claim(doctor,customer).then(console.log("Paid to doctor"))
    }
  })

  useEffect(() => {
    initialize('KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR')
    isInitialized ? console.log('Init') : console.log('Not initialised')
    setRoomId(searchParams.get('id'))
    setDateParam(searchParams.get('date'));
    const getAdd = async ()=>{
      console.log(dateParam);
      const data = await Db_appointments.where("id","==",dateParam).get().then((resp)=>{
        console.log(resp);
        console.log(resp.data[0].data.doctor, resp.data[0].data.customer);
        setDoctor(resp.data[0].data.doctor);
        setCustomer(resp.data[0].data.customer);
      }); 
    }
    getAdd();
  }, [])

  return (
    <div>
      {lobbyJoined ? (
        <>
          {roomjoined ? (
            <>
              <button
                disabled={!produceAudio.isCallable}
                onClick={produceAudio}
              >
                <FontAwesomeIcon icon={faMicrophone} />
                mic
              </button>
              <button
                disabled={!produceVideo.isCallable}
                onClick={() => produceVideo(videoStream)}
              >
                Produce Video
              </button>
              <button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
                Leave Room
              </button>
              <button
                disabled={!produceAudio.isCallable}
                onClick={() => produceAudio(audioStream)}
              >
                Produce Audio
              </button>

              <div className='video-container'>
                <video ref={videoRef} autoPlay className='vid1'></video>
                {Object.values(peers)
                  .filter(peer => peer.cam)
                  .map(peer => (
                    <Video
                    key={peer.peerId}
                    //   peerId={peer.peerId}
                    track={peer.cam}
                    debug
                    className='vid2'
                    />
                    ))}
              </div>
              <CountdownTimer targetDate={dateTimeAftertenSec}/>
            </>
          ) : (
            <>
            <video ref={videoRef} autoPlay></video>
            <button
              disabled={!joinRoom.isCallable}
              onClick={() => {
                joinRoom()
              }}
            >
              Join Room
            </button>
            </>
          )}
        </>
      ) : (
        <div className='button-container'>
          <h2>
            Join Lobby here <br />
            <br />
            <u>Note:</u> Make sure you join meet 10-15 min prior to actual time
            and not sooner.
          </h2>
          <button
            disabled={!joinLobby.isCallable}
            onClick={() => {
              joinLobby(roomID)
            }}
          >
            Join Lobby
          </button>
        </div>
      )}
    </div>
  )
}

export default Meet
