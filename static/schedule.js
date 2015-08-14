$(document).ready(function() {
   $('table.hours').each(function(_, table) {
       var xInit, xFinal, yInit, yFinal, toggleStatus;
       function graphHours() {
           // for (rows)
           //   for (columns) start at initial end at final
           //       if final > initial block selection
           //       
           $('td', table).removeClass('selected');
           var yStart = yInit >= yFinal ? yFinal + 1 : yInit + 1; //sets the starting row to the lowest value
           var yFinish = yInit >= yFinal ? yInit + 1 : yFinal + 1;
           yFinish = (xInit > xFinal)?yFinish-1:yFinish;
           for (var i = yStart; i <= yFinish; i++) {
                var j = xInit;
                var k = 0;
                do {
                   $('tbody', table).children().eq(i+k).children().eq(j+1).addClass('selected');
                   j++;
                   if(j > 24){k++; j=0;}
                } while (j != xFinal + 1);//((xFinal >= xInit && j <= xFinal) || (xFinal < xInit && ((j >= xInit && j < 24) || (j <= xFinal))));
           }
       }
       $('td.cell', this).mousedown(function() {
           xInit = $(this).prevAll().length - 1;
           xFinal = xInit;
           yInit = $(this).parent().prevAll().length - 1;
           yFinal = yInit;
           toggleStatus = $(this).hasClass('vavail');
           graphHours();
           //console.log('mousedown');
           $('td', table).on('mouseup.hours', function() {
               //console.log('mouseup');
               $selected = $('.selected', table);
               $selected.removeClass('selected');
               if (!toggleStatus) {
                   $selected.addClass('vavail');
               } else {
                   $selected.removeClass('vavail');
               }
               $(table).off('.hours');
           });
           $(table).on('mouseenter.hours', 'td.cell', function() {
               //console.log('mouseenter');
               xFinal = $(this).prevAll().length - 1;
               yFinal = $(this).parent().prevAll().length - 1;
               graphHours();
           });
           $(table).on('mouseleave.hours', function() {
               //console.log('mouseleave table');
               $(document).on('mouseup.hours2', function() {
                   //console.log('mouseup document');
                   $(table).off('.hours');
                   $('td', table).removeClass('selected');
               });
               $(table).on('mouseenter.hours', function() {
                   $(document).off('.hours2');
               });
           });
       });
   });
});
