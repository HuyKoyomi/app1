import { Col, message, Row } from "antd";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useHistory } from "react-router-dom";

export default function FormLogin() {
  const [form] = Form.useForm();
  const history = useHistory();
  function onFinish() {
    if (form.getFieldValue("password") == "room1") {
      history.push("/Home");
    } else {
      message.error("Mật khẩu không chính xác");
    }
  }
  return (
    <Row style={{ marginTop: 100 }}>
      <Col offset={10} span={6}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            label="Mậy khẩu"
            name="password"
            style={{ marginBottom: 40 }}
          >
            <Input.Password />
          </Form.Item>
          <Button htmlType="submit"> Đăng nhập</Button>
        </Form>
      </Col>
    </Row>
  );
}
