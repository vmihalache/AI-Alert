
class HttpGateway {
    constructor() {
    } 
    async fetchData(url: string, method: string, requestBody?: {}, headersAdded?: {}, n: number = 3): Promise<any> {
        const fetchOptions: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headersAdded
            }
        };
        if (requestBody) {
            fetchOptions.body = JSON.stringify(requestBody);
        }
        try {
        const response = await fetch(url, fetchOptions)
        // console.log("HTTP response status:", response.json())
       
       if (!response.ok) {
         const errorBody = await response.json()
       console.log("Groq error:", errorBody)
        throw new Error(`HTTP error! status: ${response.status}`);
    }
        const responseJson = await response.json();
        console.log(responseJson.choices[0]);
        return responseJson.choices[0].message.content;
    } catch(err) {
        if (n === 1) throw err;
        console.warn(`Request failed. Retries remaining: ${n - 1}. Waiting 5s...`);        
        await new Promise(resolve => setTimeout(resolve, 12000));        
        return await this.fetchData(url, method, requestBody, {},  n - 1);
    }
    }
}

export const httpGateway = new HttpGateway();