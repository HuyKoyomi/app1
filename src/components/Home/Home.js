import { Button, Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Howl, Howler } from "howler";
import soundurl from "../../music/Bao_dong1.mp3";
import ReactHowler from "react-howler";

export default function Home() {
  const history = useHistory();
  const [loop, setLoop] = useState(true);
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
  const [Gas, setGas] = useState("0");
  const [tmp, setTmp] = useState(true);
  useEffect(() => {
    getGas();
    //sound.play();
  }, []);
  useEffect(() => {
    getGas();
  }, [tmp]);

  const getGas = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/getfinalgas",
    })
      .then((res) => {
        setGas(res?.data[0]?.level);
        console.log("res?.data[0]?.level", res?.data[0]?.level);
        console.log("loop", loop);
        if (res?.data[0]?.level == 0) {
          // sound.play();
        }
        console.log(res?.data);
        setTmp(!tmp);
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

  return (
    <Row
      style={{
        padding: 30,
        backgroundColor: getBackGroundColor(),
        availHeight: "100%",
        height: 1000,
      }}
    >
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
          <Button
            style={{ width: 200, marginTop: 30 }}
            onClick={(e) => {
              alert("off");
              sound.onstop();
            }}
          >
            Tắt
          </Button>
          {/* <ReactHowler
            src={soundurl}
            playing={true}
            // loop={false}
          /> */}
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
