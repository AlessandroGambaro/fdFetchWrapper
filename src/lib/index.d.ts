declare module 'fd-fetch-wrapper' {
    export class FetchWrapper {
        constructor(apiVersion: string | null, _labels: object | null, _status_401_: any | null);
        get(url: string, token: string | null, params: object | null, isFile: boolean | false, isBlob: boolean | false): Promise<Response>;
        post(url: string, token: string | null, params: object | null, isFile: boolean | false, isBlob: boolean | false, additionalParams: object[] | null): Promise<Response>;
        put(url: string, token: string | null, params: object | null, isFile: boolean | false, isBlob: boolean | false): Promise<Response>;
        delete(url: string, token: string | null, params: object | null, isFile: boolean | false, isBlob: boolean | false): Promise<Response>;
    }
}