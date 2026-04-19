class HttpGateway {
    constructor() {
    }
    async fetchData(url: string, method: string, requestBody?: {}): Promise<any> {
        const fetchOptions: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (requestBody) {
            fetchOptions.body = JSON.stringify(requestBody);
        }
        const response = await fetch(url, fetchOptions);
       if (!response.ok) {
        const errorText = await response.text(); // Add this line
        // console.error("OLLAMA SAYS:", errorText); // This tells us exactly what is wrong
        throw new Error(`HTTP error! status: ${response.status}`);
    }
        return response;
    }
}
export const httpGateway = new HttpGateway();