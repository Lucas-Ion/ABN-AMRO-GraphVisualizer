/* graphController.test.js */

import { GraphController } from '../graphController';
import { GraphView } from '../../views/graphView';

// mock the GraphView module
jest.mock('../../views/graphView', () => {
    return {
        GraphView: {
            render: jest.fn()
        }
    };
});

describe('GraphController', () => {
    it('should call GraphView.render with the correct data', () => {
        const testData = { nodes: [], edges: [] };
        GraphController.initializeGraph(testData);

        expect(GraphView.render).toHaveBeenCalledWith(testData);
    });
});
