import type { HeroEdition } from "./hero-edition";

type BackgroundBoardProps = {
  className?: string;
  edition?: HeroEdition;
};

export function BackgroundBoard({
  className = "",
  edition = "vmt26"
}: BackgroundBoardProps) {
  const classes = [
    "background-board",
    `background-board-${edition}`,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} aria-hidden="true" />;
}
