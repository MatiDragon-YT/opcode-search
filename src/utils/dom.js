export const log = (MESSAGE, INFO) => {
	const TYPE = INFO.logByConsole || true
	TYPE
		? console.log(MESSAGE, INFO.css || '')
		: alert(MESSAGE)
}

export const $ = (ELEMENT, PARENT = document) =>
	ELEMENT[0] === '#' && !/\s/.test(ELEMENT)
	|| PARENT.querySelectorAll(ELEMENT).length === 1
		? PARENT.querySelector(ELEMENT)
		: PARENT.querySelectorAll(ELEMENT)

export const css = (...WORKER) => {
	const LENGTH = WORKER.length

	let values = []

	for (let COUNTER = 0; COUNTER < LENGTH; COUNTER++){
		const [ELEMENT, PROPERTIES] = WORKER[COUNTER]
		const TYPE = typeof PROPERTIES

		if (TYPE === 'object') {
			for (let SELECTOR in PROPERTIES) {
				ELEMENT.style[SELECTOR] = PROPERTIES[SELECTOR];
			}
		}
		else if (TYPE === 'string') {
			values.push(getComputedStyle(ELEMENT).getPropertyValue(PROPERTIES))
			if(COUNTER == LENGTH - 1){
				return values.length == 1
					? values[0]
					: values
			}
		}
		else {
			log('Enter OBJECT for set properties or STRING for get.')
		}
	}
}

export const doc = {
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


export const keyPressed = (ELEMENT, VIRTUAL_KEY, CALLBACK) => {
	ELEMENT.onkeydown = function (EVENT) {
		if (EVENT.keyCode === VIRTUAL_KEY){
			CALLBACK()
		}
	}
}