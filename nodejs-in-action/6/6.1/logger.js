function setup(format) {
    const regexp = /:(\w+)/g;

    return function createLogger(req, res, next) {
        const str = format.replace(regexp, (match, propetry) => {
            return req[propetry];
        });

        console.log(str);
        next();
    }
}

module.exports = setup;