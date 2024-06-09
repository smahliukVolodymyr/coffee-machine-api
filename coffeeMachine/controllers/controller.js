import { getBalance, getDrinks } from "./data.js";

class Controller {
  async getDrinksList(_, res) {
    try {
      const drinks = await getDrinks();
      console.log("Отримано список напоїв у автоматі");
      res.json(drinks);
    } catch (error) {
      console.error("Помилка при отриманні списку напоїв:", error);
      res.status(500).json({ error: "Помилка при отриманні списку напоїв" });
    }
  }

  async getBalance(_, res) {
    try {
      const balance = await getBalance();
      console.log("Отримано баланс");
      res.json(balance);
    } catch (error) {
      console.error("Помилка при отриманні балансу:", error);
      res.status(500).json({ error: "Помилка при отриманні балансу" });
    }
  }
}

export default new Controller();
