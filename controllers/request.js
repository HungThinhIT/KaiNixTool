const { net } = require('electron')

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
    data: null,
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

ipcMain.on('prepare-api-request', async(event, api) => {
    console.log(api);    
    /*
    * STRUCT_API:
    *     id: idApi,
    *     timeRequest: timeRequest,
    *     api: 'jsonplaceholder.typicode.com/albums/1/photos',
    *     method: 'get'
    */
    const request = net.request({
        method: 'GET',
        protocol: 'https:',
        hostname: 'jsonplaceholder.typicode.com/albums/1/photos',
        // port: 443,
        path: '/'
    })

    request.on('response', (response) => {
        // let dataResponse;
        console.log(`STATUS: ${response.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
        console.log(response);
        // console.log(response.data);
        
        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
            console.log(chunk);
            responseData.statusCode = response.statusCode
            responseData.header = response.headers
            responseData.data = JSON.parse(chunk.toString())
            event.returnValue = responseData
        })
        response.on('end', () => {
          console.log('No more data in response.')
        })
      })
    request.end()
    
})