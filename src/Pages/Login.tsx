import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { USER_URL } from "../utils/urls";
import axios from "axios";
import { useNavigate } from "react-router";

const { Title } = Typography;

interface formType {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: formType) => {
    try {
      setError("");
      const response = await axios.post(USER_URL + `login`, values);
      const { token, user_id, name } = response.data;
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      message.success("Logged in successfully!");
      navigate("/app/");
    } catch (error) {
      message.error("Auth failed!");
      setError("Incorrect details!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: 8,
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div>
          {error && <p style={{ marginTop: "15px", color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
