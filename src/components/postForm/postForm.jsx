import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../index";
import RTE from "../index";
import Button from '../index'
import Select from '../index'
import appwriteService from "../../appwrite/config_1";

function PostForm({ post }) {
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "Active",
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);

  const submit = async (data) => {
    // if we have our previous post and want to update then we follow the if case
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }

    // if we don't have any prev post and want upload a fresh post then we'll folow the else case
    else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit = {handleSubmit(submit)} className="flex flex-wrap">
      <div className = "w-2/3 px-2">
        <Input
          label = "Title :"
          placeholder = "Title"
          className = "mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label = "Slug :"
          placeholder = "Slug"
          className = "mb-4"
          {...register("slug", { required: true })}
          onInput = {(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label = "Content :"
          name = "content"
          control = {control}
          defaultValue = {getValues("content")}
        />
      </div>
      <div className = "w-1/3 px-2">
        <Input
          label = "Featured Image :"
          type = "file"
          className = "mb-4"
          accept = "image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className = "w-full mb-4">
            <img
              src = {appwriteService.getFilePreview(post.featuredImage)}
              alt = {post.title}
              className = "rounded-lg"
            />
          </div>
        )}
        <Select
          options = {["active", "inactive"]}
          label = "Status"
          className = "mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type = "submit"
          bgColor = {post ? "bg-green-500" : undefined}
          className = "w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
