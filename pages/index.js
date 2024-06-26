import GameList from "@/components/Home/GameList";
import Hero from "@/components/Home/Hero";
import Search from "@/components/Home/Search";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import app from "@/shared/FirebaseConfig";
import { useEffect, useState } from "react";
import Data from "@/shared/Data"; // Import Data object
import Posts from "@/components/Home/Posts";

export default function Index() {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const currentDate = new Date(); // Get the current date
      const postsData = snapshot.docs
        .map((doc) => doc.data())
        .filter((post) => {
          const postDate = new Date(post.date);
          // Return true if the post date is after or equal to the current date
          return postDate >= currentDate;
        });
      setPosts(postsData);
      setFilteredPosts(postsData); // Initially show all posts
      setLoading(false); // Set loading to false once posts are fetched
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
          post.desc.toLowerCase().includes(lowercaseSearchText) ||
          post.game.toLowerCase().includes(lowercaseSearchText)
        );
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // If search text is empty, show all posts
    }
  };

  const handleGameClick = (gameName) => {
    setSelectedGame(gameName);
    const lowercaseGameName = gameName.toLowerCase(); // Convert game name to lowercase for case-insensitive comparison

    if (lowercaseGameName === "all") {
        setFilteredPosts(posts); // If "ALL" is clicked, show all posts
    } else if (lowercaseGameName === "other games") {
        // Filter posts for games that are not in the main list (excluding "Other Games" category)
        const mainGames = ["cricket", "tennis", "ping pong", "football", "badminton", "trekking"];
        const filtered = posts.filter((post) => {
            const lowercaseGame = post.game.toLowerCase(); // Convert post game to lowercase
            return !mainGames.includes(lowercaseGame); // Exclude main games
        });
        setFilteredPosts(filtered);
    } else {
        // Show posts that match the selected game
        const filtered = posts.filter((post) => {
            const lowercaseGame = post.game.toLowerCase(); // Convert post game to lowercase
            return lowercaseGame === lowercaseGameName; // Check if post game matches the selected game name
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
