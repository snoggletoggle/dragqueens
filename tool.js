$(function() {
	var length = $('#bg > option').length - 1;
	var rand = Math.floor(Math.random() * length);
	$('body').css('background', 'url(images/bg' + rand + '.png)');
	$('#bg').val(rand);
});
function bgChange(val) {
	if(val == 'grey') {
		$('body').css('background', '#f0f0f0');
	} else {
		$('body').css('background', 'url(images/bg' + val + '.png)');
	}
}
$(document).keydown(function(e){
    if (e.which == 37) { 
       $('#firstchoice').click();
       return false;
    } else if(e.which == 39) {
       $('#secondchoice').click();
		return false;
	} else if(e.which == 40 && $("#elim").attr('class') == 'ingame') {
       $('#skip').click();
		return false;
	}
});
function choosePkm(roll) {
	reroll(roll);
	gameDone();
}
function gameDone() {
	var elimNum = document.getElementById('elim').innerHTML;
	var totalNum = document.getElementById('total').innerHTML;
	var eliminated = +elimNum;
	var total = +totalNum;
	if(typeof eliminated == 'number' && total - eliminated == 1) {
		var btn = document.getElementsByClassName('pkmn')[1];
		$(btn).css("display","none");
		$("#egg").html("Your favorite Pok&eacute;mon is...");
	} else {
		var meh=1;
	}
}
/*
 * Image preview script 
 * powered by jQuery (http://www.jquery.com)
 * 
 * written by Alen Grakalic (http://cssglobe.com)
 * 
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
 */
 
this.imagePreview = function(){	
	/* CONFIG */
		
		xOffset = 300;
		yOffset = -144;
		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result
		
	/* END CONFIG */
	$("img.fav").hover(function(e){
		this.t = this.title;
		this.title = "";	
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$("body").append("<p id='preview'><img id='tool' src='"+ this.src +"' />"+ c +"</p>");
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.css("position","absolute")
			.css("z-index","10000")
			.fadeIn("fast");
		$("#tool")
			.css("width","288px")
			.css("height","288px");
    },
	function(){
		this.title = this.t;	
		$("#preview").remove();
    });	
	$("img.fav").mousemove(function(e){
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
		$("#tool")
			.css("width","288px")
			.css("height","288px");
	});	
};


// starting the script on page load
$(document).ready(function(){
	imagePreview();
});

function helpShow() {
	$("#helpcontent")
		.css("display","inline-block");
	$("#help").attr("onClick","helpHide()");
}
function helpHide() {
	$("#helpcontent")
		.css("display","none");
	$("#help").attr("onClick","helpShow()");
}