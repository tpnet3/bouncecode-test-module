"use strict";
/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Test.views
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var TestView_1 = require("./TestView");
var addon_knobs_1 = require("@storybook/addon-knobs");
exports.default = {
    title: "Test/TestView",
    component: TestView_1.TestView,
    decoration: [addon_knobs_1.withKnobs],
};
exports.defaultView = function () {
    var data = addon_knobs_1.object("data", { test: "message" });
    return <TestView_1.TestView data={data}/>;
};
