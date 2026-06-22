import Image from "next/image";

const googleFormUrl =
  "https://docs.google.com/forms/d/19Vv2T6xnSlqc_2tliPQHYPvnyg9GbMJAzeQlw6r0dkc/edit";

const navItems = [
  { label: "Info", href: "#tournament-info" },
  { label: "VMT24", href: "#past-event" },
  { label: "Merch", href: "#merch" },
  { label: "FAQ", href: "#faq" }
];

const facts = [
  {
    label: "Registration",
    value: "13 Jul - 26 Jul 2026",
    detail: "Online form closes at 11:59 PM."
  },
  {
    label: "Preliminary",
    value: "8 Aug - 23 Aug 2026",
    detail: "Submit one gameplay video and one proof."
  },
  {
    label: "Finals",
    value: "12 Sep - 13 Sep 2026",
    detail: "Offline finals at Sunway Velocity."
  }
];

const previews = [
  {
    title: "Tournament information",
    kicker: "Rules, schedule, format",
    copy: "Registration, preliminary submissions, finalist categories, and double-elimination finals will be shaped into a dedicated information page next.",
    href: "#tournament-info"
  },
  {
    title: "Past event photo",
    kicker: "VMT24 recap",
    copy: "A gallery section will showcase the arcade floor, winners, medals, and community energy from the previous tournament.",
    href: "#past-event"
  },
  {
    title: "Merch photo",
    kicker: "VMT26 apparel",
    copy: "Merch previews will focus on product mockups, front/back shirt artwork, and purchase or preorder instructions once finalized.",
    href: "#merch"
  },
  {
    title: "FAQ",
    kicker: "Fast answers",
    copy: "The FAQ page will cover eligibility, registration, preliminaries, attendance, refunds, minors, and organizer contact.",
    href: "#faq"
  }
];

const pastPhotos = [
  {
    src: "/assets/vmt24/champions.jpg",
    alt: "VMT24 players standing in front of maimai cabinets"
  },
  {
    src: "/assets/vmt24/stage-display.jpg",
    alt: "VMT24 event display at Sunway Velocity"
  },
  {
    src: "/assets/vmt24/winner-portrait.jpg",
    alt: "VMT24 medal winner portrait near maimai cabinets"
  }
];

const merchPhotos = [
  {
    src: "/assets/merch/shirt-front-01.jpg",
    alt: "VMT26 black shirt front design"
  },
  {
    src: "/assets/merch/shirt-back-02.jpg",
    alt: "VMT26 black shirt back design"
  }
];

const faqs = [
  {
    question: "Where do I register?",
    answer: "Use the Register button on this site. It opens the official Google Form."
  },
  {
    question: "How do preliminaries work?",
    answer: "Players submit one recorded gameplay attempt plus one score proof before the preliminary deadline."
  },
  {
    question: "What happens at finals?",
    answer: "Qualified players are grouped into categories and play offline free-for-all matches with song ban and pick phases."
  }
];

function RegisterButton({ className = "primary-link" }: { className?: string }) {
  return (
    <a className={className} href={googleFormUrl} target="_blank" rel="noreferrer">
      Register via Google Form
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero-section" id="top">
        <nav className="topbar" aria-label="Main navigation">
          <a className="brand-mark" href="#top" aria-label="VMT26 home">
            <Image
              src="/assets/vmt26/logo-purple.png"
              alt="VMT26"
              width={132}
              height={92}
              priority
            />
          </a>

          <div className="nav-links">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <a className="nav-register" href={googleFormUrl} target="_blank" rel="noreferrer">
            Register
          </a>
        </nav>

        <div className="velocity-stripe" aria-hidden="true" />

        <div className="hero-grid">
          <div className="hero-grid-glass" aria-hidden="true" />

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

          <div className="hero-copy">
            <p className="eyebrow">Velocity maimai Tournament 2026</p>
            <h1>VMT26</h1>
            <p className="hero-text">
              A two-stage maimai DX tournament built for players who want a
              serious bracket, a loud arcade floor, and a community finals
              weekend at Sunway Velocity.
            </p>
            <div className="hero-actions">
              <RegisterButton />
              <a className="secondary-link" href="#tournament-info">
                View tournament info
              </a>
            </div>
          </div>

          <div className="hero-characters" aria-label="VMT26 main characters Salt and Milk">
            <Image
              className="character-silhouette silhouette-salt"
              src="/assets/vmt26/hiro/Salt_Silhouette.png"
              alt=""
              width={5000}
              height={4092}
              aria-hidden="true"
              priority
              sizes="(max-width: 620px) 58vw, (max-width: 940px) 58vw, 640px"
            />
            <Image
              className="character-silhouette silhouette-milk"
              src="/assets/vmt26/hiro/Milk_Silhouette.png"
              alt=""
              width={5000}
              height={4092}
              aria-hidden="true"
              priority
              sizes="(max-width: 620px) 58vw, (max-width: 940px) 58vw, 640px"
            />
            <Image
              className="character character-salt"
              src="/assets/vmt26/hiro/Salt.png"
              alt="Salt, one of the VMT26 main characters"
              width={5000}
              height={4092}
              priority
              sizes="(max-width: 620px) 62vw, (max-width: 940px) 64vw, 740px"
            />
            <Image
              className="character character-milk"
              src="/assets/vmt26/hiro/Milk.png"
              alt="Milk, one of the VMT26 main characters"
              width={5000}
              height={4092}
              priority
              sizes="(max-width: 620px) 62vw, (max-width: 940px) 64vw, 740px"
            />
          </div>
        </div>
      </section>

      <section className="facts-band" id="tournament-info">
        <div className="section-heading">
          <p className="eyebrow">Tournament command board</p>
          <h2>Dates, format, and the road to finals.</h2>
        </div>

        <div className="facts-grid">
          {facts.map((fact) => (
            <article className="fact-panel" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
              <p>{fact.detail}</p>
            </article>
          ))}
        </div>

        <div className="format-panel">
          <div>
            <p className="eyebrow">Format preview</p>
            <h3>Online preliminary into offline finals.</h3>
          </div>
          <p>
            Players rank through three preliminary songs. Finals use category
            brackets, four-player free-for-all matches, song pools, and ban/pick
            phases from quarter-finals to grand finals.
          </p>
        </div>
      </section>

      <section className="preview-band">
        <div className="section-heading">
          <p className="eyebrow">Site map</p>
          <h2>We will build the full tournament site one page at a time.</h2>
        </div>

        <div className="preview-grid">
          {previews.map((preview) => (
            <a className="preview-panel" href={preview.href} key={preview.title}>
              <span>{preview.kicker}</span>
              <h3>{preview.title}</h3>
              <p>{preview.copy}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="gallery-band" id="past-event">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Past event photo</p>
            <h2>VMT24 brought the cabinets, medals, and crowd energy.</h2>
          </div>
          <a className="secondary-link compact-link" href="#top">
            Back to top
          </a>
        </div>

        <div className="photo-strip">
          {pastPhotos.map((photo, index) => (
            <figure className="photo-frame" key={photo.src}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 860px) 88vw, 33vw"
              />
              <figcaption>VMT24 / 0{index + 1}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="merch-band" id="merch">
        <div className="merch-copy">
          <p className="eyebrow">Merch photo</p>
          <h2>Black shirt, high-speed orange, royal purple.</h2>
          <p>
            The merch page will get its own product gallery later. For the
            landing page, the preview keeps focus on the shirt artwork and
            VMT26&apos;s orange-purple identity.
          </p>
        </div>

        <div className="merch-preview">
          {merchPhotos.map((photo) => (
            <figure className="merch-frame" key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes="280px" />
            </figure>
          ))}
        </div>
      </section>

      <section className="faq-band" id="faq">
        <div className="section-heading">
          <p className="eyebrow">Frequently asked questions</p>
          <h2>Short answers before the full FAQ page.</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <article className="faq-item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <Image
          src="/assets/vmt26/logo-purple.png"
          alt="VMT26 tournament logo"
          width={280}
          height={194}
        />
        <div>
          <p className="eyebrow">Registration opens through Google Forms</p>
          <h2>Ready for VMT26?</h2>
        </div>
        <RegisterButton />
      </section>
    </main>
  );
}

