import G6 from '@antv/g6';

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'force',
    preventOverlap: true,
  },
  defaultNode: {
    color: '#5B8FF9',
    style: {
      lineWidth: 2,
      fill: '#C6E5FF',
    },
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
  },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then(res => res.json())
  .then(data => {
    const nodes = data.nodes;
    // randomize the node size
    nodes.forEach(node => {
      node.size = Math.random() * 30 + 5;
    });
    graph.data({
      nodes,
      edges: data.edges.map(function(edge, i) {
        edge.id = 'edge' + i;
        return Object.assign({}, edge);
      }),
    });
    graph.render();

    graph.on('node:dragstart', function(e) {
      graph.layout();
      refreshDragedNodePosition(e);
    });
    graph.on('node:drag', function(e) {
      refreshDragedNodePosition(e);
    });
    graph.on('node:dragend', function(e) {
      e.item.get('model').fx = null;
      e.item.get('model').fy = null;
    });
  });

function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}
