
const azure = require('azure-storage')
const { queryEntities } = require("../services/tableService")
 
module.exports = async function (req, res) {
   try {

        //const blog = context.bindingData.blog

        var query = new azure.TableQuery().top(10);

        const result = await queryEntities(process.env.DB_NAME, query);

        // response body
        res.json(result);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500)
    }
}