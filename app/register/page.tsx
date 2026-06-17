import Link from "next/link";
import { submitRegistration } from "../actions";

type RegisterPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;

  return (
    <main className="register-page">
      <section className="registration-section standalone-section">
        <div className="form-copy">
          <p className="eyebrow">VMT26 registration</p>
          <h1>Player details</h1>
          <p>
            Fill in your maimai player information first. After this step, the
            portal will show the TNG payment QR and ask for your payment
            screenshot.
          </p>
          <Link className="secondary-link inline-link" href="/">
            Back to VMT26
          </Link>
        </div>

        <form className="registration-form" action={submitRegistration}>
          {params?.error === "rating" ? (
            <p className="form-error wide-field">
              Please enter a valid maimai rating.
            </p>
          ) : null}

          <label>
            maimai IGN
            <input name="maimaiIgn" type="text" required />
          </label>

          <label>
            Player name
            <input name="playerName" type="text" required autoComplete="name" />
          </label>

          <label>
            Gmail
            <input
              name="gmail"
              type="email"
              required
              autoComplete="email"
              pattern="^[a-zA-Z0-9._%+-]+@gmail\\.com$"
              placeholder="name@gmail.com"
            />
          </label>

          <label>
            Discord ID
            <input
              name="discordId"
              type="text"
              required
              placeholder="@name or name#0000"
            />
          </label>

          <label>
            Phone number
            <input
              name="phoneNumber"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+60..."
            />
          </label>

          <label>
            maimai rating
            <input name="maimaiRating" type="number" min="0" step="1" required />
          </label>

          <button className="submit-button wide-field" type="submit">
            Continue to TNG payment
          </button>
        </form>
      </section>
    </main>
  );
}
