import React, { useState } from "react";
import { Layout } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import ProjectList from "../Components/Containers/ProjectList";
import CreateProject from "../Components/Containers/CreateProject";
import AddTask from "../Components/Containers/AddTask";
import InboxOutlined from "@ant-design/icons/lib/icons/InboxOutlined";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import DropDown from "../Components/Presention/DropDown";
import Login from "./Login";

const { Sider } = Layout;

const HomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const token: string | null = localStorage.getItem("token");

  if (!token) {
    return <Login />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        width={300}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        {!collapsed && (
          <div
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid red",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <DropDown />
            </div>
            <AddTask />
            <NavLink to="/app/inbox" className="navigate">
              <InboxOutlined style={{ fontSize: "20px" }} />
              <span style={{ marginLeft: "15px", fontSize: "16px" }}>
                Inbox
              </span>
            </NavLink>
            <NavLink to="/app/today" className="navigate">
              <CalendarOutlined style={{ fontSize: "20px" }} />
              <span style={{ marginLeft: "15px", fontSize: "16px" }}>
                Today
              </span>
            </NavLink>
            <NavLink to="/app/upcoming" className="navigate">
              <CalendarOutlined style={{ fontSize: "20px" }} />
              <span style={{ marginLeft: "15px", fontSize: "16px" }}>
                Upcoming
              </span>
            </NavLink>
            <NavLink to="/app/filter-labels" className="navigate">
              <AppstoreOutlined style={{ fontSize: "20px" }} />
              <span style={{ marginLeft: "15px", fontSize: "16px" }}>
                Filter & Lables
              </span>
            </NavLink>
            <div>
              <CreateProject />
            </div>
            <div>
              <ProjectList />
            </div>
          </div>
        )}
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 300,
          transition: "margin-left 0.2s ease",
        }}
      >
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default HomePage;
