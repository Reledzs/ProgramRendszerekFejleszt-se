import {
  AuthService,
  CommonModule,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgIf,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-7ZFWA6CN.js";

// src/app/signup/signup.component.ts
var _c0 = (a0) => ({ "invalid-input": a0 });
function SignupComponent_div_3_p_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Email is required.");
    \u0275\u0275elementEnd();
  }
}
function SignupComponent_div_3_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Email is invalid.");
    \u0275\u0275elementEnd();
  }
}
function SignupComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, SignupComponent_div_3_p_1_Template, 2, 0, "p", 3)(2, SignupComponent_div_3_p_2_Template, 2, 0, "p", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_1_0 = ctx_r0.signupForm.get("email")) == null ? null : tmp_1_0.errors) && ((tmp_1_0 = ctx_r0.signupForm.get("email")) == null ? null : tmp_1_0.errors["required"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r0.signupForm.get("email")) == null ? null : tmp_2_0.errors) && ((tmp_2_0 = ctx_r0.signupForm.get("email")) == null ? null : tmp_2_0.errors["email"]));
  }
}
function SignupComponent_div_8_p_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function SignupComponent_div_8_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Must be at least 6 characters.");
    \u0275\u0275elementEnd();
  }
}
function SignupComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, SignupComponent_div_8_p_1_Template, 2, 0, "p", 3)(2, SignupComponent_div_8_p_2_Template, 2, 0, "p", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_1_0 = ctx_r0.signupForm.get("password")) == null ? null : tmp_1_0.errors) && ((tmp_1_0 = ctx_r0.signupForm.get("password")) == null ? null : tmp_1_0.errors["required"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r0.signupForm.get("password")) == null ? null : tmp_2_0.errors) && ((tmp_2_0 = ctx_r0.signupForm.get("password")) == null ? null : tmp_2_0.errors["minlength"]));
  }
}
function SignupComponent_div_10_p_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function SignupComponent_div_10_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Passwords doesnt match");
    \u0275\u0275elementEnd();
  }
}
function SignupComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, SignupComponent_div_10_p_1_Template, 2, 0, "p", 3)(2, SignupComponent_div_10_p_2_Template, 2, 0, "p", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_1_0 = ctx_r0.signupForm.get("confirmPassword")) == null ? null : tmp_1_0.errors) && ((tmp_1_0 = ctx_r0.signupForm.get("confirmPassword")) == null ? null : tmp_1_0.errors["required"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r0.signupForm.get("confirmPassword")) == null ? null : tmp_2_0.errors) && ((tmp_2_0 = ctx_r0.signupForm.get("confirmPassword")) == null ? null : tmp_2_0.errors["mustMatch"]));
  }
}
var SignupComponent = class _SignupComponent {
  formBuilder;
  location;
  authService;
  signupForm;
  constructor(formBuilder, location, authService) {
    this.formBuilder = formBuilder;
    this.location = location;
    this.authService = authService;
  }
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: [""],
      address: [""],
      nickname: [""],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, {
      validator: this.mustMatch("password", "confirmPassword")
    });
  }
  mustMatch(controlName, matchingControlName) {
    return (formGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && matchingControl.errors["mustMatch"]) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  onSubmit() {
    if (this.signupForm.valid) {
      console.log("Form data:", this.signupForm.value);
      this.authService.register(this.signupForm.value);
    } else {
      console.log("Form not valid!");
    }
  }
  static \u0275fac = function SignupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SignupComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Location), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SignupComponent, selectors: [["app-signup"]], decls: 14, vars: 7, consts: [[1, "login-container"], [1, "login-form", 3, "ngSubmit", "formGroup"], ["formControlName", "email", "type", "email", "placeholder", "Email", "required", "", 3, "ngClass"], [4, "ngIf"], ["formControlName", "name", "type", "text", "placeholder", "Name", "required", ""], ["formControlName", "address", "type", "text", "placeholder", "Address", "required", ""], ["formControlName", "nickname", "type", "text", "placeholder", "Nickname", "required", ""], ["formControlName", "password", "type", "password", "placeholder", "Password", "required", ""], ["formControlName", "confirmPassword", "type", "password", "placeholder", "Confirm Password", "required", ""], [1, "buttons"], ["type", "submit"]], template: function SignupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "form", 1);
      \u0275\u0275listener("ngSubmit", function SignupComponent_Template_form_ngSubmit_1_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275element(2, "input", 2);
      \u0275\u0275template(3, SignupComponent_div_3_Template, 3, 2, "div", 3);
      \u0275\u0275element(4, "input", 4)(5, "input", 5)(6, "input", 6)(7, "input", 7);
      \u0275\u0275template(8, SignupComponent_div_8_Template, 3, 2, "div", 3);
      \u0275\u0275element(9, "input", 8);
      \u0275\u0275template(10, SignupComponent_div_10_Template, 3, 2, "div", 3);
      \u0275\u0275elementStart(11, "div", 9)(12, "button", 10);
      \u0275\u0275text(13, "Sign up");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.signupForm);
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(5, _c0, (tmp_1_0 = ctx.signupForm.get("email")) == null ? null : tmp_1_0.errors));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.signupForm.get("email")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.signupForm.get("email")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.signupForm.get("password")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.signupForm.get("password")) == null ? null : tmp_3_0.dirty) || ((tmp_3_0 = ctx.signupForm.get("password")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.signupForm.get("confirmPassword")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.signupForm.get("confirmPassword")) == null ? null : tmp_4_0.dirty) || ((tmp_4_0 = ctx.signupForm.get("confirmPassword")) == null ? null : tmp_4_0.touched));
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName, CommonModule, NgClass, NgIf], styles: ["\n\n.login-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 80%;\n  max-width: 400px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 20px;\n  gap: 10px;\n}\n.login-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 10px;\n  border: 1px solid #ddd;\n  border-radius: 5px;\n}\n.login-form[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  border: none;\n  border-radius: 5px;\n}\n.login-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: none;\n  background-color: cornflowerblue;\n  width: 100%;\n  border-radius: 5px;\n  padding: 10px;\n}\n.login-form[_ngcontent-%COMP%]   button[type=button][_ngcontent-%COMP%] {\n  background-color: rgb(100, 237, 205);\n}\n.login-form[_ngcontent-%COMP%]   button[type=button][_ngcontent-%COMP%]:hover {\n  background-color: rgb(64, 150, 130);\n}\n.login-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background-color: cornflowerblue;\n}\n.login-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: rgb(74, 110, 176);\n}\n.invalid-input[_ngcontent-%COMP%] {\n  border-color: red;\n  border-width: 3px;\n  background-color: #ffdddd;\n}\n/*# sourceMappingURL=signup.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SignupComponent, { className: "SignupComponent", filePath: "src/app/signup/signup.component.ts", lineNumber: 14 });
})();

export {
  SignupComponent
};
//# sourceMappingURL=chunk-HKOVSLD4.js.map
