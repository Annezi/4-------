import { Router, DBJson } from '../../core/index.js';

const migraineRouter = new Router();

migraineRouter.get('/migraine', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    const DBMigraine = new DBJson('./src/db/migraines.json'); 

    response.end(JSON.stringify(DBMigraine.getAll()));
});

migraineRouter.post('/migraine', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const newMigraine = JSON.parse(data);

            const DBMigraine = new DBJson('./src/db/migraines.json');

            const success = DBMigraine.add(newMigraine);

            if (success) {
                response.end(JSON.stringify(DBMigraine.getAll()));
            } else {
                response.end('Не удалось добавить запись');
            }
        });
});

migraineRouter.delete('/migraine', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const payload = JSON.parse(data);

            const DBMigraine = new DBJson('./src/db/migraines.json');

            const success = DBMigraine.deleteById(payload.id);

            if (success) {
                response.end(JSON.stringify(DBMigraine.getAll()));
            } else {
                response.end('Не удалось удалить запись');
            }
        });
});

export {
    migraineRouter
};