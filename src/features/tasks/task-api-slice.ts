import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../../models/task';
import { Message } from '../../models/message';

const BASE_URL = 'http://localhost:8090/api/tasks/v1';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['Tasks'],

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (builder) => ({

    getTask: builder.query<Message<Task>, number>({
      query: (taskId) => ({
        url: `/${taskId}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Tasks', id }],
    }),

    getTasks: builder.query<Message<Task[]>, void>({
      query: () => ({
        url:'',
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

export const { useGetTaskQuery, useGetTasksQuery } = taskApi;