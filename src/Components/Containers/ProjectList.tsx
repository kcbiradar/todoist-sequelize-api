import React, { useEffect } from "react";
import { Menu } from "antd";
import axios from "axios";
import { PROJECT_URL } from "../../utils/urls";
import { setProjects } from "../../Redux/features/projectSlice";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import BorderlessTableOutlined from "@ant-design/icons/lib/icons/BorderlessTableOutlined";

const { SubMenu } = Menu;

const ProjectList: React.FC = () => {
  const user_id = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.project.project);

  useEffect(() => {
    async function getAllProject() {
      try {
        const response = await axios.get(PROJECT_URL + user_id);
        dispatch(setProjects(response.data.data));
      } catch (error) {
        console.log(error);
      }
    }
    if (user_id) {
      getAllProject();
    }
  }, [dispatch]);

  return (
    <Menu
      style={{
        width: 280,
        border: "1px solid #d3d3d3",
        borderRadius: 5,
        marginTop: "20px",
      }}
      defaultOpenKeys={[]}
      mode="inline"
    >
      <SubMenu
        key="sub1"
        title={
          <span style={{ fontWeight: "bold", color: "grey" }}>My Projects</span>
        }
      >
        {data.map((project: any) => (
          <Menu.Item key={project.id} style={{ padding: "8px 16px" }}>
            <NavLink
              to={`/app/project/${project.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: 15 }}>
                  <BorderlessTableOutlined style={{ fontSize: "14px" }} />
                </span>
                <span style={{ fontSize: "16px" }}>{project.name}</span>
              </div>
            </NavLink>
          </Menu.Item>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default ProjectList;
