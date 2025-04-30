import Post from "../partials/Post";
import { useEffect, useState } from "react";

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    const url = search
      ? `https://thewondererspenbackend.onrender.com/post?search=${encodeURIComponent(search)}`
      : "https://thewondererspenbackend.onrender.com/post";

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]); // refetch on search change

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "60%",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "30px",
          fontSize: "16px"
        }}
      />
      <div>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} {...post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
