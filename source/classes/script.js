const { lstatSync, readdirSync } = require('fs'), { join } = require('path'), { cwd } = require('process');
const { Loader } = require('./loader');

/**
 * @classdesc Erisascript es una clase para leer códigos basados en strings.
 * @name Erisascript
 */
class Erisascript {
    constructor () {
        this.functions = new Map();
        this.version = '0.0.1';
    }

    /**
     * 
     * @param {string} dir El directorio donde se contienen las funciones.
     * @param {Array<any>} functions El array de funciones.
     * @returns void
     */
    async setFunctions (dir, functions = []) {
        Loader.cache(dir, functions).then(() => {
            functions.forEach(func => this.functions.set(func.name, func));
        });
        return;
    }

    /**
     * 
     * @param {string} code El código basado en strings.
     * @param {Array<any>} tokens Un array vacío para pushear los tokens.
     * @param {boolean} debug Útil para debug en la función.
     * @returns Promise<any>
     */
    async #tokenize (code, tokens = [], debug = false) {
        // Manejamos cada salto de línea del código.
        code = code.trim().split('\n');
        // Número de línea actual.
        let lineNumber = 1;
        // Iteración de cada línea.
        for (let line of code) {
            // Borramos caracteres inútiles en el inicio y final de las líneas.
            line = line.trim();
            // Datos del lexer.
            let pos = 0, length = line.length, char = '', pivote = 0;
            let allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            // Comenzamos el loop.
            while (pos < length) {
                char = line[pos];
                if (char === '@') { pos++; continue; }
                else if (char === ':') {
                    let args = '';
                    pos++;
                    while (line[pos] !== ';' && pos < length) {
                        args += line[pos];
                        pos++;
                    }
                    if (line[pos] !== ';') throw Error('ErisaLexer: Se esperaba un "]" que cerrara la función.');
                    // Si la función se cierra...
                    else if (line[pos] === ';') {
                        // Poniendo los args en un array.
                        let parameters = args.split('|') || [];
                        // Borrando espacios extras de los parámetros.
                        parameters = parameters.map(param => param.trim());
                        // Pusheando el token de args.
                        tokens.push({ type: 'parameters', value: parameters, line: lineNumber });
                        pos++;
                        continue;
                    }
                } else if (allowed.includes(char)) {
                    let res = char;
                    pos++;
                    while (allowed.includes(line[pos]) && pos < length) {
                        res += line[pos];
                        pos++;
                    }
                    // Si la función no se encuentra, regresa un error.
                    if (!this.functions.get(res)) throw Error(`ErisaLexer: ${res} no es una función.`);
                    // Pushea la función encontrada.
                    tokens.push({ type: 'function', value: res, line: lineNumber });
                // Si encuentra un espacio, que continúe con el siguiente elemento.
                } else if (char === ' ') { pos++; continue; }
                else throw Error(`ErisaLexer: No se esperaba el caracter ${char}.`);
            }
            lineNumber++;
            continue;
        }
        if (debug) { console.log('ErisaLexer[DEBUG]:', tokens); }
        return tokens;
    }

    /**
     * @param {any} ctx The message context.
     * @param {Array<any>} tokens El array de tokens procesados por el lexer.
     */
    async #parse (ctx, tokens) {
        const length = tokens.length;
        let pos = 0;
        while (pos < length) {
            const token = tokens[pos];
            if (token.type === 'function' && this.functions.get(token.value)) {
                if (!tokens[pos + 1]) throw new Error('ErisaParser: Final de linea insperado.');
                let isParams = tokens[pos + 1].type === 'parameters';
                if (!isParams) throw new Error('ErisaParser: Se esperaban argumentos para la función, pero no se obtuvo nada.');
                let func = this.functions.get(token.value);
                if (!func) throw new Error(`ErisaParser: ${token.value} no es una función.`);
                let parameters = tokens[pos + 1].value;
                // Ejecutando la función.
                func.code(ctx, ...parameters);
                // Siguiendo con los tokens...
                pos += 2;
            } else throw new Error(`ErisaParser: No se esperaba ${token.type}`);
        }
    }

    /**
     * 
     * @param {Any} ctx El contexto del mensaje.
     * @param {string} code El código basa en strings.
     */
    async interprete (ctx, code, debug = false) {
        let tokens = await this.#tokenize(code, [], debug);
        await this.#parse(ctx, tokens);
    }

}

module.exports = { Erisascript }


/**
 * Prototipos útiles.
 */
String.prototype.escape = function () {
    this.replaceAll('\n', '%INT%')
        .replaceAll('<', '%LT%')
        .replaceAll('>', '%GT%')
}

String.prototype.unescape = function () {
    this.replaceAll('%INT%', '\n')
        .replaceAll('%LT%', '<')
        .replaceAll('%GT%', '>')
}