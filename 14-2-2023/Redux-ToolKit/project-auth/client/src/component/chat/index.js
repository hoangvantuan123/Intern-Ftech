import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../chat/Sidebar";
import MessageForm from "../chat/MessageForm";

export default function ChatBox() {
  return (
    <div>
     <Container>
            <Row>
                <Col md={4}>
                    <Sidebar />
                </Col>
                <Col md={8}>
                    <MessageForm />
                </Col>
            </Row>
        </Container>

    </div>
  )
}
