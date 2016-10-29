---
layout: chart
title:  Global Vinyl Sales
sources:
  - https://en.wikipedia.org/wiki/Vinyl_revival
  - https://www.quandl.com/data/WORLDBANK/USA_SP_POP_TOTL-United-States-Population-total
  - https://www.quandl.com/data/WORLDBANK/GBR_SP_POP_TOTL-United-Kingdom-Population-total
  - https://www.quandl.com/data/WORLDBANK/AUS_SP_POP_TOTL-Australia-Population-total
  - https://www.quandl.com/data/WORLDBANK/NLD_SP_POP_TOTL-Netherlands-Population-total
---

<div id='viz'></div>

<script type='text/javascript'>
  var json_data = {
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

</script>
