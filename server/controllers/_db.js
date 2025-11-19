const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = { students: [], classes: [], attendance: {} };
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
      return initial;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('readDb error', err);
    return { students: [], classes: [], attendance: {} };
  }
}

function writeDb(db) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('writeDb error', err);
    return false;
  }
}

module.exports = { readDb, writeDb };
