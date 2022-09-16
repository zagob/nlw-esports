import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { useKeenSlider } from "keen-slider/react";

import { GameBanner } from "./components/GameBanner";
import { CreateAddBanner } from "./components/CreateAddBanner";
import { api } from "./services/axios";
import logoSvg from "./assets/logo.svg";
import "./styles/main.css";

import { CreateAddModal } from "./components/CreateAddModal";

interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [ref, slider] = useKeenSlider<HTMLDivElement>(
    {
      slides: { perView: 5, spacing: 20, origin: "auto" },
    },
    []
  );
  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    async function getGames() {
      const response = await api.get("games");

      setGames(response.data);
    }

    if (slider) {
      getGames();
    }
  }, [slider]);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoSvg} alt="Logo eSports" />
      <h1 className="text-6xl text-gray-100 font-black mt-20">
        Seu
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>
        está aqui.
      </h1>

      {games.length > 0 && (
        <div ref={ref} className="keen-slider">
          {games.map((game) => (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          ))}
        </div>
      )}

      <Dialog.Root>
        <CreateAddBanner />

        <CreateAddModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
