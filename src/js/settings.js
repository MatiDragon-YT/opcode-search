import { $, css, keyPressed, log } from './utils/dom.js'
import { load, start }  from './search.js'
import { fileServer }  from './utils/files.js'

export const settings = () => {
	const ITEMS = [
		'settings-limit-h', 'text', 'ground', 'opcode', 'operator',
		'number', 'string', 'variable', 'comment', 'label'
	]

	const modal = {
		hide : () => css([$('#modal'), {display: 'none'}]),
		show : () => css([$('#modal'), {display: 'grid'}])
	}
	const save = {
		show : () => css([$('#modal-save'), {display: 'initial'}]),
		hide : () => css([$('#modal-save'), {display: 'none'}])
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

		//getSaved
		ITEMS.forEach(ELEMENT => {
			$('#' + ELEMENT).value =
				localStorage.getItem(ELEMENT) || css([$(':root'), '--' + ELEMENT])
		})
		$('#' + ITEMS[0]).value = localStorage.getItem(ITEMS[0]) || 50
	}
}