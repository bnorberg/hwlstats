/*! d3.chart - v0.2.1
 *  License: MIT Expat
 *  Date: 2014-06-24
 */
(function(t){"use strict";function e(t){var e,r,n,i;if(!t)return t;for(r=arguments.length,e=1;r>e;e++)if(n=arguments[e])for(i in n)t[i]=n[i];return t}var r=t.d3,n=Object.hasOwnProperty,i=function(t,e){if(!t)throw Error("[d3.chart] "+e)};i(r,"d3.js is required"),i("string"==typeof r.version&&r.version.match(/^3/),"d3.js version 3 is required");var a=/^(enter|update|merge|exit)(:transition)?$/,s=function(t){i(t,"Layers must be initialized with a base."),this._base=t,this._handlers={}};s.prototype.dataBind=function(){i(!1,"Layers must specify a `dataBind` method.")},s.prototype.insert=function(){i(!1,"Layers must specify an `insert` method.")},s.prototype.on=function(t,e,r){return r=r||{},i(a.test(t),"Unrecognized lifecycle event name specified to `Layer#on`: '"+t+"'."),t in this._handlers||(this._handlers[t]=[]),this._handlers[t].push({callback:e,chart:r.chart||null}),this._base},s.prototype.off=function(t,e){var r,n=this._handlers[t];if(i(a.test(t),"Unrecognized lifecycle event name specified to `Layer#off`: '"+t+"'."),!n)return this._base;if(1===arguments.length)return n.length=0,this._base;for(r=n.length-1;r>-1;--r)n[r].callback===e&&n.splice(r,1);return this._base},s.prototype.draw=function(t){var e,n,a,s,o,h,c,l;e=this.dataBind.call(this._base,t),i(e&&e.call===r.selection.prototype.call,"Invalid selection defined by `Layer#dataBind` method."),i(e.enter,"Layer selection not properly bound."),n=e.enter(),n._chart=this._base._chart,a=[{name:"update",selection:e},{name:"enter",selection:this.insert.bind(n)},{name:"merge",selection:e},{name:"exit",selection:e.exit.bind(e)}];for(var u=0,p=a.length;p>u;++u)if(h=a[u].name,s=a[u].selection,"function"==typeof s&&(s=s()),!s.empty()){if(i(s&&s.call===r.selection.prototype.call,"Invalid selection defined for '"+h+"' lifecycle event."),o=this._handlers[h])for(c=0,l=o.length;l>c;++c)s._chart=o[c].chart||this._base._chart,s.call(o[c].callback);if(o=this._handlers[h+":transition"],o&&o.length)for(s=s.transition(),c=0,l=o.length;l>c;++c)s._chart=o[c].chart||this._base._chart,s.call(o[c].callback)}},r.selection.prototype.layer=function(t){var e,r=new s(this);if(r.dataBind=t.dataBind,r.insert=t.insert,"events"in t)for(e in t.events)r.on(e,t.events[e]);return this.on=function(){return r.on.apply(r,arguments)},this.off=function(){return r.off.apply(r,arguments)},this.draw=function(){return r.draw.apply(r,arguments)},this};var o=function(t,e){var r=this.constructor,i=r.__super__;i&&o.call(i,t,e),n.call(r.prototype,"initialize")&&this.initialize.apply(t,e)},h=function(t,e){var r=this.constructor,i=r.__super__;return this===t&&n.call(this,"transform")&&(e=this.transform(e)),n.call(r.prototype,"transform")&&(e=r.prototype.transform.call(t,e)),i&&(e=h.call(i,t,e)),e},c=function(t,e){this.base=t,this._layers={},this._attached={},this._events={},e&&e.transform&&(this.transform=e.transform),o.call(this,this,[e])};c.prototype.initialize=function(){},c.prototype.unlayer=function(t){var e=this.layer(t);return delete this._layers[t],delete e._chart,e},c.prototype.layer=function(t,e,r){var n;if(1===arguments.length)return this._layers[t];if(2===arguments.length){if("function"==typeof e.draw)return e._chart=this,this._layers[t]=e,this._layers[t];i(!1,"When reattaching a layer, the second argument must be a d3.chart layer")}return n=e.layer(r),this._layers[t]=n,e._chart=this,n},c.prototype.attach=function(t,e){return 1===arguments.length?this._attached[t]:(this._attached[t]=e,e)},c.prototype.draw=function(t){var e,r,n;t=h.call(this,this,t);for(e in this._layers)this._layers[e].draw(t);for(r in this._attached)n=this.demux?this.demux(r,t):t,this._attached[r].draw(n)},c.prototype.on=function(t,e,r){var n=this._events[t]||(this._events[t]=[]);return n.push({callback:e,context:r||this,_chart:this}),this},c.prototype.once=function(t,e,r){var n=this,i=function(){n.off(t,i),e.apply(this,arguments)};return this.on(t,i,r)},c.prototype.off=function(t,e,r){var n,i,a,s,o,h;if(0===arguments.length){for(t in this._events)this._events[t].length=0;return this}if(1===arguments.length)return a=this._events[t],a&&(a.length=0),this;for(n=t?[t]:Object.keys(this._events),o=0;n.length>o;o++)for(i=n[o],a=this._events[i],h=a.length;h--;)s=a[h],(e&&e===s.callback||r&&r===s.context)&&a.splice(h,1);return this},c.prototype.trigger=function(t){var e,r,n=Array.prototype.slice.call(arguments,1),i=this._events[t];if(void 0!==i)for(e=0;i.length>e;e++)r=i[e],r.callback.apply(r.context,n);return this},c.extend=function(t,r,i){var a,s=this;a=r&&n.call(r,"constructor")?r.constructor:function(){return s.apply(this,arguments)},e(a,s,i);var o=function(){this.constructor=a};return o.prototype=s.prototype,a.prototype=new o,r&&e(a.prototype,r),a.__super__=s.prototype,c[t]=a,a},r.chart=function(t){return 0===arguments.length?c:1===arguments.length?c[t]:c.extend.apply(c,arguments)},r.selection.prototype.chart=function(t,e){if(0===arguments.length)return this._chart;var r=c[t];return i(r,"No chart registered with name '"+t+"'"),new r(this,e)},r.selection.enter.prototype.chart=function(){return this._chart},r.transition.prototype.chart=r.selection.enter.prototype.chart})(this);
//@ sourceMappingURL=d3.chart.min.map

!function(a,b){"use strict";"function"==typeof a.define&&a.define.amd?define(["d3"],function(c){b(a,c)}):b(a,a.d3)}(this,function(a,b){"use strict";function c(a,b){return a.source&&a.target?d(a,b):e(a,b)}function d(a,b){var c=[a];return b=b||"both",("source"==b||"both"==b)&&(c=c.concat(e(a.source,"source"))),("target"==b||"both"==b)&&(c=c.concat(e(a.target,"target"))),c}function e(a,b){var c=[a];return b=b||"both",("source"==b&&a.sourceLinks.length<2||"both"==b)&&a.targetLinks.forEach(function(a){c=c.concat(d(a,b))}),("target"==b&&a.targetLinks.length<2||"both"==b)&&a.sourceLinks.forEach(function(a){c=c.concat(d(a,b))}),c}b.chart("Sankey.Base",{initialize:function(){var a=this;a.features={},a.d3={},a.layers={},a.base.attr("width",a.base.node().parentNode.clientWidth),a.base.attr("height",a.base.node().parentNode.clientHeight),a.features.margins={top:1,right:1,bottom:6,left:1},a.features.width=a.base.attr("width")-a.features.margins.left-a.features.margins.right,a.features.height=a.base.attr("height")-a.features.margins.top-a.features.margins.bottom,a.features.name=function(a){return a.name},a.features.colorNodes=b.scale.category20c(),a.features.colorLinks=null,a.layers.base=a.base.append("g").attr("transform","translate("+a.features.margins.left+","+a.features.margins.top+")")},name:function(a){return arguments.length?(this.features.name=a,this.trigger("change:name"),this.root&&this.draw(this.root),this):this.features.name},colorNodes:function(a){return arguments.length?(this.features.colorNodes=a,this.trigger("change:color"),this.root&&this.draw(this.root),this):this.features.colorNodes},colorLinks:function(a){return arguments.length?(this.features.colorLinks=a,this.trigger("change:color"),this.data&&this.draw(this.data),this):this.features.colorLinks}}),b.chart("Sankey.Base").extend("Sankey",{initialize:function(){function a(a){return a.x<e.features.width/2}function c(a){return"function"==typeof e.features.colorNodes?e.features.colorNodes(e.features.name(a),a):e.features.colorNodes}function d(a){return"function"==typeof e.features.colorLinks?e.features.colorLinks(a):e.features.colorLinks}var e=this;e.d3.sankey=b.sankey(),e.d3.path=e.d3.sankey.link(),e.d3.sankey.size([e.features.width,e.features.height]),e.features.spread=!1,e.features.iterations=32,e.features.nodeWidth=e.d3.sankey.nodeWidth(),e.features.nodePadding=e.d3.sankey.nodePadding(),e.layers.links=e.layers.base.append("g").classed("links",!0),e.layers.nodes=e.layers.base.append("g").classed("nodes",!0),e.on("change:sizes",function(){e.d3.sankey.nodeWidth(e.features.nodeWidth),e.d3.sankey.nodePadding(e.features.nodePadding)}),e.layer("links",e.layers.links,{dataBind:function(a){return this.selectAll(".link").data(a.links)},insert:function(){return this.append("path").classed("link",!0)},events:{enter:function(){this.on("mouseover",function(a){e.trigger("link:mouseover",a)}),this.on("mouseout",function(a){e.trigger("link:mouseout",a)}),this.on("click",function(a){e.trigger("link:click",a)})},merge:function(){this.attr("d",e.d3.path).style("stroke",d).style("stroke-width",function(a){return Math.max(1,a.dy)}).sort(function(a,b){return b.dy-a.dy})},exit:function(){this.remove()}}}),e.layer("nodes",e.layers.nodes,{dataBind:function(a){return this.selectAll(".node").data(a.nodes)},insert:function(){return this.append("g").classed("node",!0)},events:{enter:function(){this.append("rect"),this.append("text").attr("dy",".35em").attr("transform",null),this.on("mouseover",function(a){e.trigger("node:mouseover",a)}),this.on("mouseout",function(a){e.trigger("node:mouseout",a)}),this.on("click",function(a){e.trigger("node:click",a)})},merge:function(){this.attr("transform",function(a){return"translate("+a.x+","+a.y+")"}),this.select("rect").attr("height",function(a){return a.dy}).attr("width",e.features.nodeWidth).style("fill",c).style("stroke",function(a){return b.rgb(c(a)).darker(2)}),this.select("text").text(e.features.name).attr("y",function(a){return a.dy/2}).attr("x",function(b){return a(b)?6+e.features.nodeWidth:-6}).attr("text-anchor",function(b){return a(b)?"start":"end"})},exit:function(){this.remove()}}})},transform:function(a){var b=this;return b.data=a,b.d3.sankey.nodes(a.nodes).links(a.links).layout(b.features.iterations),this.features.spread&&(this._spreadNodes(a),b.d3.sankey.relayout()),a},iterations:function(a){return arguments.length?(this.features.iterations=a,this.data&&this.draw(this.data),this):this.features.iterations},nodeWidth:function(a){return arguments.length?(this.features.nodeWidth=a,this.trigger("change:sizes"),this.data&&this.draw(this.data),this):this.features.nodeWidth},nodePadding:function(a){return arguments.length?(this.features.nodePadding=a,this.trigger("change:sizes"),this.data&&this.draw(this.data),this):this.features.nodePadding},spread:function(a){return arguments.length?(this.features.spread=a,this.data&&this.draw(this.data),this):this.features.spread},_spreadNodes:function(a){var c=this,d=b.nest().key(function(a){return a.x}).entries(a.nodes).map(function(a){return a.values});d.forEach(function(a){var d,e,f=b.sum(a,function(a){return a.dy}),g=(c.features.height-f)/a.length,h=0;for(a.sort(function(a,b){return a.y-b.y}),d=0;d<a.length;++d)e=a[d],e.y=h,h+=e.dy+g})}}),b.chart("Sankey").extend("Sankey.Selection",{initialize:function(){function a(){return c.features.selection&&c.features.selection.length?this.style("opacity",function(a){return c.features.selection.indexOf(a)>=0?1:c.features.unselectedOpacity}):this.style("opacity",1)}function b(){var b=c.layers.base.selectAll(".node, .link").transition();c.features.selection&&c.features.selection.length||(b=b.delay(100)),a.apply(b.duration(50))}var c=this;c.features.selection=null,c.features.unselectedOpacity=.2,c.on("link:mouseover",c.selection),c.on("link:mouseout",function(){c.selection(null)}),c.on("node:mouseover",c.selection),c.on("node:mouseout",function(){c.selection(null)}),c.on("change:selection",b),this.layer("links").on("enter",a),this.layer("nodes").on("enter",a)},selection:function(a){return arguments.length?(this.features.selection=!a||a instanceof Array?a:[a],this.trigger("change:selection"),this):this.features.selection},unselectedOpacity:function(a){return arguments.length?(this.features.unselectedOpacity=a,this.trigger("change:selection"),this):this.features.unselectedOpacity}}),b.chart("Sankey.Selection").extend("Sankey.Path",{selection:function(a){var b=this;return arguments.length?(b.features.selection=!a||a instanceof Array?a:[a],b.features.selection&&b.features.selection.forEach(function(a){c(a).forEach(function(a){b.features.selection.push(a)})}),b.trigger("change:selection"),b):b.features.selection}})});

d3.sankey = function() {
  var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      size = [1, 1],
      nodes = [],
      links = [];

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

  sankey.layout = function(iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  };

  sankey.relayout = function() {
    computeLinkDepths();
    return sankey;
  };

  sankey.link = function() {
    var curvature = .5;

    function link(d) {
      var x0 = d.source.x + d.source.dx,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1;
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    nodes.forEach(function(node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function(link) {
      var source = link.source,
          target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    var remainingNodes = nodes,
        nextNodes,
        x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach(function(link) {
          nextNodes.push(link.target);
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    //
    moveSinksRight(x);
    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  function computeNodeDepths(iterations) {
    var nodesByBreadth = d3.nest()
        .key(function(d) { return d.x; })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft(alpha *= .99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {
      var ky = d3.min(nodesByBreadth, function(nodes) {
        return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
      });

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i;
          node.dy = node.value * ky;
        });
      });

      links.forEach(function(link) {
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function(nodes, breadth) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedSource(link) {
        return center(link.source) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function(nodes) {
        var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkDepths() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(function(node) {
      var sy = 0, ty = 0;
      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function(link) {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }

  return sankey;
};

var colors = {
            'Humanities Labs':'#ff5107',
            'Emerging Humanities Networks': '#0739FF',
            'Bridge Hires': '#d3002b',
            'Undergraduate Research': '#323138',
            'Visiting Faculty Fellows': '#005d4a',
          };
      d3.json("/hwlstats/data/hwl_alluvial_dept.json", function(error, json) {
        var chart = d3.select("#chart").append("svg").chart("Sankey.Path");
        chart
          .name(label)
          .colorNodes(function(name, node) {
            return color(node, 1) || colors.fallback;
          })
          .colorLinks(function(link) {
            return color(link.source, 4) || color(link.target, 1) || colors.fallback;
          })
          .nodeWidth(15)
          .nodePadding(10)
          .spread(true)
          .iterations(0)
          .draw(json);
        function label(node) {
          return node.name
        }
        function color(node, depth) {
          var group = node.name;
          if (colors[group]) {
            return colors[group];
          } else if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
            return color(node.targetLinks[0].target, depth-1);
          } else {
            return null;
          }
        }
      });