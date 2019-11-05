const http = require('http');
const fs = require('fs');

/**
 *
 * The following snippet shows the basic way to create a server in node.js,
 * which has the ability to listen to port: (8000) with ip: (127.0.0.1)
 * and serve a html with the content change based on a data file
 *
 */
// http.createServer((req, res) => {
//     if (req.url === '/') {
//         fs.readFile('./title.json', (err, data) => {
//             if (err) {
//                 console.error(err);
//                 res.end('Server Error');
//             } else {
//                 const titles = JSON.parse(data.toString());
//                 console.log('titles = ', titles);
//                 fs.readFile('./template.html', (err, data) =>{
//                     if (err) {
//                         console.error(err);
//                         res.end('Server Error');
//                     } else {
//                         const templ = data.toString();
//                         const html = templ.replace('%', titles.join('</li><li>'));
//                         res.writeHead(200, { 'Content-Type': 'text/html' });
//                         res.end(html);
//                     }
//                 });
//             }
//         });
//     }
// }).listen(8000, '127.0.0.1');

/**
 *
 * The following snippet shows how to use connecting functin to avoid callback hell
 *
 */
http.createServer((req, res) => {
    getTitle(res);
}).listen(8000, '127.0.0.1');

function getTitle(res) {
    fs.readFile('./title.json', (err, data) => {
        if (err) {
            hadError(err, res);
        } else {
            getTemplate(JSON.parse(data.toString()), res);
        }
    });
}

function getTemplate(titles, res) {
    fs.readFile('./template.html', (err, data) => {
        if (err) {
            hadError(err, res);
        } else {
            formatHtml(titles, data.toString(), res);
        }
    });
}

function formatHtml(titles, templ, res) {
    const html = templ.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}

function hadError(err, res) {
    console.log(err);
    res.end('Server Error');
}