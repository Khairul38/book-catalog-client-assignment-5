import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FiSend } from "react-icons/fi";
import {
  useGetReviewsQuery,
  usePostReviewMutation,
} from "@/redux/features/book/bookApi";
import { IReview } from "@/types/globalTypes";
import Loader from "./ui/Loader";
import avatar from "../assets/images/avatar-04.jpg";
import { useAppSelector } from "@/redux/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { notify } from "./ui/Toastify";

interface IProps {
  id: string;
}

export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetReviewsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [postReview, { isLoading: postLoading, isSuccess }] =
    usePostReviewMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user) {
      const reviewData = {
        id: id,
        data: {
          userName: `${user.name.firstName} ${user.name.lastName}`,
          userEmail: user.email,
          message: inputValue,
        },
      };
      postReview(reviewData);
      setInputValue("");
    } else {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (isSuccess) return notify("success", "Review send successfully");
  }, [isSuccess]);

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
          placeholder="Please provide your review..."
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          {postLoading ? <Loader color="text-white" /> : <FiSend />}
        </Button>
      </form>
      <div className="mt-10">
        {[...data.data]
          .sort(
            (a: IReview, b: IReview) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((review: IReview, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{review.userName}</p>
                <p>{review.message}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
