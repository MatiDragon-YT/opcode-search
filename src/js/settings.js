import { $, css, keyPressed, log } from './utils/dom.js'
import { load, start }  from './search.js'
import { fileServer }  from './utils/files.js'

export const settings = () => {
	const ITEMS = [
		'settings-limit-h', 'text', 'ground', 'opcode', 'operator',
		'number', 'string', 'variable', 'comment', 'label'
	]

	const LANG = [
		{
			"head" : {
				"title" : "Opcode Search",
				"description" : "Find fast and easy any opcode of gta sa."
			},
			"nav" : {
				"file" : {
					"title" : "File",
					"load" : "Load",
					"load_from_local" : "Load from Local",
					"save" : "Save",
					"save_as" : "Save as",
					"clear" : "Clear"
				},
				"pref" : {
					"title" : "Preferences",
					"settings" : "Settings",
					"light" : "Theme Light"
				},
				"title" : {
					"about" : "About"
				}
			},
			"settings" : {
				"description" : "With love for you ;)",
				"limit" : {
					"title" : "Highlighter opcodes",
					"description" : "The higher the number, the longer it will take to display the results. With 0 disables the function and -1 you will highlight all.",
					"value" : "Limited to number of found to"
				},
				"theme" : {
					"title" : "Color theme",
					"description" : "Enter any CSS3 variants (hex value, color name, or functions: hex, rbg, hsl, hsv, cmyk, linear-gradient, and so on). You will see the changes in real time, so it is recommended that you make your changes before loading the database or when there are few results.",
					"head_e" : "Element",
					"body_e" : "Text<br>Ground<br>Opcode<br>Operator<br>Number<br>String<br>Variable<br>Comment<br>Label",
					"head_c" : "Color",
					"head_v" : "View"
				},
				"danger" : {
					"title" : "Danger Zone",
					"reset" : "Reset settings"
				}
			},
			"footer" : {
				"found" : "Found",
				"reverse" : "Reverse"
			}
		}
	]

	const display = (ELEMENT, MODE) => 
		css([$('#' + ELEMENT), JSON.parse(`{"display": "${MODE}"}`)])

	const modal = {
		hide : () => display('modal', 'none'),
		show : () => display('modal', 'grid')
	}

	const save = {
		show : () => display('modal-save', 'initial'),
		hide : () => display('modal-save', 'none')
	}

	const _ = localStorage
	const _get = KEY => _.getItem(KEY)
	const _set = (KEY, VALUE) => _.setItem(KEY, VALUE)
	
	const click = (ELEMENT, CALLBACK) => $(ELEMENT).onclick = () => {
		CALLBACK()
	}

	const VK_ENTER = 13
	$('#myInput').onkeydown = () => {
		keyPressed($('#myInput'), VK_ENTER, () => start())
	}

	$('#file-load').onclick = () => load()
	$('#file-clear').onclick = () => fileServer.clear($('#myInput'))

	$('#pref-settings').onclick = () => modal.show()
	$('#modal-close').onclick = () => modal.hide()
	$('#modal-save').onclick = () => {
		//get set
		ITEMS.forEach(KEY => {
			const ELEMENT = $('#' + KEY).value
			if(_get(KEY) != ELEMENT){
				_set(KEY, ELEMENT)
			}
		})

		save.hide()
		start()
	}
	$('#reverse').onclick = () => {
		const ELEMENT = $('#list')

		if ($('#reverse').checked) {
			css([ELEMENT, {"flex-direction" : 'column-reverse'}])
			ELEMENT.scrollTop = ELEMENT.scrollHeight * -1
		} else {
			css([ELEMENT, {"flex-direction" : 'column'}])
		}
	}

	ITEMS.forEach((ELEMENT, index) => {
		$('#' + ELEMENT).oninput = () => {
			save.show()

			if(index > 0) {
				$(':root').style.setProperty('--op-' + ELEMENT, $('#' + ELEMENT).value)
			}
		}
	})

	onload = () => {
		save.hide()

		ITEMS.forEach((ELEMENT, index) => {
			if(index > 0) {
				const SAVED =
					_get(ELEMENT)
					|| css([$(':root'), '--op-' + ELEMENT])

				$('#' + ELEMENT).value = SAVED
					
				$(':root').style.setProperty('--op-' + ELEMENT, $('#' + ELEMENT).value)
			}

		})
		$('#' + ITEMS[0]).value = _get(ITEMS[0]) || 50
	}
}