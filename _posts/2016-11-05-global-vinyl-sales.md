---
layout: chart
title:  Global LP Sales
sources:
  - https://en.wikipedia.org/wiki/Vinyl_revival
  - https://www.quandl.com/data/WORLDBANK/USA_SP_POP_TOTL-United-States-Population-total
  - https://www.quandl.com/data/WORLDBANK/GBR_SP_POP_TOTL-United-Kingdom-Population-total
  - https://www.quandl.com/data/WORLDBANK/AUS_SP_POP_TOTL-Australia-Population-total
  - https://www.quandl.com/data/WORLDBANK/NLD_SP_POP_TOTL-Netherlands-Population-total
  - http://www.officialcharts.com/chart-news/uk-s-first-official-vinyl-charts-launch-as-vinyl-sales-soar-in-2015__8906/
  - https://www.bpi.co.uk/home/bpi-2015-music-market-report.aspx
---

An attempt to visualize global LP sales (from 2008 to 2015), showing amount of LPs sold on the Y axis and the population on the X axis.

It is a failed attempt for multiple reasons. First of all the data visualized is not very interesting to begin with. And because of the huge difference in population between the US and the other three countries (GB, NL, AU) it also doesn't look very interesting. Furthermore the year labels overlap eachother which makes them unreadable.

Better luck next time!

<div id='viz'></div>

<script type='text/javascript'>

  // DATA
  var data = {
    usa: [
      { year: '1993', lp_sales: 300000,   population: 259919000 },
      { year: '1994', lp_sales: 600000,   population: 263126000 },
      { year: '1995', lp_sales: 800000,   population: 266278000 },
      { year: '1996', lp_sales: 1100000,  population: 269394000 },
      { year: '1997', lp_sales: 1100000,  population: 272657000 },
      { year: '1998', lp_sales: 1400000,  population: 275854000 },
      { year: '1999', lp_sales: 1400000,  population: 279040000 },
      { year: '2000', lp_sales: 1500000,  population: 282162411 },
      { year: '2001', lp_sales: 1200000,  population: 284968955 },
      { year: '2002', lp_sales: 1300000,  population: 287625193 },
      { year: '2003', lp_sales: 1400000,  population: 290107933 },
      { year: '2004', lp_sales: 1200000,  population: 292805298 },
      { year: '2005', lp_sales: 900000,   population: 295516599 },
      { year: '2006', lp_sales: 900000,   population: 298379912 },
      { year: '2007', lp_sales: 988000,   population: 301231207 },
      { year: '2008', lp_sales: 1880000,  population: 304093966 },
      { year: '2009', lp_sales: 2500000,  population: 306771529 },
      { year: '2010', lp_sales: 2800000,  population: 309347057 },
      { year: '2011', lp_sales: 3800000,  population: 311721632 },
      { year: '2012', lp_sales: 4600000,  population: 314112078 },
      { year: '2013', lp_sales: 6100000,  population: 316497531 },
      { year: '2014', lp_sales: 9200000,  population: 318857056 },
      { year: '2015', lp_sales: 11900000, population: 321442000 }
    ],
    gbr: [
      // { year: '1995', lp_sales: 1410905, population: 0 },
      // { year: '1996', lp_sales: 1083206, population: 0 },
      // { year: '1997', lp_sales: 817018,  population: 0 },
      // { year: '1998', lp_sales: 642102,  population: 0 },
      // { year: '1999', lp_sales: 672866,  population: 0 },
      // { year: '2000', lp_sales: 751857,  population: 0 },
      // { year: '2001', lp_sales: 761558,  population: 0 },
      // { year: '2002', lp_sales: 657127,  population: 0 },
      // { year: '2003', lp_sales: 579248,  population: 0 },
      // { year: '2004', lp_sales: 453254,  population: 0 },
      // { year: '2005', lp_sales: 351224,  population: 0 },
      // { year: '2006', lp_sales: 250926,  population: 0 },
      { year: '2007', lp_sales: 205000,  population: 60846820 },
      { year: '2008', lp_sales: 209000,  population: 61322463 },
      { year: '2009', lp_sales: 219000,  population: 61806995 },
      { year: '2010', lp_sales: 234000,  population: 62276270 },
      { year: '2011', lp_sales: 337000,  population: 62766365 },
      { year: '2012', lp_sales: 389000,  population: 63258918 },
      { year: '2013', lp_sales: 780000,  population: 63700300 },
      { year: '2014', lp_sales: 1300000, population: 64106779 },
      { year: '2015', lp_sales: 2100000, population: 64510376 }
    ],
    nld: [
      // { year: '2007', lp_sales: null,   population: 16346101 },
      // { year: '2008', lp_sales: null,   population: 16381696 },
      { year: '2009', lp_sales: 51000,  population: 16445593 },
      { year: '2010', lp_sales: 60400,  population: 16530388 },
      { year: '2011', lp_sales: 81000,  population: 16615394 },
      { year: '2012', lp_sales: 115000, population: 16693074 }
      // { year: '2013', lp_sales: null,   population: 16754962 },
      // { year: '2014', lp_sales: null,   population: 16804432 },
      // { year: '2015', lp_sales: null,   population: 16854183 }
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

  var minSales;
  var maxSales;
  var minPopulation;
  var maxPopulation;
  var minPPL;
  var maxPPL;

  _.each(data, function (country) {
    _.each(country, function (row) {
      row.people_per_lp = Math.round(row.population / row.lp_sales);

      // if (!v.lp_sales && (!v.population || v.population !== 0)) { delete v; return; }
      if (!minSales || minSales > row.lp_sales) { minSales = row.lp_sales; }
      if (!maxSales || maxSales < row.lp_sales) { maxSales = row.lp_sales; }
      if (!minPopulation || minPopulation > row.population) { minPopulation = row.population; }
      if (!maxPopulation || maxPopulation < row.population) { maxPopulation = row.population; }
      if (!minPPL || minPPL > row.people_per_lp) { minPPL = row.people_per_lp; }
      if (!maxPPL || maxPPL < row.people_per_lp) { maxPPL = row.people_per_lp; }

    });
  });


  // SETTINGS
  var width = 800;
  var height = 400;
  var margin = {
    top: 20,
    right: 100,
    bottom: 40,
    left: 100
  };


  // SCALES
  var y = d3.scalePow()
    .domain([minSales, maxSales])
    .range([height, 0])
    .exponent(0.5)
    .nice();

  var x = d3.scalePow()
    .domain([minPopulation, maxPopulation])
    .range([0, width])
    .exponent(0.5)
    .nice();


  // AXIS
  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);


  // LINE
  var calcLine = d3.line()
    .y(function(d) { return y(d.lp_sales); })
    .x(function(d) { return x(d.population); })
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
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  var yAxisGroup = svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  function drawLine (data, color) {

    var path = svg.append('path')
      .attr('d', calcLine( data ))
      .style('fill', 'none')
      .style('stroke', color)
      .style('stroke-width', 2);

    var points = svg.selectAll('dot')
      .data( data )
      .enter().append('g')
      .attr('transform', function (d) {
        return 'translate(' + x(d.population) + ',' + y(d.lp_sales) + ')';
      });

      points
        .append('circle')
        .attr('r', 4)
        .style('fill', color);

      points
        .append('text')
        .attr('x', 10)
        .text(function (d) { return d.year; });

  }

  drawLine(data.usa, 'maroon');
  drawLine(data.gbr, 'steelblue');
  drawLine(data.aus, 'gold');
  drawLine(data.nld, 'orange');

</script>
