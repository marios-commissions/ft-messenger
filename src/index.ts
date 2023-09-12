import { createLogger } from '@lib/logger';
import { colorize } from '@utilities';
import API from '@lib/api';

const Logger = createLogger('FT');

async function init() {
	const chats = await API.getChats();

	const list = chats.map(chat => colorize(`${chat.name} (@${chat.username}) - ${chat.chatRoomId}`, 'yellow')).join('\n');
	Logger.info(list);
}

init();