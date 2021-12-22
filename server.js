const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
    .prepare()
    .then(() => {
        const port = process.env.PORT || 3000
        const server = express()

        server.get('/repo/:repo', (req, res) => {
            const actualPage = '/'
            const queryParams = { repo: req.params.repo }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })
        server.listen(port, err => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })