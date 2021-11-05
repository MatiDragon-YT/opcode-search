import { $, log } from './utils/dom.js'
import { sanny, highlighter } from './utils/highlighter.js'
import { markdown } from './utils/markdown.js'
import { settings } from './settings.js'

markdown($('#modal-container'))
settings()

highlighter($('.row pre'))
log("Stop! better download the repository.\nhttps://github.com/MatiDragon-YT/opcode-search",
	"color: black;background-color: #4caf50;font-size: 1rem;font-weight:bold;padding:.45rem 1rem"
)