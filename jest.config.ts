export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$":
            "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js"
    },
    moduleDirectories: ["node_modules", "src"],
};
