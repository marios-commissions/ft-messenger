import { PayloadTypes, Routes, URL } from '@constants';
import { createLogger } from '@lib/logger';
import { Socket } from '@structures';
import { uuid } from '@utilities';
import config from '@config';

class API {
	logger = createLogger('FT', 'API');
	chats = [];

	async getPortfolio() {
		const res = await fetch(URL.API + Routes.Portfolio(config.portfolio), {
			headers: {
				'Authorization': config.auth
			}
		}).catch(() => null);

		if (!res?.ok) {
			this.logger.error('Failed to retrieve profile information.', { res });
			return {};
		}

		return await res.json();
	}

	async getChats(): Promise<Chat[]> {
		const portfolio = await this.getPortfolio();
		const chats = portfolio.holdings;

		this.chats = chats;
		this.logger.success('Chats successfully updated.');


		return this.chats;
	}

	async sendMessage(content: string, chatRoomId: string) {
		Socket.transmit({
			action: PayloadTypes.SEND_MESSAGE,
			clientMessageId: uuid(10),
			text: `\"${content}\"`,
			chatRoomId
		});
	}
}

export default new API();