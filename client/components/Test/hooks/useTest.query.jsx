"use strict";
/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Test.hooks
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_hooks_1 = require("@apollo/react-hooks");
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var TEST_QUERY = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query($message: String!) {\n    test(message: $message) {\n      message\n    }\n  }\n"], ["\n  query($message: String!) {\n    test(message: $message) {\n      message\n    }\n  }\n"])));
exports.useTestQuery = function () {
    return react_hooks_1.useQuery(TEST_QUERY, {
        variables: { message: "test" },
    });
};
var templateObject_1;
