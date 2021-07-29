import isEmpty from './isEmpty.mjs'
export default (url) => {
   return isEmpty(url.match(/\/c/g))
}
