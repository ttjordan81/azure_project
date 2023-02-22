const azure = require('azure-storage')

const tableService = azure.createTableService(
    'restapiuml', 
    process.env.AZURE_STORAGE_KEY
);

const TableQuery = azure.TableQuery;

// Insert new record into Azure 
exports.insertEntity = (tableName, entity) => {
    const dataWasInserted =  new Promise((resolve, reject) => {
        tableService.insertEntity(tableName, entity,{ echoContent: true, payloadFormat:"application/json;odata=nometadata"}, (error, result, response) => {
            if (error) {
                reject(error);
            }else{
                resolve({status: "Data inserted!"});
            }
        });

    });
    return dataWasInserted;
}

exports.queryEntities = (tableName, query) => {
    return new Promise((resolve, reject) => {
        tableService.queryEntities(tableName, query,null, { echoContent: true, payloadFormat:"application/json;odata=nometadata"}, (error, result, response) => {
            if (error) {
                reject(error);
            }else{
                resolve(response.body);
            }
        });
    });
}

exports.testFunc = () =>{
    return "Works"
}