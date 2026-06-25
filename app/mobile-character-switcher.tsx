"use client";

import Image from "next/image";
import { useState } from "react";
import type { HeroEdition } from "./hero-edition";

const characters = {
  vmt26: [
    {
      name: "Salt",
      image: "/assets/vmt26/hiro/Salt.png",
      silhouette: "/assets/vmt26/hiro/Salt_Silhouette.png",
      width: 5000,
      height: 4092
    },
    {
      name: "Milk",
      image: "/assets/vmt26/hiro/Milk.png",
      silhouette: "/assets/vmt26/hiro/Milk_Silhouette.png",
      width: 5000,
      height: 4092
    }
  ],
  vmt24: [
    {
      name: "Acid",
      image: "/assets/vmt24/acid.png",
      silhouette: null,
      width: 2480,
      height: 3508
    },
    {
      name: "Riz",
      image: "/assets/vmt24/riz.png",
      silhouette: null,
      width: 2480,
      height: 3508
    }
  ]
} as const;

type MobileCharacterSwitcherProps = {
  edition: HeroEdition;
};

export function MobileCharacterSwitcher({
  edition
}: MobileCharacterSwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const editionCharacters = characters[edition];
  const activeCharacter = editionCharacters[activeIndex];
  const nextCharacter = editionCharacters[activeIndex === 0 ? 1 : 0];
  const isShowingSecondCharacter = activeIndex === 1;

  return (
    <div
      className={`mobile-character-switcher mobile-character-switcher-${edition}`}
      aria-label={`${edition === "vmt26" ? "VMT26" : "VMT24"} featured character`}
    >
      <div className="mobile-character-viewport">
        {editionCharacters.map((character, index) => {
          const isActive = index === activeIndex;
          const characterClass = character.name.toLowerCase();

          return (
            <div
              className={`mobile-character-layer mobile-character-${characterClass}${
                isActive ? " is-active" : ""
              }`}
              aria-hidden={!isActive}
              key={character.name}
            >
              {character.silhouette ? (
                <Image
                  className="mobile-character-silhouette"
                  src={character.silhouette}
                  alt=""
                  width={character.width}
                  height={character.height}
                  aria-hidden="true"
                  priority
                  sizes="(max-width: 940px) 112vw, 1px"
                />
              ) : null}
              <Image
                className="mobile-character-art"
                src={character.image}
                alt={
                  isActive
                    ? `${character.name}, one of the ${
                        edition === "vmt26" ? "VMT26" : "VMT24"
                      } main characters`
                    : ""
                }
                width={character.width}
                height={character.height}
                priority
                sizes="(max-width: 940px) 122vw, 1px"
              />
            </div>
          );
        })}

        <button
          className={`mobile-character-switch${
            isShowingSecondCharacter ? " is-previous" : " is-next"
          }`}
          type="button"
          onClick={() => setActiveIndex((current) => (current === 0 ? 1 : 0))}
          aria-label={`Show ${nextCharacter.name}`}
        >
          <span className="mobile-character-switch-icon" aria-hidden="true" />
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {activeCharacter.name} displayed
      </span>
    </div>
  );
}
