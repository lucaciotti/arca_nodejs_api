
const fs = require('fs');
const path = require('path');

class pkgSpawnFix {

    private fModule;
    private fBasePath;
    
    fixAdodb(){
        this.fModule = path.join(__dirname, '../node_modules/node-adodb/lib/adodb.js');
        this.fBasePath = path.join(process.cwd(), 'adodb.js');
        fs.createReadStream(this.fModule).pipe(fs.createWriteStream(this.fBasePath));
        console.log('Created File adodb.js')
        /* 
        IMPORTANTE
        Prima di effettuare il BUILD sostituire in node_modules/node-adodb/lib/proxy.js
         --> const adodb = require.resolve('./adodb');

         CON :
            const path = require('path');
            // Get adodb
            const adodb = path.join(process.cwd(), 'adodb.js');
         */
    }

}

export default new pkgSpawnFix();