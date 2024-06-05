import Image from "next/image";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Set the initial theme class on the body element
    document.body.classList.add(theme);
  }, []);

  useEffect(() => {
    // Update the body class when the theme changes
    document.body.classList.remove(theme === "light" ? "dark" : "light");
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex justify-between p-3 items-center align-middle border-b-[2px] border-[#ff4d2b]">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1
        className="hover:cursor-pointer"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "bold",
          fontSize: "25px",
          color: "#1E3A8A",
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        Player-Buddy
      </h1>

      <div className="flex gap-2 items-center justify-end flex-1">
        {session ? (
          <div className="flex items-center gap-4">
            <button
              className="bg-blue-400 p-2 px-2 text-white rounded-full"
              onClick={() => {
                router.push("/create-post");
              }}
            >
              <span className="hidden sm:block">Create Post</span>
              <HiOutlinePencilAlt className="sm:hidden text-[20px]" />
            </button>
            <button
              className="p-2 px-2 text-white rounded-full border-[1px] bg-gray-200 dark:bg-gray-800"
              onClick={() => signOut()}
            >
              <span className="hidden sm:block">Sign Out</span>
              <HiArrowLeftOnRectangle className="sm:hidden text-[20px]" />
            </button>
            {session.user.image && (
              <Image
                src={session.user.image}
                width={60}
                height={30}
                alt="User image"
                className="p-1 rounded-full cursor-pointer"
                onClick={() => router.push("/profile")}
              />
            )}
          </div>
        ) : (
          <button
            className="p-2 px-2 text-white rounded-full border-[1px] bg-gray-200 dark:bg-gray-800"
            onClick={() => signIn()}
          >
            <span className="hidden sm:block">Sign In</span>
            <HiArrowLeftOnRectangle className="sm:hidden text-[20px]" />
          </button>
        )}
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full ml-4"
        >
          {theme === "light" ? (
            <HiOutlineMoon className="text-gray-800 dark:text-gray-200" />
          ) : (
            <HiOutlineSun className="text-gray-800 dark:text-gray-200" />
          )}
        </button>
      </div>
    </header>
  );
}
