import { $, css, log } from './utils/dom.js'
import { sanny } from './utils/highlighter.js'
import { settings } from './settings.js'

settings()

sanny($('td pre'))

log("%cStop! better download the repository.\nhttps://github.com/MatiDragon-YT/opcode-search",
	{
		css:"color: black;background-color: #4caf50;font-size: 1rem;font-weight:bold;padding:.45rem 1rem"
	}
)