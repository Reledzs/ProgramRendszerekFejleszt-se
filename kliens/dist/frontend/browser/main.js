import "./chunk-HKOVSLD4.js";
import {
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-VI7M7R5M.js";
import {
  provideHttpClient,
  provideZoneChangeDetection,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-7ZFWA6CN.js";

// src/app/app.routes.ts
var routes = [
  { path: "signup", loadComponent: () => import("./chunk-3HM4XJ5V.js").then((c) => c.SignupComponent) },
  { path: "login", loadComponent: () => import("./chunk-T7BOQ7AZ.js").then((c) => c.LoginComponent) },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login" }
];

// src/app/app.config.ts
var appConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient()]
};

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  title = "quiz";
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 13 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
