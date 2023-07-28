import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { taskApi } from '../features/tasks/task-api-slice';

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware)
})
