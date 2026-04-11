class HttpGateway {
    constructor() {
    }
    async fetchData(url: string, method: string, requestBody?: {}): Promise<any> {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }
}
export const httpGateway = new HttpGateway();

