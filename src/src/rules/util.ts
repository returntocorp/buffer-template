import * as estree from "estree";

// Interprets `property` as a property name and returns the corresponding
// property name as a string. Supports `foo["bar"]`, `foo.bar`, and `const { bar
// } = foo` syntax.
export function getPropertyName(
  property: estree.Expression
): string | undefined {
  if (property.type === "Literal") {
    // like foo["bar"]
    return String(property.value);
  } else if (property.type === "Identifier") {
    // like foo.bar
    return property.name;
  } else {
    return undefined;
  }
}

// A map whose keys are ordered pairs (K1, K2) and whose values are V.
export class PairMap<K1, K2, V> {
  private map: Map<K1, Map<K2, V>>;

  constructor() {
    this.map = new Map();
  }

  get(k1: K1, k2: K2): V | undefined {
    const inner = this.map.get(k1);
    return inner ? inner.get(k2) : undefined;
  }

  set(k1: K1, k2: K2, value: V) {
    if (!this.map.has(k1)) {
      this.map.set(k1, new Map());
    }
    this.map.get(k1)!.set(k2, value);
  }
}
