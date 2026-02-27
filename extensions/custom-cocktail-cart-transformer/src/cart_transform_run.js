// @ts-check

/**
 * @typedef {import("../generated/api").CartTransformRunInput} CartTransformRunInput
 * @typedef {import("../generated/api").CartTransformRunResult} CartTransformRunResult
 */

export function cartTransformRun(input) {
  const operations = input.cart.lines
    .filter(line => line.attribute?.value)
    .map(line => {
      return {
        lineUpdate: {
          cartLineId: line.id,
          price: {
            adjustment: {
              fixedPricePerUnit: {
                amount: line.attribute.value
              }
            }
          }
        }
      };
    });

  return { operations };
}
