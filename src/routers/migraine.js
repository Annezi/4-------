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

//обновление списка
migraineRouter.put('/migraine', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const url = new URL('http://127.0.0.1:8080' + request.url);
            const queryId = parseInt(url.searchParams.get('id'));

            const payload = JSON.parse(data);

            const DBMigraine = new DBJson('./src/db/migraines.json');

            const success = DBMigraine.updateById(queryId, payload);

            if (success) {
                response.end(JSON.stringify(DBMigraine.getAll()));
            } else {
                response.end('Не удалось обновить запись');
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