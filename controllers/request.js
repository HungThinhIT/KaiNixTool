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
    header: null,
    data: null, //contain chunked-body-data
}

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

ipcMain.on('prepare-api-request', async (event, api) => {
    console.log(api);

    /*
    * STRUCT_API:
    *     id: idApi,
    *     timeRequest: timeRequest,
    *     api: 'jsonplaceholder.typicode.com/albums/1/photos',
    *     method: 'get'
    */

    /**
     * DEBUG_API
     */
    apiDev = {
        method: 'get',
        param: '', //TODO WILLDO
        
        url: 'http://api.learnvoca.hungthinhit.com/user/',
        header: '', //TODO WILL DO

        authenticate: {
            isAuth: true,
            type: 'Bearer',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk1NDc5ODc0fQ._n-hgeyFkqA9X9IUlxWYNNC581jMs-XePLcKyk1icdo',
        },
        data: {}, //This is body
    }
    try {
        const request = await axios({
            method: apiDev.method,
            url: apiDev.url,
            data: apiDev.data,
            headers: {
                Authorization: `${apiDev.authenticate.type} ${apiDev.authenticate.token}`,
            }
        })
        console.log("DATA_IN_[request.js]");
        console.log(request);
        console.log(request.status);
        console.log(request.data);
        console.log("END_THEN");
    } catch (error) {
        console.log("ERROR_IN_[request.js]_execute api");
        console.log(error);
        console.log(error.message);
        console.log(error.response.data);
        console.log(error.response.status);
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