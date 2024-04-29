/* toastUtil.test.js */

const fs = require('fs');
const path = require('path');

test('file exists', () => {
    const filePath = path.resolve(__dirname, '../toastUtil.js');
    expect(fs.existsSync(filePath)).toBe(true);
});