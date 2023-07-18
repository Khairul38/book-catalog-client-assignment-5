import ProductReview from "@/components/ProductReview";
import Loader from "@/components/ui/Loader";
import { notify } from "@/components/ui/Toastify";
import { Button } from "@/components/ui/button";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/reduxHooks";
import { useEffect } from "react";
// import { IBook } from "@/types/globalTypes";
// import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetSingleBookQuery(id);
  const [deleteBook, { isLoading: deleteLoading, isSuccess }] =
    useDeleteBookMutation();

  const handleDelete = () => {
    deleteBook(id);
  };

  useEffect(() => {
    if (isSuccess) {
      notify("success", "Book delete successfully");
      navigate("/allBooks");
    }
  }, [isSuccess]);

  if (isLoading) return <Loader />;

  return (
    <div className="px-10 xl:px-20 py-10">
      <div className="flex mx-auto items-center border-b border-gray-300 gap-12 pb-10">
        <div className="w-[30%]">
          <img
            className="w-full"
            src={data?.data?.image}
            alt={data?.data?.title}
          />
        </div>
        <div className="w-[70%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.data?.title}</h1>
          <p className="text-xl">Author: {data?.data?.author}</p>
          <p className="text-xl">Genre: {data?.data?.genre}</p>
          <p className="text-xl">
            Publication Date: {data?.data?.publicationDate}
          </p>
          <p className="text-xl">Rating: {data?.data?.rating}</p>
          <p className="text-xl">Description: {data?.data?.description}</p>
          <div className="space-x-3">
            {data?.data?.postedBy === user?._id && (
              <>
                <Button
                  onClick={() =>
                    navigate(`/edit-book/${id}`, {
                      state: { from: location },
                      replace: true,
                    })
                  }
                >
                  Edit
                </Button>
                <Button onClick={handleDelete}>
                  {deleteLoading ? <Loader color="text-white" /> : "Delete"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <ProductReview id={id!} />
    </div>
  );
}
