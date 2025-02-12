"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setUserDetails } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const { toast } = useToast();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/login",
        values
      );

      dispatch(setUserDetails(data));
      //console.log(data);

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
    <Card className=" w-[30%] mx-auto ">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Access your account</CardDescription>
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

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
