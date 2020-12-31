const dynamoDB = require('../dynamodb');

module.exports.handler = async (evt, ctx) => {
    try {
        const data = await dynamoDB.scan({
            TableName: process.env.JOBS_TABLE
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify(e)
        }
    }
}
