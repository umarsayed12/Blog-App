import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components";
import services from "../appwrite/database";
import { Typography } from "@material-tailwind/react";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    services.getAllPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div className="py-8 h-full">
      <Container>
        <Typography className="text-4xl text-center p-4 border-y-2 mb-5 bg-black text-white rounded-md">
          All Posts
        </Typography>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {posts &&
            posts.map((post) => {
              return (
                <div key={post.$id} className="w-full">
                  <PostCard {...post} />
                </div>
              );
            })}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
