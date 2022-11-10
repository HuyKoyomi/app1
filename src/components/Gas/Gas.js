import { Image, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Gas() {
  const [Gas, setGas] = useState("0");

  useEffect(() => {
    getGas();
  }, []);

  const getGas = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/getfinalgas",
    })
      .then((res) => {
        setGas(res?.data[0]?.level);
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };

  return (
    <div>
      <h1>Trạng thái: {Gas}</h1>
      {Gas == 0 && <></>}
      {Gas == 1 && <>Màu cam</>}
      {Gas == 0 && (
        <>
          <Image src="https://cdn-img-v2.webbnc.net/uploadv2/web/10/10614/media/2021/12/24/12/10/1640311764_bieu-tuong-canh-bao-nguy-hiem-6.png" />
        </>
      )}
      {Gas == 3 && (
        <>đỏ không thao tác được các chức năng khác và có tiếng báo động</>
      )}
    </div>
  );
}
