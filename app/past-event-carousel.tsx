"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
  type TouchEvent,
  type UIEvent
} from "react";
import { createPortal } from "react-dom";

type PastEventPhoto = {
  src: string;
  alt: string;
};

type PastEventCarouselProps = {
  photos: PastEventPhoto[];
};

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.6 9.6 0 0 1-3.8-.8L3 21l1.7-5a8.4 8.4 0 1 1 16.3-4.5Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m22 2-7.6 20-4.3-8.1L2 9.6 22 2Z" />
      <path d="M10.1 13.9 22 2" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3h14v19l-7-4-7 4V3Z" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      className={direction === "previous" ? "is-previous" : "is-next"}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5 19 19M19 5 5 19" />
    </svg>
  );
}

export function PastEventCarousel({ photos }: PastEventCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const pointerStartRef = useRef(0);
  const pointerDraggedRef = useRef(false);
  const lightboxTouchStartRef = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const scrollPostTo = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollTo({
      left: track.clientWidth * index,
      behavior
    });
  }, []);

  const goToPostPhoto = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(photos.length - 1, index));
    setActiveIndex(nextIndex);
    scrollPostTo(nextIndex);
  }, [photos.length, scrollPostTo]);

  const goToLightboxPhoto = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(photos.length - 1, index)));
  }, [photos.length]);

  const openLightbox = useCallback((index: number) => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    requestAnimationFrame(() => {
      scrollPostTo(activeIndex, "auto");
      returnFocusRef.current?.focus({ preventScroll: true });
    });
  }, [activeIndex, scrollPostTo]);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(0, index - 1));
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((index) => Math.min(photos.length - 1, index + 1));
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>("button:not(:disabled):not([aria-disabled='true']), [href], [tabindex]:not([tabindex='-1'])")
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, lightboxOpen, photos.length]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  function handleTrackScroll(event: UIEvent<HTMLDivElement>) {
    const track = event.currentTarget;

    if (scrollFrameRef.current !== null) {
      cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = requestAnimationFrame(() => {
      const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      setActiveIndex(Math.max(0, Math.min(photos.length - 1, index)));
    });
  }

  function handlePhotoPointerDown(event: PointerEvent<HTMLButtonElement>) {
    pointerStartRef.current = event.clientX;
    pointerDraggedRef.current = false;
  }

  function handlePhotoPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (Math.abs(event.clientX - pointerStartRef.current) > 8) {
      pointerDraggedRef.current = true;
    }
  }

  function handlePhotoClick(index: number) {
    if (!pointerDraggedRef.current) {
      openLightbox(index);
    }
  }

  function handleLightboxTouchStart(event: TouchEvent<HTMLDivElement>) {
    lightboxTouchStartRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleLightboxTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = lightboxTouchStartRef.current;
    const end = event.changedTouches[0]?.clientX;
    lightboxTouchStartRef.current = null;

    if (start === null || end === undefined || Math.abs(start - end) < 48) {
      return;
    }

    if (start > end) {
      goToLightboxPhoto(activeIndex + 1);
    } else {
      goToLightboxPhoto(activeIndex - 1);
    }
  }

  function handleDialogKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && event.target === event.currentTarget) {
      event.preventDefault();
    }
  }

  const activePhoto = photos[activeIndex];
  const isFirstPhoto = activeIndex === 0;
  const isLastPhoto = activeIndex === photos.length - 1;

  return (
    <>
      <article className="vmt-social-post" aria-label="VMT24 photo carousel">
        <header className="vmt-post-header">
          <a
            className="vmt-post-profile-link"
            href="https://www.instagram.com/vmt24_official/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit vmt24_official on Instagram"
          >
            <span className="vmt-post-avatar">
              <Image
                src="/assets/vmt24/profile.jpg"
                alt=""
                fill
                sizes="48px"
              />
            </span>
            <span className="vmt-post-account">
              <strong>vmt24_official</strong>
              <span>VMT24 · Sunway Velocity</span>
            </span>
          </a>
          <span className="vmt-post-badge">EVENT ARCHIVE</span>
        </header>

        <div className="vmt-post-media">
          <div
            className="vmt-post-track"
            ref={trackRef}
            onScroll={handleTrackScroll}
            aria-live="polite"
          >
            {photos.map((photo, index) => (
              <div
                className="vmt-post-slide"
                key={photo.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${photos.length}`}
              >
                <button
                  className="vmt-post-photo-button"
                  type="button"
                  onPointerDown={handlePhotoPointerDown}
                  onPointerMove={handlePhotoPointerMove}
                  onClick={() => handlePhotoClick(index)}
                  aria-label={`Expand photo ${index + 1}: ${photo.alt}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 620px) calc(100vw - 28px), 680px"
                  />
                </button>
              </div>
            ))}
          </div>

          <span className="vmt-post-counter" aria-live="polite">
            {activeIndex + 1} / {photos.length}
          </span>

          <button
            className="vmt-expand-button"
            type="button"
            onClick={() => openLightbox(activeIndex)}
            aria-label={`Expand photo ${activeIndex + 1}`}
          >
            <ExpandIcon />
          </button>

          <button
            className="vmt-carousel-arrow is-previous"
            type="button"
            onClick={() => {
              if (!isFirstPhoto) {
                goToPostPhoto(activeIndex - 1);
              }
            }}
            aria-disabled={isFirstPhoto ? "true" : undefined}
            aria-label="Previous photo"
            tabIndex={isFirstPhoto ? -1 : undefined}
          >
            <ChevronIcon direction="previous" />
          </button>
          <button
            className="vmt-carousel-arrow is-next"
            type="button"
            onClick={() => {
              if (!isLastPhoto) {
                goToPostPhoto(activeIndex + 1);
              }
            }}
            aria-disabled={isLastPhoto ? "true" : undefined}
            aria-label="Next photo"
            tabIndex={isLastPhoto ? -1 : undefined}
          >
            <ChevronIcon direction="next" />
          </button>
        </div>

        <footer className="vmt-post-footer">
          <div className="vmt-carousel-dots" aria-label="Choose a VMT24 photo">
            {photos.map((photo, index) => (
              <button
                className={index === activeIndex ? "is-active" : undefined}
                type="button"
                key={photo.src}
                onClick={() => goToPostPhoto(index)}
                aria-label={`View photo ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>

          <div className="vmt-post-actions" aria-hidden="true">
            <span><HeartIcon /></span>
            <span><CommentIcon /></span>
            <span><ShareIcon /></span>
            <span className="is-bookmark"><BookmarkIcon /></span>
          </div>

          <p className="vmt-post-likes">VMT24 community archive</p>
          <p className="vmt-post-caption">
            <strong>vmt24_official</strong> Cabinets lit, medals earned, community
            gathered. Swipe through the moments that made VMT24.
          </p>
          <p className="vmt-post-tags">#VMT24 #maimaiDX #SunwayVelocity</p>
          <p className="vmt-post-date">7 December 2024</p>
        </footer>
      </article>

      {lightboxOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="vmt-lightbox"
              role="presentation"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  closeLightbox();
                }
              }}
            >
              <div
                className="vmt-lightbox-dialog"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="vmt-lightbox-title"
                aria-describedby="vmt-lightbox-description"
                onTouchStart={handleLightboxTouchStart}
                onTouchEnd={handleLightboxTouchEnd}
                onKeyDown={handleDialogKeyDown}
              >
                <h2 className="sr-only" id="vmt-lightbox-title">VMT24 photo viewer</h2>
                <p className="sr-only" id="vmt-lightbox-description">
                  Use the arrow keys, swipe, or the navigation controls to browse photos.
                </p>

                <div className="vmt-lightbox-topbar">
                  <div>
                    <strong>VMT24 archive</strong>
                    <span>{activeIndex + 1} / {photos.length}</span>
                  </div>
                  <button
                    className="vmt-lightbox-close"
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeLightbox}
                    aria-label="Close photo viewer"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="vmt-lightbox-image">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    fill
                    priority
                    sizes="100vw"
                  />
                </div>

                <button
                  className="vmt-lightbox-arrow is-previous"
                  type="button"
                  onClick={() => {
                    if (!isFirstPhoto) {
                      goToLightboxPhoto(activeIndex - 1);
                    }
                  }}
                  aria-disabled={isFirstPhoto ? "true" : undefined}
                  aria-label="Previous photo"
                  tabIndex={isFirstPhoto ? -1 : undefined}
                >
                  <ChevronIcon direction="previous" />
                </button>
                <button
                  className="vmt-lightbox-arrow is-next"
                  type="button"
                  onClick={() => {
                    if (!isLastPhoto) {
                      goToLightboxPhoto(activeIndex + 1);
                    }
                  }}
                  aria-disabled={isLastPhoto ? "true" : undefined}
                  aria-label="Next photo"
                  tabIndex={isLastPhoto ? -1 : undefined}
                >
                  <ChevronIcon direction="next" />
                </button>

                <div className="vmt-lightbox-dots" aria-label="Choose a photo">
                  {photos.map((photo, index) => (
                    <button
                      className={index === activeIndex ? "is-active" : undefined}
                      type="button"
                      key={photo.src}
                      onClick={() => goToLightboxPhoto(index)}
                      aria-label={`View photo ${index + 1}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
