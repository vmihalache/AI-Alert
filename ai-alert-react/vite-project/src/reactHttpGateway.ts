
class HttpGateway {
    constructor() {
    }
    async fetchData(url: string, method: string, requestBody?: {}, headersAdded?: {}): Promise<any> {
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
        
        const response = await fetch(url, fetchOptions)
        // console.log("HTTP response status:", response.json())
       
       if (!response.ok) {
         const errorBody = await response.json()
       console.log("Groq error:", errorBody)
        throw new Error(`HTTP error! status: ${response.status}`);
    }
        const responseJson = response.json()
        return await responseJson.then(res => {
            console.log(res.choices[0])
            return res.choices[0].message.content
        })
    }
}
export const httpGateway = new HttpGateway();