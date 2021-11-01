import { $, css, keyPressed, log } from './utils/dom.js'
import { load, start }  from './search.js'
import { fileServer }  from './utils/files.js'

export const settings = () => {
	const ITEMS = [
		'settings-limit-h', 'text', 'ground', 'opcode', 'operator',
		'number', 'string', 'variable', 'comment', 'label'
	]

	const display = (ELEMENT, MODE) => 
		css([$('#'+ELEMENT), JSON.parse(`{"display": "${MODE}"}`)])

	const modal = {
		hide : () => display('modal', 'none'),
		show : () => display('modal', 'grid')
	}

	const save = {
		show : () => display('modal-save', 'initial'),
		hide : () => display('modal-save', 'none')
	}

	$('#myInput').onkeydown = () => keyPressed($('#myInput'), 13, () => start())

	$('#file-load').onclick = () => load()
	$('#file-clear').onclick = () => fileServer.clear($('#myInput'))

	$('#pref-settings').onclick = () => modal.show()
	$('#modal-close').onclick = () => modal.hide()
	$('#modal-save').onclick = () => {
		//get set
		ITEMS.forEach(KEY => {
			const ELEMENT = $('#' + KEY).value
			if(localStorage.getItem(KEY) != ELEMENT){
				localStorage.setItem(KEY, ELEMENT)
			}
		})

		save.hide()
		start()
	}

	ITEMS.forEach((ELEMENT, index) => {
		$('#' + ELEMENT).oninput = () => {
			save.show()

			if(index > 0) {
				$(':root').style.setProperty('--' + ELEMENT, $('#' + ELEMENT).value)
			}
		}
	})

	onload = () => {
		save.hide()

		ITEMS.forEach((ELEMENT, index) => {
			if(index > 0) {
				const saved =
					localStorage.getItem(ELEMENT)
					|| css([$(':root'), '--' + ELEMENT])

				$('#' + ELEMENT).value =saved
					
				$(':root').style.setProperty('--' + ELEMENT, $('#' + ELEMENT).value)
			}

		})
		$('#' + ITEMS[0]).value = localStorage.getItem(ITEMS[0]) || 50
	}
}