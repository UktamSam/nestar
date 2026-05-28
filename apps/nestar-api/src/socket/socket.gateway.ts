import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import { AuthService } from '../components/auth/auth.service';
import { Member } from '../libs/dto/member/member';
import url from 'url';
import * as WebSocket from 'ws';

interface MessagePayload {
	event: string;
	text: string;
	memberData: Member | null;
}
interface InfoPayload {
	event: string;
	totalClients: number;
	memebrData: Member | null;
	action: string;
}

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit{
  private logger: Logger = new Logger('SocketEvents')
  private summaryClient: number = 0;
	private clientsAuthMap = new Map<WebSocket, Member | null>();
	private messageList: MessagePayload[] = [];

	constructor(private authService: AuthService) {}

	@WebSocketServer()
	server: Server;

  public afterInit(server: Server): void {
		this.logger.verbose(`WebSocket Server Initialized total: [${this.summaryClient}]`);
  }

	private async retrieveAuth(req: any): Promise<Member | null> {
		try {
			const parsedUrl = url.parse(req.url, true);
			const { token } = parsedUrl.query as { token: string };
			console.log('token', token);
			if (!token) {
				throw new Error('Token not found');
			}
			const authMember = await this.authService.verifyToken(token);
			return authMember;
		} catch (error) {
			return null;
		}
	}
	public async handleConnection(client: WebSocket, req: any) {
		const authMember = await this.retrieveAuth(req);
    this.summaryClient++;

		console.log('authMember', authMember);
		this.clientsAuthMap.set(client, authMember);

		const clientNick = authMember?.memberNick ?? 'Guset';
		this.logger.verbose(`${clientNick} connected & total: [${this.summaryClient}]`);

		const infoMessage: InfoPayload = {
			event: 'info',
			totalClients: this.summaryClient,
			memebrData: authMember,
			action: 'joined',
		};

		this.emitMesage(infoMessage);
		client.send(JSON.stringify({ event: 'getMessages', list: this.messageList }));
  }

	public handleDisconnect(client: WebSocket) {
		const authMember = this.clientsAuthMap.get(client);
    this.summaryClient--;
		this.clientsAuthMap.delete(client);
		const clientNick = authMember?.memberNick ?? 'Guset';

		console.log('client:', client);
		this.logger.verbose(`Disconnection & total: [${this.summaryClient}]`);

		const infoMessage: InfoPayload = {
			event: 'info',
			totalClients: this.summaryClient,
			memebrData: authMember ?? null,
			action: 'left',
		};

		this.broadcastMessage(client, infoMessage);
  }

  @SubscribeMessage('message')
	public async handleMessage(client: WebSocket, payload: string): Promise<void> {
		const authMember = this.clientsAuthMap.get(client);
		const newMessage: MessagePayload = {
			event: 'message',
			text: payload,
			memberData: authMember ?? null,
		};

		const clientNick = authMember?.memberNick ?? 'Guset';
		this.logger.verbose(`NewMessage: ${clientNick}: ${payload}`);

		this.messageList.push(newMessage);
		if (this.messageList.length > 5) {
			this.messageList.splice(0, this.messageList.length - 5);
		}
		this.emitMesage(newMessage);
	}

	private broadcastMessage(sender: WebSocket, message: InfoPayload | MessagePayload) {
		this.server.clients.forEach((client) => {
			if (client !== sender && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	}

	private emitMesage(message: InfoPayload | MessagePayload) {
		this.server.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
  }
}

/**
 * 1. Client (Faqat o'sha clientga)
 * 2. Broadcast (o'sha clientdan tashqari Barcha clientlarga)
 * 3. Emit (Barcha clientlarga)
 */