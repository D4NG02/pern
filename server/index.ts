import cors from "cors";
import "jsonwebtoken";
import express from 'express';

import routerAuth from "./routes/authenticate";
import routerCurrency from './routes/currency';
import routerEvent from './routes/event';
import routerMachine from "./routes/machine";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', routerAuth);
app.use('/currency', routerCurrency);
app.use('/event', routerEvent);
app.use('/machine', routerMachine);

app.listen(5000, () => {
    console.log(`[server]: Server is running at http://localhost:5000`)
})


function print(path, layer) {
    if (layer.route) {
        layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
        console.log('%s /%s',
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join('/'))
    }
}

function split(thing) {
    if (typeof thing === 'string') {
        return thing.split('/')
    } else if (thing.fast_slash) {
        return ''
    } else {
        var match = thing.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
        return match
            ? match[1].replace(/\\(.)/g, '$1').split('/')
            : '<complex:' + thing.toString() + '>'
    }
}

// app._router.stack.forEach(print.bind(null, []))