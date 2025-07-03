# JustTestIt Framework

`JustTestIt` is a lightweight JavaScript unit testing framework designed to make writing and running tests simple and straightforward. It provides clear logging of test results and supports basic assertions such as `toBe`, `toBeTruthy`, `toNotThrow` and others. It’s perfect for projects where you don’t need the overhead of large, complex testing frameworks.

`JustTestIt` allows managing and organizing tests into `test suites`. Additionally, it supports a debug mode that provides detailed information about errors.

***

### Files Organization

`JustTestIt` consists of three files, which should be placed in the `lib` directory of the project:

- `just-test-it.js`
- `just-test-it-logger.js`
- `just-test-it-runner.js`


All test files must be placed directly in the `tests` directory because the `JustTestIt` framework does not currently support subfolders.  

#### File naming and extensions

Test files must have the `.test.js` extension. The test runner will only recognize and execute files with this exact naming convention. For example, a test file should be named `example.test.js`.


#### Directory Structure

The files and directory structure should be organized as follows

```
├── lib
│   ├── just-test-it.js
│   ├── just-test-it-logger.js
│   └── just-test-it-runner.js
│
├── tests
│   └── example.test.js
│
└── package.json
```

***

### Configuration

To use `JustTestIt`, it is required to have Node.js installed.  
To verify the installed versions, the following commands can be used

```bash
node -v
npm -v
```

In the `package.json` file add the following scripts to allow easy test execution with npm

```json
{
  "type": "module",
  "scripts": {
    "test": "node lib/just-test-it-runner.js",
    "test:debug": "node lib/just-test-it-runner.js --debug"
  }
}
```

***

### Basic Functions

`JustTestIt` provides several basic functions for creating and organizing tests into test suites:

- `describe()` – used to organize tests into logical groups, such as a group of tests for a specific feature or functionality.

- `test()` – defines a single test within a test suite. This function is used to execute a test.

- `expect()` – used for making assertions. It compares values, checks truthiness, etc.


#### Example usage:

```javascript
import { describe, test, expect } from '../lib/just-test-it.js';

describe('Test suite description', () => {
    test('Test 1', () => {
        expect(1 + 1).toBe(2);
    });
});
```

***

### Matchers

`JustTestIt` provides several matchers that can be used for making assertions in tests. These matchers allow comparing values and checking for various conditions.

- `toBe()` – Used to check if a value is strictly equal to the expected value.

- `toBeTruthy()` – Used to check if a value is truthy.

- `toBeFalsy()` – Used to check if a value is falsy.

- `toNotThrow()` – Ensures that a function does not throw an error.

- `toEqual()` – Used to check if two values are deeply equal. Useful for comparing objects or arrays.

#### Example usage of matchers

```javascript
import { describe, test, expect } from '../lib/just-test-it.js';

describe('Matchers example', () => {
    test('toBe matcher', () => {
        expect(1 + 1).toBe(2);              // Passes
    });

    test('toBeTruthy matcher', () => {
        expect('hello').toBeTruthy();       // Passes
        expect(0).toBeTruthy();             // Fails
    });

    test('toBeFalsy matcher', () => {
        expect(false).toBeFalsy();         // Passes
        expect(1).toBeFalsy();             // Fails
    });

    test('toNotThrow matcher', () => {
        expect(() => { return 1 + 1; }).toNotThrow();               // Passes
        expect(() => { throw new Error('Error'); }).toNotThrow();   // Fails
    });

    test('toEqual matcher', () => {
        expect([1, 2]).toEqual([1, 2]);                             // Passes
        expect({ name: 'John' }).toEqual({ name: 'John' });         // Passes
    });
});
```

***

### Running Tests

Tests are executed with the test runner. The following commands run all tests.

```bash
npm test
```

To run all tests in debug mode

```bash
npm run test:debug
```

Alternatively, individual test files can be executed directly using Node.js

```bash
node tests/example.test.js
```

To run a single test file in debug mode

```bash
node tests/example.test.js --debug
```

#### Test summary

After running the tests, the results are displayed in the terminal, including a summary of passed and failed tests and the total execution time.
