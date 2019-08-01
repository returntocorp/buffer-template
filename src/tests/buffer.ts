import { rule } from "../src/rules/buffer";
import {
  loadAST,
  assertAccepts,
  assertRejects,
  assertReportsCheckIds
} from "./util";

describe("buffer safety check", () => {
  it("should report buffer_constructor_number for a Buffer(x) call where x is a number", () => {
    assertReportsCheckIds(loadAST("buffer-number.js.ast.json"), rule, [
      "buffer_constructor_number"
    ]);
  });
  it("should report buffer_constructor_not_number for a Buffer(x) call where x is an object", () => {
    assertReportsCheckIds(loadAST("buffer-object.js.ast.json"), rule, [
      "buffer_constructor_not_number"
    ]);
  });
  it("should report buffer_constructor_not_number for a Buffer(x) call where x is void", () => {
    assertReportsCheckIds(loadAST("buffer-void.js.ast.json"), rule, [
      "buffer_constructor_not_number"
    ]);
  });
  it("should report buffer_constructor_maybe_number for a Buffer(x) call where x is null", () => {
    assertReportsCheckIds(loadAST("buffer-null.js.ast.json"), rule, [
      "buffer_constructor_maybe_number"
    ]);
  });
  it("should report buffer_constructor_maybe_number for a Buffer(x) call where x could be a number or a string", () => {
    assertReportsCheckIds(loadAST("buffer-maybe.js.ast.json"), rule, [
      "buffer_constructor_maybe_number"
    ]);
  });
  it("should treat new Buffer(0) as safe", () => {
    assertAccepts(loadAST("buffer-literal-zero.js.ast.json"), rule);
  });
  it("should report buffer_constructor_literal_number for Buffer(100)", () => {
    assertReportsCheckIds(loadAST("buffer-literal-nonzero.js.ast.json"), rule, [
      "buffer_constructor_literal_number"
    ]);
  });
  it("should report buffer_safe_alloc for Buffer.alloc", () => {
    assertReportsCheckIds(loadAST("buffer-alloc.js.ast.json"), rule, [
      "buffer_safe_alloc"
    ]);
  });
  it("should report buffer_unsafe_alloc for Buffer.unsafeAlloc", () => {
    assertReportsCheckIds(loadAST("buffer-unsafe.js.ast.json"), rule, [
      "buffer_unsafe_alloc"
    ]);
  });
  it("should report buffer_unsafe_slow_alloc for Buffer.unsafeAllocSlow", () => {
    assertReportsCheckIds(loadAST("buffer-unsafe-slow.js.ast.json"), rule, [
      "buffer_unsafe_slow_alloc"
    ]);
  });
});
