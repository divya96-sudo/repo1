import express from "express";

const app = express();
const appSecret = process.env.APP_SECRET;

app.use(express.static("."));

app.get("/secret-check", (req, res) => {
  if (process.env.APP_SECRET === "mySuperSecretValue123") {
    return res.send("Secret is correct!");
  }
  res.status(403).send("Secret mismatch!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
