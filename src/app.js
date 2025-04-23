// DietPlannerApp.jsx
// -------------------------------------------------------------
// A minimal full‑stack example (front‑end + back‑end in one file
// for clarity). Split these sections into separate files in your
// project (e.g. /app/page.tsx or /src/App.jsx and /server/server.js).
// Requires: React 18+, TailwindCSS, framer‑motion, shadcn/ui, express
//           OpenAI SDK (npm i openai).
// -------------------------------------------------------------

/* --------------------------- FRONT‑END --------------------------- */
// Place this component inside a Next.js /app/page.tsx file
// or the main component of a Create‑React‑App /src/App.jsx.

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function DietPlannerApp() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "M",
    height: "",
    weight: "",
    goal: "mantenimento",
    activity: "moderato",
    training: "",
    allergies: "",
    meds: "",
    labs: "",
    prefs: "",
    avoid: "",
    timeWindows: "",
    budget: ""
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(""
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const buildPrompt = () => {
    // Assemble the super‑prompt with user inputs
    return `Assumi il ruolo di nutrizionista clinico certificato con esperienza in piani alimentari personalizzati.\n\n**1. Dati anagrafici**\n- Età: ${formData.age} anni\n- Sesso: ${formData.gender}\n- Altezza: ${formData.height} cm\n- Peso attuale: ${formData.weight} kg\n- Peso desiderato o obiettivo: ${formData.goal}\n\n**2. Stile di vita & salute**\n- Livello di attività fisica: ${formData.activity}\n- Tipologia di allenamento: ${formData.training}\n- Patologie / allergie: ${formData.allergies}\n- Farmaci / integratori: ${formData.meds}\n- Valori ematici: ${formData.labs}\n\n**3. Preferenze alimentari**\n- Cucina / ingredienti preferiti: ${formData.prefs}\n- Alimenti da evitare: ${formData.avoid}\n- Fasce orarie disponibili: ${formData.timeWindows}\n- Budget settimanale: ${formData.budget} €\n\n**4. Output desiderato**\n1. Fabbisogno calorico giornaliero e suddivisione macro.\n2. Menu settimanale (7 giorni) con 3 pasti + 2 spuntini.\n3. Lista della spesa per reparti.\n4. Istruzioni di meal‑prep. con relativi grammi per ogni ingrediente\n5. Suggerimenti di sostituzione.\n6. Note nutrizionali e di sicurezza.\n\nFormato: tabelle per i pasti, lista della spesa puntata, note concise. Linguaggio: ITALIANO chiaro, amichevole, professionale. Ricorda che non sostituisce il parere medico.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPlan("");
    try {
      const res = await fetch("http://localhost:3001/api/generate-diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: buildPrompt() })
      });
      console.log("Risposta ricevuta:", res);
      const data = await res.json();
      console.log("Dati ricevuti:", data);
      setPlan(data.text);
    } catch (err) {
      console.error("Errore durante la richiesta:", err);
      setPlan("Si è verificato un errore nella generazione del piano.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-6"
      >
        Diet Planner AI
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-3 gap-4 w-full max-w-6xl"
      >
        {/* Colonna 1 */}
        <Card className="p-4 space-y-2">
          <label className="flex flex-col text-sm">
            Età
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input"
              required
            />
          </label>
          <label className="flex flex-col text-sm">
            Sesso
            <select name="gender" value={formData.gender} onChange={handleChange} className="select">
              <option value="M">Maschio</option>
              <option value="F">Femmina</option>
              <option value="Altro">Altro</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            Altezza (cm)
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="input"
              required
            />
          </label>
          <label className="flex flex-col text-sm">
            Peso (kg)
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="input"
              required
            />
          </label>
          <label className="flex flex-col text-sm">
            Obiettivo
            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="input"
            />
          </label>
        </Card>

        {/* Colonna 2 */}
        <Card className="p-4 space-y-2">
          <label className="flex flex-col text-sm">
            Livello attività
            <select name="activity" value={formData.activity} onChange={handleChange} className="select">
              <option value="sedentario">Sedentario</option>
              <option value="leggero">Leggero</option>
              <option value="moderato">Moderato</option>
              <option value="intenso">Intenso</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            Tipo di allenamento
            <input
              type="text"
              name="training"
              value={formData.training}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="flex flex-col text-sm">
            Allergie / Intolleranze
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="flex flex-col text-sm">
            Farmaci / Integratori
            <input
              type="text"
              name="meds"
              value={formData.meds}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="flex flex-col text-sm">
            Valori ematici rilevanti
            <input
              type="text"
              name="labs"
              value={formData.labs}
              onChange={handleChange}
              className="input"
            />
          </label>
        </Card>

        {/* Colonna 3 */}
        <Card className="p-4 space-y-2">
          <label className="flex flex-col text-sm">
            Cibi preferiti
            <input
              type="text"
              name="prefs"
              value={formData.prefs}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="flex flex-col text-sm">
            Cibi da evitare
            <input
              type="text"
              name="avoid"
              value={formData.avoid}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="flex flex-col text-sm">
            Fasce orarie pasti
            <input
              type="text"
              name="timeWindows"
              placeholder="es. 07-09, 13-14, 20-21"
              value={formData.timeWindows}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="flex flex-col text-sm">
            Budget settimanale (€)
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="input"
            />
          </label>

          <Button type="submit" className="mt-2 w-full rounded-2xl shadow-xl py-6 text-lg font-semibold">
            {loading ? "Calcolo…" : "Genera piano alimentare"}
          </Button>
        </Card>
      </form>

      {plan && (
        <Card className="mt-8 w-full max-w-6xl whitespace-pre-wrap p-6 shadow-lg rounded-2xl">
          <CardContent className="prose lg:prose-lg max-w-none">
            {plan}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
