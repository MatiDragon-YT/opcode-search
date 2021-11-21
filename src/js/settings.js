import { $, css, keyPressed, log } from './utils/dom.js'
import { load, start }  from './search.js'
import { fileServer }  from './utils/files.js'

export const settings = () => {
	$('#modal').innerHTML = `
	<element id="modal-window">
		<div id="modal-header">
			<h1 id="modal-title">Settings</h1>
			<span>
				<i id="modal-save" class="icon">save</i>
				<i id="modal-close" class="icon">close</i>
			</span>
		</div>
		<div id="modal-container">
			With love for you ;)
			<br><br>

			<b>Highlighter opcodes</b>
			<blockquote>
				Enable at <input type="number" id="settings-limit-h">
				<div class="info"><i class="icon">info</i><p class="comment">The highlighter by default is limited to highlighting only those opcodes that are in the lower range set here. That is, the higher the number, the more likely it is that the results will be highlighted, but it will also take longer to display the results. You can disable the functionality with 0 or it will highlight everything with -1.</p></div>
			</blockquote>
			
			<!--
			<b>Color theme</b>
			<blockquote>
				<div class="table">
					<div class="row">
						<b>Element</b><br>
						Nav<br>
						Bars<br>
						List<br>
						Scroll
					</div>
					<div class="row">
						<b>Color</b><br>
						<input type="text" disabled id="color-nav"><br>
						<input type="text" disabled id="color-bar"><br>
						<input type="text" disabled id="color-list"><br>
						<input type="text" disabled id="color-scroll">
					</div>
					<div class="row">
						<b>Ground</b><br>
						<input type="text" disabled id="ground-nav"><br>
						<input type="text" disabled id="ground-bar"><br>
						<input type="text" disabled id="ground-list"><br>
						<input type="text" disabled id="ground-scroll">
					</div>
					<div class="row">
						<b>Size</b><br>
						<input type="text" disabled id="size-nav"><br>
						<input type="text" disabled id="size-bar"><br>
						<input type="text" disabled id="size-list"><br>
						<input type="text" disabled id="size-scroll">
					</div>
				</div>
				<div class="info">
					<i class="icon">info</i><p class="comment">Enter any CSS3 variants (hex value, color name, or functions: hex, rbg, hsl, hsv, cmyk, linear-gradient, and so on). You will see the changes in real time, so it is recommended that you make your changes before loading the database or when there are few results.</p>	
				</div>
			</blockquote>
			-->

			<b>Color scheme</b>
			<blockquote>
				<div class="table">
					<div class="row">
						<b>Element</b><br>
						Text<br>
						Ground<br>
						Opcode<br>
						Operator<br>
						Number<br>
						String<br>
						Variable<br>
						Comment<br>
						Label
					</div>
					<div class="row">
						<b>Color</b><br>
						<input type="text" id="text"><br>
						<input type="text" id="ground"><br>
						<input type="text" id="opcode"><br>
						<input type="text" id="operator"><br>
						<input type="text" id="number"><br>
						<input type="text" id="string"><br>
						<input type="text" id="variable"><br>
						<input type="text" id="comment"><br>
						<input type="text" id="label">
					</div>
					<div class="row">
						<b>View</b><br>
						<pre>text_example_xd\n\n00AD:\n== += -= < <= * => > - +\nfalse 10 0xFF 0.0 #FAM1\n'short' "long string"\n412@ $variable_example\n{comment} // example\n@example_0AF023</pre>
					</div>
				</div>
				<div class="info">
					<i class="icon">info</i><p class="comment">Enter any CSS3 variants (hex value, color name, or functions: hex, rbg, hsl, hsv, cmyk, linear-gradient, and so on). You will see the changes in real time, so it is recommended that you make your changes before loading the database or when there are few results.</p>	
				</div>
			</blockquote>

			<!--
			<b>Danger Zone</b>
			<blockquote style="
			    text-align: center;
			">
			<button style="
			    background: #f4432b;
			    color: black;
			    font-weight: bold;
			    font-size: 1rem;
			    text-transform: uppercase;
			    padding: 1rem 3rem;
			">Reset settings</button>
			</blockquote>
			-->
		</div>
	</element>`

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

	const VK_ENTER = 13
	$('#myInput').onkeydown = () => {
		keyPressed($('#myInput'), VK_ENTER, () => {
			start()
			location.hash = $('#myInput').value
		})
	}

	$('#file-load').onclick = () => load()
	$('#file-clear').onclick = () => fileServer.clear($('#myInput'))

	$('#pref-settings').onclick = () => modal.show()
	$('#modal-close').onclick = () => modal.hide()
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
		const ELEMENT = $('#list')

		if ($('#reverse').checked) {
			css([ELEMENT, {"flex-direction" : 'column-reverse'}])
			ELEMENT.scrollTop = ELEMENT.scrollHeight * -1
		} else {
			css([ELEMENT, {"flex-direction" : 'column'}])
		}
	}

	ITEMS[0].forEach((ELEMENT, index) => {
		$('#' + ELEMENT).oninput = () => {
			save.show()

			if(index > 0) {
				$(':root').style.setProperty('--op-' + ELEMENT, $('#' + ELEMENT).value)
			}
		}
	})

	onload = () => {
		save.hide()

		ITEMS[0].forEach((ELEMENT, index) => {
			if(index > 0) {
				const SAVED =
					_get(ELEMENT)
					|| css([$(':root'), '--op-' + ELEMENT])

				$('#' + ELEMENT).value = SAVED
					
				$(':root').style.setProperty('--op-' + ELEMENT, $('#' + ELEMENT).value)
			}

		})
		$('#' + ITEMS[0][0]).value = _get(ITEMS[0][0]) || 50

		const _h = location.hash
		if (_h) {
			$('#myInput').value = _h.replace('#', '')
			start()
		}
	}
}