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

    const client = await mongoose.connect(config.DB.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    if (config.ARGS.includes('--client')) {
        console.log('Serving client.')
        const buildPath = path.join(__dirname, 'build');
        app.use(express.static(buildPath));
        app.get('*', (request, response) => {
            response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
        });
    }


    // Routes
    app.use('/users', users);


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