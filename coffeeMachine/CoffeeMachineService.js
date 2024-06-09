import router from "./routers/router.js";
import express from "express";
const PORT = 3002;
const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`CoffeeMachine Service started on port: ${PORT}`);
});
