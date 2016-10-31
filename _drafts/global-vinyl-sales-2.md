---
layout: chart
title:  LP sales in US
sources:
  - https://en.wikipedia.org/wiki/Vinyl_revival
  - https://www.quandl.com/data/WORLDBANK/USA_SP_POP_TOTL-United-States-Population-total
  - https://www.quandl.com/data/WORLDBANK/GBR_SP_POP_TOTL-United-Kingdom-Population-total
  - https://www.quandl.com/data/WORLDBANK/AUS_SP_POP_TOTL-Australia-Population-total
  - https://www.quandl.com/data/WORLDBANK/NLD_SP_POP_TOTL-Netherlands-Population-total
---

<p>Yearly LP sales in the United States from 2008 to 2015</p>

<div id='viz'></div>

<script type='text/javascript'>

  // DATA
  var data = {
    usa: [
      { year: '2007', lp_sales: 988000,   population: 298379912 },
      { year: '2008', lp_sales: 1880000,  population: 301231207 },
      { year: '2009', lp_sales: 2500000,  population: 304093966 },
      { year: '2010', lp_sales: 2800000,  population: 306771529 },
      { year: '2011', lp_sales: 3800000,  population: 309347057 },
      { year: '2012', lp_sales: 4600000,  population: 311721632 },
      { year: '2013', lp_sales: 6100000,  population: 314112078 },
      { year: '2014', lp_sales: 9200000,  population: 316497531 },
      { year: '2015', lp_sales: 11900000, population: 318857056 }
    ],
    gbr: [
      { year: '2007', lp_sales: 205000, population: 60846820 },
      { year: '2008', lp_sales: 209000, population: 61322463 },
      { year: '2009', lp_sales: 219000, population: 61806995 },
      { year: '2010', lp_sales: 234000, population: 62276270 },
      { year: '2011', lp_sales: 337000, population: 62766365 },
      { year: '2012', lp_sales: 389000, population: 63258918 },
      { year: '2013', lp_sales: 780000, population: 63700300 },
      { year: '2014', lp_sales: null,   population: 64106779 },
      { year: '2015', lp_sales: null,   population: 64510376 }
    ],
    nld: [
      { year: '2007', lp_sales: null,   population: 16346101 },
      { year: '2008', lp_sales: null,   population: 16381696 },
      { year: '2009', lp_sales: 51000,  population: 16445593 },
      { year: '2010', lp_sales: 60400,  population: 16530388 },
      { year: '2011', lp_sales: 81000,  population: 16615394 },
      { year: '2012', lp_sales: 115000, population: 16693074 },
      { year: '2013', lp_sales: null,   population: 16754962 },
      { year: '2014', lp_sales: null,   population: 16804432 },
      { year: '2015', lp_sales: null,   population: 16854183 }
    ],
    aus: [
      { year: '2007', lp_sales: 17996,  population: 20697900 },
      { year: '2008', lp_sales: 19608,  population: 20827600 },
      { year: '2009', lp_sales: 53766,  population: 21249200 },
      { year: '2010', lp_sales: 39644,  population: 21691700 },
      { year: '2011', lp_sales: 44876,  population: 22031750 },
      { year: '2012', lp_sales: 77934,  population: 22340024 },
      { year: '2013', lp_sales: 137658, population: 22728254 },
      { year: '2014', lp_sales: 277767, population: 23125868 },
      { year: '2015', lp_sales: 374097, population: 23490736 }
    ]
  };


  // SETTINGS
  var width = 800;
  var height = 200;
  var margin = {
    top: 20,
    right: 100,
    bottom: 40,
    left: 100
  };
  var dataset = data.aus;


  // FORMATTING
  _.each(dataset, function (d, i, all) {
    var prev = all[i - 1];
    if (prev) {
      d.lp_sales_change = ((d.lp_sales / prev.lp_sales) - 1) * 100;
    } else {
      d.lp_sales_change = 100;
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
  var yMin = d3.min(dataset, function(d) { return d.lp_sales_change; });
  var y = d3.scaleLinear()
    .domain([(yMin < 0 ? yMin : 0), d3.max(dataset, function(d) { return d.lp_sales_change; })])
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
    .domain([0, d3.max(dataset, function(d) { return d.lp_sales; })])
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
    .y(function(d) { return y(d.lp_sales_change); })
    .curve( d3.curveLinear );


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
    .call(yAxis);

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
    .attr('y', function(d) { return y2(d.lp_sales); })
    .attr('width', x2.bandwidth())
    .attr('height', function(d) { return (y(0) - y2(d.lp_sales)); });

  svg.append('path')
    .attr('d', calcLine( dataset ))
    .style('fill', 'none')
    .style('stroke', 'maroon')
    .style('stroke-width', 2);

  svg.selectAll('dot')
    .data( dataset )
    .enter().append('circle')
    .attr('cx', function(d) { return x(d.year); })
    .attr('cy', function(d) { return y(d.lp_sales_change); })
    .attr('r', 4)
    .style('fill', 'maroon');

</script>
