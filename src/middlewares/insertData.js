const path = require('path');
const fs = require('fs').promises;
const getNewTalkers = require('./getNewTalkers');

const talkerPath = path.resolve(__dirname, '../talker.json');

// async function insertData(name, age, talk) {
//   try {
//     const talker = await getAllTalkers.getAllTalkers();
//     // const { name, age, talk: { watchedAt, rate } } = req.body;
//     const id = talker.length + 1;
//     const newTalker = { id, name, age, talk };
//     const newData = [...talker, newTalker];
//     await fs.writeFile(talkerPath, JSON.stringify(newData));
//     return talker;
//   } catch (error) {
//     console.error(`Arquivo não pode ser escrito: ${error}`);
//   }
// } 

async function insertData(name, age, talk) {
    try {
      const talker = await getNewTalkers.getNewTalkers();
      // const { name, age, talk: { watchedAt, rate } } = req.body;
      const id = talker.length + 5;
      const newTalker = { id, name, age, talk };
      talker.push(newTalker);
    //   const newData = [...talker, newTalker];
      await fs.writeFile(talkerPath, JSON.stringify(talker));
      return talker;
    } catch (error) {
      console.error(`Arquivo não pode ser escrito: ${error}`);
    }
  } 

module.exports = insertData;