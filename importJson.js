// Reference: https://stackoverflow.com/questions/42722856/import-json-file-to-create-a-network-in-vis-js

// -------------------------------------------------------------------------
// OPTIONS:

// http://visjs.org/docs/network/#modules
// http://visjs.org/docs/network/edges.html#
// http://visjs.org/docs/network/physics.html#

var options = {
  nodes: {
    font: {
      color: 'blue',
    },
    image: "img/server.png",
    shape: "image",
  },
  edges: {
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: 'arrow' },
      // to: {enabled: false, scaleFactor:0.5, type:'bar'},
      middle: { enabled: false, scaleFactor: 1, type: 'arrow' },
      //from: {enabled: true, scaleFactor:0.3, type:'arrow'}
      from: { enabled: false, scaleFactor: 1, type: 'arrow' }
    },
    arrowStrikethrough: true,
    chosen: true,
    color: {
      // color:'#848484',
      color: 'black',
      highlight: '#848484',
      hover: '#848484',
      inherit: 'from',
      opacity: 1.0
    },
    dashes: false,
    font: {
      color: '#343434',
      size: 14, // px
      face: 'arial',
      background: 'none',
      strokeWidth: 2, // px
      strokeColor: '#ffffff',
      align: 'horizontal',
      multi: false,
      vadjust: 0,
      bold: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'bold'
      },
      ital: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'italic'
      },
      boldital: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'bold italic'
      },
      mono: {
        color: '#343434',
        size: 15, // px
        face: 'courier new',
        vadjust: 2,
        mod: ''
      }
    }
  },
  // https://visjs.github.io/vis-network/docs/network/physics.htm
  physics: {
    enabled: true,
    barnesHut: {
      gravitationalConstant: -10000,
      centralGravity: 0.3,
      // springLength: 95,
      springLength: 175,
      springConstant: 0.04,
      damping: 0.09,
      avoidOverlap: 0
    },
    forceAtlas2Based: {
      gravitationalConstant: -50,
      centralGravity: 0.01,
      springConstant: 0.08,
      springLength: 100,
      damping: 0.4,
      avoidOverlap: 0
    },
    repulsion: {
      centralGravity: 0.2,
      springLength: 200,
      springConstant: 0.05,
      nodeDistance: 100,
      damping: 0.09
    },
    hierarchicalRepulsion: {
      centralGravity: 0.0,
      springLength: 100,
      springConstant: 0.01,
      nodeDistance: 120,
      damping: 0.09
    },
    maxVelocity: 50,
    minVelocity: 0.1,
    solver: 'barnesHut',
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 100,
      onlyDynamicEdges: false,
      fit: true
    },
    timestep: 0.5,
    adaptiveTimestep: true
  },
};

// -------------------------------------------------------------------------
// IMPORT DATA FROM EXTERNAL JSON FILE:

// Per: https://github.com/ikwattro/blog/blob/master/sources/easy-graph-visualization-with-vis-dot-js.adoc:

// NOTES:
// 1. Must use double quotes ("; not ') in that JSON file;
// 2. Cannot have comments in that file, only data!  See:
//    https://stackoverflow.com/questions/244777/can-comments-be-used-in-json
// 3. Per the path below, place the "test.json" file in a "data" subdirectory.

// var options = {}

document.getElementById('import').onclick = function () {
  var files = document.getElementById('selectFiles').files;
  console.log(files);
  if (files.length <= 0) {
    return false;
  }

  var fr = new FileReader();

  fr.onload = function (e) {
    console.log(e);
    var result = JSON.parse(e.target.result);
    var formatted = JSON.stringify(result, null, 2);
    document.getElementById('result').value = formatted;

    var data = {
      nodes: result.nodes,
      edges: result.edges
    };
    console.log(data);

    var container = document.getElementById('mynetwork');
    var network = new vis.Network(container, data, options);
  }

  fr.readAsText(files.item(0));

};

document.getElementById('example').onclick = function () {
  var json = $.getJSON("data/test.json")
    .done(function (data) {
      var data = {
        nodes: data.nodes,
        edges: data.edges
      };
      console.log(data);
      document.getElementById('result').value = JSON.stringify(data, null, 2);
      var network = new vis.Network(container, data, options);
    });

  var container = document.getElementById('mynetwork');

};