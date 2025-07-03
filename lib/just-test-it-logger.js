'use strict';

import process from "node:process";


export class JustTestItLogger {
    constructor() {
        this.colors = { red: '\x1b[31m', gray: '\x1b[37m', green: '\x1b[32m' };
        this.styles = { underline: '\x1b[4m', reset: '\x1b[0m' };
    }

    pass(message) {
        console.log(`${this.colors.green}\u2705  ${message}${this.styles.reset}`);
    }

    fail(message) {
        console.log(`${this.colors.red}\u274C  ${message}${this.styles.reset}`);
    }

    info(message) {
        console.log(`${this.colors.gray}${message}${this.styles.reset}`);
    }

    header(message) {
        console.log(`${this.styles.underline}${message}${this.styles.reset}`);
    }

    newline(lines=1) {
        process.stdout.write('\n'.repeat(lines));
    }

    separator(char) {
        const width = process.stdout.columns ? Math.floor(process.stdout.columns * 0.8) : 120;
        console.log(`${this.colors.gray}${char.repeat(width)}${this.styles.reset}`);
    }
}
