import * as PushAPI from '@pushprotocol/restapi'
import { useState, useEffect } from 'react'
import { NotificationItem, chainNameType } from "@pushprotocol/uiweb";
import './notification.css'

const Notifications = () => {
    
    const [notif, setNotif] = useState();

    useEffect(()=>{
        const getNotifications = async ()=>{
            const spams = await PushAPI.user.getFeeds({
                user: 'eip155:80001:0x63DAc31bF8c2C972903f2bc303a502587268954d', // user address in CAIP
                env: 'staging'
              }).then((response)=>{
                setNotif(response);
                console.log(notif);
            });
            }
        getNotifications();
    },[])
  return(
    <div className='container'>
        <h1>Notifications</h1>
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
