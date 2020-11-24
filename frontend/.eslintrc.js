const path = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "graphql"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "graphql/template-strings": [
      "error",
      {
        env: "apollo",

        // Import your schema JSON here
        // schemaJson: require("../backend/schema.json"),

        // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
        schemaJsonFilepath: path.resolve(__dirname, "../backend/schema.json"),

        // OR provide the schema in the Schema Language format
        // schemaString: printSchema(schema),

        // tagName is gql by default
      },
    ],
  },
};
