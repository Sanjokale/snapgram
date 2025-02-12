"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Validation Schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password requires at least one number")
    .required("Password is required"),

  bio: Yup.string().max(500, "Bio must not exceed 500 characters"),
  location: Yup.string(),
  website: Yup.string().url("Invalid URL"),
});

const RegisterForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",

    bio: "",
    location: "",
    website: "",
  };

  const { toast } = useToast();

  const handleSubmit = async (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    try {
        const { data } = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/register",
          values
        );
        if (data) {
          toast({
            title: data.msg,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: error?.response?.data?.msg,
        });
      }

    setSubmitting(false);
  };

  return (
    <Card className=" w-[30%] mx-auto mt-8">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your new account</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username*</Label>
                <Field name="username">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter username"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-sm text-destructive"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Field name="email">
                  {({ field }) => (
                    <Input {...field} type="email" placeholder="Enter email" />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-destructive"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password*</Label>
                <Field name="password">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-destructive"
                />
              </div>

             

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Field name="bio">
                  {({ field }) => (
                    <Textarea {...field} placeholder="Tell us about yourself" />
                  )}
                </Field>
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-sm text-destructive"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Field name="location">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter location"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-sm text-destructive"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Field name="website">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter website URL"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="website"
                  component="div"
                  className="text-sm text-destructive"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
