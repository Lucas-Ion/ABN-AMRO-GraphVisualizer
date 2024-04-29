/* dataService.test.js */

import { fetchData } from '../dataService';

describe('fetchData', () => {
    it('should fetch data successfully', async () => {
        const data = await fetchData();
        expect(data).toBeDefined();
    });
});

