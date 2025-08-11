// Server startup and config

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[FingerPay] Server started on port ${PORT}`);
});
