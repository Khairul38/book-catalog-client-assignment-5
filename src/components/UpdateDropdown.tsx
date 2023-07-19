"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateWishlistMutation } from "@/redux/features/wishlist/wishlistApi";
import { notify } from "./ui/Toastify";
import Loader from "./ui/Loader";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface IProp {
  options: string[];
  status: string;
  wishlistId: string;
}

export function UpdateDropdown({ options, status, wishlistId }: IProp) {
  const [updateWishlist, { isSuccess, isLoading }] =
    useUpdateWishlistMutation();

  const handleUpdateStatus = (data: string) => {
    updateWishlist({ id: wishlistId, data: { status: data } });
  };

  React.useEffect(() => {
    if (isSuccess) {
      notify("success", "Status update successfully");
    }
  }, [isSuccess]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-[121.13px]">
          {isLoading ? <Loader color="text-white" /> : "Update Status"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {options.map((option: string) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={status === option}
            onCheckedChange={() => handleUpdateStatus(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
