/* graphView.js */

import * as d3 from 'd3';
import { showNodeInfo } from '../utils/toastUtil.js';

export class GraphView {
    static render(data) {
        const treeLayout = d3.tree().size([600, 800]);
        const root = d3.stratify()
            .id(d => d.name)
            .parentId(d => d.parent)
            (data.data);
        const treeData = treeLayout(root);

        const svg = d3.select("#graph")
            .attr("width", 2000)
            .attr("height", 600)
            .append("g")
            .attr("transform", "translate(50,50)");

        const diagonal = (source, target) => {
            return `M ${source.y} ${source.x} H ${source.y + (target.y - source.y) / 2} V ${target.x} H ${target.y}`;
        };

        svg.selectAll(".link")
            .data(treeData.links())
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d => diagonal(d.source, d.target))
            .style("fill", "none")
            .style("stroke", "#FFFFFF")
            .style("stroke-width", 5.5)
            .style("stroke-linejoin", "round")
            .style("stroke-linecap", "round");

        const node = svg.selectAll(".node")
            .data(treeData.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .on("click", function (event, d) { showNodeInfo(event, d.data); });

        node.append("rect")
            .attr("width", 80)
            .attr("height", 80)
            .attr("x", -40)
            .attr("y", -40)
            .attr("rx", 11)
            .attr("ry", 11)
            .attr("stroke", "eee")
            .attr("fill", "#fff");

        node.append("text")
            .attr("dy", ".35em")
            .text(d => d.data.name)
            .attr("text-anchor", "middle")
            .attr("fill", "#333");
    }
}
