export const colors = {
  cyan: '#0ff',
  blue: '#08f',
  violet: '#80f',
  magenta: '#f0f',
  pink: '#f08',
  orange: '#f80',
  yellow: '#ff0',
  lime: '#8f0',
  teal: '#0f8',

  lightGray: '#ccc'
}

const cx = key => colors[key] || key
export const gradient = (n, from, to) => `linear-gradient(${n}deg, ${cx(from)}, ${cx(to)})`

export default {
  colors,
  gradient
}