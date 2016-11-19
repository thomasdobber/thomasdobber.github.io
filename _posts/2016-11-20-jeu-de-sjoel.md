---
layout: chart
title:  "Jeu de Sjoel"
---

<style>

  td {
    vertical-align: bottom;
  }

  button {
    border: none;
  }

  .block {
    display: block;
    height: 20px;
    width: 60px;
  }

  .stone {
    background: peru;
    border-radius: 4px;
    margin-top: 2px;
  }

  .slot {
    background: black;
    color: white;
  }

  .score {
    font-size: 20em;
    line-height: 1;
    position: relative;
    z-index: -1;
  }

</style>

<table>
  <tbody>
    <tr>
      <td class='js-row-2'></td>
      <td class='js-row-3'></td>
      <td class='js-row-4'></td>
      <td class='js-row-1'></td>
      <td class='score js-score'>0</td>
    </tr>
  </tbody>
  <th>
    <tr>
      <th>&bullet; &bullet;</th>
      <th>&bullet; &bullet; &bullet;</th>
      <th>&bullet; &bullet; &bullet; &bullet;</th>
      <th>&bullet;</th>
      <th></th>
    </tr>
  </th>
  <tfoot>
    <tr>
      <td>
        <button data-slot='2' class='slot block js-slot'>&plus;</button>
      </td>
      <td>
        <button data-slot='3' class='slot block js-slot'>&plus;</button>
      </td>
      <td>
        <button data-slot='4' class='slot block js-slot'>&plus;</button>
      </td>
      <td>
        <button data-slot='1' class='slot block js-slot'>&plus;</button>
      </td>
      <td>
        <button class="block js-reset">reset</button>
      </td>
    </tr>
  </tfoot>
</table>

<script>
  (function (window) {
    var stones = 30;
    var score = [0,0,0,0];

    var $slot = $('.js-slot');
    var $reset = $('.js-reset');

    $slot.on('click', function () {
      var slotNumber = $(this).data('slot');

      if (stones > 0) {
        score[Number(slotNumber) - 1]++;

        addStone(slotNumber);

        $('.js-score').text(calcScore(score));

        stones--;
      }
    });

    $reset.on('click', reset);

    function addStone (row) {
      var row = $('.js-row-' + row);
      row.append('<div class="stone block js-stone">&nbsp;</div>');
    }

    function removeStone (row) {
      var stone = $('.js-row-' + row).find('.js-stone');
      if (stone) {
        stone.first().remove();
      }
    }

    function reset () {
      stones = 30;
      score = [0,0,0,0];
      $('.js-score').text(0);
      $('.js-stone').remove();
    }

    function getMin (arr) {
      return Math.min.apply(Math, arr);
    }

    function calcScore (score) {
      var bonus = (getMin(score) * 10);
      var one = (score[0] * 1);
      var two = (score[1] * 2);
      var three = (score[2] * 3);
      var four = (score[3] * 4);
      return (two + three + four + one + bonus);
    };

  })(window);
</script>
