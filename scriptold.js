var limit = {
	min: 1, max: 750
};
var starters = [1,2,3,4,5,6,7,8,9,152,153,154,155,156,157,158,159,160,252,253,254,255,256,257,258,259,260,387,388,389,390,391,392,393,394,395,495,496,497,498,499,500,501,502,503,650,651,652,653,654,655,656,657,658]
var finalEvo = [3,6,9,12,15,18,20,22,24,26,28,31,34,36,38,40,45,47,49,51,53,55,57,59,62,65,68,71,73,76,78,82,83,85,87,89,91,94,97,99,101,103,105,106,107,110,115,119,121,122,124,127,128,130,131,132,134,135,136,139,141,142,143,144,145,145,149,150,151,154,157,160,162,164,166,168,169,171,178,181,182,184,185,186,189,192,195,196,197,199,201,202,203,205,206,208,210,211,212,213,214,217,219,222,224,225,226,227,229,230,232,234,235,237,241,242,243,244,245,248,249,250,251,254,257,260,262,264,267,269,272,275,277,279,282,284,286,289,291,292,295,297,301,302,303,306,308,310,311,312,313,314,317,319,321,323,324,326,327,330,332,334,335,336,337,338,340,342,344,346,348,350,351,352,354,357,358,359,362,365,367,368,369,370,373,376,377,378,379,380,381,382,383,384,385,386,389,392,395,398,400,402,405,407,409,411,
var pkmElim = new Array();
var pkmLike = new Array();
function startG() {
	var _tmp = document.getElementsByTagName('select')[0];
	_tmp.setAttribute('disabled', 'disabled');
	document.getElementById('newPkm').setAttribute('disabled', 'disabled');
	document.getElementById('settings').className = 'disabled';
	document.getElementById('skip').removeAttribute('disabled');

	//make sure the gen used will be what is selected
	pkmElim = new Array();
	pkmLike.length = 0;;
	updateGen(_tmp.value, true);
	reroll(0);
}

function updateGen(value, start) {
	var _limits = [ [1, 718], 
					[1, 151], [152, 251], [252, 386], 
					[387, 493], [494, 649], [650, 721],
					[722, 750] ];
	for(i = 0; i < _limits.length; i++) {
		if(i == value) {
			limit.min = document.getElementById('newPkm').checked ? _limits[i][0] : 1;
			limit.max = _limits[i][1];
			document.getElementsByTagName('span')[1].innerHTML = ''+ (limit.max - limit.min + 1);
			if(!start)
				break;
			for(j = limit.min; j <= limit.max; j++) {
				pkmLike.push(j);
			}
			break;
		}
	}
}

function reroll(fav) {
	console.log(pkmElim.length + '\t' + pkmLike.length);
	if(pkmElim.length >= limit.max - limit.min) {
		return;
	}
	var _tmp = [document.getElementById('choice').getElementsByTagName('img')[0],
				document.getElementById('choice').getElementsByTagName('img')[1]];
		//parse the dex# from choice image
		_tmp.push(_tmp[0].src.slice(_tmp[0].src.search(/[0-9]*.png/), _tmp[0].src.length - 4));
		_tmp.push(_tmp[1].src.slice(_tmp[1].src.search(/[0-9]*.png/), _tmp[1].src.length - 4));

	switch(fav) {
		case 0: //It is the first roll. Need to change the image's onclick event
			_tmp[0].setAttribute('onclick', 'reroll(1)');
			_tmp[1].setAttribute('onclick', 'reroll(2)');
			break;
		case 1:
			pkmElim.push(_tmp[3]);
			pkmLike.push(_tmp[2]);
			break;
		case 2:
			pkmElim.push(_tmp[2]);
			pkmLike.push(_tmp[3]);
			break;
		case 3: //skipped was press. don't eliminate.
			pkmLike.push(_tmp[2]);
			pkmLike.push(_tmp[3]);
	}
	
	//update top 9 image src
	if(pkmLike.length < 10 && fav != 3) {
		var x = document.getElementsByClassName('fav');
		x[pkmLike.length - 1].src = 'images/' + pkmElim[pkmElim.length -1] + '.png';
	}

	//update choice image src
	_tmp[0].src = 'images/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';
	if(pkmLike.length == 0)
		_tmp[1].src = _tmp[0].src;
	else 
		_tmp[1].src = 'images/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';

	//update eliminated text
	if(pkmElim.length == limit.max - 1)
		pkmElim.push(0);
	document.getElementsByTagName('span')[0].innerHTML = ''+ pkmElim.length;
} 