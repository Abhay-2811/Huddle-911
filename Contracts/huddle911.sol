// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract Huddle_911 is Ownable{

    mapping (address => mapping (address => uint)) public StakedData;

    function ScheduleMeetClient(address Doctor, address Client, string memory MeetLink) payable public onlyOwner{
        require(StakedData[Doctor][Client] == 0, "Release previous staked amount for this client");
        StakedData[Doctor][Client] = msg.value;
        IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa).sendNotification(0x2014d78892fC9fFBc1D26a6269069C59c50fD481,Client,
        bytes(
            string(
                abi.encodePacked(
                    "0", 
                    "+", 
                    "3", 
                    "+", 
                    "Appointment Scheduled", 
                    "+", 
                    "Join Meet Lobby 5-10 mins before schedule",
                    "Meet Link :",
                    MeetLink // notification body,
                )
            )
        ));
    }
    function NotifyDoc(address Doctor, string memory MeetLink) payable public onlyOwner{
        IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa).sendNotification(0x2014d78892fC9fFBc1D26a6269069C59c50fD481,Doctor,
        bytes(
            string(
                abi.encodePacked(
                    "0", 
                    "+", 
                    "3", 
                    "+", 
                    "Appointment Scheduled",
                    "+", 
                    "Join Meet Lobby 5-10 mins before schedule",
                    "Meet Link :",
                    MeetLink // notification body,
                )
            )
        ));
    }

    //function to claim amount by doctors
    function ClaimAmount(address payable Doctor,address Client) payable public onlyOwner{
        require(StakedData[Doctor][Client] != 0, "DNE");
        Doctor.transfer(StakedData[Doctor][Client]);
        StakedData[Doctor][Client]=0;
    }
    
}
