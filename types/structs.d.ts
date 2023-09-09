declare interface Message {
	sendingUserId: string;
	twitterPfpUrl: string;
	twitterName: string;
	timestamp: number;
	text: string;
	messageId: number;
	chatRoomId: string;
	imageUrls: string[];
	replyingToMessage: {
		messageId: number;
		sendingUserId: string;
		text: string;
		timestamp: number;
		twitterName: string;
		twitterPfpUrl: string;
	};
}

declare interface Chat {
	pfpUrl: string,
	username: string,
	name: string,
	subject: string,
	chatRoomId: string,
	price: string,
	balance: string,
	balanceEthValue: string,
	lastOnline: number,
	lastMessageName: string,
	lastMessageTime: string,
	lastMessageText: string,
	lastRead: string;
}