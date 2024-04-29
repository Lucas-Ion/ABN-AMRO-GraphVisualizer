/* nodeController.js */

const nodeModel = require('../models/nodeModel');

async function getNodes(req, res) {
  try {
    const nodes = await nodeModel.getAllNodes();
    res.json(nodes);
  } catch (error) {
    console.error('Error retrieving nodes:', error);
    res.status(500).send('Failed to retrieve nodes');
  }
}

console.log('Exporting getNodes:', getNodes);

module.exports = {
  getNodes
};
