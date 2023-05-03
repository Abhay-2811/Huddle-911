import * as PushAPI from '@pushprotocol/restapi'
import { useState, useEffect } from 'react'
import { NotificationItem, chainNameType } from "@pushprotocol/uiweb";
import './notification.css'

const Notifications = () => {
    
    const [notif, setNotif] = useState();

    useEffect(()=>{
        const getNotifications = async ()=>{
            const curr_add = window.ethereum.selectedAddress
            const CAIP = `eip155:80001:${curr_add}`
            const spams = await PushAPI.user.getFeeds({
                user: CAIP, // user address in CAIP
                env: 'staging'
              }).then((response)=>{
                setNotif(response);
                console.log(notif);
            });
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
