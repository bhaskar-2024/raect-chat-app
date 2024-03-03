import React, { useEffect, useState } from "react";
import SingleMessage from "./SingleMessage";
import LogoutBtn from "../pages/LogoutBtn";
import { colors } from "../pages/colors";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../store/authSlice";
import dbServices from "../appwrite/database";
import { fillMessages, newMessage } from "../store/messageSlice";
import { Client } from "appwrite";
import conf from "../../conf";

function ChatBox() {
  const userData = useSelector((state) => state.auth.userData);
  const userName = userData.name;
  const [messageText, setMessageText] = useState("");
  const userId = userData.$id;
  const dispatch = useDispatch();

  let allMessages = useSelector((state) => state.messages.allMessages);
  


  const handleSubmit = async () => {
    const index = Math.floor(Math.random() * (colors.length - 1));
    const colour = colors[index];
    const currTime = new Date();
    const createdAt = currTime.toLocaleString();
    const content = messageText;
    const message = {
      userId,
      userName,
      content,
      createdAt,
      colour,
    };
    try {
      const messageFromDb = await dbServices.sendMessage(message);
     
    } catch (error) {
      console.log("error sending message ", error);
    }
    setMessageText("");
  };



  useEffect(() => {
    const client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);


    async function fetchDataAndSubscribe() {
      const allMessage = await dbServices.getMessages();
      dispatch(fillMessages(allMessage.documents));
   
    
    }
    fetchDataAndSubscribe();

    const unsubscribe = client.subscribe(
      [
        `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents`,
        "files",
      ],
      (response) => {
        if(response.events.includes("databases.*.collections.*.documents.*.create")) {
        
          dispatch(newMessage(response.payload));
      }
        if(response.events.includes("databases.*.collections.*.documents.*.delete")) {
        
          allMessages = allMessages.filter((message) => {return message.$id !== response.payload.$id});
          dispatch(fillMessages(allMessages))
          
          
      }


       
      }
    );

  
    return () => {
      unsubscribe();
    };
  }, [allMessages , dispatch]);



  return (
    <main className="h-screen w-screen flex justify-center  border-black border-[2px] bg-gradient-to-b from-slate-600 to-slate-950 py-1 px-1">
      <div
        id="container"
        className="w-full h-full lg:w-[50vw] md:w-[80vw]  bg-gray-800 rounded-lg"
      >
        <section
          id="welcome"
          className="h-[7%] w-full bg-slate-300 rounded-lg rounded-b-none flex items-center justify-around"
        >
          <div className="text-2xl font-mono font-extrabold text-sky-950 ">
            {userData ? userData.name : "Bhaskar Mishra"}
          </div>
          <div>
            <LogoutBtn />
          </div>
        </section>
        <section
          id="chatArea"
          className="h-[80%] w-full bg-[#7761809b] overflow-auto scrollbar-hide "
        > 
            {
              allMessages.map((messages) =>{
                return (
                  <div className={`${messages.userId === userId ?'pl-9 pr-1 flex justify-end md:pl-24 ' :' pl-1 pr-9 flex justify-end md:pr-24'  }`} key={messages.$id}>
                      <SingleMessage message={messages}/>
                  </div>
                )
               }
               
              )
            }
        
        </section>
        <section
          id="textArea"
          className="h-[13%] w-full bg-slate-300 flex rounded-b-lg"
        >
          <div className="h-full flex w-full">
            <textarea
              id="message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="block p-2.5 w-[90%] h-full text-sm rounded-b-md bg-cyan-950 text-white"
              placeholder="Write your thoughts here..."
            ></textarea>
            <div
              onClick={handleSubmit}
              className="h-full w-[10%] flex flex-col items-center justify-center hover:bg-white cursor-pointer"
            >
              <div className="">
                <img src="sendImage.png" alt="" />
              </div>
              <div className="font-mono font-extrabold">Send</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ChatBox;
