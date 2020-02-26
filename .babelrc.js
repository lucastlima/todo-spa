module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "10"
        }
      }
    ],
    "@babel/preset-react"
  ],
  env: {
    production: {
      plugins: [
        [
          "babel-plugin-remove-attribute",
          {
            attribute: "data-testid"
          }
        ]
      ]
    }
  },
  plugins: [
    "babel-plugin-styled-components",
    "@babel/plugin-proposal-object-rest-spread"
  ]
};
