import React, { useEffect, useState } from 'react'
import LogoSearch from "../components/LogoSearch/LogoSearch"
import "./Chat.css"
import {userChats} from"../api/ChatRequests"
import Conversation from "../components/Coversation/Conversation"
const Chat = () => {
    const [chats,setChats] = useState([])
    const FarmerId =localStorage.getItem("FarmerId")
    //fatech chats
    useEffect(() => {
        const getChats = async () => {
          try {
            const { data } = await userChats(FarmerId);
            setChats(data);
            console.log(data)
          } catch (error) {
            console.log(error);
          }
        };
        getChats();
      }, [FarmerId]);
    return (
    <div className='Chat'>
        <div className="Left-side-chat">
        <LogoSearch/>
        <div className="Chat-container">
            <h2>Chat</h2>
            <div className="Chat-list">
            {chats.map((chat) => (
              <div
                // onClick={() => {
                //   setCurrentChat(chat);
                // }}
              >
                <Conversation
                  data={chat}
                  currentUser={FarmerId}
                  //online={checkOnlineStatus(chat)}
                />
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Chat