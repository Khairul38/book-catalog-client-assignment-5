import Loader from "@/components/ui/Loader";
import { notify } from "@/components/ui/Toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddSingleBookMutation,
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/reduxHooks";
import { IBook } from "@/types/globalTypes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function AddBook() {
  // const { id } = useParams();

  const { user } = useAppSelector((state) => state.auth);
  // const location = useLocation();
  const navigate = useNavigate();

  // const from = location.state?.from?.pathname || "/";

  // const { data, isLoading } = useGetSingleBookQuery(id);
  const [addSingleBook, { isLoading, isSuccess, error }] =
    useAddSingleBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    console.log(data);
    addSingleBook({
      ...data,
      rating: Number(data.rating),
      price: Number(data.price),
      postedBy: user?._id,
      reviews: [],
    });
  };
  console.log(error);
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
            <div className="grid gap-2">
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
                {errors.title && <p>{errors.title.message}</p>}
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
                {errors.author && <p>{errors.author.message}</p>}
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
                {errors.genre && <p>{errors.genre.message}</p>}
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
                  <p>{errors.publicationYear.message}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Image</p>
                <Input
                  id="Image"
                  placeholder="Image"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  {...register("image", {
                    required: "Image is required",
                  })}
                />
                {errors.image && <p>{errors.image.message}</p>}
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
                {errors.description && <p>{errors.description.message}</p>}
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
                {errors.rating && <p>{errors.rating.message}</p>}
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
                {errors.price && <p>{errors.price.message}</p>}
              </div>
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
