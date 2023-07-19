import { Button } from "@/components/ui/button";
import banner from "@/assets/images/banner.png";
import { Link } from "react-router-dom";
import Footer from "@/layouts/Footer";
import BookCard from "@/components/BookCard";
import { IBook } from "@/types/globalTypes";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import Loader from "@/components/ui/Loader";

export default function Home() {
  const { data } = useGetBooksQuery({});

  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] mx-auto px-10 xl:px-20">
        <div className="">
          <h1 className="text-6xl font-black text-primary mb-2">
            Read Your <br /> Favorite Books
          </h1>
          <p className="text-secondary font-semibold text-xl">
            From <span className="text-violet-600">BOOK CATALOG</span>
          </p>
          <div className="text-primary mt-20">
            <p>
              BOOK CATALOG is one of the biggest online book’s libraries in
              Bangladesh.
            </p>
            <p>We’ve got a large Bengali eBooks collection for all of you.</p>
            <p>Visit our site regularly to read your desired Bangla Books.</p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="w-6/12">
          <img className="" src={banner} alt="banner" />
        </div>
      </div>
      <div className="mb-60 px-10 xl:px-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10">
            Top 10 recently added books
          </h1>
          {data === undefined ? (
            <Loader />
          ) : (
            <div className="col-span- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 xl:gap-10 2xl:gap-24 py-20">
              {[...data.data]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 10)
                .map((book: IBook) => (
                  <BookCard book={book} key={book._id} />
                ))}
            </div>
          )}
          <Button className="mt-10" asChild>
            <Link to="/allBooks">Brows all books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
