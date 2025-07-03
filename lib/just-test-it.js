'use strict';

import process from 'node:process';
import { JustTestItLogger } from "./just-test-it-logger.js";


class Matchers {
    constructor(actual) {
        this.actual = actual;
    }

    toBe(expected) {
        if (expected !== this.actual) {
            throw new Error(`Expected: ${this.actual}, but received: ${expected}`);
        }
    }

    toEqual(expected) {
            const isEqual = JSON.stringify(expected) === JSON.stringify(this.actual);

        if (!isEqual) {
            throw new Error(`Expected: ${JSON.stringify(this.actual)}, but received: ${JSON.stringify(expected)}`);
        }
    }

    toBeTruthy() {
        if(!this.actual) {
            throw new Error(`Expected a truthy value, but received: ${this.actual}`);
        }
    }

    toBeFalsy() {
        if(this.actual) {
            throw new Error(`Expected falsy value, but received: ${this.actual}`);
        }
    }

    toNotThrow() {
        if (typeof this.actual !== 'function') {
            throw new Error(`Expected a function, but received: ${typeof this.actual}`);
        }

        try {
            this.actual();
        } catch (error) {
            throw new Error(`Expected function not to throw, but it threw: ${error.message}`);
        }
    }
}


class JustTestIt {
    constructor() {
        this.totalPassCount = 0;                            // Track the number of passed tests
        this.totalFailCount = 0;                            // Track the number of failed tests
        this.isRunner = false;                              //
        this.isRootSuite = true;                            // Identify if currently running the root test suite
        this.startTime = performance.now();                 // Store start time for execution timing

        this.logger = new JustTestItLogger();
        this.debug = process.argv.includes('--debug');      // Enable debug mode if the flag is present

        this.describe = this.describe.bind(this);
        this.test = this.test.bind(this);
    }

    expect(actual) {
        return new Matchers(actual);
    }

    describe(suiteName, suiteFunction) {
        try {
            const wasRootSuite = this.isRootSuite;          // Store the previous root suite state
            this.isRootSuite = false;                       // Mark this as a non-root suite

            this.logger.newline();
            this.logger.header(`Running test suite: ${suiteName}`);
            this.logger.newline();

            suiteFunction();                                // Execute all tests in this suite

            if (wasRootSuite && !this.isRunner) {           // Print summary only if running a single test file, not via the test runner
                this.logger.newline(2);
                this.printFinalSummary();
            }

            this.isRootSuite = wasRootSuite;                // Restore root suite status after finishing
        } catch (error) {
            this.logger.fail(`[Fail] Suite: ${suiteName} - ${error.message}`);

            if (this.debug) {
                this.logger.info(error.stack);
            }

            this.logger.newline();
        }
    }

    test(testName, testFunction) {
        try {
            testFunction();
            this.totalPassCount++;
            this.logger.pass(`[Pass] Test: ${testName}`);
        } catch (error) {
            this.totalFailCount++;
            this.logger.fail(`[Fail] Test: ${testName} - ${error.message}`);

            if (this.debug) {
                this.logger.info(error.stack);
            }
        }
    }

    printFinalSummary() {
        const totalTests = this.totalPassCount + this.totalFailCount;
        const executionTime = (performance.now() - this.startTime).toFixed(2);

        this.logger.info(`Execution Time: ${executionTime} ms`);
        this.logger.newline();
        this.logger.info(`Final Summary: \u26AA  Total: ${totalTests} | \u2705  Passed: ${this.totalPassCount} | \u274C  Failed: ${this.totalFailCount}`);
        this.logger.separator('_');
        this.logger.newline();
    }
}

export const justTestIt = new JustTestIt();
export const { describe, test, expect } = justTestIt;
