/* nodeModel.test.js */

const { getAllNodes } = require('../../models/nodeModel');

// mock the database configuration module
jest.mock('../../config/database', () => {
    const mockRun = jest.fn();
    const mockClose = jest.fn();
    return {
        session: jest.fn(() => ({
            run: mockRun,
            close: mockClose,
        })),
    };
});

describe('NodeModel - getAllNodes', () => {
    let mockRun, mockClose;

    beforeEach(() => {
        const db = require('../../config/database');
        const session = db.session();
        mockRun = session.run;
        mockClose = session.close;

        // reset mocks
        mockRun.mockReset();
        mockClose.mockReset().mockImplementation(() => Promise.resolve());
    });

    it('should return formatted nodes', async () => {
        // setup return values for the run function
        mockRun.mockResolvedValue({
            records: [
                {
                    get: jest.fn((prop) => {
                        if (prop === 'node') {
                            return {
                                identity: { toInt: () => 1 },
                                properties: { name: 'Node1', description: 'Description1' }
                            };
                        } else if (prop === 'parentName') {
                            return null;
                        }
                    })
                }
            ]
        });

        const nodes = await getAllNodes();
        expect(mockRun).toHaveBeenCalled();
        expect(mockClose).toHaveBeenCalled();
        expect(nodes).toEqual([{
            id: 1,
            name: 'Node1',
            description: 'Description1',
            parent: ''
        }]);
    });

    it('should handle errors in database operations', async () => {
        // simulate a rejection in the run function
        mockRun.mockRejectedValue(new Error('Database error'));

        await expect(getAllNodes()).rejects.toThrow('Database error');
        expect(mockClose).toHaveBeenCalled();
    });
});