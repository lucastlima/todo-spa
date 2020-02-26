const env = process.env.NODE_ENV;
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10'
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins:
    env === 'production'
      ? [
          'babel-plugin-styled-components',
          '@babel/plugin-proposal-object-rest-spread',
          [
            'babel-plugin-remove-attribute',
            {
              attribute: 'data-testid'
            }
          ]
        ]
      : [
          'babel-plugin-styled-components',
          '@babel/plugin-proposal-object-rest-spread'
        ]
};
