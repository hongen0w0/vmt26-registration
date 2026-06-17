import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  updatePaymentStatus
} from "../actions";
import { getRegistrations, type PaymentStatus } from "@/lib/db";

const statusLabels: Record<PaymentStatus, string> = {
  awaiting_payment_screenshot: "Awaiting screenshot",
  payment_uploaded: "Screenshot uploaded",
  pending_manual_payment: "Pending payment",
  payment_confirmed: "Payment confirmed",
  needs_follow_up: "Needs follow-up"
};

type AdminPageProps = {
  searchParams?: Promise<{
    q?: string;
    error?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const isAuthenticated = await isAdminAuthenticated();
  const search = params?.q ?? "";

  if (!isAuthenticated) {
    return (
      <main className="admin-page">
        <section className="admin-login">
          <p className="eyebrow">Organizer access</p>
          <h1>VMT26 admin</h1>
          <p>Enter the organizer password to review registrations.</p>

          {params?.error ? (
            <p className="form-error">Password invalid or session expired.</p>
          ) : null}

          <form className="login-form" action={loginAdmin}>
            <label>
              Admin password
              <input name="password" type="password" required />
            </label>
            <button className="submit-button" type="submit">
              Unlock admin
            </button>
          </form>
        </section>
      </main>
    );
  }

  const registrations = await getRegistrations(search);

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Organizer dashboard</p>
            <h1>VMT26 registrations</h1>
            <p>{registrations.length} visible registration(s)</p>
          </div>
          <form action={logoutAdmin}>
            <button className="secondary-button" type="submit">
              Log out
            </button>
          </form>
        </div>

        <form className="search-form" action="/admin">
          <label>
            Search registrations
            <input
              name="q"
              type="search"
              defaultValue={search}
              placeholder="Name, handle, email, Discord, or region"
            />
          </label>
          <button className="submit-button" type="submit">
            Search
          </button>
        </form>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Contact</th>
                <th>Phone</th>
                <th>Rating</th>
                <th>Screenshot</th>
                <th>Payment</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => (
                <tr key={registration.id}>
                  <td>
                    <strong>
                      {registration.maimai_ign || registration.player_handle}
                    </strong>
                    <span>{registration.player_name || registration.real_name}</span>
                  </td>
                  <td>
                    <a href={`mailto:${registration.gmail || registration.email}`}>
                      {registration.gmail || registration.email}
                    </a>
                    <span>
                      {registration.discord_id || registration.discord_handle}
                    </span>
                  </td>
                  <td>{registration.phone_number || "None"}</td>
                  <td>{registration.maimai_rating ?? "None"}</td>
                  <td>
                    {registration.payment_screenshot_data_url ? (
                      <a
                        className="screenshot-link"
                        href={registration.payment_screenshot_data_url}
                        download={`vmt26-payment-${registration.id}.png`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={registration.payment_screenshot_data_url}
                          alt={`Payment screenshot for ${
                            registration.maimai_ign || registration.player_handle
                          }`}
                        />
                        <span>Download</span>
                      </a>
                    ) : (
                      "Not uploaded"
                    )}
                  </td>
                  <td>
                    <form className="status-form" action={updatePaymentStatus}>
                      <input
                        name="id"
                        type="hidden"
                        value={registration.id}
                      />
                      <select
                        name="paymentStatus"
                        defaultValue={registration.payment_status}
                        aria-label={`Payment status for ${
                          registration.maimai_ign || registration.player_handle
                        }`}
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <button className="mini-button" type="submit">
                        Save
                      </button>
                    </form>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-SG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Singapore"
                    }).format(new Date(registration.created_at))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {registrations.length === 0 ? (
            <div className="empty-state">
              No registrations found for the current search.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
