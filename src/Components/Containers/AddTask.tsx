import React, { useState } from "react";
import { Modal } from "antd";
import ModalButton from "../Presention/ModalButton";

const AddTask: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <Button
        type="primary"
        onClick={showModal}
        style={{ color: "#d1453b", background: "none" }}
      >
        <PlusCircleFilled style={{ color: "#d1453b", fontSize: "20px" }} />
        <h4>Add task</h4>
      </Button> */}
      <ModalButton showModal={showModal} text={"task"} />
      <Modal
        title="Add task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>I have to add input fields for creation task</p>
      </Modal>
    </>
  );
};

export default AddTask;
