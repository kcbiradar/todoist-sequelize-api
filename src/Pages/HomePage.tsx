import React from "react";
import { Layout, Space } from "antd";
import ProjectList from "../Components/Containers/ProjectList";
import CreateProject from "../Components/Containers/CreateProject";

const { Sider, Content } = Layout;

const HomePage: React.FC = () => {
  //   const items: Array<string> = [
  //     "item-1",
  //     "item-2",
  //     "item-3",
  //     "item-4",
  //     "item-5",
  //     "item-6",
  //   ];

  //   const [selectedItem, setSelectedItem] = useState<string>(items[0]);

  //   const handleItemClick = (item: string) => {
  //     setSelectedItem(item);
  //   };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" width={300}>
        <Space direction="vertical" style={{ width: "100%", padding: "16px" }}>
          <h1>Todoist</h1>
          <p>Here goes all my project list</p>
          <CreateProject />
          {/* <ul>
            {items.map((item: string) => (
              <li
                key={item}
                onClick={() => handleItemClick(item)}
                className={selectedItem === item ? "selected" : ""}
              >
                {item}
              </li>
            ))}
          </ul> */}
          <ProjectList />
        </Space>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          {/* <h1>
            {selectedItem
              ? `Selected: ${selectedItem}`
              : "Select an item from the sidebar"}
          </h1> */}
          <p>Here goes the project task creation</p>
          <p>I have to provide section creation</p>
          <p>I have to display the different sections and their tasks</p>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
