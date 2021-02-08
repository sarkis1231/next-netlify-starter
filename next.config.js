const withPlugins = require("next-compose-plugins");
const {withPlayback} = require("@moxy/next-common-files");
const withImages = require("next-images");
const withSvgr = require("next-svgr")

const nextConfig = {
    i18n: {
        locales: ['en', 'de'],
        defaultLocale: 'en',
    }
}

module.exports = withPlugins([
    [withImages({})],
    withSvgr,
    withPlayback(),
], nextConfig)