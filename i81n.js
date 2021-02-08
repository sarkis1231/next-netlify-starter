const NextI18Next = require('next-i18next').default
const {localeSubPaths} = require('next/config').default().publicRuntimeConfig
const path = require('path')
console.log(localeSubPaths)

module.exports = new NextI18Next({
    otherLanguages: ['de'],
    localeSubPaths,
    localeExtension: 'json',
    serverLanguageDetection: true,
    shallowRender: true,
    localePath: path.resolve('./public/static/locales')
})