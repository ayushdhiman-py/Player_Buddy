import GameList from "@/components/Home/GameList";
import Hero from "@/components/Home/Hero";
import Search from "@/components/Home/Search";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import app from "@/shared/FirebaseConfig";
import { useEffect, useState } from "react";
import Posts from "@/components/Home/Posts";

export default function Index() {
  const db = getFirestore(app);

  const [post, setPost] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const snapshot = await getDocs(collection(db, "posts"));
    snapshot.forEach((doc) => {
      setPost((post) => [...post, doc.data()]);
    });
  };

  return (
    <div className="px-5 sm:px-7 mg:px-10 mt-9">
      <Hero />
      <Search />
      <GameList />
      {post && <Posts posts={post} />}
    </div>
  );
}
