import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail: React.FC = () => {
  const { project_detail } = useParams<{ project_detail: string }>();

  return (
    <div>
      <h1>Project Detail Page</h1>
      <p>Project Detail: {project_detail}</p>
    </div>
  );
};

export default ProjectDetail;
