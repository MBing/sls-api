const jobs = require('./jobsData.json');

module.exports.handler = async (evt, ctx) => ({
    statusCode: 200,
    body: JSON.stringify({
        jobs
    })
})