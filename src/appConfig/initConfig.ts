import * as fs from 'fs';
import * as path from 'path';

class initConfig{

    private fDefaultConfig;
    private fProdConfig;


    async initFiles(){
        this.fDefaultConfig = path.join(__dirname, "../config/default.json");
        this.fProdConfig = path.join(process.cwd(), '/config/default.json');
        let dProdConfig = path.join(process.cwd(), '/config/');
        if(!fs.existsSync(this.fProdConfig)) {
            if(!fs.existsSync(dProdConfig)){
                await fs.mkdirSync(dProdConfig);
                console.log('Created Config-File Directory');
            }
            await fs.createReadStream(this.fDefaultConfig).pipe(fs.createWriteStream(this.fProdConfig));
            console.log('Created Config-File Default.json');
            process.env["NODE_CONFIG_DIR"] = process.cwd();
            return;
        } else {
            console.log('Config Config-File exists');
            process.env["NODE_CONFIG_DIR"] = process.cwd();
            return;
        }
    }

} 

export default new initConfig();