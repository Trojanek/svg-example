import { createSlice } from '@reduxjs/toolkit';
import Rectangle from 'types/Rectangle';
import { ApiRectangle, LoadingStatus } from 'types';
import throwResponseErrorIfNeeded from 'helpers/throwResponseErrorIfNeeded';
import { RootState, AppThunk } from './store';

export type CanvasState = {
  project?: {
    id: string;
    name: string;
    width?: number;
    height?: number;
    items?: Rectangle[];
  };
  status: LoadingStatus;
}

const initialState: CanvasState = {
  status: 'idle',
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    start: state => {
      state.status = 'loading';
      delete state.project;
    },
    failure: state => {
      state.status = 'failed';
    },
    init: (state, { payload: { id, name } }) => {
      state.project = { id, name };
    },
    project: (state, { payload: { project } }) => {
      state.project = {
        ...project,
        items: project.items.map(({ id, x, y, width, height, rotation, color }: ApiRectangle) => ({
          id: id,
          center: [x, y],
          size: [width, height],
          rotation,
          color,
        })),
      };
      state.status = 'idle';
    },
  },
});

export const { start, failure, init, project } = canvasSlice.actions;

export const getInit = (id?: string): AppThunk => async dispatch => {
  let projectId = id;

  try {
    dispatch(start());
    if (!id) {
      const initResponse
        = await fetch('https://recruitment01.vercel.app/api/init');
      throwResponseErrorIfNeeded(initResponse);
      const initData = await initResponse.json();
      projectId = initData.id;
      dispatch(init(initData));
    }

    const projectResponse
      = await fetch(`https://recruitment01.vercel.app/api/project/${projectId}`);
    throwResponseErrorIfNeeded(projectResponse);
    const projectData = await projectResponse.json();
    dispatch(project(projectData));
  } catch (error) {
    dispatch(failure());
  }
};


export const selectStatus = (state: RootState) => state.canvas.status;
export const selectProject = (state: RootState) => state.canvas.project;

export default canvasSlice.reducer;
