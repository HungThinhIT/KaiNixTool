const axios = require('axios');

const store = global.share.store;
const ipcMain = global.share.ipcMain;
/*
|-----------------------------------------------
| Response Data Struct
|-----------------------------------------------
|
| This is struct of response when it return
|  
| 
|
|
*/
var responseData = {
    statusCode: null,
    responseHeaders: null,
    responseBody: null, //contain chunked-body-data
    originRequest: null,
    stockOriginRequest: null,
    size: null,
    timeMs: null
}

/*
|-----------------------------------------------
| Response time (ms) for axios
|-----------------------------------------------
|
| This is interceptors help calculate response
| time from axios and return in 
| x.config.meta.requestStartedAt
|
|
*/
axios.interceptors.request.use( x => {
    // to avoid overwriting if another interceptor
    // already defined the same object (meta)
    x.meta = x.meta || {}
    x.meta.requestStartedAt = new Date().getTime();
    return x;
})

axios.interceptors.response.use( x => {
    console.log(`Execution time for: ${x.config.url} - ${ new Date().getTime() - x.config.meta.requestStartedAt} ms`)
    return x;
},
    // Handle 4xx & 5xx responses
    x => {
        console.error(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`)
        throw x;
    }
)




/*
|-----------------------------------------------
| Execute the api
|-----------------------------------------------
|
| Execute the api with method, protocol,
| hostname.
| 
|
|
*/

ipcMain.on('send-api-request', async (event, rawRequest) => {
    console.log(rawRequest.apiEndPoint[0]);
    /*
    * STRUCT_API:
    *     id: idApi,
    *     timeRequest: timeRequest,
    *     url: 'jsonplaceholder.typicode.com/albums/1/photos',
    *     method: 'get',
    *     headers: data.Req.Headers,
    *     authenticate: data.Req.Authen,
    *     body: data.Req.Body
    */

    const api = rawRequest.apiEndPoint[0];
    try {
        const headers = await getHeaders(api.authenticate.isAuthen, api.headers)

        let request = await axios({
            method: api.method,
            url: api.url,
            data: api.body,
            headers,
            
        })

        console.log("DATA_IN_[request.js]");
        const responseTime = new Date().getTime() - request.config.meta.requestStartedAt
        responseData.statusCode = request.status
        responseData.responseHeaders = request.headers
        responseData.responseBody = request.data
        responseData.originRequest = api
        responseData.stockOriginRequest = rawRequest
        responseData.timeMs = responseTime

        console.log("REQUEST.JS => Response debugger");
        console.log(responseData);
        // event.returnValue = responseData
        event.sender.send('response-api-data', responseData)
    } catch (error) {
        responseErrorData = {
            statusCode: null,
            header: null,
            responseBody: null, //contain chunked-body-data
            originRequest: null,
            size: null,
            timeMs: null,
            isFatalError: false,
        }
        if(error.response != undefined){
            const responseTime = new Date().getTime() - error.config.meta.requestStartedAt
            responseData.statusCode = error.response.status
            responseData.responseBody = error.response.data
            responseData.originRequest = api
            responseData.timeMs = responseTime
            console.log(responseData);
            event.sender.send('response-api-data',  responseData)
        }else{
            responseData.isFatalError = true
            responseData.responseBody = error.message
            event.sender.send('response-api-data',  responseData)

        }
    }

async function getHeaders(isAuthen, originHeader){
    var headers = {}
    Object.keys(api.headers).forEach(element => {
        headers[api.headers[element].key] = api.headers[element].value
    });

    if(api.authenticate.isAuthen){
        headers.Authorization = `${api.authenticate.type} ${api.authenticate.token}`
    }

    return headers
}










    // const request = net.request({
    //     method: 'GET',
    //     protocol: 'https:',
    //     hostname: 'jsonplaceholder.typicode.com/albums/1/photos',
    //     // port: 443,
    //     path: '/'
    // })

    // request.on('response', (response) => {
    //     // let dataResponse;
    //     console.log(`STATUS: ${response.statusCode}`)
    //     console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    //     console.log(response);
    //     // console.log(response.data);

    //     response.on('data', (chunk) => {
    //         console.log(`BODY: ${chunk}`)
    //         console.log(chunk);
    //         responseData.statusCode = response.statusCode
    //         responseData.header = response.headers
    //         responseData.data = JSON.parse(chunk.toString())
    //         event.returnValue = responseData
    //     })
    //     response.on('end', () => {
    //       console.log('No more data in response.')
    //     })
    //   })
    // request.end()

})