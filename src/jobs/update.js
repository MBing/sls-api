const uuid = require('uuid');
const Joi = require('joi');
const dynamoDB = require('../dynamodb');

module.exports.handler = async (evt, ctx) => {
    const data = JSON.parse(evt.body)
    const timestamp = new Date().getTime();
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        published: Joi.boolean().required()
    })

    try {
        await schema.validateAsync(data);
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify(e)
        }
    }
    
    const params = {
        TableName: process.env.JOBS_TABLE,
        Key: {
            id: evt.pathParameters.id
        },
        UpdateExpression: 
            'SET title=:title, published=:published, updatedAt=:updatedAt',
        ExpressionAttributeValues: {
            ':title': data.title,
            ':published': data.published,
            ':updatedAt': timestamp,
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const data = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Attributes)
        }
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify(e)
        }
    }
}
