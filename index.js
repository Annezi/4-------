import { Application } from './core/index.js';
import { migraineRouter } from './src/routers/index.js';

const server = new Application();

server.addRouter(migraineRouter);

server.listen(8080);