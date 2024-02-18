import React, { useEffect, useState } from "react";
import { PostCard } from "../components";
import { Container } from "../components";
import appwriteService from "../appwrite/config_1";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const { $id: currentUser } = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="max-w-full p-8">
      <Container>
        <div className="flex flex-wrap justify-around">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full lg:w-1/4">
              <PostCard {...post} currentUser={currentUser} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
