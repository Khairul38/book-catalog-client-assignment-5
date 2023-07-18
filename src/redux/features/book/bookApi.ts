import { apiSlice } from "@/redux/api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ searchTerm, genre, publicationYear }) => {
        let queryString = `/books?limit=50`;
        if (searchTerm && searchTerm.length > 0) {
          queryString += `&searchTerm=${searchTerm}`;
        }
        if (genre && genre.length > 0) {
          queryString += `&genre=${genre}`;
        }
        if (publicationYear && publicationYear.length > 0) {
          queryString += `&publicationYear=${publicationYear}`;
        }
        return queryString;
      },
      providesTags: ["book", "books"],
    }),
    addSingleBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["book"],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["reviews"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  usePostReviewMutation,
  useGetReviewsQuery,
  useAddSingleBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
