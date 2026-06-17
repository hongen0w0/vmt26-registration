import Image from "next/image";
import Link from "next/link";

const eventCards = [
  {
    label: "Format",
    value: "maimai tournament",
    detail: "Structured brackets and organizer-verified registrations."
  },
  {
    label: "Date",
    value: "TBA",
    detail: "Final schedule will be announced by the VMT26 organizers."
  },
  {
    label: "Location",
    value: "TBA",
    detail: "Venue details and check-in timing will be shared before the event."
  }
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <nav className="topbar" aria-label="Main navigation">
          <a className="brand-mark" href="#top" aria-label="VMT26 home">
            VMT26
          </a>
          <div className="nav-links">
            <a href="#details">Details</a>
            <Link href="/register">Register</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">maimai tournament registration</p>
            <h1>VMT26</h1>
            <p className="hero-text">
              Register your slot for the next VMT maimai showdown. Submit your
              player details now, then complete payment using the organizer
              instructions on the confirmation page.
            </p>
            <div className="hero-actions">
              <Link className="primary-link" href="/register">
                Register now
              </Link>
              <a className="secondary-link" href="#details">
                View details
              </a>
            </div>
          </div>

          <div className="hero-art" aria-label="VMT26 key visual">
            <Image
              src="/main.jpg"
              alt="VMT26 tournament key visual"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 52vw"
            />
            <div className="hero-art-caption">
              <span>Key visual</span>
              <strong>VMT26</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="info-band" id="details">
        <div className="section-heading">
          <p className="eyebrow">Tournament info</p>
          <h2>Everything organizers need before bracket day.</h2>
          <p className="section-copy">
            Registration is now handled on its own page. After submitting your
            player details, you will be sent to the TNG payment upload step.
          </p>
        </div>

        <div className="event-grid">
          {eventCards.map((card) => (
            <article className="info-card" key={card.label}>
              <p>{card.label}</p>
              <h3>{card.value}</h3>
              <span>{card.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Ready to enter?</p>
          <h2>Register first, pay second.</h2>
        </div>
        <Link className="primary-link" href="/register">
          Open registration
        </Link>
      </section>
    </main>
  );
}
