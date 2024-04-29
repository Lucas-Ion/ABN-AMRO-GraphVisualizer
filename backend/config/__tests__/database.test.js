/*database.test.js*/

const mockAuth = {
    basic: jest.fn().mockReturnValue({ scheme: 'basic', principal: 'user', credentials: 'password' })
};

// define mockDriver
const mockDriver = jest.fn();

jest.mock('neo4j-driver', () => ({
    driver: mockDriver,
    auth: mockAuth
}));

jest.mock('dotenv', () => ({
    config: jest.fn(() => ({
        parsed: {
            NEO4J_URI: 'bolt://localhost',
            NEO4J_USER: 'neo4j',
            NEO4J_PASSWORD: 'password'
        }
    }))
}));

describe('Neo4j Driver Configuration', () => {
    beforeEach(() => {
        process.env.NEO4J_URI = 'bolt://localhost';
        process.env.NEO4J_USER = 'neo4j';
        process.env.NEO4J_PASSWORD = 'password';

        jest.clearAllMocks();
        jest.resetModules(); // reset modules to clear cache if needed
    });

    it('should create a neo4j driver with correct parameters', () => {
        // require the database module inside the test to ensure it picks up the mocked modules
        const driver = require('../database');

        // check if dotenv.config() was called
        expect(require('dotenv').config).toHaveBeenCalled();

        // validate the auth.basic was called with the correct parameters
        expect(mockAuth.basic).toHaveBeenCalledWith('neo4j', 'password');

        // validate the driver was called with the correct URI and auth
        expect(mockDriver).toHaveBeenCalledWith('bolt://localhost', expect.anything());
    });
});
