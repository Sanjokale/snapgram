"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2 } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

export default function CreatePostPage() {
  const { userDetails } = useSelector((state) => state.user);
  const router = useRouter();
  const [image, setImage] = useState(null);
  const { toast } = useToast();

  //console.log(userDetails)

  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Post content is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("content", values.content);
      if (image) {
        formData.append("image", image);
      }
      formData.append("user", userDetails?.user?._id);
      console.log(formData);

      const { data } = await axios.post(`http://localhost:8080/post`, formData);

      if (data) {
        toast({
          title: data.msg,
        });
      }

      console.log("Post created:", data.msg);
      router.push("/");
    } catch (error) {
      //console.error("Error creating post:", error);
      // Handle error (you might want to show an error message to the user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <Formik
          initialValues={{ content: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isSubmitting, errors, touched }) => (
            <Form>
              <CardContent className="space-y-4">
                <Textarea
                  name="content"
                  placeholder="What's on your mind?"
                  value={values.content}
                  onChange={handleChange}
                  rows={5}
                  className={`resize-none ${
                    errors.content && touched.content ? "border-red-500" : ""
                  }`}
                />
                {errors.content && touched.content && (
                  <div className="text-red-500 text-sm">{errors.content}</div>
                )}
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage(file);
                      }
                    }}
                  />
                  {image && (
                    <span className="text-sm text-muted-foreground">
                      Image selected
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Post
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
