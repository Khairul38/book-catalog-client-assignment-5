import { IBook } from "@/types/globalTypes";
// import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
// import { useAppDispatch } from "@/redux/hooks";
// import { addToCart } from "@/redux/features/cart/cartSlice";
import { HiOutlineHeart } from "react-icons/hi";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  // const dispatch = useAppDispatch();

  // const handleAddProduct = (book: IBook) => {
  //   dispatch(addToCart(book));
  //   toast({
  //     description: "Product Added",
  //   });
  // };
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
        {/* <p className="line-clamp-3">Price: ${book?.price}</p> */}
        <div className="flex items-center justify-between gap-3">
          <Link to={`/book-details/${book._id}`} className="w-full">
            <Button variant="default" className="w-full">
              View details
            </Button>
          </Link>
          <Button className="rounded-full p-2">
            <HiOutlineHeart size="25" />
            {/* <HiHeart size="25" /> */}
          </Button>
        </div>
      </div>
    </div>
  );
}
