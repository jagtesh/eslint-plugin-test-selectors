/**
 * @fileoverview Requires test attribute data-test-id on elements with onClick handlers.
 */
const rule = require('../../../lib/rules/onClick');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { onClick } = errors;

const onClickError = getError(onClick.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('onClick', rule, {
    valid: [
        { code: `<div onClick={ this.handleClick } data-test-id={ bar }>Foo</div>` },
        { code: `<div onClick={ this.handleClick } data-test-id="bar">Foo</div>` },
        { code: `<div onClick={ this.handleClick } data-test-id="bar" />` },
        { code: `<div onClick={ () => {} } data-test-id={ bar }>Foo</div>` },
        { code: `<div onClick={ () => {} } data-test-id="bar">Foo</div>` },
        { code: `<div onClick={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onClick={ () => {} } data-test-id={ bar }>Foo</Bar>` },
        { code: `<Bar onClick={ () => {} } data-test-id="bar">Foo</Bar>` },
        { code: `<Bar onClick={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onClick={ () => {} } disabled />` },
        { code: `<Bar onClick={ () => {} } readonly />` }
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<div onClick={ this.handleClick } />', errors: [onClickError] },
        { code: '<div onClick={ this.handleClick }>foo</div>', errors: [onClickError] },
        { code: '<Bar onClick={ this.handleClick } />', errors: [onClickError],
            output: '<Bar onClick={ this.handleClick } data-test-id="bar" />' },
        { code: '<Bar onClick={ this.handleClick }>foo</Bar>', errors: [onClickError],
            output: '<Bar onClick={ this.handleClick } data-test-id="bar">foo</Bar>' },
        { code: '<Bar onClick={ () => handleClick() }>foo</Bar>', errors: [onClickError],
            output: '<Bar onClick={ () => handleClick() } data-test-id="bar">foo</Bar>' },
        { code: '<Bar onClick={ () => handleClick() } disabled={ foo }>foo</Bar>', errors: [onClickError],
            output: '<Bar onClick={ () => handleClick() } disabled={ foo } data-test-id="bar">foo</Bar>' },
        { code: '<Bar onClick={ () => handleClick() } readonly={ foo }>foo</Bar>', errors: [onClickError],
            output: '<Bar onClick={ () => handleClick() } readonly={ foo } data-test-id="bar">foo</Bar>' }
    ].map(parserOptionsMapper)
});
