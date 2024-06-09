import sqlite3 from "sqlite3";

// Підключення до бази даних
const db = new sqlite3.Database("mydatabase.db");

// Створення таблиці для рахунку користувача
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS account (balance INTEGER)");
  db.get("SELECT COUNT(*) as count FROM account", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (row.count === 0) {
      db.run("INSERT INTO account (balance) VALUES (100)");
    }
  });
});

const drinks = {
  coffee: {
    portions: 10,
    price: 20,
    ingredients: JSON.stringify(["milk", "sugar", "vanilla"]),
  },
  tea: {
    portions: 10,
    price: 18,
    ingredients: JSON.stringify(["milk", "sugar", "honey", "cinnamon"]),
  },
  latte: {
    portions: 10,
    price: 35,
    ingredients: JSON.stringify(["milk", "sugar", "vanilla"]),
  },
  cappuccino: {
    portions: 10,
    price: 37,
    ingredients: JSON.stringify([
      "milk",
      "sugar",
      "vanilla",
      "caramel",
      "chocolate",
    ]),
  },
  espresso: {
    portions: 10,
    price: 35,
    ingredients: JSON.stringify(["milk", "sugar"]),
  },
  americano: {
    portions: 10,
    price: 40,
    ingredients: JSON.stringify([
      "milk",
      "sugar",
      "vanilla",
      "almondMilk",
      "soyMilk",
    ]),
  },
  mocha: {
    portions: 10,
    price: 30,
    ingredients: JSON.stringify(["milk", "sugar", "vanilla"]),
  },
  macchiato: {
    portions: 10,
    price: 40,
    ingredients: JSON.stringify([
      "milk",
      "sugar",
      "vanilla",
      "almondMilk",
      "soyMilk",
    ]),
  },
  frappe: {
    portions: 10,
    price: 28,
    ingredients: JSON.stringify(["milk", "sugar", "vanilla", " chocolate"]),
  },
  hotChocolate: {
    portions: 10,
    price: 18,
    ingredients: JSON.stringify(["milk", "sugar", "vanilla"]),
  },
};
// Створення таблиці для напоїв
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS drinks (name TEXT PRIMARY KEY, portions INTEGER, price REAL, ingredients TEXT)"
  );
  db.get("SELECT COUNT(*) as count FROM drinks", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (row.count === 0) {
      for (const name in drinks) {
        const { portions, price, ingredients } = drinks[name];
        db.run(
          `INSERT INTO drinks (name, portions, price, ingredients) VALUES (?, ?, ?, ?)`,
          [name, portions, price, ingredients]
        );
      }
    }
  });
});

// Отримання даних з таблиці рахунку
// db.get("SELECT * FROM account", (err, row) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log("Баланс користувача:", row.balance);
//   }
// });

// // Отримання даних з таблиці напоїв
// db.all("SELECT * FROM drinks", (err, rows) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log("Напої:");
//     rows.forEach((row) => {
//       console.log(
//         `- ${row.name}: Portions - ${row.portions}, Price - ${row.price}, Ingredients - ${row.ingredients}`
//       );
//     });
//   }
// });

// Закриття з'єднання з базою даних
// db.close();
