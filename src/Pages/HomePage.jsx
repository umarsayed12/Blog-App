import React, { useEffect, useState } from "react";
import services from "../appwrite/database";
import { Container, PostCard } from "../Components";
function HomePage() {
  const [allPosts, setPosts] = useState([]);

  useEffect(() => {
    services.getAllPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  });
  if (allPosts.length !== 0)
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {allPosts.map((post) => {
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard post={post} />
              </div>;
            })}
          </div>
        </Container>
      </div>
    );
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-grap-500">
              You are not Logged In! Please Login to see Posts.
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
