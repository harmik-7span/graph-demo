function DirectedGraph(_selector, _options) {
  let data = {},
    nodes = [],
    relationships = [],
    node,
    relationship,
    relationshipOutline,
    relationshipOverlay,
    relationshipText,
    selector,
    toolTipinfo,
    simulation,
    svg,
    zoomValue,
    g,
    svgNodes,
    svgRelationships,
    classes2colors = {},
    numClasses = 0;

  let options = {
    arrowSize: 7.5,
    relationshipWidth: 1.5,
    nodeRadius: 23,
    zoomScale: [0.1, 10],
    colors: colors(),
    icons: {},
    infoPanel: true,
    toolTipOnNode:true,
    nodeCaption: true,
    relationshipCaption: true,
    relationshipColor: '#a5abb6',
  };

  // ----- init

  init(_selector, _options);

  //---

  function init(_selector, _options) {
    selector = _selector;
    options = { ...options, ..._options };
    if (options.infoPanel) {
      info = appendInfoPanel(d3.select(selector));
    }
    appendGraph(d3.select(selector));
    simulation = initSimulation();
    

    if (options.toolTipOnNode) {
      toolTipinfo = appendToolTipOnNode(d3.select(selector));
    }
  }

  function drawGraph(_data) {
    data = _data;
    showData(data);
  }

  function appendInfoPanel(container) {
    return container.append('div')
        .attr('class', 'neo4jd3-info');
}

function appendToolTipOnNode(container) {
  return container.append('div')
      .attr('id', 'neo4jd3-tooltip');
}
  // components/graph
  function findNode(id, nodes) {
    let match;
    nodes.forEach((node) => {
      if (node.id == id) match = node;
    });
    return match;
  }

  function showData(d) {
    mapData(d);
    updateContent(d.nodes, d.relationships);
  }

  function mapData(d) {
    d.relationships.map((r) => {
      let source = findNode(r.startNode, d.nodes);
      let target = findNode(r.endNode, d.nodes);

      (r.source = source),
        (r.target = target),
        (r.naturalAngle = 0),
        (r.isLoop = function () {
          return this.source === this.target;
        });
      return r;
    });
  }

  //---

  function zoom() {
    return d3.zoom().scaleExtent(options.zoomScale).on("zoom", zoomed);
  }

  function transform() {
    return d3.zoomIdentity.translate(0, 0).scale(2);
  }

  function updateContent(n, r) {
    updateRelationships(r);
    updateNodes(n);

    simulation.nodes(nodes);
    simulation.force("link").links(relationships);
  }

  // ---utils

  function NodePair(node1, node2) {
    this.nodeA;
    this.nodeB;
    this.relationships = [];

    if (node1.id < node2.id) {
      this.nodeA = node1;
      this.nodeB = node2;
    } else {
      this.nodeA = node2;
      this.nodeB = node1;
    }
    return this;
  }

  NodePair.prototype = {
    isLoop: function () {
      return this.nodeA === this.nodeB;
    },
    toString: function () {
      return `${this.nodeA.id}:${this.nodeB.id}`;
    },
  };

  function StraightArrow(
    startRadius,
    endRadius,
    centreDistance,
    shaftWidth,
    headWidth,
    headHeight,
    captionLayout
  ) {
    this.length;
    this.midShaftPoint;
    this.outline;
    this.overlay;
    this.shaftLength;
    this.deflection = 0;

    this.length = centreDistance - (startRadius + endRadius);
    this.shaftLength = this.length - headHeight;

    const startArrow = startRadius;
    const endShaft = startArrow + this.shaftLength;
    const endArrow = startArrow + this.length;
    const shaftRadius = shaftWidth / 2;
    const headRadius = headWidth / 2;

    this.midShaftPoint = {
      x: startArrow + this.shaftLength / 2,
      y: 0,
    };

    // for shortCaptionLength we use textBoundingBox = text.node().getComputedTextLength(),
    this.outline = function (shortCaptionLength) {
      if (captionLayout === "external") {
        const startBreak =
          startArrow + (this.shaftLength - shortCaptionLength) / 2;
        const endBreak = endShaft - (this.shaftLength - shortCaptionLength) / 2;

        return [
          "M",
          startArrow,
          shaftRadius,
          "L",
          startBreak,
          shaftRadius,
          "L",
          startBreak,
          -shaftRadius,
          "L",
          startArrow,
          -shaftRadius,
          "Z",
          "M",
          endBreak,
          shaftRadius,
          "L",
          endShaft,
          shaftRadius,
          "L",
          endShaft,
          headRadius,
          "L",
          endArrow,
          0,
          "L",
          endShaft,
          -headRadius,
          "L",
          endShaft,
          -shaftRadius,
          "L",
          endBreak,
          -shaftRadius,
          "Z",
        ].join(" ");
      } else {
        return [
          "M",
          startArrow,
          shaftRadius,
          "L",
          endShaft,
          shaftRadius,
          "L",
          endShaft,
          headRadius,
          "L",
          endArrow,
          0,
          "L",
          endShaft,
          -headRadius,
          "L",
          endShaft,
          -shaftRadius,
          "L",
          startArrow,
          -shaftRadius,
          "Z",
        ].join(" ");
      }
    };

    this.overlay = function (minWidth) {
      const radius = Math.max(minWidth / 2, shaftRadius);
      return [
        "M",
        startArrow,
        radius,
        "L",
        endArrow,
        radius,
        "L",
        endArrow,
        -radius,
        "L",
        startArrow,
        -radius,
        "Z",
      ].join(" ");
    };
  }

  function ArcArrow(
    startRadius,
    endRadius,
    endCentre,
    _deflection,
    arrowWidth,
    headWidth,
    headLength,
    captionLayout
  ) {
    this.deflection = _deflection;
    const square = (l) => l * l;

    const deflectionRadians = (this.deflection * Math.PI) / 180;
    const startAttach = {
      x: Math.cos(deflectionRadians) * startRadius,
      y: Math.sin(deflectionRadians) * startRadius,
    };

    const radiusRatio = startRadius / (endRadius + headLength);
    const homotheticCenter = (-endCentre * radiusRatio) / (1 - radiusRatio);

    const intersectWithOtherCircle = function (
      fixedPoint,
      radius,
      xCenter,
      polarity
    ) {
      const gradient = fixedPoint.y / (fixedPoint.x - homotheticCenter);
      const hc = fixedPoint.y - gradient * fixedPoint.x;

      const A = 1 + square(gradient);
      const B = 2 * (gradient * hc - xCenter);
      const C = square(hc) + square(xCenter) - square(radius);

      const intersection = {
        x: (-B + polarity * Math.sqrt(square(B) - 4 * A * C)) / (2 * A),
      };
      intersection.y = (intersection.x - homotheticCenter) * gradient;

      return intersection;
    };

    const endAttach = intersectWithOtherCircle(
      startAttach,
      endRadius + headLength,
      endCentre,
      -1
    );

    const g1 = -startAttach.x / startAttach.y;
    const c1 = startAttach.y + square(startAttach.x) / startAttach.y;
    const g2 = -(endAttach.x - endCentre) / endAttach.y;
    const c2 =
      endAttach.y + ((endAttach.x - endCentre) * endAttach.x) / endAttach.y;

    const cx = (c1 - c2) / (g2 - g1);
    const cy = g1 * cx + c1;

    const arcRadius = Math.sqrt(
      square(cx - startAttach.x) + square(cy - startAttach.y)
    );
    const startAngle = Math.atan2(startAttach.x - cx, cy - startAttach.y);
    const endAngle = Math.atan2(endAttach.x - cx, cy - endAttach.y);
    let sweepAngle = endAngle - startAngle;
    if (this.deflection > 0) {
      sweepAngle = 2 * Math.PI - sweepAngle;
    }

    this.shaftLength = sweepAngle * arcRadius;
    if (startAngle > endAngle) {
      this.shaftLength = 0;
    }

    let midShaftAngle = (startAngle + endAngle) / 2;
    if (this.deflection > 0) {
      midShaftAngle += Math.PI;
    }
    this.midShaftPoint = {
      x: cx + arcRadius * Math.sin(midShaftAngle),
      y: cy - arcRadius * Math.cos(midShaftAngle),
    };

    const startTangent = function (dr) {
      const dx = (dr < 0 ? 1 : -1) * Math.sqrt(square(dr) / (1 + square(g1)));
      const dy = g1 * dx;
      return {
        x: startAttach.x + dx,
        y: startAttach.y + dy,
      };
    };

    const endTangent = function (dr) {
      const dx = (dr < 0 ? -1 : 1) * Math.sqrt(square(dr) / (1 + square(g2)));
      const dy = g2 * dx;
      return {
        x: endAttach.x + dx,
        y: endAttach.y + dy,
      };
    };

    const angleTangent = (angle, dr) => ({
      x: cx + (arcRadius + dr) * Math.sin(angle),
      y: cy - (arcRadius + dr) * Math.cos(angle),
    });

    const endNormal = function (dc) {
      const dx =
        (dc < 0 ? -1 : 1) * Math.sqrt(square(dc) / (1 + square(1 / g2)));
      const dy = dx / g2;
      return {
        x: endAttach.x + dx,
        y: endAttach.y - dy,
      };
    };

    const endOverlayCorner = function (dr, dc) {
      const shoulder = endTangent(dr);
      const arrowTip = endNormal(dc);
      return {
        x: shoulder.x + arrowTip.x - endAttach.x,
        y: shoulder.y + arrowTip.y - endAttach.y,
      };
    };

    const coord = (point) => `${point.x},${point.y}`;

    const shaftRadius = arrowWidth / 2;
    const headRadius = headWidth / 2;
    const positiveSweep = startAttach.y > 0 ? 0 : 1;
    const negativeSweep = startAttach.y < 0 ? 0 : 1;

    this.outline = function (shortCaptionLength) {
      if (startAngle > endAngle) {
        return [
          "M",
          coord(endTangent(-headRadius)),
          "L",
          coord(endNormal(headLength)),
          "L",
          coord(endTangent(headRadius)),
          "Z",
        ].join(" ");
      }

      if (captionLayout === "external") {
        let captionSweep = shortCaptionLength / arcRadius;
        if (this.deflection > 0) {
          captionSweep *= -1;
        }

        const startBreak = midShaftAngle - captionSweep / 2;
        const endBreak = midShaftAngle + captionSweep / 2;

        return [
          "M",
          coord(startTangent(shaftRadius)),
          "L",
          coord(startTangent(-shaftRadius)),
          "A",
          arcRadius - shaftRadius,
          arcRadius - shaftRadius,
          0,
          0,
          positiveSweep,
          coord(angleTangent(startBreak, -shaftRadius)),
          "L",
          coord(angleTangent(startBreak, shaftRadius)),
          "A",
          arcRadius + shaftRadius,
          arcRadius + shaftRadius,
          0,
          0,
          negativeSweep,
          coord(startTangent(shaftRadius)),
          "Z",
          "M",
          coord(angleTangent(endBreak, shaftRadius)),
          "L",
          coord(angleTangent(endBreak, -shaftRadius)),
          "A",
          arcRadius - shaftRadius,
          arcRadius - shaftRadius,
          0,
          0,
          positiveSweep,
          coord(endTangent(-shaftRadius)),
          "L",
          coord(endTangent(-headRadius)),
          "L",
          coord(endNormal(headLength)),
          "L",
          coord(endTangent(headRadius)),
          "L",
          coord(endTangent(shaftRadius)),
          "A",
          arcRadius + shaftRadius,
          arcRadius + shaftRadius,
          0,
          0,
          negativeSweep,
          coord(angleTangent(endBreak, shaftRadius)),
        ].join(" ");
      } else {
        return [
          "M",
          coord(startTangent(shaftRadius)),
          "L",
          coord(startTangent(-shaftRadius)),
          "A",
          arcRadius - shaftRadius,
          arcRadius - shaftRadius,
          0,
          0,
          positiveSweep,
          coord(endTangent(-shaftRadius)),
          "L",
          coord(endTangent(-headRadius)),
          "L",
          coord(endNormal(headLength)),
          "L",
          coord(endTangent(headRadius)),
          "L",
          coord(endTangent(shaftRadius)),
          "A",
          arcRadius + shaftRadius,
          arcRadius + shaftRadius,
          0,
          0,
          negativeSweep,
          coord(startTangent(shaftRadius)),
        ].join(" ");
      }
    };

    this.overlay = function (minWidth) {
      const radius = Math.max(minWidth / 2, shaftRadius);

      return [
        "M",
        coord(startTangent(radius)),
        "L",
        coord(startTangent(-radius)),
        "A",
        arcRadius - radius,
        arcRadius - radius,
        0,
        0,
        positiveSweep,
        coord(endTangent(-radius)),
        "L",
        coord(endOverlayCorner(-radius, headLength)),
        "L",
        coord(endOverlayCorner(radius, headLength)),
        "L",
        coord(endTangent(radius)),
        "A",
        arcRadius + radius,
        arcRadius + radius,
        0,
        0,
        negativeSweep,
        coord(startTangent(radius)),
      ].join(" ");
    };
  }

  function LoopArrow(
    nodeRadius,
    straightLength,
    spreadDegrees,
    shaftWidth,
    headWidth,
    headLength,
    captionHeight
  ) {
    this.outline;
    this.overlay, this.shaftLength;
    this.midShaftPoint;

    const spread = (spreadDegrees * Math.PI) / 180;
    const r1 = nodeRadius;
    const r2 = nodeRadius + headLength;
    const r3 = nodeRadius + straightLength;
    const loopRadius = r3 * Math.tan(spread / 2);
    const shaftRadius = shaftWidth / 2;
    this.shaftLength = loopRadius * 3 + shaftWidth;

    function Point(_x, _y) {
      this.x;
      this.y;

      this.x = _x;
      this.y = _y;
    }

    Point.prototype = {
      toString: function () {
        return `${this.x} ${this.y}`;
      },
    };

    const normalPoint = function (sweep, radius, displacement) {
      const localLoopRadius = radius * Math.tan(spread / 2);
      const cy = radius / Math.cos(spread / 2);
      return new Point(
        (localLoopRadius + displacement) * Math.sin(sweep),
        cy + (localLoopRadius + displacement) * Math.cos(sweep)
      );
    };

    this.midShaftPoint = normalPoint(
      0,
      r3,
      shaftRadius + captionHeight / 2 + 2
    );
    const startPoint = (radius, displacement) =>
      normalPoint((Math.PI + spread) / 2, radius, displacement);
    const endPoint = (radius, displacement) =>
      normalPoint(-(Math.PI + spread) / 2, radius, displacement);

    this.outline = function () {
      const inner = loopRadius - shaftRadius;
      const outer = loopRadius + shaftRadius;
      return [
        "M",
        startPoint(r1, shaftRadius),
        "L",
        startPoint(r3, shaftRadius),
        "A",
        outer,
        outer,
        0,
        1,
        1,
        endPoint(r3, shaftRadius),
        "L",
        endPoint(r2, shaftRadius),
        "L",
        endPoint(r2, -headWidth / 2),
        "L",
        endPoint(r1, 0),
        "L",
        endPoint(r2, headWidth / 2),
        "L",
        endPoint(r2, -shaftRadius),
        "L",
        endPoint(r3, -shaftRadius),
        "A",
        inner,
        inner,
        0,
        1,
        0,
        startPoint(r3, -shaftRadius),
        "L",
        startPoint(r1, -shaftRadius),
        "Z",
      ].join(" ");
    };

    this.overlay = function (minWidth) {
      const displacement = Math.max(minWidth / 2, shaftRadius);
      const inner = loopRadius - displacement;
      const outer = loopRadius + displacement;
      return [
        "M",
        startPoint(r1, displacement),
        "L",
        startPoint(r3, displacement),
        "A",
        outer,
        outer,
        0,
        1,
        1,
        endPoint(r3, displacement),
        "L",
        endPoint(r2, displacement),
        "L",
        endPoint(r2, -displacement),
        "L",
        endPoint(r3, -displacement),
        "A",
        inner,
        inner,
        0,
        1,
        0,
        startPoint(r3, -displacement),
        "L",
        startPoint(r1, -displacement),
        "Z",
      ].join(" ");
    };
  }

  //---utils

  function appendGraph(container) {

    zoomValue = d3.zoom().on("zoom", zoomed);
    svg = container
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("class", "directed-graph")
      .call(zoom())
      .on("dblclick.zoom", null);

    g = svg.append("g").attr("width", "100%").attr("height", "100%");

    svgRelationships = g.append("g").attr("class", "relationships");

    svgNodes = g.append("g").attr("class", "nodes");
  }

  d3.select("#zoom_in").on("click", function() {
    zoomValue.scaleBy(svg.transition().duration(750), 1.2);
  });
  d3.select("#zoom_out").on("click", function() {
    zoomValue.scaleBy(svg.transition().duration(750), 0.8);
  });
  function appendInfoElementClass(cls, node) {
    appendInfoElement(cls, true, node);
}

function appendInfoElementProperty(cls, property, value) {
    appendInfoElement(cls, false, property, value);
}

function appendInfoElementRelationship(cls, relationship) {
    appendInfoElement(cls, false, relationship);
}
function defaultColor() {
  return options.relationshipColor;
}
function defaultDarkenColor() {
  return d3.rgb(options.colors[options.colors.length - 1]).darker(1);
}
function colors() {
  // d3.schemeCategory10,
  // d3.schemeCategory20,
  return [
      '#68bdf6', // light blue
      '#6dce9e', // green #1
      '#faafc2', // light pink
      '#f2baf6', // purple
      '#ff928c', // light red
      '#fcea7e', // light yellow
      '#ffc766', // light orange
      '#405f9e', // navy blue
      '#a5abb6', // dark gray
      '#78cecb', // green #2,
      '#b88cbb', // dark purple
      '#ced2d9', // light gray
      '#e84646', // dark red
      '#fa5f86', // dark pink
      '#ffab1a', // dark orange
      '#fcda19', // dark yellow
      '#797b80', // black
      '#c9d96f', // pistacchio
      '#47991f', // green #3
      '#70edee', // turquoise
      '#ff75ea'  // pink
  ];
}
function appendInfoElement(cls, isNode, property, value) {
  var elem = info.append('a');

  elem.attr('href', '#')
      .attr('class', cls)
      .html('<strong>' + property + '</strong>' + (value ? (': ' + value) : ''));

  if (!value) {
      elem.style('background-color', function (d) {
          if (property == "Person") {
              return 'rgb(255, 96, 92)';
          } else if (property == "Address") {
              return 'rgb(219, 132, 193)';
          } else if (property == "Company") {
              return 'rgb(113, 207, 152)';
          } else {
              return options.nodeOutlineFillColor ? options.nodeOutlineFillColor : (isNode ? class2color(property) : defaultColor());
          }
      })
          .style('border-color', function (d) {
              if (property == "Person") {
                  return 'rgb(255, 5, 27)';
              } else if (property == "Address") {
                  return 'rgb(191, 88, 151)';
              } else if (property == "Company") {
                  return 'rgb(71, 174, 122)';
              } else {
                  return options.nodeOutlineFillColor ? class2darkenColor(options.nodeOutlineFillColor) : (isNode ? class2darkenColor(property) : defaultDarkenColor());
              }
          })
          .style('color', function (d) {
              return options.nodeOutlineFillColor ? class2darkenColor(options.nodeOutlineFillColor) : '#fff';
          });
  }
}

function updateInfo(d) {
  clearInfo();

  if (d.labels) {
      appendInfoElementClass('class', d.labels[0]);
  } else {
      appendInfoElementRelationship('class', d.type);
  }

  appendInfoElementProperty('property', '&lt;id&gt;', d.id);

  Object.keys(d.properties).forEach(function (property) {
      appendInfoElementProperty('property', property, JSON.stringify(d.properties[property]));
  });
}
function updateToopTipInfo(d) {
  clearToolTipInfo();
  if (options.toolTipOnNode) {

      var elem = toolTipinfo.append('div')
      let hoverTitleText = "";
      let hoverIdText = "";
      let hoverProperties = "";
      hoverTitleText = "<tr><td class='key-title'>Type</td><td>" + d.labels[0] + "</td>";
      hoverIdText = "<tr><td class='key-title'>Id</td><td>" + d.id + "</td>";
      for (var key in d.properties) {
          hoverProperties += "<tr><td class='key-title'>" + key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) + "</td><td>" + d.properties[key] + "</td>"
      }
      elem.attr('class', "tooltip-wrapper")
          .html("<table>" + hoverTitleText + hoverIdText + hoverProperties + "</table>").transition().duration(200);
     if (d3.event.pageX > 475 && d3.event.pageY < 374) {
        document.getElementById("neo4jd3-tooltip").style.left = (d3.event.pageX - 350) + "px"
        document.getElementById("neo4jd3-tooltip").style.top = (d3.event.pageY - 10) + "px";
      }else if (d3.event.pageX < 474 && d3.event.pageY > 375) {
        document.getElementById("neo4jd3-tooltip").style.left = (d3.event.pageX + 10) + "px"
        document.getElementById("neo4jd3-tooltip").style.top = (d3.event.pageY - 140) + "px";
      }else if(d3.event.pageX > 450 && d3.event.pageY > 370){
        document.getElementById("neo4jd3-tooltip").style.left = (d3.event.pageX - 350) + "px"
        document.getElementById("neo4jd3-tooltip").style.top = (d3.event.pageY - 140) + "px";
      } else {
        document.getElementById("neo4jd3-tooltip").style.left = (d3.event.pageX + 10) + "px"
        document.getElementById("neo4jd3-tooltip").style.top = (d3.event.pageY - 10) + "px";
      }
      console.log(d3.event.pageX,d3.event.pageY);
     

      // if (d.y < 100) {
      //     document.getElementById("neo4jd3-tooltip").style.top = (d.y + 80) + "px";
      // } else if (d.y > 360) {
      //     document.getElementById("neo4jd3-tooltip").style.top = (d.y - 100) + "px";
      // } else {
      //     document.getElementById("neo4jd3-tooltip").style.top = (d.y + 55) + "px";
      // }
  }
}
function clearInfo() {
  info.html('');
}
function clearToolTipInfo() {
  toolTipinfo.html('');
}
  function initSimulation() {
    console.log(svg.node())
    return (
      d3
        .forceSimulation()
        .velocityDecay(0.8)
        .force(
          "collide",
          d3
            .forceCollide(options.nodeRadius)
            .radius(function (d) {
              return options.nodeRadius * 2;
            })
            .iterations(3)
            .strength(1)
        )
        .force("charge", d3.forceManyBody().strength())
        .force(
          "link",
          d3
            .forceLink()
            .distance(() => {
              return options.nodeRadius * 14;
            })

            .id(function (d) {
              return d.id;
            })
        )
        .force('center', d3.forceCenter(svg.node().parentElement.clientWidth / 2, svg.node().parentElement.clientHeight / 2))
        .force(
          "charge",
          d3
            .forceManyBody()
            .strength(-180)
            .distanceMax(500)
            .distanceMin(options.nodeRadius * 3.5)
        )
        .alphaDecay(0.01)
        .alphaTarget(1)
        .on("tick", function () {
          tick();
        })
    );
  }

  function layoutRelationships() {
    const nodePairs = groupedRelationships();
    computeGeometryForNonLoopArrows(nodePairs);
    distributeAnglesForLoopArrows(nodePairs, data.relationships);

    return (() => {
      const result = [];
      for (var nodePair of Array.from(nodePairs)) {
        for (var relationship of Array.from(nodePair.relationships)) {
          delete relationship.arrow;
        }

        var middleRelationshipIndex = (nodePair.relationships.length - 1) / 2;
        var defaultDeflectionStep = 30;
        const maximumTotalDeflection = 150;
        const numberOfSteps = nodePair.relationships.length - 1;
        const totalDeflection = defaultDeflectionStep * numberOfSteps;

        var deflectionStep =
          totalDeflection > maximumTotalDeflection
            ? maximumTotalDeflection / numberOfSteps
            : defaultDeflectionStep;

        result.push(
          (() => {
            for (let i = 0; i < nodePair.relationships.length; i++) {
              var ref;
              relationship = nodePair.relationships[i];
              const nodeRadius = options.nodeRadius;
              const shaftWidth = options.relationshipWidth;
              const headWidth = options.arrowSize;
              const headHeight = headWidth;

              if (nodePair.isLoop()) {
                relationship.arrow = new LoopArrow(
                  nodeRadius,
                  40,
                  defaultDeflectionStep,
                  shaftWidth,
                  headWidth,
                  headHeight,
                  relationship.captionHeight || 11
                );
              } else {
                if (i === middleRelationshipIndex) {
                  relationship.arrow = new StraightArrow(
                    nodeRadius,
                    nodeRadius,
                    relationship.centreDistance,
                    shaftWidth,
                    headWidth,
                    headHeight,
                    relationship.captionLayout || "external"
                  );
                } else {
                  let deflection =
                    deflectionStep * (i - middleRelationshipIndex);

                  if (nodePair.nodeA !== relationship.source) {
                    deflection *= -1;
                  }

                  relationship.arrow = new ArcArrow(
                    nodeRadius,
                    nodeRadius,
                    relationship.centreDistance,
                    deflection,
                    shaftWidth,
                    headWidth,
                    headHeight,
                    relationship.captionLayout || "external"
                  );
                }
              }
            }
          })()
        );
      }
      return result;
    })();
  }

  //FIXME:DONT HAVE TO REPEAT

  function groupedRelationships() {
    const groups = {};
    for (const relationship of Array.from(data.relationships)) {
      let nodePair = new NodePair(relationship.source, relationship.target);
      nodePair = groups[nodePair] != null ? groups[nodePair] : nodePair;
      nodePair.relationships.push(relationship);
      groups[nodePair] = nodePair;
    }
    return (() => {
      const result = [];
      for (const ignored in groups) {
        const pair = groups[ignored];
        result.push(pair);
      }
      return result;
    })();
  }

  function computeGeometryForNonLoopArrows(nodePairs) {
    const square = (distance) => distance * distance;
    return (() => {
      const result = [];
      for (var nodePair of Array.from(nodePairs)) {
        if (!nodePair.isLoop()) {
          const dx = nodePair.nodeA.x - nodePair.nodeB.x;
          const dy = nodePair.nodeA.y - nodePair.nodeB.y;
          var angle = ((Math.atan2(dy, dx) / Math.PI) * 180 + 360) % 360;
          var centreDistance = Math.sqrt(square(dx) + square(dy));
          result.push(
            (() => {
              const result1 = [];
              for (const relationship of Array.from(nodePair.relationships)) {
                relationship.naturalAngle =
                  relationship.target === nodePair.nodeA
                    ? (angle + 180) % 360
                    : angle;
                result1.push((relationship.centreDistance = centreDistance));
              }
              return result1;
            })()
          );
        } else {
          result.push(undefined);
        }
      }
      return result;
    })();
  }

  function distributeAnglesForLoopArrows(nodePairs, relationships) {
    return (() => {
      const result = [];
      for (var nodePair of Array.from(nodePairs)) {
        if (nodePair.isLoop()) {
          var i, separation;
          let angles = [];
          const node = nodePair.nodeA;
          for (var relationship of Array.from(relationships)) {
            if (!relationship.isLoop()) {
              if (relationship.source === node) {
                angles.push(relationship.naturalAngle);
              }
              if (relationship.target === node) {
                angles.push(relationship.naturalAngle + 180);
              }
            }
          }
          angles = angles.map((a) => (a + 360) % 360).sort((a, b) => a - b);
          if (angles.length > 0) {
            var end, start;
            var biggestGap = {
              start: 0,
              end: 0,
            };
            for (i = 0; i < angles.length; i++) {
              const angle = angles[i];
              start = angle;
              end = i === angles.length - 1 ? angles[0] + 360 : angles[i + 1];
              if (end - start > biggestGap.end - biggestGap.start) {
                biggestGap.start = start;
                biggestGap.end = end;
              }
            }
            separation =
              (biggestGap.end - biggestGap.start) /
              (nodePair.relationships.length + 1);
            result.push(
              (() => {
                const result1 = [];
                for (i = 0; i < nodePair.relationships.length; i++) {
                  relationship = nodePair.relationships[i];
                  result1.push(
                    (relationship.naturalAngle =
                      (biggestGap.start + (i + 1) * separation - 90) % 360)
                  );
                }
                return result1;
              })()
            );
          } else {
            separation = 360 / nodePair.relationships.length;

            result.push(
              (() => {
                const result2 = [];
                for (i = 0; i < nodePair.relationships.length; i++) {
                  relationship = nodePair.relationships[i];
                  result2.push((relationship.naturalAngle = i * separation));
                }
                return result2;
              })()
            );
          }
        } else {
          result.push(undefined);
        }
      }
      return result;
    })();
  }

  //--- visulize or Graph component

  function updateRelationships(r) {
    relationships = r;

    relationship = svgRelationships
      .selectAll(".relationship")
      .data(relationships, (d) => {
        return d.id;
      });

    relationship.exit().remove();

    let relationshipEnter = appendRelationshipToGraph();

    relationship = relationshipEnter.merge(relationship);

    appendOverlayToRelationship(relationship);
    appendTextToRelationship(relationship);
    appendOutlineToRelationship(relationship);
  }

  function appendRelationshipToGraph() {
    return relationship.enter().append("g").attr("class", "relationship")
    .on("mouseenter", (d) => {
      //TODO: Features will be added
      if (info) {
        updateInfo(d);
    }
    })
    .on("mouseleave", (d) => {
      //TODO: Features will be added
      if (info) {
        clearInfo(d);
    }
    })

  }

  function appendOutlineToRelationship(n) {
    let r = n.selectAll(".outline").data((d) => {
      return [d];
    });

    r.exit().remove();

    let renter = r
      .enter()
      .append("path")
      .attr("fill", "#9a9a9a")
      .attr("stroke", "#a5abb6")
      .style("stroke-width", 0.1)

    let rmerge = renter.merge(r).attr("class", "outline");

    relationshipOutline = rmerge;
  }

  function appendOverlayToRelationship(n) {
    let r = n.selectAll(".overlay").data((d) => {
      return [d];
    });

    r.exit().remove();

    let renter = r.enter().append("path");

    let rmerge = renter.merge(r);

    rmerge.attr("class", "overlay").attr("fill", (d) => {
      //TODO: Add overlaycolor as option
    });

    relationshipOverlay = rmerge;
  }

  function appendTextToRelationship(n) {
    let r = n.selectAll(".text").data((d) => {
      return [d];
    });

    r.exit().remove();

    let renter = r
      .enter()
      .append("text")
      .attr("class", "text")
      .attr("fill", "#444")
      //TODO: Make fontsize dynamic
      .attr("font-size", "7.5px")
      .attr("font-weight", 600)
      .attr("text-anchor", "middle");

    let rmerge = renter.merge(r);

    rmerge.text((d) => {
      return options.relationshipCaption ? d.type : ""; //TODO: chose what to show
    });

    relationshipText = rmerge;
  }

  //---

  function updateNodes(n) {
    nodes = n;

    node = svgNodes.selectAll(".node").data(nodes, (d) => {
      return d.id;
    });

    node.exit().remove();

    let nodeEnter = appendNodeToGraph();
    node = nodeEnter.merge(node);

    node.on("contextmenu", (d) => {}); //TODO: Toolbar will be addded in future

    appendRingToNode(node);
    appendOutlineToNode(node);

    appendTextUnderNode(node);
    // appendIconToNode(node);
    //appendImageToNode(node);
  }

  function appendNodeToGraph() {
    return node
      .enter()
      .append("g")
      .attr("class", (d) => {
        //TODO: classes for images and icons
        return "node";
      })
      .on("click", (d) => {
        //TODO: Features will be added
        
      })
      .on("mouseenter", (d) => {
        //TODO: Features will be added
        if (info) {
          updateInfo(d);
      }
      if (toolTipinfo) {
        updateToopTipInfo(d);
    }
      })
      .on("mouseleave", (d) => {
        //TODO: Features will be added
        if (info) {
          clearInfo(d);
      }
      if (toolTipinfo) {
        clearToolTipInfo(d);
    }
      })
      .on("dblclick", (d) => {
        //TODO: Features will be added
      })
      .on("mousemove", (d) => {
        //TODO: Features will be added
      if (toolTipinfo) {
        updateToopTipInfo(d);
    }
      })
      .call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      );
  }

  function appendOutlineToNode(node) {
    let n = node.selectAll(".noutline").data((d) => {
      return [d];
    });

    n.exit().remove();

    let nenter = n
      .enter()
      .append("circle")
      .attr("class", "noutline")
      .attr("r", options.nodeRadius);

    let nmerge = nenter.merge(n);

    nmerge
      .style("fill", (d) => {
        // TODO: FIXME: add option of which value should represent the color
        if (d.labels[0] == "Person") {
          return 'rgb(255, 96, 92)';
        } else if (d.labels[0] == "Address") {
            return 'rgb(219, 132, 193)';
        } else if (d.labels[0] == "Company") {
            return 'rgb(113, 207, 152)';
        } else {
          return class2color(d.labels[0]);
        }
      })
      .style("stroke", (d) => {
        if (d.labels[0] == "Person") {
          return 'rgb(255, 5, 27)';
        } else if (d.labels[0] == "Address") {
            return 'rgb(191, 88, 151)';
        } else if (d.labels[0] == "Company") {
            return 'rgb(71, 174, 122)';
        } else {
          return class2darkenColor(d.labels[0]);
        }
      }).append("div").attr('data-toggle', "tooltip").attr("data-html", true).attr("title", function (d) {
        let hoverTitleText = "";
        let hoverIdText = "";
        let hoverProperties = "";
        hoverTitleText = "<tr><td>Type</td><td>" + d.labels[0] + "</td>";
        hoverIdText = "<tr><td>id</td><td>" + d.id + "</td>";
        for (var key in d.properties) {
            hoverProperties += "<tr><td>" + key + "</td><td>" + d.properties[key] + "</td>"
        }
        return "<table>" + hoverTitleText + hoverIdText + hoverProperties + "</table>"
    })
  }

  function appendRingToNode(node) {
    let n = node.selectAll(".ring").data((d) => {
      return [d];
    });

    n.exit().remove();

    let nenter = n
      .enter()
      .append("circle")
      .attr("class", "ring")
      .attr("r", options.nodeRadius); // TODO: add option of how thick the ring should be

    nenter.merge(n).attr("stroke", (d) => {
      // TODO: add option of which color should the ring has
      //return class2color(d.labels[0]);
    });
  }

  function appendTextUnderNode(node) {
    var n = node.selectAll(".nodetext").data(function (d) {
      return [d]
    });

    n.exit().remove();

    var nenter = n
      .enter()
      .append("text")
      .attr("class", "nodetext")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      //TODO: make fontsize dynamic| 9.5
      .attr("y", (d) => {
        return (parseInt(Math.round(options.nodeRadius * 0.32)) + 'px');
      });

    nenter.merge(n).html(function (d) {
      if (d.labels[0] == "Address") {
        return d.properties.name;
      } else if (d.labels[0] == "Company") {
          return d.properties.companyName;
      } else if (d.labels[0] == "Person") {
          return d.properties.directorName;
      } else {
          return d.properties.name;
      }
    });
  }

  function appendImageToNode(node) {
    const squareCoordinates = getInscribedSquareCoordinates(options.nodeRadius);

    var n = node.selectAll(".image").data(function (d) {
      return [d];
    });

    n.exit().remove();

    var nenter = n.enter().append("image").attr("class", "image");

    // TODO: Adjust position to node size
    nenter
      .merge(n)
      .attr("xlink:href", function (d) {
        if (options.images[d.labels[0]] !== undefined)
          properties.images[d.labels[0]];
      })
      .attr("height", function (d) {
        return `${squareCoordinates.height}px`;
      })
      .attr("x", function (d) {
        return `${squareCoordinates.x}px`;
      })
      .attr("y", function (d) {
        return `${squareCoordinates.y}px`;
      })
      .attr("width", function (d) {
        return `${squareCoordinates.widht}px`;
      });
  }

  function appendIconToNode(node) {
    const squareCoordinates = getInscribedSquareCoordinates(options.nodeRadius);

    var n = node.selectAll(".icon").data(function (d) {
      return [d];
    });

    n.exit().remove();

    var nenter = n.enter().append("svg");

    nenter
      .merge(n)
      .attr("class", function (d) {
        return `icon ${class2icon(d.labels[0]) || ""}`;
      })
      .attr("height", function (d) {
        return `${squareCoordinates.height / 1.5}px`;
      })
      .attr("x", function (d) {
        return `${squareCoordinates.x / 1.5}px`;
      })
      .attr("y", function (d) {
        return `${squareCoordinates.y / 1.5}px`;
      })
      .attr("width", function (d) {
        return `${squareCoordinates.widht / 1.5}px`;
      });
  }

  //---- util

  function class2icon(cls) {
    return options.icons[cls];
  }

  function class2color(cls) {
    let color = options.colors[cls] || classes2colors[cls];

    if (!color) {
      color = randomColors()[numClasses % randomColors().length];
      classes2colors[cls] = color;
      numClasses++;
    }

    return color;
  }

  function class2darkenColor(cls) {
    return d3.rgb(class2color(cls)).darker(1);
  }

  function randomColors() {
    return [
      "rgb(255, 187, 120)",
      "rgb(148, 103, 189)",
      "rgb(174, 199, 232)",
      "rgb(31, 119, 180)",
      "rgb(152, 223, 138)",
      "rgb(84, 202, 116)",
      "rgb(227, 67, 67)",
      "rgb(121, 110, 255)",
      "rgb(242, 246, 251)"
    ];
  }

  function getInscribedSquareCoordinates(radius) {
    let hypotenuse = (radius * radius) / 2;
    let leg = Math.sqrt(hypotenuse);

    return { y: -leg, x: -leg, widht: leg * 2, height: leg * 2 };
  }

  //----visulization

  function dragEnded(d) {
    if (!d3.event.active) simulation.alphaTarget(0);

    d.fx = null;
    d.fy = null;
  }

  function dragged(d) {
    console.log(options.toolTipOnNode)
    
    stickNode(d);
  }

  function stickNode(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    if (options.toolTipOnNode) {
      
      document.getElementById("neo4jd3-tooltip").style.left = (d3.event.pageX + 10) + "px"
      document.getElementById("neo4jd3-tooltip").style.top = (d3.event.pageY - 10) + "px";
  }
  }

  function dragStarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();

    d.fx = d.x;
    d.fy = d.y;
  }

  function zoomed() {
    g.attr("transform", d3.event.transform);
  }
  //___tick

  function tick() {
    tickNodes();
    tickRelationships();
  }

  function tickNodes() {
    if (node) {
      node.attr("transform", (d) => {
        return "translate(" + d.x + ", " + d.y + ")";
      });
    }
  }

  function tickRelationships() {
    //TODO: add multiple cases

    layoutRelationships();

    if (relationship) {
      layoutRelationships();

      relationship.attr("transform", (d) => {
        return `translate(${d.source.x} ${d.source.y}) rotate(${
          d.naturalAngle + 180
        })`;
      });

      tickRelationshipsTexts();
      tickRelationshipsOutlines();
      tickRelationshipsOverlays();
    }
  }

  function tickRelationshipsOutlines() {
    relationship.each(function (relationship) {
      // FIXME:

      let rel = d3.select(this),
        outline = rel.select(".outline"),
        text = rel.select(".text"),
        textPadding = 8,
        textLength = text.node().getComputedTextLength(),
        captionLength = textLength > 0 ? textLength + textPadding : 0;

      outline.attr("d", (d) => {
        if (captionLength > d.arrow.shaftLength) {
          captionLength = d.arrow.shaftLength;
        }

        return d.arrow.outline(captionLength);
      });
    });
  }

  function tickRelationshipsOverlays() {
    relationshipOverlay.attr("d", (d) => {
      return d.arrow.overlay(options.arrowSize);
    });
  }

  function tickRelationshipsTexts() {
    relationshipText.attr("transform", (rel) => {
      if (rel.naturalAngle < 90 || rel.naturalAngle > 270) {
        return `rotate(180 ${rel.arrow.midShaftPoint.x} ${rel.arrow.midShaftPoint.y})`;
      } else {
        return null;
      }
    });
    relationshipText.attr("x", (rel) => rel.arrow.midShaftPoint.x);
    relationshipText.attr(
      "y",
      //TODO: Make the fontsize and padding dynamic
      (rel) => rel.arrow.midShaftPoint.y + parseFloat(8.5) / 2 - 1
    );
  }

  return { drawGraph };
}
