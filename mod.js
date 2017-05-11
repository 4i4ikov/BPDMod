// ==UserScript==
// @name         BPDMod - PetriDish.pw Mod!
// @version      2.95.3
// @description  MACRO|BOTS|GOLDNICK|THEME|ZOOM|SPAM|HELP|AND MORE
// @match        http://petridish.pw/ru/
// @match        http://petridish.pw/en/
// @match        http://petridish.pw/fr/
// @namespace https://greasyfork.org/users/82280
// ==/UserScript==
/*-----------------------------------------------------------------------------------|
|                                  W A R N I N G                                     |
|                                                                                    |
|   Код блещет разными коментариями, в тему и нет,если что-то не понятно - думой!    |
|                                                                                    |
|                                  W A R N I N G                                     |
|-----------------------------------------------------------------------------------*/
//Settings
$('#option-common ul')
.append(
	'<li><span>Color Blink</span> <input type="checkbox" class="checkbox" id="cblink"> <label for="cblink"></label> </li><li><span>Style OFF</span> <input type="checkbox" class="checkbox" id="stule"> <label for="stule"></label> </li><li><span>Dev-Mode</span> <input type="checkbox" class="checkbox" id="devm"> <label for="devm"></label> </li><li class="flex"> <span>Custom botname</span><div> <input id="bname" size="15" style="margin-right: 10px;padding: 0 0;border: 1px solid rgba(0, 0, 0, .10);height: 26px;text-align: center;border-radius: 15px;"> <input type="checkbox" class="checkbox" id="custbna"> <label for="custbna"></label> </div></li><li> <div class="info-wrapper" style=" width: inherit; "> <input type="text" id="gnn" class="left" maxlength="15" placeholder="Add goldnick" style=" width: 77%; "> <div id="gnks" class="button color right blue"><span>Go!</span></div> </div></li>');

//KNOPKI B MENU
$('.add')
.replaceWith(
	'<div class="info-landing" style="min-width: 300px;"> <h2>Mod support!</h2> <div style="height = 10px;"></div><div class="set-group"> <div class="set"> <div class="hot-latter"><span>Q</span></div><p>– Feed</p></div><div class="set"> <div class="hot-latter"><span>F2</span></div><p>– Fast click play</p></div><div class="set"> <div class="hot-latter"><span>F4</span></div><p>– Reconnect (Shift for spect)</p></div><div class="set"> <div class="hot-latter"><span>F9</span></div><p>– Next Server</p></div><div class="set"> <div class="hot-latter"><span>X</span></div><p>– Inf zoom</p></div><div class="set"> <h3> Check settings!</h3> </div></div></div>');
//Style
$('body')
.append(
	'<link id="stylish-1" rel="stylesheet" type="text/css" href="http://ня.su/bw3">' //Можно смениить
);
//Независимые от сайта свойства объекта
var rdd = {
	sw: 10,
	sc: 50,
	sr: 400,
	sty: $('#stylish-1'),
	stu: $("#stule"),
	devm: $('#devm'),
	bn: $('#bname'),
	cu: $('#custbna'),
	gnk: ['123461', 'los'],
	log: function (text) {
		console.log("%cModPD:%c%s ", 'background: #F64747; color: #fff; padding: 4px;',
			'background: #E4F1FE; color: #000; padding: 2px;', text);
	}
};
//Чекаем куки
if (readCookie('botname')) {
	rdd.bn.val(readCookie('botname'));
	rdd.log('Custom BotName is ' + readCookie('botname'));
}
if (readCookie('custbn') == 'true') {
	rdd.cu.attr("checked", "checked");
	rdd.log('Custom BotName enabled');
}
if (readCookie('offstyle')) {
	rdd.stu.attr("checked", "checked");
	rdd.style.detach();
	rdd.log('Style is OFF');
} else {
	rdd.log('Style is ON');
}
if (readCookie('dev') == 'true') {
	rdd.dev = true;
	rdd.devm.attr("checked", "checked");
	rdd.log('Dev-Mode is ON');
}
if (readCookie('goldnk')) {
	rdd.gnk = readCookie('goldnk').split(',');
	supergolden = supergolden.concat(rdd.gnk);
	rdd.log('Custom GoldNicks: ' + readCookie('goldnk'));
} else {
	createCookie('goldnk', rdd.gnk, 10);
	supergolden = supergolden.concat(rdd.gnk);
}
// Макрозы!
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
//Нажатие
function keydown(event) {
	if (rdd.dev)
		rdd.log('Click = ' + event.keyCode);
	if (event.keyCode === 81 && !rdd.feed) { // key Q
		rdd.feed = true;
		feed();
	}
	if (event.keyCode === 16 && !rdd.shift) { // key Shift
		rdd.shift = true;
	}
	if (event.keyCode === 113 && !rdd.connect) { //Key F2
		rdd.connect = true;
		conr();
	}
	if (event.keyCode === 88 && !isSpectating) { //Key X
		rdd.zoom = true;
		setUnlimitedZoom(true);
		setSpectate(true);
	}
	if (event.keyCode === 115 && !rdd.recon) { //Key F4
		bot();
		rdd.recon = true;
		recon();
	}
	if (event.keyCode === 120 && !rdd.next && !(!selectedServer)) { /*Костыль ко-ко-ко, зато работает */
		rdd.pnk = $('#nick')
			.val();
		rdd.pps = $('#password')
			.val();
		bot();
		rdd.next = true;
		rdd.servv = $('li[style="display: flex;"]');
		nextserv();
	}
}
//Отпускание
function keyup(event) {
	if (rdd.dev)
		rdd.log('UP = ' + event.keyCode);
	if (event.keyCode === 81)
		rdd.feed = false;
	if (event.keyCode === 16)
		setTimeout(rdd.shift = false, 1000);
	if (event.keyCode === 113)
		rdd.connect = false;
	if (event.keyCode === 88 && rdd.zoom) {
		rdd.zoom = false;
		setUnlimitedZoom(false);
		setSpectate(false);
	}
	if (event.keyCode === 115 && rdd.recon) {
		rdd.recon = false;
		socketStateNew = 1;
		setTimeout(
			insert(rdd.pnk, rdd.pps), rdd.sr);
	}
	if (event.keyCode === 120 && rdd.next) {
		rdd.next = false;
		setTimeout(
			insert(rdd.pnk, rdd.pps), rdd.sr);
	}
}
//Кнопка играть(триггер)
function conr() {
	if (rdd.connect) {
		playbtnclick();
		setTimeout(conr, rdd.sc);
	}
}
// Ц-Ц-Ц!!
function feed() {
	if (rdd.feed && currentmode !== 'SNAKERDISH') {
		window.onkeydown({
			keyCode: 87
		}); // key W
		window.onkeyup({
			keyCode: 87
		});
		setTimeout(feed, rdd.sw);
	}
}
//Реконнект к серву играя/в спеках
function recon() {
	if (rdd.recon) {
		socketStateNew = 0;
		if (rdd.shift) { // был нажат шифт? В спеки!
			spectatebtnclick();
			spectatebtnclick();
			return; // Замена E L S E
		}
		playbtnclick();
		playbtnclick();
		setTimeout(recon, rdd.sr);
		return;
	}
	$('.my-sticks li.active')
	.click();
}
// след.сервер!1
function nextserv() {
	if (rdd.next) {
		if ($('.server-item.active')
			.next('[style="display: flex;"]')
			.length === 0) {
			$('.server-item[style="display: flex;"]')[0].click();
		} else
			$('.server-item.active')
			.next('[style="display: flex;"]')
			.click();
		playbtnclick();
		setTimeout(nextserv, 600);
	}
}
function bot() {
	rdd.pnk = $('#nick')
		.val();
	rdd.pps = $('#password')
		.val();
	if (readCookie("botname")) {
		var n = (readCookie("custbn") == 'true') ? readCookie("botname") : "ня.su/bqy";
		console.log(n);
		insert(n, rdd.pps);
	}
}
//Кнопки в настройках
//Блинк цветами раз в 10 сек(не меньше)
$('#cblink').click(function () {
	//  console.log('Color Blink Test');
	if ($("#cblink")
		.is(':checked')) {
		sendCol(); //Отправляет цвет
		interval = setInterval(function () {
				clickColor("#FFFFFF", 0); //меняет на стандартные цвета
				sendCol();
			}, 10000); // 10 sec
		//  console.log('ON BLINK');
	} else {
		clearInterval(interval);
		//  console.log('OFF BLINK');
	}
});
//псевдо Дев-мод(выебнуца консолью с юникод-кнопками)
rdd.devm.click(function () {
	createCookie('dev', rdd.devm.is(':checked'), 10);
	rdd.dev = rdd.devm.is(':checked');
});
//Вкл/Выкл стиль(темная тема)
rdd.stu.click(function () {
	if (rdd.stu.is(':checked')) {
		rdd.style.detach();
		createCookie('offstyle', true, 10);
	} else {
		rdd.style.appendTo('body');
		eraseCookie('offstyle');
	}
});
//GoldNick //CoCoCo
gnks.onclick = function () {
	var nk = gnn.value.toLowerCase();
	if (nk !== '' && supergolden.indexOf(nk) == -1) {
		rdd.gnk.push(nk);
		supergolden.push(nk);
		createCookie('goldnk', rdd.gnk, 10);
		rdd.log('Added GoldNick: ' + nk);
		fly(nk.toUpperCase());
		gnn.value = '';
		$('#option-common').append('<div class="button blue big name" onclick="dnick(this);"><span>'+nk+'</span><i class="mdi mdi-close mdi-18px"></i></div>')
	}
};

function dnick(str){
var name = str.textContent;
rdd.gnk.splice(rdd.gnk.indexOf(name), 1);
supergolden.splice(supergolden.indexOf(name), 1);
createCookie('goldnk', rdd.gnk, 10);
str.parentNode.removeChild(str);
}
// Кастомное имя бота(чекбокс и текстбокс)
rdd.cu.click(function () {
	createCookie('custbn', rdd.cu.is(':checked'), 10);
});
rdd.bn.change(function () {
	createCookie('botname', rdd.bn.val(), 10);
});
//Что б корды не кидало на "C" при вводе ника бота или голдника
$('#bname').add('#gnn').blur(function () {
	isTyping = false;
});
$('#bname').add('#gnn').focus(function () {
	isTyping = true;
});
//Hey mom, Im stupid!
