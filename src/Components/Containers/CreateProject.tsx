import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, Switch, message } from "antd";
import colors from "../../utils/colors";
import axios from "axios";
import { PROJECT_URL } from "../../utils/urls";
import { setLoader } from "../../Redux/features/errorAndLoaderSlice";
import { addProject } from "../../Redux/features/projectSlice";
import { useSelector, useDispatch } from "react-redux";
import ModalButton from "../Presention/ModalButton";
const { Option } = Select;

const CreateProject: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.errorAndLoader.loading);
  const user_id: string | null = localStorage.getItem("user_id");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleCreateProject = async (values: any) => {
    try {
      dispatch(setLoader(true));
      const response = await axios.post(PROJECT_URL + user_id, values);
      message.success("Project created successfully");
      dispatch(addProject(response.data.data));
      form.resetFields();
      setOpen(false);
    } catch (error) {
      message.error("Failed to create project");
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <>
      <ModalButton showModal={showModal} text={"project"} />
      <Modal
        open={open}
        title="Add project"
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={form}
          name="createProjectForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="vertical"
          onFinish={handleCreateProject}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the project name" },
            ]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item
            label="Color"
            name="color"
            rules={[
              { required: true, message: "Please select the project color" },
            ]}
          >
            <Select placeholder="Select a color">
              {colors.map((option: string) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Add to favorites"
            name="is_favorite"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ marginRight: 8 }}
            >
              Add
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProject;
