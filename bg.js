$(function() {
	var length = $('#bg > option').length - 1;
	var rand = Math.floor(Math.random() * length);
	$('body').css({'background-image': 'url(images/bg' + rand + '.png)'});
	$('#bg').val(rand);
});
function bgChange(val) {
	$('body').css({'background-image': 'url(images/bg' + val + '.png)'});
}