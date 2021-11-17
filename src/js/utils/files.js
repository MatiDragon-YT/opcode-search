import { $, log } from './dom.js'
import { found } from '../search.js'
export const fileServer = {
	get : async function (URL, CALLBACK) {
		$('#sms').innerHTML = 'Loading database...'

		const TYPE = URL.replace(/(.*\.)/, '')

		return await fetch(URL)
		 .then(RES => TYPE == 'json' ? RES.json() : RES.text())
		 .then(DATA => CALLBACK(DATA))
		 .catch(ERROR => log(ERROR))
	},

	write : (MESSAGE = '') => {
		$('#list').innerHTML = MESSAGE
	},

	format : (OPCODES) => {
		OPCODES.innerHTML =
		OPCODES.innerHTML
		.replace(/^(.+)/gim, '<li style><pre>$1</pre></li>')
	},

	clear : (ELEMENT) => {
		fileServer.write('<div id="sms">Find fast and easy any opcode of gta sa.</div>')
		ELEMENT.value = ''
		found(0)
	}
}