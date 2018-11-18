module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
        // It's important that this goes last because it overrides other configs
        // to ensure eslint doesn't try to do what prettier does better.
        "prettier"
    ],
    "parser": "typescript-eslint-parser",
    "plugins": [
        "typescript",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": ["error", {"singleQuote": true, "semi": false}]
    }
};
