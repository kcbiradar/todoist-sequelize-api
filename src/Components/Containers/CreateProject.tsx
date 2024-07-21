import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, Switch } from "antd";
import colors from "../../utils/colors";
const { Option } = Select;

const CreateProject: React.FC = () => {
  const [loading, setLoading] = useState(false); // iam doing this one global loading...
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      form.resetFields();
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log("Received values:", values);
    handleOk();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        + Add project
      </Button>
      <Modal
        open={open}
        title="Add project"
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        footer={null}
      >
        <Form
          form={form}
          name="createProjectForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="vertical"
          onFinish={onFinish}
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
            name="favorite"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 6, span: 16 }}
            style={{ marginBottom: 0 }}
          >
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProject;
