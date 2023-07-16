import ProductReview from "@/components/ProductReview";
import { Button } from "@/components/ui/button";
import { useSingleProductsQuery } from "@/redux/features/products/productApi";
// import { IBook } from "@/types/globalTypes";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  const { data: book } = useSingleProductsQuery(id);

  return (
    <div className="px-10 xl:px-20 py-10">
      <div className="flex mx-auto items-center border-b border-gray-300 gap-12 pb-10">
        <div className="w-[30%]">
          <img className="w-full" src={book?.image} alt={book?.title} />
        </div>
        <div className="w-[70%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Genre: {book?.genre}</p>
          <p className="text-xl">Publication Date: {book?.publicationDate}</p>
          <p className="text-xl">Rating: {book?.rating}</p>
          <p className="text-xl">Description: {book?.description}</p>
          <ul className="space-y-1 text-lg">
            {book?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="space-x-3">
            <Button>Edit</Button>
            <Button>Delete</Button>
          </div>
        </div>
      </div>
      <ProductReview id={id!} />
    </div>
  );
}
