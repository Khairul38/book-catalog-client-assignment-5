import Loader from "@/components/ui/Loader";
import { notify } from "@/components/ui/Toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/features/book/bookApi";
import { IBook } from "@/types/globalTypes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const { data, isLoading } = useGetSingleBookQuery(id);
  const [updateBook, { isLoading: updateLoading, isSuccess, error }] =
    useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    updateBook({
      id,
      data: { ...data, rating: Number(data.rating), price: Number(data.price) },
    });
  };
  useEffect(() => {
    if (error) {
      notify("error", (error as any)?.data.message);
    }
    if (isSuccess) {
      notify("success", "Book update successfully");
      navigate(from, { replace: true });
    }
  }, [isSuccess, error]);

  if (isLoading) return <Loader />;

  const {
    title,
    author,
    genre,
    publicationYear,
    image,
    description,
    rating,
    price,
  } = data.data;
  return (
    <div className="flex justify-center mx-auto">
      <div className="w-[50%] my-10">
        <p className="text-center text-5xl font-semibold mb-10">Edit Book</p>
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
                  defaultValue={title}
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
                  defaultValue={author}
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
                  defaultValue={genre}
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
                  defaultValue={publicationYear}
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
                  defaultValue={image}
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
                  defaultValue={description}
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
                  defaultValue={rating}
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
                  defaultValue={price}
                  {...register("price", {
                    required: "Price is required",
                  })}
                />
                {errors.price && <p>{errors.price.message}</p>}
              </div>
            </div>
            <Button>
              {updateLoading ? <Loader color="text-white" /> : "Update Book"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
