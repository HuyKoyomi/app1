import { Button } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Light() {
  const [LightMode, setLightMode] = useState("0");
  const [ManualLight, setManualLight] = useState("0");
  const history = useHistory();
  useEffect(() => {
    getLightMode();
  }, []);

  const getLightMode = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/getfinallightmode",
    })
      .then((res) => {
        setLightMode(res?.data[0]?.mode);
        console.log("Format", Format(res?.data[0]?.mode));
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  const getManualLight = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/getfinalmanuallight",
    })
      .then((res) => {
        setManualLight(res?.data[0]?.mode);
        console.log("FormatManualLight", FormatManualLight(res?.data[0]?.mode));
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  //   const AutoBtn = () => {
  //     if (LightMode == "0") {
  //       setLightMode("1");
  //     } else {
  //       setLightMode("0");
  //       getManualLight();
  //     }
  //   };
  //   const AutoManualLightBtn = () => {
  //     if (ManualLight == "0") {
  //       setManualLight("1");
  //     } else {
  //       setManualLight("0");
  //     }
  //   };

  //--------------------------------Tắt đèn
  const Thaotac_LightMode = async (value) => {
    axios({
      method: "post",
      url: "http://localhost:8080/addlightmode",
      data: {
        mode: value,
      },
    })
      .then((res) => {
        getLightMode();
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  const Thaotac_ManualLight = async (value) => {
    axios({
      method: "post",
      url: "http://localhost:8080/addmanuallight",
      data: {
        mode: value,
      },
    })
      .then((res) => {
        getManualLight();
        // console.log("FormatManualLight", FormatManualLight(res?.data[0]?.mode));
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  return (
    <div>
      <div>
        <h1>Trạng thái: {Format(LightMode)}</h1>
        <Button
          disabled={LightMode == "0" ? true : false}
          onClick={(e) => {
            Thaotac_LightMode("0");
          }}
        >
          Tự động
        </Button>
        <Button
          disabled={LightMode == "1" ? true : false}
          onClick={(e) => {
            Thaotac_LightMode("1");
          }}
        >
          Thủ công
        </Button>
        {LightMode == 1 ? (
          <div>
            <h1>Đèn đang được: {FormatManualLight(ManualLight)}</h1>
            <Button
              disabled={ManualLight == "0" ? true : false}
              onClick={(e) => {
                Thaotac_ManualLight("0");
              }}
            >
              Tắt
            </Button>
            <Button
              disabled={ManualLight == "1" ? true : false}
              onClick={(e) => {
                Thaotac_ManualLight("1");
              }}
            >
              Bật
            </Button>
          </div>
        ) : (
          <></>
        )}
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
      return "Tự động";
    case "1":
      return "Thủ công";
  }
}

function FormatManualLight(value) {
  // eslint-disable-next-line default-case
  switch (value) {
    case "1":
      return "Bật";
    case "0":
      return "Tắt";
  }
}
