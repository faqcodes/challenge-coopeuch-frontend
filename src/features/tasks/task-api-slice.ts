import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../../models/task';
import { Message } from '../../models/message';
import { TaskInput } from '../../models/task-input';

const BASE_URL = 'http://localhost:8090/api/tasks/v1';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['Tasks'],

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (builder) => ({

    createTask: builder.mutation<Message<Task>, TaskInput>({
      query: (taskInput) => ({
        url: '',
        method: 'POST',
        body: taskInput
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'TASK_LIST' }],
    }),

    updateTask: builder.mutation<Message<Task>, TaskInput>({
      query: (taskInput) => ({
        url: '',
        method: 'PATCH',
        body: taskInput
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: 'Tasks', taskId }],
    }),

    deleteTask: builder.mutation<Message<null>, number>({
      query: (taskId) => ({
        url: `/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, taskId) => [{ type: 'Tasks', taskId }],
    }),

    getTask: builder.query<Message<Task>, number>({
      query: (taskId) => ({
        url: `/${taskId}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Tasks', id }],
    }),

    getTasks: builder.query<Message<Task[]>, void>({
      query: () => ({
        url: '',
      }),
      providesTags: (result) =>
        result
          ? // successful query
          [
            ...result.data.map(({ taskId }) => ({ type: 'Tasks', taskId } as const)),
            { type: 'Tasks', id: 'TASK_LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Tasks', id: 'TASK_LIST' }` is invalidated
          [{ type: 'Tasks', id: 'TASK_LIST' }],
    }),

  }),
})

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useGetTasksQuery
} = taskApi;
