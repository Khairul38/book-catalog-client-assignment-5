import Loader from "@/components/ui/Loader";
import { notify } from "@/components/ui/Toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddSingleBookMutation,
} from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/reduxHooks";
import { IBook } from "@/types/globalTypes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddBook() {

  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [addSingleBook, { isLoading, isSuccess, error }] =
    useAddSingleBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    // console.log(data)
    addSingleBook({
      ...data,
      rating: Number(data.rating),
      price: Number(data.price),
      postedBy: user?._id,
      reviews: [],
    });
  };
  useEffect(() => {
    if (error) {
      notify("error", (error as any)?.data.message);
    }
    if (isSuccess) {
      notify("success", "Book added successfully");
      navigate("/allBooks");
    }
  }, [isSuccess, error]);
  return (
    <div className="flex justify-center mx-auto">
      <div className="w-[50%] my-10">
        <p className="text-center text-5xl font-semibold mb-10">Add New Book</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-2 mb-4">
              <div>
                <p className="font-semibold">Title</p>
                <Input
                  id="Title"
                  placeholder="Title"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Author</p>
                <Input
                  id="Author"
                  placeholder="Author"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  {...register("author", { required: "Author is required" })}
                />
                {errors.author && (
                  <p className="text-red-500">{errors.author.message}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Genre</p>
                <Input
                  id="Genre"
                  placeholder="Genre"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  {...register("genre", { required: "Genre is required" })}
                />
                {errors.genre && (
                  <p className="text-red-500">{errors.genre.message}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Publication Year</p>
                <Input
                  id="Publication Year"
                  placeholder="Publication Year"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  {...register("publicationYear", {
                    required: "Publication Year is required",
                  })}
                />
                {errors.publicationYear && (
                  <p className="text-red-500">
                    {errors.publicationYear.message}
                  </p>
                )}
              </div>
              <div>
                <p className="font-semibold">Image</p>
                <Input
                  id="Image"
                  placeholder="Image URL"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  {...register("image", {
                    required: "Image is required",
                  })}
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Description</p>
                <Textarea
                  className="h-[50px]"
                  id="Description"
                  placeholder="Description"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  // onChange={handleChange}
                  // value={inputValue}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Rating</p>
                <Input
                  id="Rating"
                  placeholder="Rating"
                  type="number"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  {...register("rating", {
                    required: "Rating is required",
                  })}
                />
                {errors.rating && (
                  <p className="text-red-500">{errors.rating.message}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Price</p>
                <Input
                  id="Price"
                  placeholder="Price"
                  type="number"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  {...register("price", {
                    required: "Price is required",
                  })}
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>
              {/* <div>
                <p className="font-semibold">PDF File</p>
                <Input
                  className="focus:outline-none"
                  id="PDF"
                  placeholder="PDF"
                  type="file"
                  accept=".pdf"
                  {...register("pdf", {
                    required: "PDF File is required",
                  })}
                />
                {errors.pdf && (
                  <p className="text-red-500">{errors.pdf.message}</p>
                )}
              </div> */}
            </div>
            <Button>
              {isLoading ? <Loader color="text-white" /> : "Add New Book"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
