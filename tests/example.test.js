import { describe, test, expect } from '../lib/just-test-it.js';


describe('Example test suite for just-test-it framework', () => {

    test('Sample test that should pass', () => {
        expect(1 + 1).toBe(2);
    });

    test('Sample test that should fail', () => {
        expect(1 + 1).toBe(3);
    });


    describe('Matchers – should pass', () => {
        test('toBe matcher', () => {
            expect(2 + 2 * 2).toBe(6);
            expect(3 + '3').toBe('33');
        });

        test('toEqual matcher', () => {
            expect([1, 2]).toEqual([1, 2]);
            expect({ name: 'John' }).toEqual({ name: 'John' });
        });

        test('toBeTruthy matcher', () => {
            expect(true).toBeTruthy();
            expect(1).toBeTruthy();
        });

        test('toBeFalsy matcher', () => {
            expect(false).toBeFalsy();
            expect(0).toBeFalsy();
        });

        test('toNotThrow matcher', () => {
            expect(() => {return true;}).toNotThrow();
            expect(() => {return false;}).toNotThrow();
        });
    });


    describe('Matchers – should fail', () => {
        test('toBe matcher', () => {
            expect(2 + 2 * 2).toBe(8);
            expect(3 + '3').toBe(6);
        });

        test('toEqual matcher', () => {
            expect([1, 2]).toEqual([2, 1]);
            expect({ name: 'John' }).toEqual({ name: 'Johny' });
        });

        test('toBeTruthy matcher', () => {
            expect(false).toBeTruthy();
            expect(0).toBeTruthy();
        });

        test('toBeFalsy matcher', () => {
            expect(true).toBeFalsy();
            expect(1).toBeFalsy();
        });

        test('toNotThrow matcher', () => {
            expect(() => {
                throw new Error('Error');
            }).toNotThrow();
        });
    });
});
