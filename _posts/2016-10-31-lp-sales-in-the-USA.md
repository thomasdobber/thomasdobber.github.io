---
title:  "LPs sold in the US"
sources:
  - https://en.wikipedia.org/wiki/Vinyl_revival
  - https://www.statista.com/statistics/188822/lp-album-sales-in-the-united-states-since-2009/
js:
  - d3
  - lodash
---

<p>LPs sold in the United States from 1994 to 2015</p>

<div id='viz'></div>

<script type='text/javascript'>

  // DATA
  var dataset = [
      // from statista
      { country: 'usa', year: '1993', lps_sold: 300000 },
      { country: 'usa', year: '1994', lps_sold: 600000 },
      { country: 'usa', year: '1995', lps_sold: 800000 },
      { country: 'usa', year: '1996', lps_sold: 1100000 },
      { country: 'usa', year: '1997', lps_sold: 1100000 },
      { country: 'usa', year: '1998', lps_sold: 1400000 },
      { country: 'usa', year: '1999', lps_sold: 1400000 },
      { country: 'usa', year: '2000', lps_sold: 1500000 },
      { country: 'usa', year: '2001', lps_sold: 1200000 },
      { country: 'usa', year: '2002', lps_sold: 1300000 },
      { country: 'usa', year: '2003', lps_sold: 1400000 },
      { country: 'usa', year: '2004', lps_sold: 1200000 },
      { country: 'usa', year: '2005', lps_sold: 900000 },
      { country: 'usa', year: '2006', lps_sold: 900000 },
      // from wiki
      { country: 'usa', year: '2007', lps_sold: 988000 },
      { country: 'usa', year: '2008', lps_sold: 1880000 },
      { country: 'usa', year: '2009', lps_sold: 2500000 },
      { country: 'usa', year: '2010', lps_sold: 2800000 },
      { country: 'usa', year: '2011', lps_sold: 3800000 },
      { country: 'usa', year: '2012', lps_sold: 4600000 },
      { country: 'usa', year: '2013', lps_sold: 6100000 },
      { country: 'usa', year: '2014', lps_sold: 9200000 },
      { country: 'usa', year: '2015', lps_sold: 11900000 }
    ];

  // SETTINGS
  var width = 800;
  var height = 400;
  var margin = {
    top: 20,
    right: 100,
    bottom: 40,
    left: 100
  };


  // FORMATTING
  _.each(dataset, function (d, i, all) {
    var prev = all[i - 1];
    if (prev) {
      d.lps_sold_change = ((d.lps_sold / prev.lps_sold) - 1) * 100;
    } else {
      d.lps_sold_change = 100;
    }
  });

  dataset = _.tail(dataset);


  // SCALES

  // point
  var x = d3.scalePoint()
    .domain(dataset.map(function(d) { return d.year; }))
    .rangeRound([0, width])
    .padding(0.5);

  // %
  var yMin = d3.min(dataset, function(d) { return d.lps_sold_change; });
  var y = d3.scaleLinear()
    .domain([(yMin < 0 ? yMin : 0), d3.max(dataset, function(d) { return d.lps_sold_change; })])
    .range([height, 0])
    .nice();

  // band
  var x2 = d3.scaleBand()
    .domain(dataset.map(function(d) { return d.year; }))
    .rangeRound([0, width])
    .paddingInner(0.15)
    .paddingOuter(0.15);

  // n
  var y2 = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d.lps_sold; })])
    .range([y(0), 0])
    .nice();


  // AXIS
  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisLeft(y)
    .tickFormat(function (d) { return (d + '%'); })
    .ticks(5);

  var yAxis2 = d3.axisRight(y2)
    .ticks(5);


  // LINE
  var calcLine = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.lps_sold_change); })
    .curve( d3.curveBasis );


  // VIZ
  var svg = d3.select('#viz')
    .append('svg')
    .attr('width', (margin.left + margin.right + width))
    .attr('height', (margin.top + margin.bottom + height))
    .append('g')
    .attr('transform', 'translate('+ margin.left +','+ margin.top +')');

  var xAxisGroup = svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + y(0) + ')')
    .call(xAxis);

  var yAxisGroup = svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)

  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0)
    .attr('x', -(height / 2))
    .attr('dy', -50)
    .style('text-anchor', 'middle')
    .style('font-family', 'sans-serif')
    .style('font-size', '11px')
    .text('Change in LPs sold (%)');

  svg.append('text')
    .attr('transform', 'rotate(90)')
    .attr('y', -width)
    .attr('x', (height / 2))
    .attr('dy', -75)
    .style('text-anchor', 'middle')
    .style('font-family', 'sans-serif')
    .style('font-size', '11px')
    .text('LPs sold (n)');

  yAxisGroup.selectAll('path')
    .style('stroke', 'maroon')
    .style('stroke-width', 3);

  yAxisGroup.selectAll('line')
    .style('stroke', 'maroon')
    .style('stroke-width', 3);

  var yAxis2Group = svg.append('g')
    .attr('class', 'y2 axis')
    .attr('transform', 'translate('+width+',0)')
    .call(yAxis2);

  yAxis2Group.selectAll('path')
    .style('stroke', 'steelblue')
    .style('stroke-width', 3);

  yAxis2Group.selectAll('line')
    .style('stroke', 'steelblue')
    .style('stroke-width', 3);

  svg.selectAll('bar')
    .data(dataset)
    .enter().append('rect')
    .style('fill', 'steelblue')
    .attr('x', function(d) { return x2(d.year); })
    .attr('y', function(d) { return y2(d.lps_sold); })
    .attr('width', x2.bandwidth())
    .attr('height', function(d) { return (y(0) - y2(d.lps_sold)); });

  svg.append('path')
    .attr('d', calcLine( dataset ))
    .style('fill', 'none')
    .style('stroke', 'maroon')
    .style('stroke-width', 2);

  svg.selectAll('dot')
    .data( dataset )
    .enter().append('circle')
    .attr('cx', function(d) { return x(d.year); })
    .attr('cy', function(d) { return y(d.lps_sold_change); })
    .attr('r', 4)
    .style('fill', 'maroon');

</script>
