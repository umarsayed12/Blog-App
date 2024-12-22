import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components";
import services from "../appwrite/database";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    services.getAllPost([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  });
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts &&
            posts.map((post) => {
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard key={post.$id} post={post} />
              </div>;
            })}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
