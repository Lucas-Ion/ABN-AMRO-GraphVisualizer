/* graphController.js */

import { GraphView } from '../views/graphView.js';

export class GraphController {
    static initializeGraph(data) {
        GraphView.render(data);
    }
}
