import { apiSlice } from "@/redux/api/apiSlice";

const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlistByUser: builder.query({
      query: ({ status }) => {
        let queryString = `/wishlist/user?limit=50`;
        if (status && status.length > 0) {
          queryString += `&status=${status}`;
        }
        return queryString;
      },
      providesTags: ["wishlists"],
    }),
    addWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist", "wishlists"],
    }),
    getSingleWishlist: builder.query({
      query: (id) => `/wishlist/${id}`,
      providesTags: ["wishlist"],
    }),
    updateWishlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/wishlist/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist", "wishlists"],
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
