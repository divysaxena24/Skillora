// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Resolves lucide-react-native internal module resolution Error (DependencyGraph.js 267:17) 
// by explicitly disabling strict package 'exports' map logic inside Metro.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
