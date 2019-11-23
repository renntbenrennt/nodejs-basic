const app = require('connect')();

app.use((req, res, next) => {
    res.end('Hello, World!');
});

app.listen(3000);