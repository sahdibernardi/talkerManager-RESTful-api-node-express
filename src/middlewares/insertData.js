const path = require('path');
const fs = require('fs').promises;
const getNewTalkers = require('./getNewTalkers');
const getAllTalkers = require('./getAllTalkers');

const talkerPath = path.resolve(__dirname, '../talker.json');

async function insertData(name, age, talk) {
    try {
      const talker = await getNewTalkers.getNewTalkers();
      const id = talker.length + 5;
      const newTalker = { id, name, age, talk };
      talker.push(newTalker);
      await fs.writeFile(talkerPath, JSON.stringify(talker));
      return talker;
    } catch (error) {
      console.error(`File could not be written: ${error}`);
    }
  }

  async function insertJson(updateTalker) {
    try {
      const talker = await getAllTalkers.getAllTalkers();
      const index = (updateTalker.id - 1);
      talker.splice(index, 1, updateTalker);
    // Replaces 1 element at index
   
      await fs.writeFile(talkerPath, JSON.stringify(talker));
      console.log(talker);
      return talker;
    } catch (error) {
      console.error(`File could not be written: ${error}`);
    }
  }

module.exports = {
    insertData,
    insertJson,
};