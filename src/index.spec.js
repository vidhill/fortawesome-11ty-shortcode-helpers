import { makeFortawesomeShortcode } from './index';

function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
describe("test 'makeFortawesomeShortcode()'", () => {
    it('should be a defined function', () => {
        expect(makeFortawesomeShortcode).not.toBeUndefined();
        expect(makeFortawesomeShortcode).toBeType('function');
    });

    describe('test invalid arguments, function should throw with invalid/missing arguments', () => {
        it('should throw when passed no arguments', () => {
            const callWithoutArgs = () => makeFortawesomeShortcode();
            expect(callWithoutArgs).toThrow();
        });

        it('should throw when no iconSetPrefix is passed', () => {
            const callWithoutArgs = () => makeFortawesomeShortcode({});
            expect(callWithoutArgs).toThrow();
        });

        it('should throw when a falsey iconSetPrefix is passed', () => {
            const callWithoutArgs = () => makeFortawesomeShortcode({}, '');
            expect(callWithoutArgs).toThrow();
        });
    });

    it('should return a defined function', () => {
        const iconSetKey = 'fab';
        const dummyIconSet = {
            [iconSetKey]: {},
        };
        const fortawesomeShortcode = makeFortawesomeShortcode(
            dummyIconSet,
            iconSetKey
        );
        expect(fortawesomeShortcode).not.toBeUndefined();
        expect(fortawesomeShortcode).toBeType('function');
    });

    describe('test the svg returned by the function', () => {
        const viewBoxWidth = 640;
        const viewBoxHeight = 640;
        const prefix = 'fab';
        const testIconName = 'github';

        const dummyIcon = {
            prefix,
            iconName: testIconName,
            icon: [viewBoxWidth, viewBoxHeight, [], 'f63f', 'M1 2 3 4z'],
        };

        const dummyIconSet = {
            [prefix]: {
                [testIconName]: dummyIcon,
            },
        };

        const fortawesomeShortcode = makeFortawesomeShortcode(
            dummyIconSet,
            prefix
        );

        const fortawesomeShortcodeToElement = (...args) => {
            const svgString = fortawesomeShortcode(...args);
            return createElementFromHTML(svgString);
        };

        it('should return a defined string', () => {
            const result = fortawesomeShortcode('github');

            expect(result).not.toBeUndefined();
            expect(result).toBeType('string');
        });

        it('should be the expected element type', () => {
            const element = fortawesomeShortcodeToElement('github');

            expect(element.nodeName.toLowerCase()).toBe('svg');
        });

        it('should add the expected class name', () => {
            const element = fortawesomeShortcodeToElement(
                'github',
                'social-icon'
            );

            const classNames = element.getAttribute('class').split(' ');
            expect(classNames).toContain('social-icon');
        });

        it('should add the expected class name, passing multiple classes', () => {
            const element = fortawesomeShortcodeToElement(
                'github',
                'social-icon,icon'
            );
            const classNames = element.getAttribute('class').split(' ');

            expect(classNames).toContain('social-icon');
            expect(classNames).toContain('icon');
        });

        it('should have the expected viewbox', () => {
            const element = fortawesomeShortcodeToElement('github');

            expect(element.getAttribute('viewBox')).toBe(
                `0 0 ${viewBoxWidth} ${viewBoxHeight}`
            );
        });
    });
});
