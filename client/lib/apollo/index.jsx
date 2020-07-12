"use strict";
/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.lib.apollo
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var app_1 = __importDefault(require("next/app"));
var head_1 = __importDefault(require("next/head"));
var react_hooks_1 = require("@apollo/react-hooks");
var apolloClient_1 = __importDefault(require("./apolloClient"));
// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
var globalApolloClient = null;
/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */
exports.initOnContext = function (ctx) {
    var inAppContext = Boolean(ctx.ctx);
    // We consider installing `withApollo({ ssr: true })` on global App level
    // as antipattern since it disables project wide Automatic Static Optimization.
    if (process.env.NODE_ENV === "development") {
        if (inAppContext) {
            console.warn("Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n" +
                "Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n");
        }
    }
    // Initialize ApolloClient if not already done
    var apolloClient = ctx.apolloClient ||
        initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);
    // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
    // Otherwise, the component would have to call initApollo() again but this
    // time without the context. Once that happens, the following code will make sure we send
    // the prop as `null` to the browser.
    apolloClient.toJSON = function () { return null; };
    // Add apolloClient to NextPageContext & NextAppContext.
    // This allows us to consume the apolloClient inside our
    // custom `getInitialProps({ apolloClient })`.
    ctx.apolloClient = apolloClient;
    if (inAppContext) {
        ctx.ctx.apolloClient = apolloClient;
    }
    return ctx;
};
/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
var initApolloClient = function (initialState, ctx) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === "undefined") {
        return apolloClient_1.default(initialState, ctx);
    }
    // Reuse client on the client-side
    if (!globalApolloClient) {
        globalApolloClient = apolloClient_1.default(initialState, ctx);
    }
    return globalApolloClient;
};
/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */
exports.withApollo = function (_a) {
    var _b = (_a === void 0 ? {} : _a).ssr, ssr = _b === void 0 ? false : _b;
    return function (PageComponent) {
        var WithApollo = function (_a) {
            var apolloClient = _a.apolloClient, apolloState = _a.apolloState, pageProps = __rest(_a, ["apolloClient", "apolloState"]);
            var client;
            if (apolloClient) {
                // Happens on: getDataFromTree & next.js ssr
                client = apolloClient;
            }
            else {
                // Happens on: next.js csr
                client = initApolloClient(apolloState, undefined);
            }
            return (<react_hooks_1.ApolloProvider client={client}>
        <PageComponent {...pageProps}/>
      </react_hooks_1.ApolloProvider>);
        };
        // Set the correct displayName in development
        if (process.env.NODE_ENV !== "production") {
            var displayName = PageComponent.displayName || PageComponent.name || "Component";
            WithApollo.displayName = "withApollo(" + displayName + ")";
        }
        if (ssr || PageComponent.getInitialProps) {
            WithApollo.getInitialProps = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                var inAppContext, apolloClient, pageProps, AppTree, getDataFromTree, props, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            inAppContext = Boolean(ctx.ctx);
                            apolloClient = exports.initOnContext(ctx).apolloClient;
                            pageProps = {};
                            if (!PageComponent.getInitialProps) return [3 /*break*/, 2];
                            return [4 /*yield*/, PageComponent.getInitialProps(ctx)];
                        case 1:
                            pageProps = _a.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            if (!inAppContext) return [3 /*break*/, 4];
                            return [4 /*yield*/, app_1.default.getInitialProps(ctx)];
                        case 3:
                            pageProps = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!(typeof window === "undefined")) return [3 /*break*/, 10];
                            AppTree = ctx.AppTree;
                            // When redirecting, the response is finished.
                            // No point in continuing to render
                            if (ctx.res && ctx.res.finished) {
                                return [2 /*return*/, pageProps];
                            }
                            if (!(ssr && AppTree)) return [3 /*break*/, 10];
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 8, , 9]);
                            return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("@apollo/react-ssr")); })];
                        case 6:
                            getDataFromTree = (_a.sent()).getDataFromTree;
                            props = void 0;
                            if (inAppContext) {
                                props = __assign(__assign({}, pageProps), { apolloClient: apolloClient });
                            }
                            else {
                                props = { pageProps: __assign(__assign({}, pageProps), { apolloClient: apolloClient }) };
                            }
                            // Take the Next.js AppTree, determine which queries are needed to render,
                            // and fetch them. This method can be pretty slow since it renders
                            // your entire AppTree once for every query. Check out apollo fragments
                            // if you want to reduce the number of rerenders.
                            // https://www.apollographql.com/docs/react/data/fragments/
                            return [4 /*yield*/, getDataFromTree(<AppTree {...props}/>)];
                        case 7:
                            // Take the Next.js AppTree, determine which queries are needed to render,
                            // and fetch them. This method can be pretty slow since it renders
                            // your entire AppTree once for every query. Check out apollo fragments
                            // if you want to reduce the number of rerenders.
                            // https://www.apollographql.com/docs/react/data/fragments/
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            error_1 = _a.sent();
                            // Prevent Apollo Client GraphQL errors from crashing SSR.
                            // Handle them in components via the data.error prop:
                            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                            console.error("Error while running `getDataFromTree`", error_1);
                            return [3 /*break*/, 9];
                        case 9:
                            // getDataFromTree does not call componentWillUnmount
                            // head side effect therefore need to be cleared manually
                            head_1.default.rewind();
                            _a.label = 10;
                        case 10: return [2 /*return*/, __assign(__assign({}, pageProps), { 
                                // Extract query data from the Apollo store
                                apolloState: apolloClient.cache.extract(), 
                                // Provide the client for ssr. As soon as this payload
                                // gets JSON.stringified it will remove itself.
                                apolloClient: ctx.apolloClient })];
                    }
                });
            }); };
        }
        return WithApollo;
    };
};
