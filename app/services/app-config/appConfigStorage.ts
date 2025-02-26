import { type Config } from './appConfig';

const modeName = 'app-mode';

function getMode(): Config['mode'] {
 return (localStorage.getItem(modeName) as Config['mode']) || 'light';
}

function setMode(newMode: Config['mode']): void {
 localStorage.setItem(modeName, newMode);
}

export { getMode, setMode };
