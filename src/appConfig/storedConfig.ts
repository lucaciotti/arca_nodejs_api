import * as config from 'config';

export class storedConfig {

    static readonly connectionString: string = config.get('Arca.connectionString');
    static readonly port: number = config.get('Server.port');
    static readonly baseUrl: string = config.get('Server.host') + ':' + config.get('Server.port') + '/api/v1/';

}