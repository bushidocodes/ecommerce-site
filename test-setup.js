process.env.SESSION_SECRET = 'test-session-secret'

const Enzyme = require('enzyme')
const Adapter = require('@cfaester/enzyme-adapter-react-18').default

Enzyme.configure({ adapter: new Adapter() })

// Minimal browser globals for component tests running in Node
if (typeof window === 'undefined') {
  global.window = { location: { pathname: '/' } }
}
if (typeof localStorage === 'undefined') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  }
}
