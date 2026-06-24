import Image from "next/image";
import { BackgroundBoard } from "./background-board";
import { MobileCharacterSwitcher } from "./mobile-character-switcher";
import { PastEventCarousel } from "./past-event-carousel";
import { RulesJumpNav } from "./rules-jump-nav";

const googleFormUrl =
  "https://docs.google.com/forms/d/19Vv2T6xnSlqc_2tliPQHYPvnyg9GbMJAzeQlw6r0dkc/edit";

const navItems = [
  { label: "Info", href: "#tournament-info" },
  { label: "VMT24", href: "#past-event" },
  { label: "Merch", href: "#merch" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" }
];

const facts = [
  {
    label: "Registration",
    value: "13 Jul - 26 Jul 2026",
    detail: "Online form opens at 12:00 AM and closes at 11:59 PM."
  },
  {
    label: "Preliminary",
    value: "1 Aug - 16 Aug 2026",
    detail: "Play three assigned songs and submit one video plus one score proof."
  },
  {
    label: "Results",
    value: "22 Aug 2026",
    detail: "Preliminary rankings and finalist categories are announced."
  },
  {
    label: "Finals",
    value: "5 Sep - 6 Sep 2026",
    detail: "Two days of offline finals at Sunway Velocity Cobay Funscape."
  }
];

const tournamentStages = [
  {
    step: "01",
    title: "Preliminary",
    meta: "All registered players",
    copy: "Three assigned songs determine the leaderboard by total achievement rate."
  },
  {
    step: "02",
    title: "Quarter-Finals",
    meta: "8 players per category",
    copy: "Two four-player matches. Top two move up; bottom two enter the losers bracket."
  },
  {
    step: "03",
    title: "Semi-Finals",
    meta: "Winners + survivors",
    copy: "Four-player winner and losers-bracket matches decide the final four."
  },
  {
    step: "04",
    title: "Grand Finals",
    meta: "Final 4 players",
    copy: "Two player picks and two organizer picks decide the final placements."
  }
];

const ruleSections = [
  {
    id: "registration-rules",
    label: "Registration & eligibility",
    summary: "Entry, identity, account, aliases, minors, fees and withdrawals.",
    content: (
      <>
        <ul className="rule-list">
          <li>Registration is limited to one entry per person. Proxy players and duplicate entries are prohibited.</li>
          <li>The registration fee is <strong>TBA</strong>. Payment instructions will be provided in the official registration form.</li>
          <li>Participants under 16 must upload a printed and signed parental consent form with their registration.</li>
          <li>Each player must use the same Aime or Banapassport account and the same maimai DX in-game name throughout the tournament.</li>
          <li>Aliases and in-game names are assigned on a first-come, first-served basis and must not contain offensive, discriminatory, political or otherwise unacceptable content.</li>
          <li>Incomplete, inaccurate or rule-breaking applications may be rejected. Registration fees are non-refundable.</li>
          <li>Players who withdraw for personal reasons receive no refund, but remain entitled to participation rewards.</li>
        </ul>
        <div className="rules-note">
          <strong>No smurfing.</strong>
          <span>Intentionally underperforming to obtain an easier matchup may result in disqualification and exclusion from future organizer events.</span>
        </div>
      </>
    )
  },
  {
    id: "preliminary-rules",
    label: "Preliminary round",
    summary: "Song attempts, video recording, proof, submissions and physical preliminaries.",
    content: (
      <>
        <div className="rule-callout-grid">
          <div>
            <span>Assigned songs</span>
            <strong>To be announced</strong>
          </div>
          <div>
            <span>Required attempt</span>
            <strong>3 songs in 1 credit</strong>
          </div>
          <div>
            <span>Accepted submission</span>
            <strong>1 video + 1 proof</strong>
          </div>
        </div>
        <ul className="rule-list">
          <li>Play all three assigned songs at the specified difficulty and chart type, in any order, within one three- or four-song credit.</li>
          <li>The recording must show the entire credit, the player&apos;s full body and an unobstructed play area. Editing, altered footage or switching players is not allowed.</li>
          <li>You may make unlimited attempts, but only one video and one supporting proof may be submitted. If multiple online submissions exist, only the earliest is accepted.</li>
          <li>Proof must show achievement rate and DX Score for every assigned song, using either cabinet result photos or maimai DX NET screenshots.</li>
          <li>A missing video or proof by the deadline records a result of 0.0000% total achievement and 0 DX Score.</li>
          <li>The optional physical preliminary uses the same song list. Players may rejoin the queue, and their highest physical score is recorded.</li>
          <li>Physical preliminary participants may still make one online submission before the deadline under the online submission rules.</li>
          <li>Players cover their own play costs and personal equipment during both online and physical preliminary attempts.</li>
        </ul>
      </>
    )
  },
  {
    id: "ranking-rules",
    label: "Ranking & qualification",
    summary: "Leaderboard order, ties, finalist capacity and category allocation.",
    content: (
      <>
        <ol className="ranking-order">
          <li><span>1</span><div><strong>Total achievement rate</strong><p>The combined percentage across all three preliminary songs.</p></div></li>
          <li><span>2</span><div><strong>Total DX Score</strong><p>Used when two or more players have the same total achievement rate.</p></div></li>
          <li><span>3</span><div><strong>Submission timestamp</strong><p>The earlier Google Drive upload takes priority if both totals remain tied.</p></div></li>
        </ol>
        <div className="participant-table-wrap">
          <table className="participant-table">
            <caption>Finals capacity by valid registration count</caption>
            <thead>
              <tr>
                <th scope="col">Participants</th>
                <th scope="col">Tournament outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Fewer than 16</td><td>Event cancelled</td></tr>
              <tr><td>16–31</td><td>2 categories × 8 finalists (16 advance)</td></tr>
              <tr><td>32 or more</td><td>4 categories × 8 finalists (32 advance)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="rule-footnote">If a qualified finalist cannot attend the physical finals, eliminated players will not be promoted as substitutes.</p>
      </>
    )
  },
  {
    id: "finals-rules",
    label: "Physical finals",
    summary: "Check-in, scoring, song pools, ban/pick procedure and tie-breakers.",
    content: (
      <ul className="rule-list">
        <li>Players must verify their identity at check-in using the OTP submitted during registration. Players who cannot verify their identity cannot compete.</li>
        <li>The organizer supplies Cobay Funscape tokens for tournament matches. Players remain responsible for gloves, earphones and other personal equipment.</li>
        <li>In-game settings may be adjusted freely. Tournament songs and song pools are prepared by the organizer before the event.</li>
        <li>Before each match, every participant may ban one song from the provided pool. Banned songs cannot be selected in that match.</li>
        <li>Quarter-Finals and Semi-Finals use four-player free-for-all matches over four songs, with a twelve-song pool and one pick per player.</li>
        <li>Quarter-Final groups separate odd preliminary ranks (#1, #3, #5, #7) from even ranks (#2, #4, #6, #8).</li>
        <li>In standard bracket matches, first and second advance; third and fourth enter the losers bracket. In losers-bracket matches, third and fourth are eliminated.</li>
        <li>Grand Finals use two participant-selected songs followed by two organizer-selected songs.</li>
        <li>Finals rankings use total achievement rate, then total DX Score. An unresolved tie triggers organizer-selected tie-breaker songs until a winner is decided.</li>
      </ul>
    )
  },
  {
    id: "conduct-rules",
    label: "Conduct & organizer decisions",
    summary: "Safety, fair play, disruption, harassment and enforcement.",
    content: (
      <>
        <ul className="rule-list">
          <li>Harassment, threats, stalking, discrimination, impersonation, false claims and abusive or sexually explicit conduct are prohibited before, during and after the event.</li>
          <li>Do not obstruct another player through deliberate noise, visual effects, odours, physical interference or any other disruption.</li>
          <li>Vandalism, intellectual-property violations, intentional disappearance during live play and refusal to follow crew instructions are prohibited.</li>
          <li>Violations may lead to score penalties, disqualification, bans from future organizer events or legal action, depending on severity.</li>
        </ul>
        <div className="rules-note is-purple">
          <strong>Organizer ruling</strong>
          <span>The organizing team may update these rules when necessary. Its decisions on tournament operations and rule enforcement are final.</span>
        </div>
      </>
    )
  },
  {
    id: "privacy-rules",
    label: "Privacy, media & contact",
    summary: "What information is collected, how it is used and how to contact the team.",
    content: (
      <>
        <ul className="rule-list">
          <li>Registration may collect legal name, contact details, alias, in-game name and other information required to manage participation.</li>
          <li>Event photos, video, audio, contest entries, feedback and survey responses may also be collected.</li>
          <li>Information is used for identity verification, event administration, participant contact, prizes, feedback, research, updates, publicity and VMT event marketing.</li>
          <li>Accepted preliminary videos are deleted from the submission folder after scores are recorded.</li>
          <li>Participants under 16 require guardian consent for participation, media use and the event&apos;s liability terms.</li>
        </ul>
        <address className="contact-board">
          <a href="mailto:vmt24official@gmail.com">vmt24official@gmail.com</a>
          <span>Facebook Messenger: VMT 26</span>
          <a href="https://wa.me/60127219288" target="_blank" rel="noreferrer">WhatsApp: +60 12-721 9288</a>
        </address>
      </>
    )
  }
];

const pastPhotos = [
  {
    src: "/assets/vmt24/gallery/20241207_181528.jpg",
    alt: "VMT24 winners and event guests posing in front of maimai cabinets"
  },
  {
    src: "/assets/vmt24/gallery/20241207_181641.jpg",
    alt: "VMT24 medal winner receiving congratulations beside a maimai cabinet"
  },
  {
    src: "/assets/vmt24/gallery/DSC00225.jpg",
    alt: "VMT24 spectators gathered around the tournament play area"
  },
  {
    src: "/assets/vmt24/gallery/DSC00304.jpg",
    alt: "VMT24 finalists and event guest posing with medals"
  },
  {
    src: "/assets/vmt24/gallery/DSC00337.jpg",
    alt: "VMT24 medal presentation beside a maimai cabinet"
  },
  {
    src: "/assets/vmt24/gallery/DSC00343.jpg",
    alt: "VMT24 finalists and organizers posing together after the tournament"
  },
  {
    src: "/assets/vmt24/gallery/DSC00349.jpg",
    alt: "VMT24 players sharing a candid moment at the arcade"
  },
  {
    src: "/assets/vmt24/gallery/IMG_2767.jpg",
    alt: "Wide group photo of VMT24 players and organizers"
  },
  {
    src: "/assets/vmt24/gallery/IMG_3803.jpg",
    alt: "VMT24 event display and character plush collection"
  },
  {
    src: "/assets/vmt24/gallery/IMG_3855.jpg",
    alt: "VMT24 winners and event guests posing at the maimai cabinets"
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
          <BackgroundBoard />

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

          <MobileCharacterSwitcher />

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
        <div className="rules-heading">
          <div className="section-heading">
            <p className="eyebrow">Tournament command board</p>
            <h2>Know the route. Play it clean.</h2>
            <p>
              This is the player-facing guide to VMT26. Registration confirms
              that you accept these rules and the organizing team&apos;s final
              decisions.
            </p>
          </div>
          <RulesJumpNav
            items={ruleSections.map(({ id, label }) => ({ id, label }))}
          />
        </div>

        <div className="facts-grid" aria-label="Important tournament dates">
          {facts.map((fact) => (
            <article className="fact-panel" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
              <p>{fact.detail}</p>
            </article>
          ))}
        </div>

        <p className="schedule-disclaimer">All dates are subject to change. Updates will be announced through VMT26&apos;s official social media.</p>

        <section className="roadmap-panel" aria-labelledby="roadmap-title">
          <div className="roadmap-heading">
            <div>
              <p className="eyebrow">Road to finals</p>
              <h3 id="roadmap-title">One leaderboard. Two lives. Four finalists.</h3>
            </div>
            <p>Every finals category follows a six-match double-elimination route from Quarter-Finals to Grand Finals.</p>
          </div>

          <ol className="tournament-road">
            {tournamentStages.map((stage) => (
              <li key={stage.step}>
                <span className="stage-number">{stage.step}</span>
                <div>
                  <span className="stage-meta">{stage.meta}</span>
                  <h4>{stage.title}</h4>
                  <p>{stage.copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="bracket-key" aria-label="Bracket progression key">
            <span><i className="winner-dot" />Top two: winners route</span>
            <span><i className="loser-dot" />Bottom two: one more life</span>
            <span><i className="exit-dot" />Second loss: eliminated</span>
          </div>
        </section>

        <div className="rules-layout">
          <aside className="rules-sidebar">
            <p className="eyebrow">Before you enter</p>
            <h3>Player essentials</h3>
            <ul>
              <li><strong>Fee</strong><span>TBA</span></li>
              <li><strong>Preliminary songs</strong><span>To be announced</span></li>
              <li><strong>Minimum field</strong><span>16 players</span></li>
              <li><strong>Identity check</strong><span>Registration OTP</span></li>
              <li><strong>Finals venue</strong><span>Sunway Velocity Cobay Funscape</span></li>
            </ul>
            <RegisterButton className="primary-link rules-register" />
          </aside>

          <div className="rules-accordion">
            {ruleSections.map((section, index) => (
              <details className="rule-section" id={section.id} key={section.id} open={index === 0}>
                <summary>
                  <span className="rule-index">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{section.label}</strong>
                    <small>{section.summary}</small>
                  </span>
                  <i aria-hidden="true" />
                </summary>
                <div className="rule-section-body">{section.content}</div>
              </details>
            ))}
          </div>
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

        <PastEventCarousel photos={pastPhotos} />
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

      <section className="creator-contact" id="contact">
        <div className="creator-contact-intro">
          <p className="eyebrow">Designed &amp; built by</p>
          <p className="creator-handle">hongen0w0</p>
          <p className="creator-role">Website Designer</p>
        </div>

        <div className="creator-contact-copy">
          <h2>Have a website idea worth making real?</h2>
          <p>
            I design distinctive, responsive websites for events, communities,
            brands, and creative projects. VMT26 is one of the worlds I&apos;ve
            helped bring to the screen.
          </p>
        </div>

        <div className="creator-contact-actions">
          <a
            className="creator-email"
            href="mailto:hongenlim2004@gmail.com"
          >
            <span>Start a conversation</span>
            <strong>hongenlim2004@gmail.com</strong>
          </a>
          <a
            className="creator-instagram"
            href="https://www.instagram.com/hongen0w0/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram · @hongen0w0
          </a>
        </div>
      </section>
    </main>
  );
}

