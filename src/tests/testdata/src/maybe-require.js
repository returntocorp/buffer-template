const maybeRequire = Math.random() < 0.5 ? require : () => {};

function f(x) {
  maybeRequire(x);
}
