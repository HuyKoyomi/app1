import { Button } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  function toLightPage() {
    history.push("/Light");
  }
  function toServoPage() {
    history.push("/Servo");
  }
  function toPanPage() {
    history.push("/Pan");
  }
  return (
    <div>
      <Button onClick={toLightPage}>Đèn</Button>
      <Button onClick={toPanPage}>Quạt</Button>
      <Button onClick={toServoPage}>Cửa</Button>
      <Button>Xem biểu đồ nhiệt</Button>
      <Button>Xem biểu đồ gas</Button>
    </div>
  );
}
