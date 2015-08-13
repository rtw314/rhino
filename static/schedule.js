$(document).ready(function() {
    var isHeld = false; //True if the mouse button is held down still
    var toggleStatus = true;
    var clickedTD = 0;
    var clickedTR = 0;
    var enteredTD = 0;
    var enteredTR = 0;
    var betweenTD = 0;
    var startTD = 0;
    var lastTDR = 0;
    var lastTDL = 100;
    $('td').mousedown(function() {
        clickedTD = 0;
        clickedTR = 0;
        enteredTD = 0;
        enteredTR = 0;
        betweenTD = 0;
        startTD = 0;
        lastTDR = 0;
        lastTDL = 100;

        clickedTD = $(this).prevAll().length;
        clickedTR = $(this).parent().prevAll().length;
        lastTDR = clickedTD;
        lastTDL = clickedTD;
        if (clickedTD > 0 && clickedTR > 0) {
            isHeld = true;
            toggleStatus = $(this).hasClass('vavail');
            if (toggleStatus) {
                $(this).removeClass('vavail');
            } else {
                $(this).addClass('vavail');
            }
        }
    });
    $('td').mouseup(function() {
        isHeld = false;
        clickedTD = 0;
        clickedTR = 0;
        enteredTD = 0;
        enteredTR = 0;
        betweenTD = 0;
        startTD = 0;
        lastTDR = 0;
        lastTDL = 100;
    });
    $('td').mouseenter(function() {
        if (isHeld) {
            enteredTD = $(this).prevAll().length;
            enteredTR = $(this).parent().prevAll().length;
            if (lastTDR > enteredTD && enteredTD >= clickedTD && enteredTR == clickedTR) {
                for (var i = enteredTD; i <= lastTDR; i++) {
                    if (clickedTD != i) {
                        $(this).parent().children().eq(i).removeClass('vavail');
                    }
                } 
            } 
            if (lastTDL < enteredTD && enteredTD <= clickedTD && enteredTR == clickedTR) {
                for (var j = lastTDL; j <= enteredTD; j++) {
                    if (clickedTD != j) {
                        $(this).parent().children().eq(j).removeClass('vavail');
                    }
                }
            }
            if (enteredTR == clickedTR) {
                if (enteredTD > clickedTD) {
                    lastTDR = enteredTD;
                } else if (enteredTD < clickedTD) {
                    lastTDL = enteredTD;
                }
            }
            if (enteredTD != 0 && enteredTR == clickedTR) {
                if (enteredTD > clickedTD) {
                    betweenTD = enteredTD - clickedTD;
                    startTD = clickedTD;
                } else {
                    betweenTD = clickedTD - enteredTD;
                    startTD = enteredTD;
                }
                if (betweenTD > 0) {
                    for (var i = startTD; i <= (startTD + betweenTD); i++) {
                        if (toggleStatus) {
                            $(this).parent().children().eq(i).removeClass('vavail');
                        } else {
                            $(this).parent().children().eq(i).addClass('vavail');
                        }
                    }
                }
            }
        }
    });
});
