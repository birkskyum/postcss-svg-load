const compare = require('./utils/compare.js');

process.chdir(__dirname);

describe('short syntax', () => {
    it('should compile basic', () => {
        return compare(
            `background: svg-load('fixtures/basic.svg');`,
            `background: url("data:image/svg+xml;charset=utf-8,<svg id='basic'/>");`
        );
    });

    it('should skip unexpected function syntax', () => {
        const fixtures = `
            background: svg-load();
            background: svg-load('fixtures/basic.svg', );
        `;
        return compare(
            fixtures,
            fixtures,
            [
                'Invalid "svg-load()" definition',
                'Invalid "svg-load()" definition'
            ]
        );
    });

    it('should compile fill param', () => {
        return compare(
            `background: svg-load('fixtures/basic.svg', fill=#fff);`,
            `background: url("data:image/svg+xml;charset=utf-8,<svg id='basic' fill='#fff'/>");`
        );
    });

    it('should compile unquoted path', () => {
        return compare(
            `
            background: svg-load(fixtures/basic.svg);
            background: svg-load(fixtures/basic.svg, fill=#fff);
            `,
            `
            background: url("data:image/svg+xml;charset=utf-8,<svg id='basic'/>");
            background: url("data:image/svg+xml;charset=utf-8,<svg id='basic' fill='#fff'/>");
            `
        );
    });

    it('should compile fill and stroke param', () => {
        return compare(
            `background: svg-load('fixtures/basic.svg', fill=#fff, stroke=#000);`,
            `background: url("data:image/svg+xml;charset=utf-8,<svg id='basic' fill='#fff' stroke='#000'/>");`
        );
    });

    it('should compile fill param with colon syntax', () => {
        return compare(
            `background: svg-load('fixtures/basic.svg', fill: #fff);`,
            `background: url("data:image/svg+xml;charset=utf-8,<svg id='basic' fill='#fff'/>");`
        );
    });

    it('should skip param with unexpected separator', () => {
        const fixtures = `
            background: svg-load('fixtures/basic.svg', fill: #fff, stroke=#000);
            background: svg-load('fixtures/basic.svg', fill=#fff, stroke: #000);
            background: svg-load('fixtures/basic.svg', fill #fff);
            background: svg-load('fixtures/basic.svg', fill-#fff);
        `;
        return compare(
            fixtures,
            fixtures,
            [
                'Expected ":" separator in "stroke=#000"',
                'Expected "=" separator in "stroke: #000"',
                'Expected ":" or "=" separator in "fill #fff"',
                'Expected ":" or "=" separator in "fill-#fff"'
            ]
        );
    });

    it('should override fill param', () => {
        return compare(
            `background: svg-load('fixtures/basic-black.svg', fill=#fff);`,
            `background: url("data:image/svg+xml;charset=utf-8,<svg id='basic-black' fill='#fff'/>");`
        );
    });
});