import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { uploadPaymentScreenshot } from "@/app/actions";
import { getRegistrationByToken } from "@/lib/db";

type PaymentPageProps = {
  params: Promise<{
    token: string;
  }>;
  searchParams?: Promise<{
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  missing_file: "Please upload your TNG payment screenshot.",
  file_type: "Please upload a PNG, JPG, or WebP image.",
  file_size: "Please upload an image smaller than 5 MB."
};

export default async function PaymentPage({
  params,
  searchParams
}: PaymentPageProps) {
  const { token } = await params;
  const query = await searchParams;
  const registration = await getRegistrationByToken(token);

  if (!registration) {
    notFound();
  }

  return (
    <main className="payment-page">
      <section className="payment-layout">
        <div className="payment-copy">
          <p className="eyebrow">TNG payment</p>
          <h1>Almost done.</h1>
          <p>
            Pay using the QR below, then upload a screenshot of the successful
            transaction. Organizers will confirm your payment from the admin
            dashboard.
          </p>
          <div className="player-summary">
            <span>maimai IGN</span>
            <strong>{registration.maimai_ign || registration.player_handle}</strong>
          </div>
        </div>

        <div className="payment-panel">
          <div className="qr-frame">
            <Image
              src="/tng-qr-placeholder.svg"
              alt="TNG payment QR"
              width={360}
              height={360}
              priority
            />
          </div>

          <form className="upload-form" action={uploadPaymentScreenshot}>
            {query?.error ? (
              <p className="form-error">
                {errorMessages[query.error] || "Payment upload failed."}
              </p>
            ) : null}

            <input name="registrationToken" type="hidden" value={token} />

            <label>
              Payment screenshot
              <input
                name="paymentScreenshot"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                required
              />
            </label>

            <button className="submit-button" type="submit">
              Upload payment screenshot
            </button>
          </form>

          <Link className="secondary-link inline-link" href="/register">
            Start again
          </Link>
        </div>
      </section>
    </main>
  );
}
