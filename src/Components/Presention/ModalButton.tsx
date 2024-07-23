import PlusCircleFilled from "@ant-design/icons/lib/icons/PlusCircleFilled";
import Button from "antd/es/button";
import React from "react";

const ModalButton: React.FC<any> = ({ showModal, text }) => {
  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        style={{ color: "#d1453b", background: "none" }}
      >
        <PlusCircleFilled style={{ color: "#d1453b", fontSize: "20px" }} />
        <h4>Add {text}</h4>
      </Button>
    </div>
  );
};

export default ModalButton;
