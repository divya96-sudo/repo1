import express from "express";

const app = express();
const appSecret = process.env.APP_SECRET;

app.use(express.static("."));

app.get("/secret-check", (req, res) => {
  if (!appSecret) {
    return res.status(500).send("Secret not loaded");
  }
  res.send("Secret is configured correctly ✅");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
