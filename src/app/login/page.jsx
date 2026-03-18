"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Identifiants invalides");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Une erreur est survenue. Réessayez.");
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md border border-white bg-black p-6">
        <h1 className="mb-6 text-center text-xl font-medium">
          Connexion admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="username">
              Nom d&apos;utilisateur
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full border border-white bg-black px-3 py-2 text-sm text-white outline-none focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-white bg-black px-3 py-2 text-sm text-white outline-none focus:outline-none"
              required
            />
          </div>

          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center border border-white bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}

