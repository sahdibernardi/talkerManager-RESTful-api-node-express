const path = require('path');
const fs = require('fs').promises;
const getAllTalkers = require('./getAllTalkers');

const talkerPath = path.resolve(__dirname, '../talker.json');

async function insertData(name, age, talk) {
    try {
      const talker = await getAllTalkers.getAllTalkers();
      const id = talker.length + 1;
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

    await fs.writeFile(talkerPath, JSON.stringify(talker));

    return talker;
} catch (error) {
    console.error(`File could not be written: ${error}`);
}
}

async function deleteData(req, res) {
    try {
        const talkers = await getAllTalkers.getAllTalkers();
        const { id } = req.params;

        const arrayPosition = talkers.findIndex((talker) => talker.id === Number(id));
        talkers.splice(arrayPosition, 1);

        await fs.writeFile(talkerPath, JSON.stringify(talkers));

        return res.status(204).end();
    } catch (error) {
        console.error(`File could not be written: ${error}`);
    }
}

module.exports = {
    insertData,
    insertJson,
    deleteData,
};