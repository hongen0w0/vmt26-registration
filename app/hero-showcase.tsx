"use client";

import Image from "next/image";
import { useState } from "react";
import { BackgroundBoard } from "./background-board";
import type { HeroEdition } from "./hero-edition";
import { MobileCharacterSwitcher } from "./mobile-character-switcher";

type HeroShowcaseProps = {
  registrationUrl: string;
};

type Vmt26CharacterKey = "salt" | "milk";

const editions: Record<
  HeroEdition,
  {
    title: string;
    characterLabel: string;
    characters: {
      name: string;
      className: string;
      image: string;
      alternateImage?: string;
      toggleKey?: Vmt26CharacterKey;
      width: number;
      height: number;
    }[];
  }
> = {
  vmt26: {
    title: "VMT26",
    characterLabel: "VMT26 main characters Salt and Milk",
    characters: [
      {
        name: "Salt",
        className: "character-salt",
        image: "/assets/vmt26/hiro/Salt.png",
        alternateImage: "/assets/vmt26/hiro/salt2.PNG",
        toggleKey: "salt",
        width: 5000,
        height: 4092
      },
      {
        name: "Milk",
        className: "character-milk",
        image: "/assets/vmt26/hiro/Milk.png",
        alternateImage: "/assets/vmt26/hiro/milk2.PNG",
        toggleKey: "milk",
        width: 5000,
        height: 4092
      }
    ]
  },
  vmt24: {
    title: "VMT24",
    characterLabel: "VMT24 main characters Acid and Riz",
    characters: [
      {
        name: "Acid",
        className: "character-acid",
        image: "/assets/vmt24/acid.png",
        width: 2480,
        height: 3508
      },
      {
        name: "Riz",
        className: "character-riz",
        image: "/assets/vmt24/riz.png",
        width: 2480,
        height: 3508
      }
    ]
  }
};

export function HeroShowcase({ registrationUrl }: HeroShowcaseProps) {
  const [edition, setEdition] = useState<HeroEdition>("vmt26");
  const [alternateCharacterArt, setAlternateCharacterArt] = useState<
    Record<Vmt26CharacterKey, boolean>
  >({
    salt: false,
    milk: false
  });
  const activeEdition = editions[edition];
  const isVmt24 = edition === "vmt24";
  const nextEdition = isVmt24 ? "VMT26" : "VMT24";
  const artistInstagram = isVmt24
    ? "https://www.instagram.com/loo0opfiv/"
    : "https://www.instagram.com/hiroumbrella/";
  const artistName = isVmt24 ? "loo0opfiv" : "hiroumbrella";

  return (
    <div className={`hero-grid hero-grid-${edition}`}>
      <BackgroundBoard edition={edition} />

      <a
        className="hero-artist-link"
        href={artistInstagram}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${artistName} on Instagram`}
        title={`@${artistName}`}
      >
        @
      </a>

      <button
        className="hero-edition-switch"
        type="button"
        onClick={() =>
          setEdition((current) => (current === "vmt26" ? "vmt24" : "vmt26"))
        }
        aria-pressed={isVmt24}
      >
        Switch to {nextEdition}
      </button>

      <div className="stage-lockup" aria-hidden="true">
        <Image
          src="/assets/vmt26/logo-white.png"
          alt=""
          width={300}
          height={208}
          priority
        />
        <span>Sunway Velocity</span>
      </div>

      <MobileCharacterSwitcher
        alternateCharacterArt={alternateCharacterArt}
        edition={edition}
        onToggleCharacterArt={(character) =>
          setAlternateCharacterArt((current) => ({
            ...current,
            [character]: !current[character]
          }))
        }
      />

      <div className="hero-copy">
        <p className="eyebrow">
          Velocity maimai Tournament {isVmt24 ? "2024" : "2026"}
        </p>
        <h1>{activeEdition.title}</h1>
        <p className="hero-text">
          {isVmt24 ? (
            "The chapter that started it all."
          ) : (
            <>
              One Miss Isn&apos;t Game Over.
              <br />
              Every Player Gets a Second Shot.
            </>
          )}
        </p>
        <div className="hero-actions">
          {isVmt24 ? null : (
            <a
              className="primary-link"
              href={registrationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Register via Google Form
            </a>
          )}
          <a
            className="secondary-link"
            href={isVmt24 ? "#past-event" : "#tournament-info"}
          >
            {isVmt24 ? "View past event photo" : "View tournament info"}
          </a>
        </div>
      </div>

      <div className="hero-characters" aria-label={activeEdition.characterLabel}>
        {edition === "vmt26" ? (
          <>
            <Image
              className="character-silhouette silhouette-salt"
              src="/assets/vmt26/hiro/Salt_Silhouette.png"
              alt=""
              width={5000}
              height={4092}
              aria-hidden="true"
              priority
              sizes="(max-width: 940px) 1px, 640px"
            />
            <Image
              className="character-silhouette silhouette-milk"
              src="/assets/vmt26/hiro/Milk_Silhouette.png"
              alt=""
              width={5000}
              height={4092}
              aria-hidden="true"
              priority
              sizes="(max-width: 940px) 1px, 640px"
            />
          </>
        ) : null}

        {activeEdition.characters.map((character) => {
          const isAlternate =
            character.toggleKey !== undefined &&
            alternateCharacterArt[character.toggleKey];
          const image =
            isAlternate && character.alternateImage
              ? character.alternateImage
              : character.image;
          const className = `character ${character.className}${
            isVmt24 ? " character-vmt24" : ""
          }`;

          if (character.toggleKey && character.alternateImage) {
            return (
              <button
                className={`${className} character-toggle`}
                type="button"
                onClick={() =>
                  setAlternateCharacterArt((current) => ({
                    ...current,
                    [character.toggleKey as Vmt26CharacterKey]:
                      !current[character.toggleKey as Vmt26CharacterKey]
                  }))
                }
                aria-label={`Show ${
                  isAlternate ? "original" : "alternate"
                } ${character.name} art`}
                aria-pressed={isAlternate}
                key={character.name}
              >
                <Image
                  className="character-toggle-image"
                  src={image}
                  alt={`${character.name}, one of the ${activeEdition.title} main characters`}
                  width={character.width}
                  height={character.height}
                  priority
                  sizes="(max-width: 940px) 1px, 740px"
                  key={image}
                />
              </button>
            );
          }

          return (
            <Image
              className={className}
              src={image}
              alt={`${character.name}, one of the ${activeEdition.title} main characters`}
              width={character.width}
              height={character.height}
              priority
              sizes="(max-width: 940px) 1px, 740px"
              key={character.name}
            />
          );
        })}
      </div>

      <span className="sr-only" aria-live="polite">
        {activeEdition.title} hero displayed
      </span>
    </div>
  );
}
