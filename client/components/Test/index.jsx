"use strict";
/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Test
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var useTest_query_1 = require("./hooks/useTest.query");
var TestView_1 = require("./views/TestView");
exports.Test = function () {
    var _a = useTest_query_1.useTestQuery(), loading = _a.loading, error = _a.error, data = _a.data;
    return <TestView_1.TestView data={data}/>;
};
