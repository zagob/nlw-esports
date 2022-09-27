import Image from "next/image";

interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner({ bannerUrl, title, adsCount }: GameBannerProps) {
  return (
    <div className="w-[180px] hover:opacity-70 transition-all mx-2 mt-10">
      <a
        href=""
        className={`relative rounded-lg overflow-hidden keen-slider__slide w-[100px]`}
      >
        <Image src={bannerUrl} width={180} height={240} alt="" />

        <div className="bg-game-gradient w-[180px] absolute pt-16 pb-4 px-4 bottom-0 left-0 right-0">
          <strong className="font-bold text-white block">{title}</strong>
          <span className="text-zinc-300 text-sm mt-1">
            {adsCount} anúncio(s)
          </span>
        </div>
      </a>
    </div>
  );
}
