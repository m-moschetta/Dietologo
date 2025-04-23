
require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/generate-diet', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-2025-04-14",
      messages: [{
        role: "system", 
        content: "Sei un nutrizionista esperto. Genera un piano alimentare dettagliato giorno per giorno in italiano basato sui dati forniti."
      },{
        role: "user", 
        content: req.body.prompt
      }]
    });
    res.json({ text: completion.choices[0].message.content });
  } catch (error) {
    console.error("Errore OpenAI:", error);
    res.status(500).json({ error: "Errore generazione piano" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
  console.log(`Server in ascolto sulla porta ${PORT}`));
