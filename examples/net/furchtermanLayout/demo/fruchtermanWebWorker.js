import G6 from '@antv/g6';

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;

const graphDiv = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = '布局中，请稍等......本例使用了 web-worker，画布外的页面不会被阻塞。';
graphDiv.appendChild(descriptionDiv);

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  },
  layout: {
    type: 'fruchterman',
    maxIteration: 8000,
    gravity: 1,
    workerEnabled: true
  },
  animate: true,
  defaultNode: {
    size: 10,
    style: {
      lineWidth: 2,
      stroke: '#5B8FF9',
      fill: '#C6E5FF'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#666',
    style: {
      opacity: 0.1
    }
  }
});

graph.on('afterlayout', () => {
  descriptionDiv.innerHTML = '布局完成！';
});

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then(res => res.json())
  .then(data => {
    graph.data(data);
    graph.render();
  });
