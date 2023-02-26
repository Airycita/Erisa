const { lstatSync, readdirSync } = require('fs'), { join } = require('path'), { cwd } = require('process');

class Loader {
    static async cache(dir, array = []) {
        const files = readdirSync(join(cwd(), dir));
        if (!files) throw new Error('El directorio provisto no tiene ficheros.');
        for (let file of files) {
            let stat = lstatSync(join(cwd(), dir, file));
            if (stat.isDirectory()) { this.cache(join(dir, file), array); continue; }
            const module = require(join(cwd(), dir, file));
            if (!module) continue;
            array.push(module);
        }
        return array;
    }
}

module.exports = { Loader }