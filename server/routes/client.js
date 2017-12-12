const express = require('express')
	, path = require('path')
	, queryValidator = require('express-universal-query-validator');

let router = express.Router();

router.use(queryValidator());
router.use((request, response, next) => {
    let error = null;

    if (request.method !== 'POST' && request.headers.host.match(/^www/) === null) {
        response.redirect(301, 'http://www.' + request.headers.host + request.originalUrl);
    }

    try {
        decodeURIComponent(request.path);
    } catch(e) {
        error = e;
    }

    if (error) {
        response.redirect(301, 'http://www.' + request.headers.host + '/404');
    }

    next();
});

router.get('/', (request, response) => {
    response.sendFile(path.resolve('./build', 'index.html'));
});

module.exports = router;