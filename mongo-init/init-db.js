db = db.getSiblingDB('mathwizard');

db.createCollection('topics');
db.createCollection('formulas');
db.createCollection('examples');

db.topics.insertMany([
  { domainName: "Calculus", topicName: "Differentiation", description: "First derivative f'(x)", inputType: "expression", supportedOperations: ["power_rule", "chain_rule", "product_rule"] },
  { domainName: "Calculus", topicName: "Indefinite Integration", description: "General antiderivative F(x) + C", inputType: "expression", supportedOperations: ["antiderivative"] },
  { domainName: "Linear Algebra", topicName: "Eigenvalues", description: "Solve det(A - λI) = 0", inputType: "matrix", supportedOperations: ["eig"] },
  { domainName: "Vector Mathematics", topicName: "Cross Product", description: "3D orthogonal vector", inputType: "vector", supportedOperations: ["cross"] }
]);

db.formulas.insertMany([
  { topicName: "Differentiation", formulaName: "Power Rule", expression: "d/dx(x^n) = n*x^(n-1)", explanation: "Derivative of polynomial term" },
  { topicName: "Integration", formulaName: "Power Rule for Integrals", expression: "∫ x^n dx = x^(n+1)/(n+1)", explanation: "Antiderivative of polynomial term" }
]);

db.examples.insertMany([
  { topicName: "Differentiation", title: "Polynomial Example", exampleInput: "x^2 + 5*x + 3", expectedOutput: "2*x + 5" },
  { topicName: "Eigenvalues", title: "2x2 Matrix Example", exampleInput: "[[1, 2], [3, 4]]", expectedOutput: "[-0.3723, 5.3723]" }
]);
