Simple wrapper around fetch function to manage in a simple way the errors from BE using http status code

## Usage
1. Installation
 ```bash
fd-fetch-wrapper
 ```

2. Import
 ```javascript
 import { FetchWrapper } from 'fd-fetch-wrapper';
 ```

3. Create an instance of FetchWrapper
 ```javascript
  const runner = new FetchWrapper(apiVersion, labels, status_401_403);
 ```

Where

 - apiVersion: optional parameter that can be used when we have different api version on our server, a parameter named 'api-version' will be added to the header

 - labels: optional parameter used to let you choose the message to show at FE for common error
 ```javascript
static labels = {
    errorGeneric: 'Sorry we have errors on the remote server',
    errorServerNotAvailable: 'Server not available',
    errorSessionExpired: 'Your session has expired, please login.',
};
```

 - status_401_403: this is a callback function with no parameters that can be used to let you logout the user
 
4. Avaliable methods
```javascript
delete = (url, params, token, isFile = false, isBlob = false)

get = (url, token, params, isFile = false, isBlob = false) 

post = (url, params, token, isFile = false, isBlob = false, additionalParams = [])

put = (url, params, token, isFile = false, isBlob = false)
```


## Sample
You can find this code in github, App.js of this repository
```javascript
function App() {

    function status_401_403() {
        alert("Log Out");
    }

    const runner = new FetchWrapper(null, null, status_401_403);

    function onClick() {
        runner.get('http://localhost:61419/weatherforecast').then(response => {
            alert(response);
        }).catch(errorMessage => {
            if (errorMessage)
                alert(errorMessage);
        });

        runner.post('http://localhost:61419/weatherforecast', null, null, false, false, [{ namme: 'nome', value: 123 }]).then(response => {
            alert(response);
        }).catch(errorMessage => {
            if (errorMessage)
                alert(errorMessage);
        });
    }

    return (
        <React.Fragment>
        <button onClick={onClick}>Fetch Test</button>
        </React.Fragment>
    );
}
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the Demo app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run distribute`

Builds (made for windows) the app for production to the `dist` folder.<br />
It correctly bundles the React component.

### `npm publish`

Publish the dist on npmjs.

## License
[MIT](https://choosealicense.com/licenses/mit/)
