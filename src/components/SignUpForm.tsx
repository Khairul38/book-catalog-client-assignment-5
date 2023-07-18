"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./ui/Loader";
import { notify } from "./ui/Toastify";
import useAuth from "@/hooks/useAuth";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [signup, { data, isLoading, error: resError }] = useSignupMutation();

  console.log(data, resError);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const isLoggedIn = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
    if (resError) {
      notify("error", (resError as any)?.error);
    }
    if (data?.data?.accessToken) {
      notify("success", "User signup successfully");
      navigate(from, { replace: true });
      // navigate("/");
    }
  }, [data, resError]);

  const onSubmit = (data: SignupFormInputs) => {
    console.log(data);

    if (data.password !== data.confirmPassword) {
      console.log("first");
      notify("error", "Password do not match");
    } else {
      signup({
        name: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="First name"
              type="text"
              autoCapitalize="none"
              autoComplete="first name"
              autoCorrect="off"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <Label className="sr-only" htmlFor="name">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Last name"
              type="text"
              autoCapitalize="none"
              autoComplete="last name"
              autoCorrect="off"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            {/* <Label className="sr-only" htmlFor="email">
              Email
            </Label> */}
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="Your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Input
              id="confirmPassword"
              placeholder="Confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
          </div>
          <Button>
            {isLoading ? <Loader color="text-white" /> : "Create Account"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-between"
      >
        <p>Google</p>
        <FcGoogle />
      </Button>
    </div>
  );
}
