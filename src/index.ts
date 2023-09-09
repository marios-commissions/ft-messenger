import { createLogger } from '@lib/logger';
import { colorize } from '@utilities';
import API from '@lib/api';

const Logger = createLogger('FT');

async function init() {
	const chats = await API.getChats();

	const list = chats.map(chat => `${chat.name} (@${chat.username}) - ${chat.chatRoomId}`).join('\n');
	Logger.info(colorize(list, 'yellow'));
}

init();