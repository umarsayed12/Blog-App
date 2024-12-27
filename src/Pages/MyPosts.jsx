import React, { useEffect, useState } from "react";
import { Button, Container, Loader, PostCard } from "../Components";
import services from "../appwrite/database";
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function MyPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    services.getAllPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);
  if (loading) return <Loader />;
  const myposts = posts?.filter((post) => post.userId === userData?.$id);
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
      <div className="flex flex-col flex-wrap justify-center items-center gap-2">
        <Typography className="text-xl text-center">
          You haven't posted anything yet. Write your First Blog.
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
