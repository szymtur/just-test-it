'use strict';

import { describe, test, expect } from '../lib/just-test-it.js';


describe('Example test suite for just-test-it framework', () => {

    test('Sample test that should pass', () => {
        expect(3 + '3').toBe('33');
    });

    test('Sample test that should fail', () => {
        expect(2 + 2 * 2).toBe(8);
    });


    describe('Matchers – should pass', () => {
        test('toBe matcher', () => {
            expect(2 + 2 * 2).toBe(6);
        });

        test('toEqual matcher', () => {
            expect({ name: 'John' }).toEqual({ name: 'John' });
        });

        test('toBeTruthy matcher', () => {
            expect(true).toBeTruthy();
        });

        test('toBeFalsy matcher', () => {
            expect(false).toBeFalsy();
        });

        test('toNotThrow matcher', () => {
            expect(() => {return true;}).toNotThrow();
        });
    });


    describe('Matchers – should fail', () => {
        test('toBe matcher', () => {
            expect(3 + '3').toBe(6);
        });

        test('toEqual matcher', () => {
            expect([1, 2]).toEqual([2, 1]);
        });

        test('toBeTruthy matcher', () => {
            expect(false).toBeTruthy();
        });

        test('toBeFalsy matcher', () => {
            expect(true).toBeFalsy();
        });

        test('toNotThrow matcher', () => {
            expect(() => {
                throw new Error('Error');
            }).toNotThrow();
        });
    });
});
