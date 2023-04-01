import React from "react";
/* import { Container, Row, Col } from "react-bootstrap"; */
import Sidebar from "../chat/Sidebar";
import MessageForm from "../chat/MessageForm";
import NavBar from "../navbar";
import InfoSidebar from "./infoSidebar";

export default function ChatBox() {
  return (
    <div>
      <div className=" container mx-auto  mt-5 h-full">
        <div className="flex flex-row justify-between bg-white rounded-lg shadow-lg">
          <Sidebar />
          <MessageForm />
          <InfoSidebar/>
        </div>
      </div>
    </div>
  );
}
