import OpenAI from "openai";
import cors from "cors";
import express from "express";

// Initial app setup
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
app.use(express.json());
// Defines which frontend origins can access the server
const corsOptions = {
    origin: ["https://duranjulio2004.github.io"],
    methods: ["GET", "POST", "OPTIONS"],
};

app.use(cors(corsOptions))

// Wasnt really using this, only using post right now for the chatbot
// let message = "Initial message";

// app.get("/", (req, res) => {
//     res.json((message));
// });

app.get("/", (req, res) => {
  res.send("Backend is live!");
});

app.post("/", async (req,res) => {
    const { newMessage } = req.body;

    client.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: newMessage },
        { role: "system", content: "You are an assistant chatbot in a portfolio website created by a Software Developer called Julio Duran, give short and positive responses. If you dont know something make it up."}
        ],
    })
    .then((response) => {
      res.json({ reply: response.choices[0].message.content });
    })
    .catch((err) => {
      console.error("OpenAI error:", err);
      res.status(500).json({ error: "OpenAI request failed" });
    });

})

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log("Server started on port 3000 :D");
});


// Random comment to make railway pull newest commit
// console.log(response.output_text);