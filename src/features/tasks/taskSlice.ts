import { createSlice } from '@reduxjs/toolkit';
import { TaskState } from '../../models/taskState';

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
