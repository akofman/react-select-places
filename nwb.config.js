module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'SelectPlaces',
      externals: {
        react: 'React',
        'react-select': 'umd react-select'
      }
    }
  }
}
