import Data from "@/shared/Data";
import React, { useEffect, useState } from "react";

function GameList() {
  const [games, setGames] = useState();

  useEffect(() => {
    setGames(Data.GameList);
    console.log(games);
  }, []);

  console.log("games", games);
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mt-10">
      {games &&
        games.map((item) => (
          <div>
            <div className="flex flex-col items-center cursor-pointer hover:animate-bounce transition-all ">
              <img src={item.image} width={45} height={45} />
              <h3 className="text-[14px] text-center">{item.name}</h3>
            </div>
          </div>
        ))}
    </div>
  );
}

export default GameList;
