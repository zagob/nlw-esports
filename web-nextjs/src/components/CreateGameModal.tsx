import * as Dialog from "@radix-ui/react-dialog";

import { GameController } from "phosphor-react";
import { Input } from "./form/Input";
import { api } from "../services/axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddGameProps {
  title: string;
  bannerUrl: string;
}

export function CreateGameModal() {
  const { register, handleSubmit, watch, control, reset } =
    useForm<AddGameProps>();

  async function handleCreateGame(data: AddGameProps) {
    try {
      if (!data.bannerUrl.includes("https")) {
        return toast.error("Banner URL inválido");
      }

      await api.post(`games`, data);
      toast.success("Game criado com sucesso!");
      reset();
    } catch (err) {
      alert("Erro ao criado com sucesso");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/40">
        <Dialog.Title className="text-3xl font-black">
          Publique um jogo para encontrar jogadores
        </Dialog.Title>

        <form
          onSubmit={handleSubmit(handleCreateGame)}
          className="mt-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              Qual o game?
            </label>
            <Input
              type="text"
              id="title"
              placeholder="Nome do jogo"
              register={{ ...register("title") }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Imagem</label>
            <Input
              type="text"
              id="bannerUrl"
              placeholder="Link da imagem"
              register={{ ...register("bannerUrl") }}
            />
          </div>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 p-5 h-12 rounded-md font-semibold items-center flex">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 p-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Publicar
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
