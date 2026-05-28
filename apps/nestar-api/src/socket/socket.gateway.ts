import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from 'ws';

interface MessagePayload {
	event: string;
	text: string;
}
interface InfoPayload {
	event: string;
	totalClients: number;
}

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit{
  private logger: Logger = new Logger('SocketEvents')
  private summaryClient: number = 0;

	@WebSocketServer()
	server: Server;

  public afterInit(server: Server): void {
		this.logger.verbose(`WebSocket Server Initialized total: [${this.summaryClient}]`);
  }

  handleConnection(client: WebSocket, ...arg: any[]) {
    this.summaryClient++;
		this.logger.verbose(`Connection & total: [${this.summaryClient}]`);

		const infoMessage: InfoPayload = {
			event: 'info',
			totalClients: this.summaryClient,
		};

		this.emitMesage(infoMessage);
  }

  handleDisconnect(client: WebSocket) {
    this.summaryClient--;
		this.logger.verbose(`Disconnection & total: [${this.summaryClient}]`);

		const infoMessage: InfoPayload = {
			event: 'info',
			totalClients: this.summaryClient,
		};

		this.broadcastMessage(client, infoMessage);
  }

  @SubscribeMessage('message')
	public async handleMessage(client: WebSocket, payload: string): Promise<void> {
		const newMessage: MessagePayload = {
			event: 'message',
			text: payload,
		};

		this.logger.verbose(`NewMessage: ${payload}`);
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
