/* nodeRoutes.test.js */

jest.mock('express', () => {
    return {
        Router: () => ({
            get: jest.fn(),
            // since the coding challenge requires a get request, the test will only test for GET
            // I will keep these here however if we need to extend the coding challenge later
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        }),
    };
});

const nodeController = require('../../controllers/nodeController');
jest.mock('../../controllers/nodeController', () => ({
    getNodes: jest.fn(),
}));

describe('nodeRoutes', () => {
    it('should correctly attach the getNodes handler to /nodes route', () => {
        // require the router after setting up the mocks to ensure they are used
        const router = require('../../routes/nodeRoutes'); // Assuming the path is correct

        // check that the router's GET method is called with the correct route and handler
        expect(router.get).toHaveBeenCalledWith('/nodes', nodeController.getNodes);
    });
});
