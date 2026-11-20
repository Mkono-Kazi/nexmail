import { useQuery } from "@tanstack/react-query";
import { HealthResponseSchema } from "@nexmail/contracts";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3000";

async function fetchHealth() {
  const response = await fetch(`${apiBaseUrl}/api/v1/health`);
  if (!response.ok)
    throw new Error("The service did not return a healthy response.");
  return HealthResponseSchema.parse(await response.json());
}

export function App() {
  const health = useQuery({
    queryKey: ["service-health"],
    queryFn: fetchHealth,
    refetchInterval: 15_000,
  });

  const connectionLabel = health.isPending
    ? "Checking connection"
    : health.isError
      ? "Service unavailable"
      : health.data.status === "ok"
        ? "Service connected"
        : "Service needs attention";

  return (
    <div className="app-frame">
      <header className="top-bar">
        <a className="wordmark" href="#home" aria-label="Nexmail home">
          <span className="brand-mark" aria-hidden="true">
            N
          </span>
          <span>Nexmail</span>
        </a>
        <div
          className="connection-state"
          aria-live="polite"
          aria-busy={health.isFetching}
        >
          <span
            className={`connection-dot${health.isError ? " is-error" : health.data?.status === "ok" ? " is-ready" : ""}`}
            aria-hidden="true"
          />
          <span>{connectionLabel}</span>
          {health.isError && (
            <button
              className="retry-button"
              onClick={() => void health.refetch()}
              disabled={health.isFetching}
            >
              Try again
            </button>
          )}
        </div>
      </header>

      <main id="home" className="welcome-panel">
        <div className="welcome-kicker">Email, on your terms</div>
        <h1>A calmer place for your email.</h1>
        <p>
          Bring the accounts you already use. Keep your data and choices in your
          hands.
        </p>
        <div className="welcome-rule" aria-hidden="true" />
        <p className="welcome-note">Your workspace is ready to take shape.</p>
      </main>
    </div>
  );
}
