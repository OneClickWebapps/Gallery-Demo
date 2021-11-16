const withTM = require("next-transpile-modules")([
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/xr",
    "@webxr-input-profiles/motion-controllers"
], {debug: false});

module.exports = withTM();