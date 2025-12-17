import { useEffect } from "react";
import { apiFetch } from "./services/api";

export default function App() {
  useEffect(() => {
    console.log("✅ App montó");

    apiFetch("/ping/")
      .then((data) => {
        console.log("✅ BACKEND OK:", data);
      })
      .catch((e) => {
        console.error("❌ ERROR apiFetch:", e.message || e);
      });
  }, []);

  return <h1>Frontend Avanser</h1>;
}
