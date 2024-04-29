/* dataService.js */

export async function fetchData() {
    try {
        const response = await fetch('https://abn-amro-graphvisualizer.onrender.com/api/nodes');
        // const response = await fetch('http://abn-amro-coding.tech/api/nodes');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        console.log("Fetched data:", json);

        // API returns data under a `data` key as per the challenge requirements
        const data = {
            "data": json.map(node => ({
                name: node.name,
                description: node.description,
                parent: node.parent || ""
            }))
        };

        console.log("Transformed data for D3:", data.data);
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}


