import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { USER_URL } from "../utils/urls";
import axios from "axios";
import { useNavigate } from "react-router";
// import { setError } from "../Redux/features/errorAndLoaderSlice";

const { Title } = Typography;

interface formType {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = async (values: formType) => {
    try {
      if (values.confirm_password === values.password) {
        await axios.post(USER_URL + "signup", values);
        message.success("Registered successfully & login now!");
        navigate("/");
      } else {
        message.error("Password not matching");
      }
    } catch (error) {
      message.error("Unable to create account now!");
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
          Sign up
        </Title>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
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

          <Form.Item
            name="confirm_password"
            rules={[{ required: true, message: "Please re-enter password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
