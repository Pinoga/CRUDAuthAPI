// Especialização da classe Error para incorporar o status da resposta
export default class ErrorHandler extends Error {
	public statusCode: number;
	public message: string;

	constructor(statusCode: number, message: string) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}
