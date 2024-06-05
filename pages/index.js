import GameList from "@/components/Home/GameList";
import Hero from "@/components/Home/Hero";
import Search from "@/components/Home/Search";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import app from "@/shared/FirebaseConfig";
import { useEffect, useState } from "react";
import Data from "@/shared/Data";
import Posts from "@/components/Home/Posts";

export default function Index() {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const currentDate = new Date();
      const postsData = snapshot.docs
        .map((doc) => doc.data())
        .filter((post) => {
          const postDate = new Date(post.date);
          return postDate >= currentDate;
        });
      setPosts(postsData);
      setFilteredPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSearch = (searchText) => {
    if (searchText) {
      const lowercaseSearchText = searchText.toLowerCase();
      const filtered = posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(lowercaseSearchText) ||
          post.location.toLowerCase().includes(lowercaseSearchText) ||
          (post.zip && post.zip.includes(searchText)) ||
          post.desc.toLowerCase().includes(lowercaseSearchText)
        );
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  const handleGameClick = (gameName) => {
    setSelectedGame(gameName);
    const lowercaseGameName = gameName.toLowerCase();
    if (lowercaseGameName === "all") {
      setFilteredPosts(posts);
    } else if (lowercaseGameName === "other games") {
      const filtered = posts.filter((post) => {
        const lowercaseTitle = post.title.toLowerCase();
        return !Data.GameList.some(
          (game) => game.name.toLowerCase() === lowercaseTitle
        );
      });
      setFilteredPosts(filtered);
    } else {
      const filtered = posts.filter((post) => {
        const lowercaseTitle = post.title.toLowerCase();
        return lowercaseTitle.includes(lowercaseGameName);
      });
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="px-5 sm:px-7 mg:px-10 mt-9">
      <Hero />
      <Search onSearch={handleSearch} />
      <GameList onGameClick={handleGameClick} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredPosts.length === 0 && (
            <p className="text-center mt-4">
              No games available for this category
            </p>
          )}
          {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        </>
      )}
    </div>
  );
}
