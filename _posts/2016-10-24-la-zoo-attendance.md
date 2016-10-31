---
layout: chart
title:  "LA Zoo Attendance"
source: https://data.lacity.org/api/views/3gwn-arjr/rows.json?accessType=DOWNLOAD
---
<div id='viz'></div>

<script>
  var rawData = [
    { date: '2012-13', attendance: 1506274 },
    { date: '2011-12', attendance: 1660450 },
    { date: '2010-11', attendance: 1543232 },
    { date: '2009-10', attendance: 1459080 },
    { date: '2008-09', attendance: 1556162 }
  ];

  var data = _.map(rawData, function (d) {
      var split = d.date.split('-');
      var year = split[0];
      var month = split[1];

      d.dateObject = new Date(year, month);

      return d;
    });

  var width = 800;
  var height = 200;
  var margin = {
    top: 20,
    right: 100,
    bottom: 40,
    left: 100
  };

  var svg = d3.select('#viz')
    .append('svg')
    .attr('width', (margin.left + margin.right + width))
    .attr('height', (margin.top + margin.bottom + height))
    .append('g')
    .attr('transform', 'translate('+ margin.left +','+ margin.top +')');

  var defs = svg.append('defs');

  var gradient = defs.append('linearGradient')
    .attr('id', 'gr')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 1)

    gradient.append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "#0099ff")
      .attr("stop-opacity", 1);
    gradient.append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "yellow")
      .attr("stop-opacity", 1);

  var x = d3.scaleTime()
    .domain([ _.first(data).dateObject, _.last(data).dateObject ])
    .range([0, width]);

  var attendanceValues = _.map(data, function (d) { return d.attendance; });
  var yMin = _.min( attendanceValues );
  var yMax = _.max( attendanceValues );
  var y = d3.scaleLinear()
    .domain([yMax, yMin])
    .range([0, height])
    .nice();

  var calcArea = d3.area()
    .x(function(d) { return x(d.dateObject); })
    .y0(height)
    .y1(function(d) { return y(d.attendance); })
    .curve( d3.curveLinear );

  var area = svg.append('path')
    .attr('d', calcArea(data))
    .style('fill', 'url(#gr)');

  var node = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function (d) { return x(d.dateObject) })
    .attr('cy', function (d) { return y(d.attendance) });

  // Add the x Axis
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call( d3.axisBottom(x).ticks(5) );

  // Add the y Axis
  svg.append("g")
    .call( d3.axisLeft(y).ticks(5) );

</script>
