import React, { useEffect, useState } from "react";
import Data from "../../shared/Data";
import { useSession } from "next-auth/react";
import app from "./../../shared/FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Toast from "../Toast";
import { useRouter } from "next/router";

function Form() {
  const [inputs, setInputs] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    if (session) {
      setInputs((values) => ({ ...values, userName: session.user?.name }));
      setInputs((values) => ({ ...values, userImage: session.user?.image }));
      setInputs((values) => ({ ...values, email: session.user?.email }));
    }
  }, [session]);

  useEffect(() => {
    if (submit) {
      savePost();
    }
  }, [submit]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storageRef = ref(storage, "findplayer/" + file?.name);

      await uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
        })
        .then((resp) => {
          getDownloadURL(storageRef).then(async (url) => {
            setInputs((values) => ({ ...values, image: url }));
            setSubmit(true);
          });
        })
        .then(setShowToast(true))
        .then(
          setTimeout(() => {
            {
              inputs && router.push("/");
            }
          }, 3000)
        );
    } catch (error) {
      console.error("Error uploading file:", error.message());
      alert("error is caught here!");
    }
  };

  const savePost = async () => {
    await setDoc(doc(db, "posts", Date.now().toString()), inputs);
  };


  return (
    <div className="mt-4">
      {showToast ? (
        <div className="absolute top-10 right-10">
          <Toast
            msg={"Post Created Successfully"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md text-black"
        />
        <textarea
          name="desc"
          className="w-full mb-4 border-[1px] p-2 rounded-md text-black"
          required
          onChange={handleChange}
          placeholder="Write Description here"
        />

        <input
          type="date"
          placeholder="dd-mm-yyyy"
          name="date"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md text-black"
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md text-black"
        />
        <input
          type="text"
          placeholder="Zip"
          name="zip"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md text-black"
        />
        <select
          name="game"
          onChange={handleChange}
          required
          className="w-full mb-4 border-[1px] p-2 rounded-md text-black"
          defaultValue="ALL" // Set default value to "ALL"
        >
          <option value="ALL">Select Game</option> {/* Placeholder option */}
          {Data.GameList.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full p-1 
rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
