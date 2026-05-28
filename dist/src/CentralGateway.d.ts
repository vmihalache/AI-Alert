declare class HttpGateway {
    constructor();
    fetchData(url: string, method: string, requestBody?: {}, headersAdded?: {}): Promise<any>;
}
export declare const httpGateway: HttpGateway;
export {};
//# sourceMappingURL=CentralGateway.d.ts.map