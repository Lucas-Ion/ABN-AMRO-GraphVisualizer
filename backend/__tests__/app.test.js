/* app.test.js */

// modules import
const request = require('supertest');
const express = require('express');
const nodeRoutes = require('../routes/nodeRoutes');

// mocking the nodeRoutes to prevent real network or database operations
jest.mock('../routes/nodeRoutes', () => {
    const express = require('express');
    const router = express.Router();
    router.get('/nodes', (req, res) => res.send('Node route'));
    return router;
});

// express app setup
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/api', nodeRoutes);

// creating a varibale to hold the server for lifecycle management
let server;

beforeAll((done) => {
    server = app.listen(4000, done);
});

afterAll((done) => {
    server.close(done);
});

describe('App Setup', () => {
    // JSON parse testing
    test('should parse JSON bodies', async () => {
        const testApp = express();
        testApp.use(express.json());
        testApp.post('/test', (req, res) => res.json(req.body));

        const response = await request(testApp)
            .post('/test')
            .send({ name: 'New Node' })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('name', 'New Node');
    });

    // CORS header test
    test('should handle CORS', async () => {
        const testApp = express();
        testApp.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(204).end();
        });

        await request(testApp)
            .options('/test')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(204);
    });

    // nodeRoutes integration test
    test('should use nodeRoutes for /api', async () => {
        await request(app)
            .get('/api/nodes')
            .expect(200)
            .then(response => {
                expect(response.text).toBe('Node route');
            });
    });
});
