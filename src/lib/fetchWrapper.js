class Constants {
    static labels = {
        errorGeneric: 'Sorry we have errors on the remote server',
        errorServerNotAvailable: 'Server not available',
        errorSessionExpired: 'Your session has expired, please login.',
    };
}

class FetchWrapper {
    constructor(apiVersion, labels, status_401_403) {
        this.apiVersion = apiVersion;
        this.apiVersion = apiVersion;
        this.status_401_403 = status_401_403;

        if (labels && labels !== '')
            this.labels = labels;
        else
            this.labels = Constants.labels;
    }

    get = (url, token, params, isFile = false, isBlob = false) => {
        return this.generic('GET', url, params, token, isFile, isBlob);
    }

    post = (url, params, token, isFile = false, isBlob = false, additionalParams = []) => {
        return this.generic('POST', url, params, token, isFile, isBlob, this.apiVersion, additionalParams);
    }

    put = (url, params, token, isFile = false, isBlob = false) => {
        return this.generic('PUT', url, params, token, isFile, isBlob);
    }

    delete = (url, params, token, isFile = false, isBlob = false) => {
        return this.generic('DELETE', url, params, token, isFile, isBlob);
    }

    generic = (method, url, params, token, isFile, isBlob, version = this.apiVersion, additionalParams = []) => {
        var requestInit = {
            method: method,
            mode: 'cors',
            cache: 'default',
            credentials: 'omit',
            headers: new Headers()
        };

        requestInit.headers.append('pragma', 'no-cache');

        if (version)
            requestInit.headers.append('api-version', version);

        if (token)
            requestInit.headers.append('Authorization', 'Bearer ' + token);

        if (params) {
            if (isFile) {
                var formData = new FormData();
                formData.append('file', params);
                requestInit.body = formData;
                if (additionalParams) {
                    for (let index = 0; index < additionalParams.length; index++) {
                        const element = additionalParams[index];
                        formData.append(element.name, element.value);
                    }
                }
            } else {
                requestInit.headers.append('Content-Type', 'application/json');
                requestInit.body = JSON.stringify(params);
            }
        }

        const labels = this.labels;
        const status_401_403 = this.status_401_403;

        return fetch(url, requestInit)
            .then(response => {
                // Others Status Code
                if (response.status < 200 || response.status >= 300)
                    throw response;

                return isBlob ? response.blob() : response.json();
            })
            .then(json => {
                return json;
            })
            .catch(error => {
                console.error(`Error on fetch url: ${url}`);

                if (!error || error.message === 'Failed to fetch')
                    throw new Error(labels.errorServerNotAvailable);

                // This is an error coming from then
                if (error.text) {
                    if ((error.status === 401 || error.status === 403) && status_401_403) {
                        status_401_403();
                        throw new Error(labels.errorSessionExpired);
                    }
                    else
                        return error.text()
                }

                if (error.message && error.message !== '')
                    throw error.message;

                throw new Error(labels.errorGeneric);
            })
            .then(finalMessage => {
                if (typeof (finalMessage) === 'object')
                    return finalMessage;

                if (finalMessage)
                    throw new Error(finalMessage);

                throw new Error(labels.errorGeneric);
            });
    }
}

export default FetchWrapper;
