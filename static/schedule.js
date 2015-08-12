$(document).ready(function() {
	var isHeld = false; //True if the mouse button is held down still
	var toggleStatus = true;
	var clickedTD = 0;
	var clickedTR = 0;
	var enteredTD = 0;
	var enteredTR = 0;
	var betweenTD = 0;
	var startTD = 0;
	$('td').mousedown(function() {
		clickedTD = $(this).prevAll().length;
		clickedTR = $(this).parent().prevAll().length;
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
	});
	$('td').mouseenter(function() {
		if (isHeld) {
			enteredTD = $(this).prevAll().length;
			enteredTR = $(this).parent().prevAll().length;
			if (enteredTD != 0 && enteredTR == clickedTR) {
				if (enteredTD > clickedTD) {
					betweenTD = enteredTD - clickedTD;
					startTD = clickedTD;
				} else {
					betweenTD = clickedTD - enteredTD;
					startTD = enteredTD;
				}
				if (betweenTD > 0) {
					for (var i = startTD; i < (startTD + betweenTD); i++) {
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
