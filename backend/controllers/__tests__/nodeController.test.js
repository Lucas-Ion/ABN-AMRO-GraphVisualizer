/* nodeController.test.js */

const { getNodes } = require('../../controllers/nodeController');
const nodeModel = require('../../models/nodeModel');

// mock the nodeModel module
jest.mock('../../models/nodeModel');

// mock console.error to keep test output clean
console.error = jest.fn();

describe('getNodes', () => {
    let req, res;

    beforeEach(() => {
        // setup mock request and response objects
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send a JSON response with the nodes', async () => {
        const mockNodes = [{ id: 1, name: 'Node A' }, { id: 2, name: 'Node B' }];
        nodeModel.getAllNodes.mockResolvedValue(mockNodes);

        await getNodes(req, res);

        expect(res.json).toHaveBeenCalledWith(mockNodes);
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('should handle errors and send a 500 status code', async () => {
        const error = new Error('Failed to retrieve');
        nodeModel.getAllNodes.mockRejectedValue(error);

        await getNodes(req, res);

        expect(console.error).toHaveBeenCalledWith('Error retrieving nodes:', error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Failed to retrieve nodes');
    });
});
