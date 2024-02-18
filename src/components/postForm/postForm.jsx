import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "../index";
import { RTE } from "../index";
import { Button } from "../index";
import { Select } from "../index";
import appwriteService from "../../appwrite/config_1";

export default function PostForm({ post }) {
  // const { register, handleSubmit, watch, setValue, control, getValues } =
  //   useForm({
  //     defaultValues: {
  //       title: post?.title || "",
  //       slug: post?.$id || "",
  //       content: post?.content || "",
  //       status: post?.status || "active",
  //     },
  //   });
    const { register, handleSubmit, watch, setValue, control, getValues, formState: {errors} } = useForm({
      defaultValues: {
          title: post?.title || "",
          slug: post?.$id || "",
          content: post?.content || "",
          status: post?.status || "active",
      },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null ;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,});

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex sm: justify-center flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { 
            required: { value: true, message: 'Invalid Title' },
            minLength: { value: 5, message: 'Title must be at least 5 characters long' },
            maxLength: { value: 50, message: 'Title cannot exceed 50 characters' },
         })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { 
            required: { value: true, message: 'Invalid Slug' },
            minLength: { value: 5, message: 'Slug must be at least 5 characters long' },
            maxLength: { value: 50, message: 'Slug cannot exceed 50 characters' },
         })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-10/12 lg:w-2/5 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: { value: !post,  message: 'No Image Uploaded' } })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 dark:bg-gray-700  text-white border-gray-600"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
