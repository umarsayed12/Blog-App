import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../appwrite/database";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";

function PostPage() {
  const [post, setPost] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && (userData ? post.userId === userData.$id : false);

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((post) => {
        if (post) {
          services.getFilePreview(post.featuredImage).then((image) => {
            setFeaturedImage(image);
          });
          setPost(post);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate, post]);

  const deletePost = () => {
    services.deletePost(post.$id).then((status) => {
      if (status) {
        services.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8 h-screen overflow-y-scroll">
      <Container>
        <div className="relative mx-auto max-w-screen-md">
          <img src={featuredImage} alt={post.title} className="rounded-xl" />

          {isAuthor && (
            <div className="absolute right-12 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <Typography
            variant="h2"
            color="blue-gray"
            className="my-4 font-black text-4xl !leading-snug"
          >
            {post.title}
          </Typography>
        </div>
        <Typography className="font-normal !text-gray-700">
          <div className="browser-css">{parse(post.content)}</div>
        </Typography>
      </Container>
    </div>
  ) : null;
}

export default PostPage;
