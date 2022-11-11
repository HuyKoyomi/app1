import { Button } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Pan() {
  const [FanMode, setFanMode] = useState("0");
  const history = useHistory();

  useEffect(() => {
    getFanMode();
  }, []);

  const getFanMode = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/getfinalfanmode",
    })
      .then((res) => {
        setFanMode(res?.data[0]?.mode);
        console.log("Format", Format(res?.data[0]?.mode));
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };

  //--------------------------------Tắt đèn
  const Thaotac_FanMode = async (value) => {
    axios({
      method: "post",
      url: "http://localhost:8080/addfanmode",
      data: {
        mode: value,
      },
    })
      .then((res) => {
        getFanMode();
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };

  return (
    <div>
      <div>
        <h1>Trạng thái: {Format(FanMode)}</h1>
        <Button
          disabled={FanMode == "0" ? true : false}
          onClick={(e) => {
            Thaotac_FanMode("0");
          }}
        >
          Bật
        </Button>
        <Button
          disabled={FanMode == "1" ? true : false}
          onClick={(e) => {
            Thaotac_FanMode("1");
          }}
        >
          Tắt
        </Button>
      </div>
      <div style={{ marginTop: 30 }}>
        <Button onClick={(e) => history.push("/Home")}>Quay lại</Button>
      </div>
    </div>
  );
}

function Format(value) {
  // eslint-disable-next-line default-case
  switch (value) {
    case "0":
      return "Bật";
    case "1":
      return "Tắt";
  }
}
