import type { NextPage } from "next";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { useKeenSlider } from "keen-slider/react";

import { GameBanner } from "../components/GameBanner";
import { CreateAddBanner } from "../components/CreateAddBanner";
import { api } from "../services/axios";

import { CreateAddModal } from "../components/CreateAddModal";
import Image from "next/image";
import { Power } from "phosphor-react";
import { signOut, useSession } from "next-auth/react";
import { CreateGameModal } from "../components/CreateGameModal";
import { Toaster } from "react-hot-toast";

interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [modal, setModal] = useState("");

  function handleSelectedModalCreateAds() {
    setModal("addAdsModal");
  }

  function handleSelectedModalCreateGame() {
    setModal("addGameModal");
  }

  const [ref, slider] = useKeenSlider<HTMLDivElement>(
    {
      slides: { perView: 6, spacing: 10, origin: "auto" },
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
      <Toaster />
      {session && (
        <button
          onClick={() => signOut()}
          type="button"
          className="absolute right-36 text-red-600"
        >
          <Power size={40} />
          Sair
        </button>
      )}
      <Image src="/logo.svg" width={577} height={200} alt="Logo eSports" />
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
        <CreateAddBanner
          onAddAds={handleSelectedModalCreateAds}
          onAddGame={handleSelectedModalCreateGame}
        />

        {modal === "addAdsModal" && <CreateAddModal />}
        {modal === "addGameModal" && <CreateGameModal />}
      </Dialog.Root>
    </div>
  );
};

export default Home;
