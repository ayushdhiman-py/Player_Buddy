import React, { useEffect, useState } from "react";
import Data from "@/shared/Data";

function GameList({ onGameClick }) {
  const [games, setGames] = useState();

  useEffect(() => {
    setGames(Data.GameList);
  }, []);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-10">
      {games &&
        games.map((item) => (
          <div key={item.id} onClick={() => onGameClick(item.name)}>
            <div className="flex flex-col items-center cursor-pointer hover:animate-bounce transition-all">
              <img src={item.image} width={45} height={45} alt={item.name} />
              <h3 className="text-[14px] text-center">{item.name}</h3>
            </div>
          </div>
        ))}
    </div>
  );
}

export default GameList;
