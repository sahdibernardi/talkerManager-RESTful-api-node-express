const fs = require('fs').promises;
const { join } = require('path');

const readTalkerJson = async () => {
  const path = '../newTalkers.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getNewTalkers = async () => {
  const talkers = await readTalkerJson();
  return talkers;
};

module.exports = {
    getNewTalkers,
};
