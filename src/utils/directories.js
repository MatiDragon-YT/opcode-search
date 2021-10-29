export const local = () =>
	origin == 'https://matidragon-yt.github.io'
		? origin + '/opcode-search/'
		: origin + '/'

export const imagen = () => local() + 'static/images/'

export const hash = {
	current : () => location.hash,
	clear : () => {
		history.pushState('', document.title, location.pathname)
	}
}