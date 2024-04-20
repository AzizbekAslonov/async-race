import { api } from "../../api";
// import { PaginatedResponse, ResponseType } from "../types/common.types";
// import { GetOrderPayload, Order } from "src/pages/orders/order.types";

// const apiWithAuthTags = api.enhanceEndpoints({ addTagTypes: ['Auth'] });
export const garageAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    //  getOrders: builder.query<PaginatedResponse<Order>, GetOrderPayload>({
    //    query: (body) => ({
    //      url: "api/v1/order/getAllOrders",
    //      method: "post",
    //      body,
    //    }),
    //    transformResponse: (res: ResponseType<PaginatedResponse<Order>>) =>
    //      res.data,
    //    providesTags: ["orders"],
    //  }),
    //  addOrder: builder.mutation<ResponseType<null>, Order>({
    //    query: (body) => ({
    //      url: "api/v1/order/addOrder",
    //      method: "post",
    //      body,
    //    }),
    //    invalidatesTags: ["orders"],
    //  }),
  }),
});

export const {} = garageAPI;
