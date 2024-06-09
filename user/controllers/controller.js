import {
  getBalance,
  getDrinks,
  updateAccountBalance,
  updatePortions,
} from "./data.js";
class Controller {
  async balanceTopUp(req, res) {
    try {
      let balance = await getBalance();
      const { money } = req.params;
      balance += parseInt(money);
      console.log(`Поповнення балансу на: ${money}`);
      updateAccountBalance(balance);
      res.json(balance);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async buyDrinks(req, res) {
    try {
      const drinks = await getDrinks();
      let balance = await getBalance();
      const { orders } = req.body;
      if (!Array.isArray(orders)) {
        return res.status(400).json({
          message: "Неправильний формат запиту",
        });
      }

      let totalPrice = 0;
      let message = "";
      const drinksToUpdate = [];
      orders.forEach((order) => {
        const { drink, ingredients } = order;
        const item = drinks.find((e) => e.name === drink);
        totalPrice += item.price;
        let isSubset = ingredients.every((val) =>
          item.ingredients.includes(val)
        );
        if (!isSubset) {
          res.status(400).json({
            message: "Додано некоректні інградієнти",
          });
        }
        totalPrice += ingredients.length * 4;
        message += ` приготовано ${drink} з ${ingredients}`;
        drinksToUpdate.push(item);
      });

      if (totalPrice > balance) {
        res.status(400).json({
          message: "Недостатньо балансу для приготування напоїв",
        });
      }
      balance -= totalPrice;
      message += ` за ${totalPrice} грн.`;
      updateAccountBalance(balance);
      drinksToUpdate.forEach((e) => {
        updatePortions(e.name, e.portions - 1);
      });
      res.json(message);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new Controller();
