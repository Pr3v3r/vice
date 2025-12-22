import express from "express";

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "VICE backend is alive" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
