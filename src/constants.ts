export enum PayloadTypes {
	PING = 'ping',
	PONG = 'pong',
	REQUEST_MESSAGES = 'requestMessages',
	RECEIVED_MESSAGE = 'receivedMessage',
	SEND_MESSAGE = 'sendMessage'
}

export const URL = {
	API: 'https://prod-api.kosetto.com',
	WebSocket: 'wss://prod-api.kosetto.com'
} as const;

export const Routes = {
	Portfolio: (id) => '/portfolio/' + id
} as const;