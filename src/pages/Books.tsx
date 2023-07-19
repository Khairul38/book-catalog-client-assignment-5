import BookCard from "@/components/BookCard";
import AccordionBasic from "@/components/ui/AccordionBasic";
import Loader from "@/components/ui/Loader";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/globalTypes";
import { useState } from "react";

const filtersData = [
  {
    title: "Genre",
    options: [
      "Computer and Programming",
      "Motivational",
      "Self-Development",
      "Fiction",
      "Islamic",
      "Fantasy romance",
      "Science Fiction",
      "Novels",
      "Liberation War",
      "Story",
      "Romantic, Novels",
      "Poetry",
      "Essay",
    ],
  },
  {
    title: "Publication Year",
    options: [
      "2022",
      "2018",
      "2017",
      "2016",
      "2009",
      "2008",
      "1998",
      "1995",
      "1985",
      "1976",
      "1948",
      "1935",
      "1929",
      "1922",
      "1920",
      "1903",
      "1866",
    ],
  },
];

export default function Books() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [publicationYear, setPublicationYear] = useState<string>("");

  const { data, isLoading } = useGetBooksQuery({
    searchTerm,
    genre,
    publicationYear,
  });

  const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-12 mx-auto relative px-10 xl:px-20 pt-5">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-4 self-start sticky top-[84px] h-[calc(100vh-100px)]">
        {/* Search form */}
        <div className="mb-5">
          <form className="relative">
            <input
              onChange={debounce(handleSearch, 300)}
              className="rounded-md w-full pl-9 py-1 border border-slate-200 hover:border-slate-300 focus:border-violet-300 focus:ring-violet-300"
              type="search"
              placeholder="Search book"
            />
            <button
              onClick={(e) => e.preventDefault()}
              className="absolute inset-0 right-auto group"
              type="submit"
              aria-label="Search"
            >
              <svg
                className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-600 ml-3 mr-2"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="">
          <h1 className="text-xl uppercase">Filters</h1>
          <div className="mt-3 space-y-2 max-h-[calc(100vh-229px)] overflow-auto scrollbar-none">
            {filtersData.map((fd) => (
              <AccordionBasic key={fd.title} title={fd.title}>
                <ul className="space-y-2">
                  {fd.options.map((o) => (
                    <li key={o}>
                      <label className="flex items-center cursor-pointer">
                        <input
                          checked={
                            (fd.title === "Genre" && genre === o) ||
                            (fd.title === "Publication Year" &&
                              publicationYear === o)
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              fd.title === "Genre"
                                ? setGenre(o)
                                : setPublicationYear(o);
                            } else {
                              fd.title === "Genre"
                                ? setGenre("")
                                : setPublicationYear("");
                            }
                          }}
                          type="checkbox"
                          className="h-4 w-4 border border-gray-500 rounded text-violet-500 focus:ring-transparent cursor-pointer"
                        />
                        <span className="text-sm text-slate-600 font-medium ml-2">
                          {o}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </AccordionBasic>
            ))}
          </div>
        </div>
      </div>
      {data?.data.length === 0 ? (
        <p className="col-span-9 text-2xl my-32 font-semibold text-center">
          There is no book. Please add new book
        </p>
      ) : (
        <div className="col-span-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 xl:gap-10 2xl:gap-24 pb-20">
          {data?.data?.map((book: IBook) => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
      )}
    </div>
  );
}
