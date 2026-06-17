import Link from "next/link";

export default function RegistrationSuccessPage() {
  return (
    <main className="success-page">
      <section className="success-panel">
        <p className="eyebrow">Payment screenshot uploaded</p>
        <h1>Your VMT26 registration is submitted.</h1>
        <p>
          The organizers now have your player details and TNG payment
          screenshot. Your payment status will be reviewed from the organizer
          dashboard.
        </p>
        <div className="hero-actions">
          <Link className="primary-link" href="/">
            Back to portal
          </Link>
          <Link className="secondary-link" href="/admin">
            Organizer admin
          </Link>
        </div>
      </section>
    </main>
  );
}
