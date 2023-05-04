import * as PushAPI from '@pushprotocol/restapi'
import { useState, useEffect } from 'react'
import { NotificationItem, chainNameType } from "@pushprotocol/uiweb";
import './notification.css'
import { ethers } from 'ethers';
const Notifications = () => {
    
    const [notif, setNotif] = useState();
    const provider = new ethers.providers.Web3Provider(window.ethereum);


    useEffect(()=>{
        const getNotifications = async ()=>{
            const signer =  provider.getSigner();
            await signer.getAddress().then(async (res)=>{
                const address = res;
                console.log(res);
                const CAIP = `eip155:80001:${address}`
                const spams = await PushAPI.user.getFeeds({
                    user: CAIP, // user address in CAIP
                    env: 'staging'
                  }).then((response)=>{
                    setNotif(response);
                    console.log(notif);
                });
            })
            // console.log(address);
            }
        getNotifications();
    },[])
  return(
    <div className='notif-container'>
        <h1>Notifications</h1><span>By - Push Protocol</span>
        {notif?.map((oneNotification, i) => {
    const { 
        cta,
        title,
        message,
        app,
        icon,
        image,
        url,
        blockchain,
        notification
    } = oneNotification;

    return (
        <NotificationItem
            key={i} // any unique id
            notificationTitle={title}
            notificationBody={message}
            cta={cta}
            app={app}
            icon={icon}
            image={image}
            url={url}
            theme='dark'
            chainName={blockchain}
        />
        );
    })}
    </div>
  )
}

export default Notifications
