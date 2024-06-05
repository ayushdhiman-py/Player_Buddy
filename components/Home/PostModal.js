import React from "react";
import PostItem from "./PostItem";
import { HiOutlineXCircle } from "react-icons/hi";

function PostModal({ post }) {
  return (
    <div>
      <dialog id="my_modal_1" className="modal p-0 rounded-lg h-100 w-96 bg-opacity-40">
        <form method="dialog" className="modal-box">
          <button className="absolute right-2 top-2 bg-orange-600 rounded-lg ">
            <HiOutlineXCircle className="text-[30px] text-black" />
          </button>
          <PostItem post={post} />
        </form>
      </dialog>
    </div>
  );
}

export default PostModal;
