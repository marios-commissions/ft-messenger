import { bind, random, sleep } from '@utilities';
import { PayloadTypes, URL } from '@constants';
import { createLogger } from '@lib/logger';
import config from '@config';
import WebSocket from 'ws';
import api from '@lib/api';

class Socket extends WebSocket {
	logger = createLogger('FT', 'WebSocket');

	constructor() {
		super(URL.WebSocket + '?authorization=' + config.auth);
		this.logger.info('Attempting to establish connection...');

		this.on('message', this.onMessage);
		this.on('error', this.onMessage);
		this.on('open', this.onConnect);
		this.on('close', this.onClose);
	}

	@bind
	onMessage(event: WebSocket.MessageEvent): void {
		try {
			const payload = JSON.parse(String(event));
			if (!payload) return;

			switch (payload.type) {
				case PayloadTypes.PING:
					this.logger.debug('(«) Ping.');
					break;
				case PayloadTypes.PONG:
					this.logger.debug('(») Pong.');
					break;
			}
		} catch (error) {
			this.logger.error('Failed to parse message:', error);
		}
	};

	@bind
	async onConnect(): Promise<void> {
		this.logger.success('Connection successfully established.');
		this.sendPing();

		const chats = await api.getChats();
		let index = 0;

		while (true) {
			const chat = chats[Math.floor(Math.random() * chats.length)];

			await api.sendMessage(config.messages[index], chat.chatRoomId);
			console.log(`Sent message ${index + 1} to ${chat.chatRoomId}`);

			index++;
			if (index === config.messages.length) index = 0;

			const timeout = random(config.delay.min, config.delay.max);
			this.logger.info('Sleeping for', timeout, 'ms');
			await sleep(timeout);
		}
	};

	@bind
	onClose(event: WebSocket.CloseEvent): void {
		this.logger.warn('WebSocket connection terminated:', event);
		this.logger.info('WebSocket attempting reconnection...');

		new Socket();
	};

	@bind
	onError(event: WebSocket.ErrorEvent): void {
		this.logger.error('An error occured:', event.error);
	};

	@bind
	transmit(payload: Record<any, any>) {
		const json = JSON.stringify(payload);
		return this.send(json);
	}

	async sendPing() {
		if (this.readyState !== WebSocket.OPEN) return;

		this.transmit({ action: 'ping' });
		this.logger.debug('(«) Ping.');

		await sleep(2500);
		this.sendPing();
	}
}

export default new Socket();