import React, {useEffect} from "react";
/* import { Container, Row, Col } from "react-bootstrap"; */
import Sidebar from "../chat/Sidebar";
import MessageForm from "../chat/MessageForm";
import NavBar from "../navbar";
import InfoSidebar from "./infoSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ChatBox() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log("profile", auth);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!auth._id) {
      alert("Vui lòng đăng nhập để truy cập trang này.")
      navigate("/login");
    }
  }, [auth._id]);
  
  return (
    <div>
      {auth._id ? (
        <>
          <div className=" container mx-auto p-3   h-full">
            <div className="flex flex-row justify-between bg-white ">
              <Sidebar />
              <MessageForm />
              <InfoSidebar />
            </div>
          </div>
        </>
      ) : null /* (
        <>
          <p>Vui lòng đăng nhập để truy cập trang này</p>
          <Link to="/login">Đăng nhập</Link>
        </>
      ) */}
    </div>
  );
}
