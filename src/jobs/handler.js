'use strict';

module.exports.handler = async (evt, ctx) => ({
    statusCode: 200,
    body: JSON.stringify({
        "message": evt.message
    })
})
