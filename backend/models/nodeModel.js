/* nodeModel.js */

const driver = require('../config/database');

async function getAllNodes() {
  const session = driver.session({ database: 'neo4j' });
  try {
    const result = await session.run(`
      MATCH (n)
      OPTIONAL MATCH (n)-[:CHILD_OF]->(m)
      RETURN n AS node, m.name AS parentName
    `);
    return result.records.map(record => {
      const node = record.get('node').properties;
      return {
        id: record.get('node').identity.toInt(),
        name: node.name,
        description: node.description,
        parent: record.get('parentName') || ""  // Handle no parent case
      };
    });
  } finally {
    await session.close();
  }
}

module.exports = {
  getAllNodes
};
