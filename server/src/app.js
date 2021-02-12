import express from "express";
import cors from "cors";
import path from "path";
import mongoose from 'mongoose';
import config from './config.js';
import users from './authentication/routes/auth.js'
import http from 'http';
import ioify from './io/index.js';


const startServer = async () => {
    console.log(config.ARGS)
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    await mongoose.connect(config.DB.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + config.DB.uri));
    db.once('open', () => {
        // we're connected !
        console.log('Mongodb Connection Successful');
    });

    if (config.ARGS.includes('--client')) {
        console.log('Serving client.')
        const buildPath = path.join(__dirname, '..', '..', 'client', 'build');
        app.use(express.static(buildPath));
        app.get('*', (request, response) => {
            response.sendFile(path.resolve(buildPath, 'index.html'));
        });
    }


    // Routes
    if (config.ARGS.includes('--auth')) app.use('/users', users);


    const httpserver = http.createServer(app);

    if (config.ARGS.includes('--io')) {
        // attaching our socket logic to the server
        ioify(httpserver);
        console.log(`Attached IO to server running on port ${config.server.port}`)
    }


    const port = config.server.port;

    const server = httpserver.listen(port, () => {
        console.log(`Server running on port ${port}...`);
    });

}


export default startServer;