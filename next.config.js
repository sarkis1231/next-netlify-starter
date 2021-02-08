const {nextI18NextRewrites} = require('next-i18next/rewrites')
const withPlugins = require("next-compose-plugins");
const {withPlayback} = require("@moxy/next-common-files");
const withImages = require("next-images");
const withSvgr = require("next-svgr")


const localeSubPaths = {
    en: '/en',
    de: '/de'
}

module.exports = withPlugins([
    [withImages({})],
    withSvgr,
    withPlayback(),
    {
    rewrites: async () => nextI18NextRewrites(localeSubPaths),
    publicRuntimeConfig: {
        localeSubPaths,
    }
},])