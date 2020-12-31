const dynamoDB = require('../dynamodb');

module.exports.handler = async (evt, ctx) => {
    const jobId = evt.pathParameters.id;
    const params = {
        TableName: process.env.JOBS_TABLE,
        Key: {
            id: jobId
        }
    }
    try {
        const data = await dynamoDB.get(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        }
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify(e)
        }
    }
}