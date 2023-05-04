# Huddle-911

Decentralised live consultancy Dapp

Huddle-911 Delpoyment branch differs from main branch as Push Protocol uses webpack v4 as does main branch but for deployment on vercel webpack v5 had to be used so the differences are:

1. Doctors and clients getting meet link before meet (Can still be seen as they are sent through smart contract, just add 'https://chrome.google.com/webstore/detail/push-staging-protocol-alp/bjiennpmhdcandkpigcploafccldlakj' Push Staging extension to your browser.) 
   Example meet link : https://huddle-911.vercel.app/meet?id=klt-lbyq-opz&date=2023-05-03T10:30:00.000Z

2. Doctors getting link to update documents (This won't show up in push notifications as they were sent through backend)
   Example update doc link : https://huddle-911.vercel.app/submitReport?id=2023-05-03T10:30:00.000Z
