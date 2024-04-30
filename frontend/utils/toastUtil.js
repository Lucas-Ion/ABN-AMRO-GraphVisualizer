/* toastUtil.js */

import { Toast } from 'bootstrap';

export function showNodeInfo(event, nodeData) {
    d3.selectAll('.node.selected').classed('selected', false);

    // select the current node
    const currentNode = d3.select(event.currentTarget);
    currentNode.classed('selected', true);

    const toastEl = document.getElementById('nodeToast');
    document.getElementById('toastTitle').textContent = nodeData.name;
    document.getElementById('toastDescription').textContent = nodeData.description;

    const toast = new Toast(toastEl, {
        autohide: false  // disable autohide, since bootstrap defaults to 5000ms
    });
    toast.show();

    // remove selection when toast is closed
    const removeSelection = () => {
        currentNode.classed('selected', false);
    };

    // attach the event listener to handle closure
    toastEl.addEventListener('hidden.bs.toast', removeSelection, { once: true });
}
