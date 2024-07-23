import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { useNavigate } from "react-router";

const DropDown: React.FC = () => {
  const name: string | null = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    if (e.key === "logout") {
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      navigate("/");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Have to add things</Menu.Item>
      <Menu.Item key="logout" danger>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <UserOutlined />
          {name}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropDown;
