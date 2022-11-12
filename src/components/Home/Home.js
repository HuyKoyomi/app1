import { Button, Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Howl, Howler } from "howler";
import soundurl from "../../music/Bao_dong1.mp3";
import _ from "lodash";

export default function Home() {
  const history = useHistory();
  var sound = new Howl({
    src: soundurl,
    loop: false,
  });

  function toLightPage() {
    history.push("/Light");
  }
  function toServoPage() {
    history.push("/Servo");
  }
  function toPanPage() {
    history.push("/Pan");
  }
  //----------------------------------
  const [Gas, setGas] = useState(0);
  const getGas = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/getfinalgas",
    })
      .then((res) => {
        setGas(res?.data[0]?.level);
        console.log(`${currentCount} - level`, res?.data[0]?.level);
        if (res?.data[0]?.level == status) {
          sound.play();
        }
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  function getBackGroundColor() {
    if (Gas == 2 || Gas == 3) {
      return "red";
    }
    return "white";
  }

  //---------------------------------------
  const [currentCount, setCount] = useState(-1);
  const timer = () => setCount(currentCount + 1);
  const [status, setStatus] = useState(3)
  useEffect(() => {
    const id = setInterval(timer, 2000);
    return () => {
      clearInterval(id);
      getGas();
    };
  }, [currentCount]);

  return (
    <Row
      style={{
        padding: 30,
        backgroundColor: getBackGroundColor(),
        availHeight: "100%",
        height: 1000,
      }}
    >
      {/* <div>{currentCount}</div> */}
      <Col offset={5} span={5}>
        <Button
          style={{ width: 200, backgroundColor: Gas == 1 ? "orange" : "white" }}
        >
          <a href="https://www.facebook.com/">Gas</a>
        </Button>
      </Col>
      <Col>
        <Row>
          <Button
            style={{ width: 200 }}
            disabled={Gas == 3 ? true : false}
            onClick={toLightPage}
          >
            Đèn
          </Button>
        </Row>
        <Row>
          <Button
            style={{ width: 200 }}
            disabled={Gas == 3 ? true : false}
            onClick={toPanPage}
          >
            Quạt
          </Button>
        </Row>
        <Row>
          <Button
            style={{ width: 200 }}
            disabled={Gas == 3 ? true : false}
            onClick={toServoPage}
          >
            Cửa
          </Button>
        </Row>
        <Row>
          <Button style={{ width: 200 }} disabled={Gas == 3 ? true : false}>
            Xem biểu đồ nhiệt
          </Button>
        </Row>
        <Row>
          <Button style={{ width: 200 }} disabled={Gas == 3 ? true : false}>
            Xem biểu đồ gas
          </Button>
        </Row>
        <Row>
          <Button
            style={{ width: 200, marginTop: 30 }}
            onClick={(e) => history.push("/")}
          >
            Đăng xuất
          </Button>
        </Row>
        <Row>
          <Button
            style={{ width: 200, marginTop: 30 }}
            onClick={(e) => setStatus(4)}
          >
            Tắt cảnh báo gas
          </Button>
        </Row>
      </Col>
      <Col span={5}>
        <Button style={{ width: 200 }} disabled={Gas == 3 ? true : false}>
          <a href="https://www.facebook.com/">Nhiệt độ</a>
        </Button>
      </Col>
    </Row>
  );
}
