import { $, css, keyPressed, log } from './utils/dom.js'
import { load, start }  from './search.js'
import { fileServer }  from './utils/files.js'
import { hash } from './utils/directories.js'

export const settings = () => {
	const $input = $('#myInput'),
		  $list = $('#list')

	const ITEMS = [
		[
			'settings-limit-h', 'text', 'ground', 'opcode', 'operator',
			'number', 'string', 'variable', 'comment', 'label'
		], 
		[
			['size', 'ground', 'size'],
			['nav', 'bars', 'list', 'scroll']
		]
	]

	const display = (ELEMENT, MODE) => 
		css([$('#' + ELEMENT), JSON.parse(`{"display": "${MODE}"}`)])

	const save = {
		show : () => display('modal-save', 'initial'),
		hide : () => display('modal-save', 'none')
	}

	const _ = localStorage
	const _get = KEY => _.getItem(KEY)
	const _set = (KEY, VALUE) => _.setItem(KEY, VALUE)

	const VK_ENTER = 13
	$input.onkeydown = () => {
		keyPressed($input, VK_ENTER, () => {
			start()

			$input.value == ''
				? hash.clear()
				: hash.set($input.value)
		})
	}

	$('#file-load').onclick = () => load()
	$('#file-clear').onclick = () => fileServer.clear($input)

	$('#pref-settings').onclick = () => display('modal', 'grid')
	$('#modal-close').onclick = () => display('modal', 'none')
	$('#modal-save').onclick = () => {
		//get set
		ITEMS[0].forEach(KEY => {
			const ELEMENT = $('#' + KEY).value
			if(_get(KEY) != ELEMENT){
				_set(KEY, ELEMENT)
			}
		})

		save.hide()
		start()
	}
	$('#reverse').onclick = () => {
		if ($('#reverse').checked) {
			css([$list, {"flex-direction" : 'column-reverse'}])
			$list.scrollTop = $list.scrollHeight * -1
		} else {
			css([$list, {"flex-direction" : 'column'}])
		}
	}

	const PREFIX = '--op-'

	ITEMS[0].forEach((ELEMENT, index) => {
		$('#' + ELEMENT).oninput = () => {
			save.show()

			if(index > 0) {
				$(':root').style.setProperty(PREFIX + ELEMENT, $('#' + ELEMENT).value)
			}
		}
	})

	onload = () => {
		save.hide()

		ITEMS[0].forEach((ELEMENT, index) => {
			if(index > 0) {
				const SAVED =
					_get(ELEMENT)
					|| css([$(':root'), PREFIX + ELEMENT])

				$('#' + ELEMENT).value = SAVED
					
				$(':root').style.setProperty(PREFIX + ELEMENT, $('#' + ELEMENT).value)
			}

		})
		
		$('#' + ITEMS[0][0]).value = _get(ITEMS[0][0]) || 50

		const _h = location.hash.replace('%20', ' ').replace('#', '')
		
		if (_h) {
			$input.value = _h
			start()
		}
	}
}