"use strict";
/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module pages
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var head_1 = __importDefault(require("next/head"));
var notistack_1 = require("notistack");
var styles_1 = require("@material-ui/core/styles");
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var theme_1 = __importDefault(require("../client/lib/theme"));
var apollo_1 = require("../client/lib/apollo");
function MyApp(props) {
    var Component = props.Component, pageProps = props.pageProps;
    var Layout = Component.Layout || (function (_a) {
        var children = _a.children;
        return <>{children}</>;
    });
    react_1.default.useEffect(function () {
        // Remove the server-side injected CSS.
        var jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (<react_1.default.Fragment>
      <head_1.default>
        <title>BounceCode CMS</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </head_1.default>
      <styles_1.ThemeProvider theme={theme_1.default}>
        <CssBaseline_1.default />
        <notistack_1.SnackbarProvider>
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </notistack_1.SnackbarProvider>
      </styles_1.ThemeProvider>
    </react_1.default.Fragment>);
}
exports.default = apollo_1.withApollo({ ssr: true })(MyApp);
