import React from "react";
import services from "../appwrite/database";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={services.getFilePreview(featuredImage)}
            alt={title}
            className="text-xl font-bold"
          />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
