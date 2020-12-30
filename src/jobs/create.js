const fs = require('fs');
const jobs = require('./jobsData.json');
const filePath = './src/jobs/jobsData.json';

module.exports.handler = async (evt, ctx) => {
    jobs.push(JSON.parse(evt.body))

    fs.writeFile(filePath, JSON.stringify(jobs, null, 4), err => {
        if (err) {
            console.error(err)
        }
    })
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            jobs
        })
    }
}
