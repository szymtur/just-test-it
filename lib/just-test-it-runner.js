'use strict';

import path from 'path';
import process from "node:process";

import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

import { JustTestItLogger } from "./just-test-it-logger.js";
import { justTestIt } from './just-test-it.js';


export class JustTestItRunner {
    constructor() {
        const dirName = path.dirname(fileURLToPath(import.meta.url));

        this.testDirectory = path.join(dirName, '..', 'tests');
        this.debug = process.argv.includes('--debug');
        this.errors = [];

        this.justTestIt = justTestIt;
        this.logger = new JustTestItLogger();
    }

    async run() {
        this.justTestIt.debug = this.debug;
        this.justTestIt.isRunner = true;

        const files = readdirSync(this.testDirectory).filter(file => file.endsWith(".test.js"));

        for (const file of files) {
            this.logger.newline();
            this.logger.info(`Importing ${file}`);
            this.logger.separator('_');

            try {
                await import(`file://${path.join(this.testDirectory, file)}`);
            } catch (error) {
                this.errors.push(`Error in ${file}: ${error.message}`);

                if (this.debug) {
                   this.errors.push(error.stack);
                }
            }
        }

        if (this.errors.length > 0) {
            throw new Error(`Errors during test execution:\n${this.errors.join('\n')}`);
        }

        this.logger.newline();
        this.logger.info(`All tests have been executed`);
        this.logger.newline();

        this.justTestIt.printFinalSummary();
    }
}


if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    const runner = new JustTestItRunner();

    runner.run().catch(error => {
        console.error(error.message);
        process.exit(1);
    });
}
