import React, { useEffect, useState } from "react";
import { Button, Container, PostCard } from "../Components";
import services from "../appwrite/database";
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function MyPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  useEffect(() => {
    services.getAllPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  const myposts = posts.filter((post) => post.userId === userData.$id);
  if (myposts.length)
    return (
      <div className="py-8 h-full">
        <Container>
          <Typography className="text-4xl text-center p-4 border-y-2 mb-5 bg-black text-white rounded-md">
            My Posts
          </Typography>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {myposts &&
              myposts.map((post) => (
                <div key={post.$id} className="w-full">
                  <PostCard {...post} />
                </div>
              ))}
          </div>
        </Container>
      </div>
    );
  else
    return (
      <div className="flex justify-center items-center gap-2">
        <Typography className="text-2xl">
          You haven't posted anything yet. Write your First Blog here
        </Typography>{" "}
        <Button
          className="hover:bg-[#1d58d8]"
          onClick={() => navigate("/add-post")}
        >
          Add Post
        </Button>
      </div>
    );
}

export default MyPosts;
