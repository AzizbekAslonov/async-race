import { api } from "../../api";
import { Winner } from "../winners/types/winnerTypes";

export const garageAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getWinners: builder.query<Winner[], null>({
      query: () => ({
        url: "/winners",
        method: "get",
      }),
      providesTags: ["winners"],
    }),
    getWinner: builder.query<Winner, number>({
      query: (id) => ({
        url: `/winners/${id}`,
      }),
    }),
    postWinner: builder.mutation<Winner, Winner>({
      query: (body) => ({
        url: `/winners`,
        method: "POST",
        body,
      }),
    }),
    putWinner: builder.mutation<Winner, Winner>({
      query: ({ id, ...rest }) => ({
        url: `/winners/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteWinner: builder.mutation<void, number>({
      query: (id) => ({
        url: `/winners/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetWinnersQuery,
  useLazyGetWinnerQuery,
  usePutWinnerMutation,
  usePostWinnerMutation,
  useDeleteWinnerMutation,
} = garageAPI;
