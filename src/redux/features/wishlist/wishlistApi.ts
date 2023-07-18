import { apiSlice } from "@/redux/api/apiSlice";

const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlistByUser: builder.query({
      query: () => "/wishlist/user",
    }),
    addWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
    }),
    getSingleWishlist: builder.query({
      query: (id) => `/wishlist/${id}`,
    }),
    updateWishlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/wishlist/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetSingleWishlistQuery,
  useGetWishlistByUserQuery,
  useUpdateWishlistMutation,
} = wishlistApi;
