import { useEffect, useState, useContext } from "react";
import api from "../services/api.js";
import PostCard from "../components/PostCard.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

export default function HomeFeedPage() {
  const [posts, setPosts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/feed").then(res => setPosts(res.data));
    if (user) {
      api.get(`/recommendations/${user.id}`).then(res => setRecommendations(res.data));
    }
  }, [user]);

  return (
    <div className="page feed-page">
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h3>Recommended for You</h3>
          {recommendations.map(p => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
      <div className="feed-section">
        <h3>Your Feed</h3>
        {posts.map(p => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

