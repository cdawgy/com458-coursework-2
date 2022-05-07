import { addition } from "../../src/js/sellYourCar.js";

// Here is an example on how to create tests using Jest unit test framework
// To run the tests run 'npm install' to bring in the required dependencies
// Then to run the entire test suit use 'npm test'
test("One add two equals three", () => {
  expect(addition(1, 2)).toBe(3);
});
