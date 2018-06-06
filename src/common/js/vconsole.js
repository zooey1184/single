import VConsole from 'vconsole'
import { appDevEvn } from './base.js'

export function vConsole() {
	if (appDevEvn()) {
		var vConsole = new VConsole();
	}
}