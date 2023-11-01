import ProductReview from "@/components/BookReview";
import { UpdateDropdown } from "@/components/UpdateDropdown";
import Loader from "@/components/ui/Loader";
import { notify } from "@/components/ui/Toastify";
import { Button } from "@/components/ui/button";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "@/redux/features/book/bookApi";
import { useGetSingleWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
import { useAppSelector } from "@/redux/reduxHooks";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import pdf from "../assets/pdf/computer-science-distilled.pdf";
// pdf viewer start
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// pdf viewer end

const options = [
  "Wishlisted",
  "Reading soon",
  "Currently reading",
  "Finished reading",
];

export default function BookDetails() {
  // Your render function
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  const { data: wishlisted } = useGetSingleWishlistQuery(id);

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
      <div className="border-b border-gray-300">
        <div className="flex mx-auto items-center gap-12 pb-10">
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
                  <Button onClick={handleDelete} className="w-[73px">
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
        <div className="h-[80vh] pb-10">
          <Viewer
            fileUrl={pdf}
            plugins={[defaultLayoutPluginInstance]}
            // httpHeaders={{
            //   key: value,
            // }}
            // withCredentials={true}
          />
        </div>
      </div>
      <ProductReview id={id!} />
    </div>
  );
}
