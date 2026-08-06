const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fixes "Component auth has not been registered yet" -- the Firebase JS SDK
// doesn't declare a react-native export condition, so Metro's default
// package-exports resolution (enabled by default since Expo SDK 52) loads
// the wrong build. Disabling it makes Metro fall back to the main/
// react-native fields instead, which resolves correctly.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
