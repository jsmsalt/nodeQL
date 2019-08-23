import http from 'http'
import https from 'https'
import fs from 'fs'
import { execSync } from 'child_process'
import config from 'config'

export default app => {
    const protocol = process.env.PROTOCOL || config.get('http.protocol')
    const port = process.env.PORT || config.get('http.port')
    let server

    if ( protocol === 'https' ) {
        const execOptions = { encoding: 'utf-8', windowsHide: true };
        let key = '../certs/key.pem';
        let certificate = '../certs/certificate.pem';
        
        if ( ! fs.existsSync( key ) || ! fs.existsSync( certificate ) ) {
            try {
                execSync( 'openssl version', execOptions );
                execSync(
                    `openssl req -x509 -newkey rsa:2048 -keyout ../certs/key.tmp.pem -out ${ certificate } -days 365 -nodes -subj "/C=US/ST=Foo/L=Bar/O=Baz/CN=localhost"`,
                    execOptions
                );
                execSync( `openssl rsa -in ../certs/key.tmp.pem -out ${ key }`, execOptions );
                execSync( 'rm ../certs/key.tmp.pem', execOptions );
            } catch ( error ) {
                console.error(error)
            }
        }
    
        const options = {
             key: fs.readFileSync(key),
             cert: fs.readFileSync(certificate),
             passphrase : 'password'
        }
        server = https.Server(options, app)
    } else {
        server = http.Server(app)
    }

    server.listen(port, () => console.log(`[express] listening on port ${port}...`))
}