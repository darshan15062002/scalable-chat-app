"use client";

import { useState } from "react";
import { useSocket } from "../context/socketProvider";

export default function Page() {
  const [text, setText] = useState<string>("");
  const { sendMessage, messages } = useSocket();

  return (
    <div className="w-full h-screen bg-black ">
      <div className=" flex flex-col h-full gap-y-10 justify-center items-center  px-40">
        <h1 className=" text-white">message will appear here</h1>
        <input
          className="px-5 py-3"
          type="text"
          placeholder="enter message"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => sendMessage(text)}
          className="bg-white text-black px-5 py-3"
          type="button"
        >
          send
        </button>
        <div className="text-white">
          {messages?.map((msg) => <h1>{msg}</h1>)}
        </div>
      </div>
    </div>
  );
}
