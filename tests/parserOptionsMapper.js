const defaultParserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  }
};

module.exports = function({
  code,
  errors,
  output,
  options = [],
  parserOptions = {},
}) {
  return {
    code,
    errors,
    output: output || null,
    options,
    parserOptions: {
      ...defaultParserOptions,
      ...parserOptions,
    }
  };
}
