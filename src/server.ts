import app from "./app";
import pkgSpawnFix from './pkg_spawn_fix';
import initConfig from "./appConfig/initConfig";
import { storedConfig } from './appConfig/storedConfig';

let port = 3019;

pkgSpawnFix.fixAdodb();

process.env["SUPPRESS_NO_CONFIG_WARNING"] = 'y';
initConfig.initFiles().then(() => {
    port = storedConfig.port;
    console.log(port);
    app.listen(port, () => {
        console.log('Express server listening on port ' + port);
    })
});
