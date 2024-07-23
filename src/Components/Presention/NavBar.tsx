import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router";

const Navbar: React.FC = () => {
  const token: string | null = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu mode="horizontal">
        <h2>Todoist</h2>
      </Menu>
      <Menu mode="horizontal">
        {token ? (
          <Menu.Item key="logout" onClick={handleLogout}>
            Logout
          </Menu.Item>
        ) : null}
      </Menu>
    </div>
  );
};

export default Navbar;
