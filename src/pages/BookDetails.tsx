import ProductReview from "@/components/BookReview";
import { UpdateDropdown } from "@/components/UpdateDropdown";
import AccordionBasic from "@/components/ui/AccordionBasic";
import Loader from "@/components/ui/Loader";
import { notify } from "@/components/ui/Toastify";
import { Button } from "@/components/ui/button";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "@/redux/features/book/bookApi";
import { useGetSingleWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
import { useAppSelector } from "@/redux/reduxHooks";
import { useEffect, useState } from "react";
// import { IBook } from "@/types/globalTypes";
// import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const options = [
  "Wishlisted",
  "Reading soon",
  "Currently reading",
  "Finished reading",
];

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState<string>("");

  const { user } = useAppSelector((state) => state.auth);

  const { data: wishlisted } = useGetSingleWishlistQuery(id);

  const { data, isLoading } = useGetSingleBookQuery(id);
  const [deleteBook, { isLoading: deleteLoading, isSuccess }] =
    useDeleteBookMutation();

  const handleDelete = () => {
    deleteBook(id);
  };

  console.log(wishlisted);

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
            Publication Year: {data?.data?.publicationYear}
          </p>
          <p className="text-xl">Rating: {data?.data?.rating}</p>
          <p className="text-xl">Description: {data?.data?.description}</p>
          {user && wishlisted?.data?.status && (
            <p className="text-xl">
              Status:{" "}
              <span className="text-violet-500 font-semibold">
                {wishlisted?.data?.status}
              </span>
            </p>
          )}
          <div className="flex space-x-3 pt-2">
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
            {wishlisted?.data?.status && (
              <UpdateDropdown
                options={options}
                status={wishlisted?.data?.status}
                wishlistId={wishlisted?.data?._id}
              />
            )}
          </div>
        </div>
      </div>
      <ProductReview id={id!} />
    </div>
  );
}
