import { helloWorld } from './index';
describe('test', () => {
    it('should', () => {
        expect(helloWorld).not.toBeUndefined();
        expect(helloWorld).toBeType('function');
    });
});
