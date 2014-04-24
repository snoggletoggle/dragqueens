var limit = {
	min: 1, max: 721
};
var finalEvo = [3,6,9,12,15,18,20,22,24,26,28,31,34,36,38,40,45,47,49,51,53,55,57,59,62,65,68,71,73,76,78,82,83,85,87,89,91,94,97,99,101,103,105,106,107,110,115,119,121,122,124,127,128,130,131,132,134,135,136,139,141,142,143,144,145,149,150,151,154,157,160,162,164,166,168,169,171,178,181,182,184,185,186,189,192,195,196,197,199,201,202,203,205,206,208,210,211,212,213,214,217,219,222,224,225,226,227,229,230,232,234,235,237,241,242,243,244,245,248,249,250,251,254,257,260,262,264,267,269,272,275,277,279,282,284,286,289,291,292,295,297,301,302,303,306,308,310,311,312,313,314,317,319,321,323,324,326,327,330,332,334,335,336,337,338,340,342,344,346,348,350,351,352,354,357,358,359,362,365,367,368,369,370,373,376,377,378,379,380,381,382,383,384,385,386,389,392,395,398,400,402,405,407,409,411,414,416,417,419,421,423,424,426,428,429,430,432,435,437,441,442,445,448,450,452,454,455,457,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,497,500,503,505,508,510,512,514,516,518,521,523,526,528,530,531,534,537,538,539,542,545,547,549,550,553,555,556,558,560,561,563,565,567,569,571,573,576,579,581,584,586,587,589,591,593,594,596,598,601,604,606,609,612,614,615,617,618,620,621,623,625,626,628,630,631,632,635,637,638,639,640,641,642,643,644,645,646,647,648,649,652,655,658,660,663,666,668,671,673,675,676,678,681,683,685,687,689,691,693,695,697,699,700,701,702,703,706,707,709,711,713,715,716,717,718,719,720,722];
var megas = [722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750];
var pkmElim = new Array();
var pkmLike = new Array();
function start() {
	var _tmp = document.getElementsByTagName('select')[0];
	_tmp.setAttribute('disabled', 'disabled');
	document.getElementById('newPkm').setAttribute('disabled', 'disabled');
	document.getElementById('settings').className = 'disabled';
	document.getElementById('skip').removeAttribute('disabled');
	document.getElementById('egg').innerHTML='Choose your favorite!';
	//make sure the gen used will be what is selected
	pkmElim = new Array();
	pkmLike.length = 0;
	updateGen(_tmp.value, true);
	reroll(0);
}

function updateGen(value, start) {
	var _limits = [ [1, 721], 
					[1, 151], [152, 251], [252, 386], 
					[387, 493], [494, 649], [650, 721],
					[1, 54], [1, 382], [1, 750], [650, 750] ];
	if(value == 7 || value == 8) {
		document.getElementById('newPkm').setAttribute('checked');
		document.getElementById('newPkm').setAttribute('disabled','disabled');
	} else {	
		document.getElementById('newPkm').removeAttribute('disabled');
		document.getElementById('newPkm').removeAttribute('checked');
	}
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
	var drop = document.getElementById("gen");
	var dropSel = drop.options[drop.selectedIndex].value;
	console.log(pkmElim.length + '\t' + pkmLike.length);
	if(pkmElim.length >= limit.max - limit.min) {
		return;
	}
	var _tmp = [document.getElementById('choice').getElementsByTagName('img')[0],
				document.getElementById('choice').getElementsByTagName('img')[1]];
	var _but = [document.getElementById('choice').getElementsByTagName('button')[0],
				document.getElementById('choice').getElementsByTagName('button')[1]];
		//parse the dex# from choice image
		_tmp.push(_tmp[0].src.slice(_tmp[0].src.search(/[0-9]*.png/), _tmp[0].src.length - 4));
		_tmp.push(_tmp[1].src.slice(_tmp[1].src.search(/[0-9]*.png/), _tmp[1].src.length - 4));

	switch(fav) {
		case 0: //It is the first roll. Need to change the image's onclick event
			_but[0].setAttribute('onclick', 'reroll(1)');
			_but[1].setAttribute('onclick', 'reroll(2)');
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
		if(dropSel == 7) {
			x[pkmLike.length - 1].src = 'images/starters/' + pkmElim[pkmElim.length -1] + '.png';
		} else if(dropSel ==8) {
			x[pkmLike.length - 1].src = 'images/fam/' + pkmElim[pkmElim.length -1] + '.png';
		} else {
			x[pkmLike.length - 1].src = 'images/' + pkmElim[pkmElim.length -1] + '.png';
		}
	}

	//update choice image src
	if(dropSel == 7) {
		_tmp[0].src = 'images/starters/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';
		if(pkmLike.length == 0) {
			_tmp[1].src = _tmp[0].src;
		} else {
			_tmp[1].src = 'images/starters/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';
		}
	} else if(dropSel == 8) {
			_tmp[0].src = 'images/fam/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';
		if(pkmLike.length == 0) {
			_tmp[1].src = _tmp[0].src;
		} else {
			_tmp[1].src = 'images/fam/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';
		}
	} else {
		_tmp[0].src = 'images/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';
		if(pkmLike.length == 0)
			_tmp[1].src = _tmp[0].src;
		else 
			_tmp[1].src = 'images/' + pkmLike.splice(Math.floor(Math.random() * pkmLike.length),1) + '.png';
	}

	//update eliminated text
	if(pkmElim.length == limit.max - 1)
		pkmElim.push(0);
	document.getElementsByTagName('span')[0].innerHTML = ''+ pkmElim.length;
	if(document.getElementsByTagName('span')[0].innerHTML == '54' && dropSel == 7) {
		document.getElementsByTagName('span')[0].innerHTML = '53';
	}
} 
function enlargeThumb(img) {
	var big = img.src;
	document.getElementById('big').setAttribute('src',big);
}
function delargeThumb(img) {
	document.getElementById('big').setAttribute('src','images/fill.png');
}