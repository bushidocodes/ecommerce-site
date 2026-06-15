// .js is omitted: Node 24's require(esm) loads ESM .js files natively.
// Hooking .js via babel-register leaves import.meta references in the CJS
// output, which corrupts the ESM module cache and breaks native import().
require('@babel/register')({
  extensions: ['.jsx', '.ts', '.tsx'],
});
