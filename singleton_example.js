class Singleton {
    constructor() {
        if (!Singleton.instance) {
            this._data = [];
            Singleton.instance = this;
        }

        return Singleton.instance;
    }

    //rest is the same code as preceding example

}

const instance = new Singleton();
Object.freeze(instance);

export default instance;