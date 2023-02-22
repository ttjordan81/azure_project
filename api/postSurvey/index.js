
const { insertEntity } = require("../services/tableService")
 
module.exports = async function (req, res) {
    try { 
        
         // Check the request body is NOT empty
        if(!req.body){
            res.status(400);
            res.send('Please pass a request body.');
        }
        
        //
        const { paper, student_name, title, description, url } = req.body;

        //console.log(student_name)

        // Validation check to make sure paper, title and content isn't empty
        if(!student_name || !title || !description || !url){
            res.status(400);
            res.send('Please input a name, title, url, and description.');
        } 
 
        // Create the entity data object
        const entity = {
            PartitionKey: {'_':paper},
            RowKey: {'_': new Date().getTime().toString() },
            student_name: {'_': student_name },
            title: {'_': title },
            description: {'_': description },
            url: {'_': url },
        }

        // Save data to Azure Storage Account
        const result = await insertEntity(process.env.DB_NAME, entity)

        // response body
        return res.send(result);
        
    } catch (error) {  
        console.log(error.message);
        return res.status(500).send('Something broke!')
    }
}

