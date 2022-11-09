import { Button } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  function toLightPage() {
    history.push("/Light");
  }
  return (
    <div>
      <Button onClick={toLightPage}>Đèn</Button>
      <Button>Quạt</Button>
      <Button>Cửa</Button>
      <Button>Xem biểu đồ nhiệt</Button>
      <Button>Xem biểu đồ gas</Button>
    </div>
  );
}
