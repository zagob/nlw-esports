import {
  DiscordLogo,
  GameController,
  MagnifyingGlassPlus,
  UserCircle,
} from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

interface CreateAddBannerProps {
  onAddAds(): void;
  onAddGame(): void;
}

export function CreateAddBanner({ onAddAds, onAddGame }: CreateAddBannerProps) {
  const { data: session } = useSession();

  async function handleSignInDiscord() {
    await signIn("discord");
  }

  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
      <div className="bg-[#2a2634] px-8 py-6 flex items-center justify-between">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
          {!session ? (
            <div className="flex gap-2 text-gray-100 items-center mt-2">
              <span className="text-md">Deseja publicar um jogo? </span>
              <button
                onClick={handleSignInDiscord}
                className="bg-blue-600 p-2 rounded-md text-sm transition-all hover:bg-blue-700 flex items-center gap-2"
                type="button"
              >
                <DiscordLogo size={25} />
                Entrar com discord
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              {!session.user?.image ? (
                <UserCircle size={50} color="#fff" weight="light" />
              ) : (
                <Image
                  src={session.user?.image}
                  width={50}
                  height={50}
                  alt="Avatar"
                  className="rounded-full"
                />
              )}

              <div className="flex flex-col">
                <h2 className="text-lg text-gray-200">
                  Olá, {session.user?.name}
                </h2>
                <span className="text-xs text-gray-400">
                  O que deseja fazer?
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Dialog.Trigger
            onClick={onAddAds}
            className="py-3 px-4 bg-violet-500 text-white rounded transition-all hover:bg-violet-600 flex items-center gap-3"
          >
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
          {session && (
            <Dialog.Trigger
              onClick={onAddGame}
              className="py-3 px-4 bg-violet-500 text-white rounded transition-all hover:bg-violet-600 flex items-center gap-3"
            >
              <GameController size={24} />
              Publicar Jogo
            </Dialog.Trigger>
          )}
        </div>
      </div>
    </div>
  );
}
