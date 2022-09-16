interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner({ bannerUrl, title, adsCount }: GameBannerProps) {
  return (
    <a
      href=""
      className={`relative rounded-lg overflow-hidden keen-slider__slide`}
    >
      <img src={bannerUrl} alt="" />

      <div className="pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm mt-1">
          {adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
