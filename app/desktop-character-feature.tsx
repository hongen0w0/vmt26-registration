import Image from "next/image";

type DesktopCharacterFeatureProps = {
  character: "salt" | "milk";
  height: number;
  image: string;
  label: string;
  width: number;
};

export function DesktopCharacterFeature({
  character,
  height,
  image,
  label,
  width
}: DesktopCharacterFeatureProps) {
  return (
    <section
      className={`desktop-character-feature desktop-character-feature-${character}`}
      aria-label={label}
    >
      <div className="desktop-character-feature-frame">
        <div className="desktop-character-board" aria-hidden="true" />
        <Image
          className="desktop-character-feature-image"
          src={image}
          alt={label}
          width={width}
          height={height}
          sizes="(min-width: 941px) 82vw, 1px"
        />
      </div>
    </section>
  );
}
