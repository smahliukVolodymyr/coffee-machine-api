import sqlite3 from "sqlite3";

const db = new sqlite3.Database("/db/mydatabase.db");

export async function getBalance() {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM account", (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.balance);
      }
    });
  });
}

export async function getDrinks() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM drinks", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const drinks = rows.map((row) => ({
          name: row.name,
          portions: row.portions,
          price: row.price,
          ingredients: JSON.parse(row.ingredients),
        }));
        resolve(drinks);
      }
    });
  });
}
