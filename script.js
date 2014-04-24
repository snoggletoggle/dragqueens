var limit = {
	min: 1, max: 721
};
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