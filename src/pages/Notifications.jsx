// import * as PushAPI from '@pushprotocol/restapi'
import { useState, useEffect } from 'react'
// import { NotificationItem, chainNameType } from "@pushprotocol/uiweb";
import './notification.css'
import { ethers } from 'ethers';
const Notifications = () => {
    
    // const [notif, setNotif] = useState();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);


    // useEffect(()=>{
    //     const getNotifications = async ()=>{
    //         const signer =  provider.getSigner();
    //         await signer.getAddress().then(async (res)=>{
    //             const address = res;
    //             console.log(res);
    //             const CAIP = `eip155:80001:${address}`
    //             const spams = await PushAPI.user.getFeeds({
    //                 user: CAIP, // user address in CAIP
    //                 env: 'staging'
    //               }).then((response)=>{
    //                 setNotif(response);
    //                 console.log(notif);
    //             });
    //         })
    //         // console.log(address);
    //         }
    //     getNotifications();
    // },[])
  return(
    <div className='notif-container'>
        <h1>Notifications</h1><span>By - Push Protocol</span>
        <h2>
        They are supposed to be here : <br/>
        - Doctors and clients getting meet link before meet <br/><span>(Can still be seen as they are sent through smart contract, just add <a href='https://chrome.google.com/webstore/detail/push-staging-protocol-alp/bjiennpmhdcandkpigcploafccldlakj'>Push Staging extension</a>)</span><br/>
        Example meet link : <a>https://huddle-911.vercel.app/meet?id=klt-lbyq-opz&date=2023-05-03T10:30:00.000Z</a><br/>
        - Doctors getting link to update documents <br/><span>(This won't show up in push notifications as they were sne through backend)</span>
        Example update doc link : <a>https://huddle-911.vercel.app/submitReport?id=2023-05-03T10:30:00.000Z</a>
        </h2>
    </div>
  )
}

export default Notifications
