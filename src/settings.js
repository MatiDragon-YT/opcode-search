import { $, css, keyPressed } from './utils/dom.js'
import { load, start }  from './search.js'
import { fileServer }  from './utils/files.js'

export const settings = () => {
	$('#myInput').onkeydown = () => keyPressed($('#myInput'), 13, () => start())
	$('#file-load').onclick = () => load()
	$('#file-clear').onclick = () => fileServer.clear()
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
		css( [$('#modal-save'), {display: 'none'}] )
		$('#limit-h').value = localStorage.getItem('limit-h') || 50

		function getSaved(...ELEMENTS) {
			ELEMENTS.forEach(ELEMENT => {
				$('#' + ELEMENT).value =
					localStorage.getItem(ELEMENT) || css([$(':root'), '--' + ELEMENT])

			})
		}
		getSaved('opcode', 'operator', 'number', 'variable','string', 'comment', 'label',
			'text', 'ground')

	}
}