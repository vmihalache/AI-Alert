class HttpGateway {
    constructor() {
    }
    async fetchData(url: string, method: string, requestBody?: {}): Promise<any> {
        const fetchOptions: RequestInit = {
            method: method,
        };
        if (requestBody) {
            fetchOptions.body = JSON.stringify(requestBody);
        }
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }
}
export const httpGateway = new HttpGateway();


