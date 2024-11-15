"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import axios from "axios";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUpForm() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signUpSchema),
    onSubmit: async (values) => {
      console.log(values);
      try {
        axios.post("http://localhost:8000/register", values);
        alert("register successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="h-[80%] bg-black text-white flex items-center justify-center p-4 rounded-lg">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create a new account
          </h1>
          <p className="text-sm text-gray-400">
            To use snapgram, Please enter your details.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="sr-only">
              fullName
            </Label>
            <Input
              id="fullName"
              placeholder="Full Name"
              type="text"
              {...formik.getFieldProps("fullName")}
              className={`bg-transparent border-gray-800 ${
                formik.touched.fullName && formik.errors.fullName
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-xs text-red-500">{formik.errors.fullName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              {...formik.getFieldProps("email")}
              className={`bg-transparent border-gray-800 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              {...formik.getFieldProps("password")}
              className={`bg-transparent border-gray-800 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-[#7878FF] hover:bg-[#6a6aff] text-white"
            disabled={formik.isSubmitting}
          >
            Sign Up
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full bg-transparent border-gray-800 text-white hover:bg-gray-800"
          type="button"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </Button>
        <div className="text-center text-sm">
          <span className="text-gray-400">Don&apos;t have an account?</span>{" "}
          <Link href="/login" className="text-[#7878FF] hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
