/* main.js -> this is the entry point that initiates the application. */

import { fetchData } from './services/dataService.js';
import { GraphController } from './controllers/graphController.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchData();
        GraphController.initializeGraph(data);
    } catch (error) {
        console.error("Error initializing graph:", error);
    }
});
