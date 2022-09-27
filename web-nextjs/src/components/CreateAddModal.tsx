import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { CaretDown, Check, Divide, GameController } from "phosphor-react";
import { Input } from "./form/Input";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/axios";
import { useForm, Controller } from "react-hook-form";

interface GameProps {
  id: string;
  title: string;
}

export function CreateAddModal() {
  const [games, setGames] = useState<GameProps[]>([]);
  // const { register, handleSubmit, watch, control } = useForm<GameForm>();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [gameSelected, setGameSelected] = useState("");

  async function handleCreateAd(event: FormEvent) {
    // console.log(data);
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await api.post(`games/${gameSelected}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        weekDays: weekDays.map(Number),
        useVoiceChannel,
      });

      alert("Anúncio criado com sucesso");
    } catch (err) {
      alert("Erro ao criado com sucesso");
    }
  }

  useEffect(() => {
    async function getGames() {
      const response = await api.get("games");

      setGames(response.data);
    }

    getGames();
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/40">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root onValueChange={setGameSelected}>
              <Select.Trigger
                name="game"
                className="flex justify-between items-center bg-zinc-900 p-2"
              >
                <Select.Value placeholder="Selecione um game" />
                <Select.Icon>
                  <CaretDown />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal className="">
                <Select.Content className="bg-black w-full border-1">
                  <Select.Viewport className="bg-zinc-900 w-full text-white p-2 flex flex-col gap-2">
                    {games.map((game) => (
                      <Select.Item
                        key={game.id}
                        value={game.id}
                        className="cursor-pointer flex justify-between items-center text-white hover:bg-zinc-800 p-1"
                      >
                        <Select.ItemText>{game.title}</Select.ItemText>
                        <Select.ItemIndicator>
                          <Check />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            {/* <select
              id="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
            >
              <option disabled selected value="">
                Selecione o game que deseja jogar
              </option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select> */}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome ou nickname</label>
            <Input
              name="name"
              type="text"
              id="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="text"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuario000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-1"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <div className="mt-2 items-center flex gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) =>
                setUseVoiceChannel(checked ? true : false)
              }
              id="connect"
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check size={16} className="text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="connect">Costumo me conectar ao chat de voz</label>
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
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
