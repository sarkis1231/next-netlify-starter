const { nextI18NextRewrites } = require('next-i18next/rewrites')
const withPlugins = require("next-compose-plugins");


const localeSubPaths = {
    de:'de'
}

module.exports = withPlugins([{
    rewrites: async () => nextI18NextRewrites(localeSubPaths),
    publicRuntimeConfig: {
        localeSubPaths,
    }},])