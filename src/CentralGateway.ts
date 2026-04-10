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
const httpGateway = new HttpGateway();
export const raw = httpGateway.fetchData(`https://api.weather.gov/alerts/active/area/${this.stateCode}`, "GET");
export const ollamaCall = httpGateway.fetchData("http://localhost:11434/api/chat", "POST", {"model":"gemma3:1b","messages":[{"role":"user","content":"test"}]});    

