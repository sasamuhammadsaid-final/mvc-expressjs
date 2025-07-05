const fs = require("fs").promises;
const rootDir = require('../util/path');
const path = require('path');
const filePath = path.join(rootDir, 'data', 'products.json');

async function readJSONFile() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
    return [];
  }
}

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  async save() {
     const products = await readJSONFile();
     products.push(this);
     await fs.writeFile(filePath, JSON.stringify(products, null, 2));
  }

  static async fetchAll(cb) {
    const products = await readJSONFile();
    cb(products);
  }
  
}