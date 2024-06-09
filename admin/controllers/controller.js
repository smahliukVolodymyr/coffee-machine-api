import { getDrinks, updatePortions } from "./data.js";

const maxPortions = 50;

class Controller {
  async refill(req, res) {
    try {
      const { refillArray } = req.body;
      const drinks = await getDrinks();
      if (!Array.isArray(refillArray)) {
        return res.status(400).json({
          message: "Неправильний формат запиту",
        });
      }
      const updatedArray = [];
      refillArray.forEach((e) => {
        const { portions, drink } = e;
        if (!drink || !portions || portions < 0) {
          res.status(400).json({ message: "Помилка заповнення даних" }); //bad request
        }
        const item = drinks.find((e) => e.name === drink);
        item.portions += parseInt(portions);
        if (item.portions > maxPortions) {
          item.portions = maxPortions;
        }
        updatedArray.push(item);
      });
      updatedArray.forEach((e) => {
        updatePortions(e.name, e.portions);
      });
      res.json(updatedArray);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new Controller();
