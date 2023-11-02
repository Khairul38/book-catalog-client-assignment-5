import { IBook } from "@/types/globalTypes";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { notify } from "./ui/Toastify";
import { useEffect } from "react";
import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetSingleWishlistQuery,
} from "@/redux/features/wishlist/wishlistApi";
import { useAppSelector } from "@/redux/reduxHooks";
import Loader from "./ui/Loader";

interface IProps {
  book: IBook;
  status?: string;
}

export default function BookCard({ book, status }: IProps) {
  const { user } = useAppSelector((state) => state.auth);

  const location = useLocation();
  const navigate = useNavigate();

  const { data } = useGetSingleWishlistQuery(book._id, {
    skip: user ? false : true,
  });

  const [addWishlist, { isLoading: addLoading, isSuccess: addSuccess, error }] =
    useAddWishlistMutation();

  const [
    deleteWishlist,
    { isLoading: deleteLoading, isSuccess: deleteSuccess },
  ] = useDeleteWishlistMutation();

  const handleAddToWishlist = () => {
    if (user) {
      addWishlist({ book: book._id, user: user?._id, status: "Wishlisted" });
    } else {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const handleRemoveFromWishlist = (id: string) => {
    deleteWishlist(id);
  };

  useEffect(() => {
    if (addSuccess) {
      notify("success", "Wishlist add successfully");
    }
  }, [addSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      notify("success", "Wishlist remove successfully");
    }
  }, [deleteSuccess]);
  
  useEffect(() => {
    if (error) {
      notify("error", (error as any)?.data?.message);
    }
  }, [error]);
  return (
    <div>
      <div className="rounded-xl h-[566px] flex flex-col justify-between p-4 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-1">
        <Link to={`/book-details/${book._id}`}>
          <img className="w-full h-72" src={book?.image} alt={book?.title} />
          <h1 className="text-xl font-semibold pt-2 line-clamp-2">
            {book?.title}
          </h1>
        </Link>
        <p className="line-clamp-3">Author: {book?.author}</p>
        <p className="line-clamp-3">Genre: {book?.genre}</p>
        <p>Publication Year: {book?.publicationYear}</p>
        <p>Rating: {book?.rating}</p>
        {/* <p>Price: ${book?.price}</p> */}
        {user && (status || data?.data?.status) && (
          <p>
            Status:{" "}
            <span className="text-violet-500 font-semibold">
              {status ? status : data?.data?.status}
            </span>
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          <Link to={`/book-details/${book._id}`} className="w-full">
            <Button variant="default" className="w-full">
              View details
            </Button>
          </Link>
          {!user || !data ? (
            <Button onClick={handleAddToWishlist} className="rounded-full p-2">
              {addLoading ? (
                <Loader color="text-white" />
              ) : (
                <HiOutlineHeart size="25" />
              )}
            </Button>
          ) : (
            <Button
              onClick={() => handleRemoveFromWishlist(data?.data._id)}
              className="rounded-full p-2"
            >
              {deleteLoading ? (
                <Loader color="text-white" />
              ) : (
                <HiHeart size="25" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
