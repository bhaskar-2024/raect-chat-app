import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fillMessages } from "../store/messageSlice";
import dbServices from "../appwrite/database";


function SingleMessage(message) {
  let date = new Date();
  const dispatch = useDispatch();
  let allMessages = useSelector((state) => state.messages.allMessages);

  const currUser = useSelector((state) => state.auth.userData.$id);
  const userName = message.message.userName ? message.message.userName : "RandomUser";
  const iconLetter = userName.trim().charAt(0);
  const colour =  message.message.userId === currUser ? 'bg-slate-700' : message.message.colour;

  const content =  message.message.content;
  const createdAt =  message.message.createdAt;
  const messageId = message.message.$id;
  const userId = message.message.userId;
  const handleSubmit = async() => {
    if(userId === currUser){
      try {
        console.log("messageID is " ,messageId);
        let response = await dbServices.deleteMessage(messageId);
        if(response) {
          allMessages = allMessages.filter((message) => {return message.$id !== messageId});
          dispatch(fillMessages(allMessages))
          
        }
      } catch (error) {
        console.log('error deleting message ' , error);
      }
    }
   
  }
  return (
    <main className="w-full py-1">
      <div
        id="outerContainer"
        className="w-full flex  justify-between min-h-[100%]"
      >
        <div id="chatBody" className={`bg-sky-950 w-full rounded-lg  px-1 pt-1`}>
          <div
            id="userName"
            className={`h-[8%] flex justify-between items-center ${colour} w-full rounded-lg text-xs mb-1 text-white py-4 px-1 border-b-[1px] pl-1`}
          >
            <div className="flex items-center">
              <div className="h-[20px] w-[20px] bg-white text-sky-800 text-lg font-mono flex items-center justify-center mr-1 rounded-md"><span>{iconLetter}</span></div>
              <span>{userName}</span>
            </div>
            <span className="text-xs mx-1">{createdAt}</span>
            <span className=" px-2 rounded-lg font-mono  bg-white cursor-pointer text-sky-800 font-bold"
            onClick={handleSubmit}
            >
              X
            </span>
          </div>
          <div id="content" className="text-xs text-white text-wrap break-words">
           {content}
          </div>
        </div>
      </div>
    </main>
  );
}

export default SingleMessage;
