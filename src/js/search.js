import { $, css, log } from './utils/dom.js'
import { local } from './utils/directories.js'
import { fileServer }  from './utils/files.js'
import { sanny } from './utils/highlighter.js'

export function found(COUNTER = $('li[style=""]').length || 1) {
	$('#found').innerHTML =
		COUNTER + ((COUNTER > 1) ? '/' + $('#list').childElementCount : '')
}

export function load (FILELIST = local() + 'assets/opcodes/sa.txt'){
	fileServer.get(FILELIST, Data => {
		fileServer.write(Data)
		fileServer.format($('ul'))
		found()
		start()
	})
}

export function restarRenderNav() {
	const ITEM = $('item')[0];

	css([ITEM, {display: 'none'}])

	setTimeout(() =>{ 

		css([ITEM, {display: 'block'}])

	}, 0)					
}

export function start(){
	const FILTER = $('#myInput').value.toUpperCase().replaceAll(' ', '_')
	const ELEMENTS = $('#list li')

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
	
	const MAX_COUNT_LI = $('#settings-limit-h').value

	if (MAX_COUNT_LI == -1 || $('li[style=""]').length < MAX_COUNT_LI){
		sanny()
	}

	found()
}