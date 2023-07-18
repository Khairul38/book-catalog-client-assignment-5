import { apiSlice } from "@/redux/api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    addSingleBook: builder.query({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["reviews"],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getComment: builder.query({
      query: (id) => `/reviews/${id}`,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  usePostReviewMutation,
  useGetCommentQuery,
} = bookApi;
