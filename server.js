const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database/database.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom middleware to handle ?q=
server.use((req, res, next) => {
    if (req.query.q) {
        const q = req.query.q.toLowerCase();
        const db = router.db; // Access the lowdb instance
        const results = [];

        // Search through all collections
        db.getState().forEach((collection, key) => {
            const filtered = collection.filter(item =>
                Object.values(item).some(value =>
                    String(value).toLowerCase().includes(q)
                )
            );
            if (filtered.length) {
                results.push(...filtered);
            }
        });

        res.jsonp(results);
    } else {
        next();
    }
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running on http://localhost:3000');
});