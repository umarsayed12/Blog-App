import React, { useEffect, useState } from "react";
import services from "../appwrite/database";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage, username }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    services.getFilePreview(featuredImage).then((img) => {
      setImage(img);
    });
  }, [image]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full flex justify-center mb-4">
          <img
            src={image}
            alt={title}
            className="w-full max-w-[300px] h-[200px] object-cover rounded-lg"
          />
        </div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
        <h3 className="text-sm text-gray-500 text-center">
          Author: {username}
        </h3>
      </div>
    </Link>
  );
}

export default PostCard;
