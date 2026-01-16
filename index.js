const express = require("express");

const app = express();
app.use(express.json());

const verifyToken = process.env.VERIFY_TOKEN;

// Webhook verification (GET)
app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === verifyToken) {
    console.log("✅ WEBHOOK VERIFIED");
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Webhook events (POST)
app.post("/", (req, res) => {
  console.log("📩 Webhook event received:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// 🔴 IMPORTANT: export the app (NO app.listen)
module.exports = app;
