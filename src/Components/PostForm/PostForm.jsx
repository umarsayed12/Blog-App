import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import services from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button as MatButton } from "@material-tailwind/react";
function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "Active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [prevImage, setPrevImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const submit = async (data) => {
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;
      if (file) {
        services.deleteFile(post.featuredImage);
      }
      const dbPost = await services.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        setLoading(false);
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await services.createPost({
          ...data,
          userId: userData.$id,
          username: userData.name,
        });
        if (dbPost) {
          setLoading(false);
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  useEffect(() => {
    services.getFilePreview(post?.featuredImage).then((img) => {
      setPrevImage(img);
    });
  }, [prevImage]);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s+/g, "-");
      return "";
    }
  });
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-10">
      <div className="w-full px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
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
      <div className="w-full flex flex-col justify-center gap-5 items-center px-2">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="mb-4 flex justify-center">
              <img src={prevImage} alt={post.$id} height="50px" width="100px" />
            </div>
          )}
          <Select
            options={["Active", "Inactive"]}
            label="Status"
            className="md:w-[80%] md:mt-3"
            {...register("status", { required: true })}
          />
        </div>
        <div className="w-full flex justify-center">
          {!loading && (
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-1/3"
            >
              {post ? "Update" : "Submit"}
            </Button>
          )}
          {loading && (
            <MatButton className="w-1/3 flex justify-center" loading={true}>
              Loading
            </MatButton>
          )}
        </div>
      </div>
    </form>
  );
}

export default PostForm;
