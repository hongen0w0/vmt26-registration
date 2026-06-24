"use client";

import Image from "next/image";
import { useState } from "react";

const characters = [
  {
    name: "Salt",
    image: "/assets/vmt26/hiro/Salt.png",
    silhouette: "/assets/vmt26/hiro/Salt_Silhouette.png"
  },
  {
    name: "Milk",
    image: "/assets/vmt26/hiro/Milk.png",
    silhouette: "/assets/vmt26/hiro/Milk_Silhouette.png"
  }
] as const;

export function MobileCharacterSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCharacter = characters[activeIndex];
  const nextCharacter = characters[activeIndex === 0 ? 1 : 0];
  const isShowingMilk = activeCharacter.name === "Milk";

  return (
    <div
      className="mobile-character-switcher"
      aria-label="VMT26 featured character"
    >
      <div className="mobile-character-viewport">
        {characters.map((character, index) => {
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
              <Image
                className="mobile-character-silhouette"
                src={character.silhouette}
                alt=""
                width={5000}
                height={4092}
                aria-hidden="true"
                priority
                sizes="(max-width: 620px) 112vw, 1px"
              />
              <Image
                className="mobile-character-art"
                src={character.image}
                alt={isActive ? `${character.name}, one of the VMT26 main characters` : ""}
                width={5000}
                height={4092}
                priority
                sizes="(max-width: 620px) 122vw, 1px"
              />
            </div>
          );
        })}

        <button
          className={`mobile-character-switch${
            isShowingMilk ? " is-previous" : " is-next"
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
