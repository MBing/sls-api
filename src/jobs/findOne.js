const jobs = require('./jobsData.json');

module.exports.handler = async (evt, ctx) => {
    const job = jobs.find(job => job.id === Number(evt.pathParameters.id))

    return {
        statusCode: 200,
        body: JSON.stringify(job)
}}