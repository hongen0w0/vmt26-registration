type BackgroundBoardProps = {
  className?: string;
};

export function BackgroundBoard({ className = "" }: BackgroundBoardProps) {
  const classes = ["background-board", className].filter(Boolean).join(" ");

  return <div className={classes} aria-hidden="true" />;
}
