const auth = require('basic-auth');
const express = require('express');
const User = require('../models/user');
const Entry = require('../models/entry');

exports.auth = (req, res, next) => {
    const { name, pass } = auth(req);
    User.authenticate(name, pass, (err, user) => {
        if (user) req.remoteUser = user;
        next(err);
    });
};

exports.user = (req, res, next) => {
    User.get(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user.id) return res.sendStatus(404);
        res.json(user);
    });
};

exports.entries = (req, res, next) => {
    const page = req.page;
    Entry.getRange(page.from, page.to, (err, entries) => {
        if (err) return next(err);
        // res.format({
        //     'application/json': () => {
        //         res.send(entries);
        //     },
        //     'application/xml': () => {
        //         res.write('<entries>\n');
        //         entries.forEach((entry) => {
        //             res.write(```
        //             <entry>
        //                 <title>${entry.title}</title>
        //                 <body>${entry.body}</body>
        //                 <username>${entry.username}</username>
        //             </entry>
        //             ```
        //             );                    
        //         });
        //         res.end('</entries>');
        //     }
        // });

        /// res.format() can also be used in this way:
        res.format({
            json: () => {
                res.send(entries);
            },
            // xml: () => {
            //     res.write('<entries>\n');
            //     entries.forEach((entry) => {
            //         res.write(```
            //         <entry>
            //             <title>${entry.title}</title>
            //             <body>${entry.body}</body>
            //             <username>${entry.username}</username>
            //         </entry>
            //         ```
            //         );                    
            //     });
            //     res.end('</entries>');                
            // }

            /// we can also use template to replace the above as,
            xml: () => {
                res.render('entries/xml', { entries: entries });
            }
        })
    });
};