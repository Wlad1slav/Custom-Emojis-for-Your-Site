import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
    {
        input: "scripts/index.mjs",
        output: {
            name: "custom-emojis",
            file: pkg.browser,
            format: "umd",
        },
        plugins: [
            resolve(),
            commonjs(),
            babel({
                exclude: ["node_modules/**"],
            }),
        ],
    },
    {
        input: "scripts/index.mjs",
        output: [
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "es" },
        ],
        plugins: [
            babel({
                exclude: ["node_modules/**"],
            }),
        ],
    },
];