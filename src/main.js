import { $, css } from './utils/dom.js'
import { sanny } from './utils/hl.js'

const SETTINGS = {
	LOG_BY_CONSOLE: true,
	MAX_COUNT_LI: () => {
		return $('#limit-h').value
	},
}

const print = (MESSAGE, CSS = '') =>
	SETTINGS.LOG_BY_CONSOLE == true
		? console.log(MESSAGE, CSS)
		: alert(MESSAGE)

function keyPressed(ELEMENT, VIRTUAL_KEY, CALLBACK) {
	ELEMENT.onkeydown = function (EVENT) {
		if (EVENT.keyCode === VIRTUAL_KEY){
			CALLBACK()
		}
	}
}

$('#myInput').onkeydown = () => keyPressed($('#myInput'), 13, () => start())
$('#file-load').onclick = () => load()
$('#file-clear').onclick = () => file.clear()
$('#pref-settings').onclick = () => css([$('#modal'), {display: 'grid'}])
$('#modal-close').onclick = () => css([$('#modal'), {display: 'none'}])
$('#limit-h').onchange = () => {
	css( [$('#modal-save'), {display: 'initial'}] )
}
$('#modal-save').onclick = () => {
	let saved = localStorage.getItem('limit-h')
	let displayer = $('#limit-h').value

	if(saved != displayer){
		localStorage.setItem('limit-h', displayer)
	}
	css( [$('#modal-save'), {display: 'none'}] )
}
onload = () => {
	$('#limit-h').value = localStorage.getItem('limit-h') || 50
	css( [$('#modal-save'), {display: 'none'}] )
}

const file = {
	get : async function (INFO, CALLBACK) {
		const TYPE = INFO.type || 'text'
		return await fetch(INFO.url)
		 .then(RES => TYPE == 'json' ? RES.json() : RES.text())
		 .then(DATA => CALLBACK(DATA))
		 .catch(ERROR => print(ERROR))
	},

	write : (MESSAGE = '') => {
		$("#myUL").innerHTML = MESSAGE
	},

	format : (OPCODES) => {
		OPCODES.innerHTML =
		OPCODES.innerHTML
		.replace(/^(.+)/gim, '<li style><pre>$1</pre></li>')
	},

	clear : () => {
		file.write()
		$('#myInput').value = ''
		found(0)
	}
}

const dir = {
	local : () =>
		origin == 'https://matidragon-yt.github.io'
			? origin + '/opcode-search/'
			: origin + '/'
	,
	imagen : () => dir.local() + 'static/images/',
	hash : {
		current : () => location.hash,
		clear : () => {
			history.pushState('', document.title, location.pathname)
		}
	}
}

const doc = {
	header : () => document.title.split(" - "),
	title : () => doc.header()[0],
	subtitle : () => doc.header()[1],
	description : () => {
		const Element = $("meta[name='description']")
		return Element != null
			? Element.getAttribute("content")
			: "MatiDragon"
	}
}

function found(COUNTER = $('li[style=""]').length) {
	$('#found').innerHTML = COUNTER || 1
}

function load (FILELIST = dir.local() + '/assets/opcodes/sa.txt'){
	file.get({url: FILELIST}, Data => {
		file.write(Data)
		file.format($('ul'))
		found()
		start()
	})
}

function restarRenderNav() {
	const ITEM = $('item')[0];

	css([ITEM, {display: 'none'}])

	setTimeout(() =>{ 

		css([ITEM, {display: 'block'}])

	}, 0)					
}

function start(){
	const FILTER = $('#myInput').value.toUpperCase().replaceAll(' ', '_')
	const ELEMENTS = $('#myUL li')

	if (ELEMENTS.length == 0 && FILTER != ''){
		load()
	}

	ELEMENTS.forEach(SELECTED => {
		const ELEMENT = SELECTED.getElementsByTagName('pre')[0]
		const TEXTVALUE = ELEMENT.textContent || ELEMENT.innerText

		TEXTVALUE.toUpperCase().indexOf(FILTER) > -1
			? css([SELECTED, {display: ''}])
			: css([SELECTED, {display: 'none'}])

	}) 

	if (SETTINGS.MAX_COUNT_LI() == -1 || $('li[style=""]').length < SETTINGS.MAX_COUNT_LI()){
		sanny()
	}

	found()
}

print("%cStop! better download the repository.\nhttps://github.com/MatiDragon-YT/opcode-search", "color: black;background-color: #4caf50;font-size: 1rem;font-weight:bold;padding:.45rem 1rem")