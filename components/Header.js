import Image from "next/image";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

// components/Header.js
export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <header className="flex justify-between p-3 items-center align-middle border-b-[2px] border-[#ff4d2b]">
      <img
        width={100}
        src="./Images/logo1.png"
        alt="img"
        className="hover:cursor-pointer rounded-full bg-black"
        onClick={() => router.push("/")}
      />
      <h1 className="font-monotic text-extrabold text-[25px] text-blue-700">Player-Buddy</h1>
      <div className="flex gap-4 items-center align-middle">
        {session ? (
          <div>
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
              className="p-2 px-2 text-white rounded-full border-[1px]"
              onClick={() => signOut()}
            >
              <span className="hidden sm:block">Sign Out</span>
              <HiArrowLeftOnRectangle className="sm:hidden text-[20px]" />
            </button>
          </div>
        ) : (
          <button
            className="p-2 px-2 text-white rounded-full border-[1px]"
            onClick={() => signIn()}
          >
            <span className="hidden sm:block">Sign In</span>
            <HiArrowLeftOnRectangle className="sm:hidden text-[20px]" />
          </button>
        )}
        {session && session.user && session.user.image ? (
          <Image
            src={session.user.image}
            width={60}
            height={30} // Add height prop for better layout
            alt="User image"
            className="p-1 rounded-full cursor-pointer"
            onClick={() => router.push("/profile")}
          />
        ) : (
          <div className="w-[0px] h-[0px] p-0 rounded-full bg-transparent"></div> // Placeholder for when there is no image
        )}
      </div>
    </header>
  );
}
