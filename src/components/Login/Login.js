/* eslint-disable no-undef */
import { Button, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// import './Login.css'

function Login() {
  const history = useHistory();

  let faceioInstance = null;
  // const history = useHistory();

  const [a, setA] = useState(false);
  useEffect(() => {
    console.log("state", a);
  }, [a]);

  useEffect(() => {
    const faceIoScript = document.createElement("script");
    faceIoScript.src = "//cdn.faceio.net/fio.js";
    faceIoScript.async = true;
    faceIoScript.onload = () => faceIoScriptLoaded();
    document.body.appendChild(faceIoScript);

    return () => {
      document.body.removeChild(faceIoScript);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const faceIoScriptLoaded = () => {
    console.log(faceIO);
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO("fioa56e5");
    }
  };

  // Xác thực một khuôn mặt đã có vào hệ thống
  const faceSignIn = async () => {
    try {
      console.log(faceioInstance);
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      });
      console.log(userData);

      console.log("Unique Facial ID: ", userData.facialId);
      console.log("PayLoad: ", userData.payload);
      history.push("/home");
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  };
  const MessageError = (value) => {
    message.info(value);
  };
  const handleError = (errCode) => {
    switch (errCode) {
      case fioErrCode.PERMISSION_REFUSED:
        MessageError("Access to the Camera stream was denied by the end user");
        break;
      case fioErrCode.NO_FACES_DETECTED:
        MessageError(
          "No faces were detected during the enroll or authentication process"
        );
        break;
      case fioErrCode.UNRECOGNIZED_FACE:
        MessageError("Unrecognized face on this application's Facial Index");
        break;
      case fioErrCode.MANY_FACES:
        MessageError("Two or more faces were detected during the scan process");
        break;
      case fioErrCode.PAD_ATTACK:
        MessageError(
          "Presentation (Spoof) Attack (PAD) detected during the scan process"
        );
        break;
      case fioErrCode.FACE_MISMATCH:
        MessageError(
          "Calculated Facial Vectors of the user being enrolled do not matches"
        );
        break;
      case fioErrCode.WRONG_PIN_CODE:
        MessageError("Wrong PIN code supplied by the user being authenticated");
        break;
      case fioErrCode.PROCESSING_ERR:
        MessageError("Server side error");
        break;
      case fioErrCode.UNAUTHORIZED:
        MessageError(
          "Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information"
        );
        break;
      case fioErrCode.TERMS_NOT_ACCEPTED:
        MessageError(
          "Terms & Conditions set out by FACEIO/host application rejected by the end user"
        );
        break;
      case fioErrCode.UI_NOT_READY:
        MessageError(
          "The FACEIO Widget code could not be (or is being) injected onto the client DOM"
        );
        break;
      case fioErrCode.SESSION_EXPIRED:
        MessageError(
          "Client session expired. The first promise was already fulfilled but the host application failed to act accordingly"
        );
        break;
      case fioErrCode.TIMEOUT:
        MessageError(
          "Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)"
        );
        break;
      case fioErrCode.TOO_MANY_REQUESTS:
        MessageError(
          "Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications"
        );
        break;
      case fioErrCode.EMPTY_ORIGIN:
        MessageError(
          "Origin or Referer HTTP request header is empty or missing"
        );
        break;
      case fioErrCode.FORBIDDDEN_ORIGIN:
        MessageError("Domain origin is forbidden from instantiating fio.js");
        break;
      case fioErrCode.FORBIDDDEN_COUNTRY:
        MessageError(
          "Country ISO-3166-1 Code is forbidden from instantiating fio.js"
        );
        break;
      case fioErrCode.SESSION_IN_PROGRESS:
        MessageError(
          "Another authentication or enrollment session is in progress"
        );
        break;
      case fioErrCode.NETWORK_IO:
      default:
        MessageError(
          "Error while establishing network connection with the target FACEIO processing node"
        );
        break;
    }
  };
  useEffect(() => {
    getServoMode();
  }, []);
  // API
  const Thaotac_ServoMode = async (value) => {
    axios({
      method: "post",
      url: "http://localhost:8080/addservomode",
      data: {
        mode: value,
      },
    })
      .then((res) => {
        getServoMode();
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  const [ServoMode, setServoMode] = useState("0");
  const getServoMode = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/getfinalservomode",
    })
      .then((res) => {
        setServoMode(res?.data[0]?.mode);
        console.log("Format", Format(res?.data[0]?.mode));
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  return (
    <div className="face-authentication-by-trungquandev flex fdc jcfc aic">
      <h1>Trạng thái: {Format(ServoMode)}</h1>
      <Button
        disabled={ServoMode == "1" ? true : false}
        onClick={(e) => {
          Thaotac_ServoMode("1");
        }}
      >
        Đóng cửa
      </Button>
      <Button
        disabled={ServoMode == "0" ? true : false}
        onClick={(e) => {
          Thaotac_ServoMode("0");
        }}
      >
        Mở cửa
      </Button>
      {/* {!a ? (
        <>
        <Button className="action face-sign-in" onClick={faceSignIn}>
          Đăng nhập
        </Button>
        <Button onClick={e => history.push('/register')}>Đăng ký</Button>
        </>
      ) : (
        <>Hello</>
      )} */}
    </div>
  );
}

export default Login;
function Format(value) {
  // eslint-disable-next-line default-case
  switch (value) {
    case "0":
      return "Mở cửa";
    case "1":
      return "Đóng cửa";
  }
}
