import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type projectState = {
  project: string[];
};

const initialState: projectState = {
  project: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<string[]>) => {
      state.project = action.payload;
    },
    addProject: (state, action: PayloadAction<string>) => {
      state.project.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.project = state.project.filter(
        (each_project: any) => each_project.id != action.payload
      );
    },
    // updateProject: (state, action: PayloadAction<string>) => {

    // },
  },
});

export const { setProjects, addProject, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
