(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CarvIdSDK = {}));
})(this, (function (exports) { 'use strict';

  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t3, e4, o4) {
      if (this._$cssResult$ = true, o4 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = e4;
    }
    get styleSheet() {
      let t3 = this.o;
      const s2 = this.t;
      if (e && void 0 === t3) {
        const e4 = void 0 !== s2 && 1 === s2.length;
        e4 && (t3 = o.get(s2)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && o.set(s2, t3));
      }
      return t3;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
  var i = (t3, ...e4) => {
    const o4 = 1 === t3.length ? t3[0] : e4.reduce((e5, s2, o5) => e5 + ((t4) => {
      if (true === t4._$cssResult$) return t4.cssText;
      if ("number" == typeof t4) return t4;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s2) + t3[o5 + 1], t3[0]);
    return new n(o4, t3, s);
  };
  var S = (s2, o4) => {
    if (e) s2.adoptedStyleSheets = o4.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
    else for (const e4 of o4) {
      const o5 = document.createElement("style"), n5 = t.litNonce;
      void 0 !== n5 && o5.setAttribute("nonce", n5), o5.textContent = e4.cssText, s2.appendChild(o5);
    }
  };
  var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e4 = "";
    for (const s2 of t4.cssRules) e4 += s2.cssText;
    return r(e4);
  })(t3) : t3;

  // ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t3, s2) => t3;
  var u = { toAttribute(t3, s2) {
    switch (s2) {
      case Boolean:
        t3 = t3 ? l : null;
        break;
      case Object:
      case Array:
        t3 = null == t3 ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, s2) {
    let i3 = t3;
    switch (s2) {
      case Boolean:
        i3 = null !== t3;
        break;
      case Number:
        i3 = null === t3 ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          i3 = JSON.parse(t3);
        } catch (t4) {
          i3 = null;
        }
    }
    return i3;
  } };
  var f = (t3, s2) => !i2(t3, s2);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t3) {
      this._$Ei(), (this.l ??= []).push(t3);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t3, s2 = y) {
      if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t3, s2), !s2.noAccessor) {
        const i3 = Symbol(), r4 = this.getPropertyDescriptor(t3, i3, s2);
        void 0 !== r4 && e2(this.prototype, t3, r4);
      }
    }
    static getPropertyDescriptor(t3, s2, i3) {
      const { get: e4, set: h4 } = r2(this.prototype, t3) ?? { get() {
        return this[s2];
      }, set(t4) {
        this[s2] = t4;
      } };
      return { get() {
        return e4 == null ? void 0 : e4.call(this);
      }, set(s3) {
        const r4 = e4 == null ? void 0 : e4.call(this);
        h4.call(this, s3), this.requestUpdate(t3, r4, i3);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t3 = n2(this);
      t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t4 = this.properties, s2 = [...h(t4), ...o2(t4)];
        for (const i3 of s2) this.createProperty(i3, t4[i3]);
      }
      const t3 = this[Symbol.metadata];
      if (null !== t3) {
        const s2 = litPropertyMetadata.get(t3);
        if (void 0 !== s2) for (const [t4, i3] of s2) this.elementProperties.set(t4, i3);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t4, s2] of this.elementProperties) {
        const i3 = this._$Eu(t4, s2);
        void 0 !== i3 && this._$Eh.set(i3, t4);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s2) {
      const i3 = [];
      if (Array.isArray(s2)) {
        const e4 = new Set(s2.flat(1 / 0).reverse());
        for (const s3 of e4) i3.unshift(c(s3));
      } else void 0 !== s2 && i3.push(c(s2));
      return i3;
    }
    static _$Eu(t3, s2) {
      const i3 = s2.attribute;
      return false === i3 ? void 0 : "string" == typeof i3 ? i3 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      var _a2;
      this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t3) => t3(this));
    }
    addController(t3) {
      var _a2;
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t3.hostConnected) == null ? void 0 : _a2.call(t3));
    }
    removeController(t3) {
      var _a2;
      (_a2 = this._$EO) == null ? void 0 : _a2.delete(t3);
    }
    _$E_() {
      const t3 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
      for (const i3 of s2.keys()) this.hasOwnProperty(i3) && (t3.set(i3, this[i3]), delete this[i3]);
      t3.size > 0 && (this._$Ep = t3);
    }
    createRenderRoot() {
      const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t3, this.constructor.elementStyles), t3;
    }
    connectedCallback() {
      var _a2;
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostConnected) == null ? void 0 : _a3.call(t3);
      });
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostDisconnected) == null ? void 0 : _a3.call(t3);
      });
    }
    attributeChangedCallback(t3, s2, i3) {
      this._$AK(t3, i3);
    }
    _$EC(t3, s2) {
      var _a2;
      const i3 = this.constructor.elementProperties.get(t3), e4 = this.constructor._$Eu(t3, i3);
      if (void 0 !== e4 && true === i3.reflect) {
        const r4 = (void 0 !== ((_a2 = i3.converter) == null ? void 0 : _a2.toAttribute) ? i3.converter : u).toAttribute(s2, i3.type);
        this._$Em = t3, null == r4 ? this.removeAttribute(e4) : this.setAttribute(e4, r4), this._$Em = null;
      }
    }
    _$AK(t3, s2) {
      var _a2;
      const i3 = this.constructor, e4 = i3._$Eh.get(t3);
      if (void 0 !== e4 && this._$Em !== e4) {
        const t4 = i3.getPropertyOptions(e4), r4 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== ((_a2 = t4.converter) == null ? void 0 : _a2.fromAttribute) ? t4.converter : u;
        this._$Em = e4, this[e4] = r4.fromAttribute(s2, t4.type), this._$Em = null;
      }
    }
    requestUpdate(t3, s2, i3) {
      if (void 0 !== t3) {
        if (i3 ??= this.constructor.getPropertyOptions(t3), !(i3.hasChanged ?? f)(this[t3], s2)) return;
        this.P(t3, s2, i3);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t3, s2, i3) {
      this._$AL.has(t3) || this._$AL.set(t3, s2), true === i3.reflect && this._$Em !== t3 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t3);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.scheduleUpdate();
      return null != t3 && await t3, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var _a2;
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t5, s3] of this._$Ep) this[t5] = s3;
          this._$Ep = void 0;
        }
        const t4 = this.constructor.elementProperties;
        if (t4.size > 0) for (const [s3, i3] of t4) true !== i3.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i3);
      }
      let t3 = false;
      const s2 = this._$AL;
      try {
        t3 = this.shouldUpdate(s2), t3 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t4) => {
          var _a3;
          return (_a3 = t4.hostUpdate) == null ? void 0 : _a3.call(t4);
        }), this.update(s2)) : this._$EU();
      } catch (s3) {
        throw t3 = false, this._$EU(), s3;
      }
      t3 && this._$AE(s2);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      var _a2;
      (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t4) => {
        var _a3;
        return (_a3 = t4.hostUpdated) == null ? void 0 : _a3.call(t4);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      this._$Ej &&= this._$Ej.forEach((t4) => this._$EC(t4, this[t4])), this._$EU();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

  // ../../node_modules/.pnpm/lit-html@3.2.0/node_modules/lit-html/lit-html.js
  var n3 = globalThis;
  var c3 = n3.trustedTypes;
  var h2 = c3 ? c3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var f2 = "$lit$";
  var v = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var m = "?" + v;
  var _ = `<${m}>`;
  var w = document;
  var lt = () => w.createComment("");
  var st = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
  var g = Array.isArray;
  var $ = (t3) => g(t3) || "function" == typeof (t3 == null ? void 0 : t3[Symbol.iterator]);
  var x = "[ 	\n\f\r]";
  var T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var E = /-->/g;
  var k = />/g;
  var O = RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var S2 = /'/g;
  var j = /"/g;
  var M = /^(?:script|style|textarea|title)$/i;
  var P = (t3) => (i3, ...s2) => ({ _$litType$: t3, strings: i3, values: s2 });
  var ke = P(1);
  var R = Symbol.for("lit-noChange");
  var D = Symbol.for("lit-nothing");
  var V = /* @__PURE__ */ new WeakMap();
  var I = w.createTreeWalker(w, 129);
  function N(t3, i3) {
    if (!g(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== h2 ? h2.createHTML(i3) : i3;
  }
  var U = (t3, i3) => {
    const s2 = t3.length - 1, e4 = [];
    let h4, o4 = 2 === i3 ? "<svg>" : 3 === i3 ? "<math>" : "", n5 = T;
    for (let i4 = 0; i4 < s2; i4++) {
      const s3 = t3[i4];
      let r4, l2, c4 = -1, a2 = 0;
      for (; a2 < s3.length && (n5.lastIndex = a2, l2 = n5.exec(s3), null !== l2); ) a2 = n5.lastIndex, n5 === T ? "!--" === l2[1] ? n5 = E : void 0 !== l2[1] ? n5 = k : void 0 !== l2[2] ? (M.test(l2[2]) && (h4 = RegExp("</" + l2[2], "g")), n5 = O) : void 0 !== l2[3] && (n5 = O) : n5 === O ? ">" === l2[0] ? (n5 = h4 ?? T, c4 = -1) : void 0 === l2[1] ? c4 = -2 : (c4 = n5.lastIndex - l2[2].length, r4 = l2[1], n5 = void 0 === l2[3] ? O : '"' === l2[3] ? j : S2) : n5 === j || n5 === S2 ? n5 = O : n5 === E || n5 === k ? n5 = T : (n5 = O, h4 = void 0);
      const u2 = n5 === O && t3[i4 + 1].startsWith("/>") ? " " : "";
      o4 += n5 === T ? s3 + _ : c4 >= 0 ? (e4.push(r4), s3.slice(0, c4) + f2 + s3.slice(c4) + v + u2) : s3 + v + (-2 === c4 ? i4 : u2);
    }
    return [N(t3, o4 + (t3[s2] || "<?>") + (2 === i3 ? "</svg>" : 3 === i3 ? "</math>" : "")), e4];
  };
  var B = class _B {
    constructor({ strings: t3, _$litType$: i3 }, s2) {
      let e4;
      this.parts = [];
      let h4 = 0, o4 = 0;
      const n5 = t3.length - 1, r4 = this.parts, [l2, a2] = U(t3, i3);
      if (this.el = _B.createElement(l2, s2), I.currentNode = this.el.content, 2 === i3 || 3 === i3) {
        const t4 = this.el.content.firstChild;
        t4.replaceWith(...t4.childNodes);
      }
      for (; null !== (e4 = I.nextNode()) && r4.length < n5; ) {
        if (1 === e4.nodeType) {
          if (e4.hasAttributes()) for (const t4 of e4.getAttributeNames()) if (t4.endsWith(f2)) {
            const i4 = a2[o4++], s3 = e4.getAttribute(t4).split(v), n6 = /([.?@])?(.*)/.exec(i4);
            r4.push({ type: 1, index: h4, name: n6[2], strings: s3, ctor: "." === n6[1] ? Y : "?" === n6[1] ? Z : "@" === n6[1] ? q : G }), e4.removeAttribute(t4);
          } else t4.startsWith(v) && (r4.push({ type: 6, index: h4 }), e4.removeAttribute(t4));
          if (M.test(e4.tagName)) {
            const t4 = e4.textContent.split(v), i4 = t4.length - 1;
            if (i4 > 0) {
              e4.textContent = c3 ? c3.emptyScript : "";
              for (let s3 = 0; s3 < i4; s3++) e4.append(t4[s3], lt()), I.nextNode(), r4.push({ type: 2, index: ++h4 });
              e4.append(t4[i4], lt());
            }
          }
        } else if (8 === e4.nodeType) if (e4.data === m) r4.push({ type: 2, index: h4 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = e4.data.indexOf(v, t4 + 1)); ) r4.push({ type: 7, index: h4 }), t4 += v.length - 1;
        }
        h4++;
      }
    }
    static createElement(t3, i3) {
      const s2 = w.createElement("template");
      return s2.innerHTML = t3, s2;
    }
  };
  function z(t3, i3, s2 = t3, e4) {
    var _a2, _b;
    if (i3 === R) return i3;
    let h4 = void 0 !== e4 ? (_a2 = s2.o) == null ? void 0 : _a2[e4] : s2.l;
    const o4 = st(i3) ? void 0 : i3._$litDirective$;
    return (h4 == null ? void 0 : h4.constructor) !== o4 && ((_b = h4 == null ? void 0 : h4._$AO) == null ? void 0 : _b.call(h4, false), void 0 === o4 ? h4 = void 0 : (h4 = new o4(t3), h4._$AT(t3, s2, e4)), void 0 !== e4 ? (s2.o ??= [])[e4] = h4 : s2.l = h4), void 0 !== h4 && (i3 = z(t3, h4._$AS(t3, i3.values), h4, e4)), i3;
  }
  var F = class {
    constructor(t3, i3) {
      this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t3) {
      const { el: { content: i3 }, parts: s2 } = this._$AD, e4 = ((t3 == null ? void 0 : t3.creationScope) ?? w).importNode(i3, true);
      I.currentNode = e4;
      let h4 = I.nextNode(), o4 = 0, n5 = 0, r4 = s2[0];
      for (; void 0 !== r4; ) {
        if (o4 === r4.index) {
          let i4;
          2 === r4.type ? i4 = new et(h4, h4.nextSibling, this, t3) : 1 === r4.type ? i4 = new r4.ctor(h4, r4.name, r4.strings, this, t3) : 6 === r4.type && (i4 = new K(h4, this, t3)), this._$AV.push(i4), r4 = s2[++n5];
        }
        o4 !== (r4 == null ? void 0 : r4.index) && (h4 = I.nextNode(), o4++);
      }
      return I.currentNode = w, e4;
    }
    p(t3) {
      let i3 = 0;
      for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t3, s2, i3), i3 += s2.strings.length - 2) : s2._$AI(t3[i3])), i3++;
    }
  };
  var et = class _et {
    get _$AU() {
      var _a2;
      return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this.v;
    }
    constructor(t3, i3, s2, e4) {
      this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s2, this.options = e4, this.v = (e4 == null ? void 0 : e4.isConnected) ?? true;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i3 = this._$AM;
      return void 0 !== i3 && 11 === (t3 == null ? void 0 : t3.nodeType) && (t3 = i3.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i3 = this) {
      t3 = z(this, t3, i3), st(t3) ? t3 === D || null == t3 || "" === t3 ? (this._$AH !== D && this._$AR(), this._$AH = D) : t3 !== this._$AH && t3 !== R && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : $(t3) ? this.k(t3) : this._(t3);
    }
    O(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    T(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
    }
    _(t3) {
      this._$AH !== D && st(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(w.createTextNode(t3)), this._$AH = t3;
    }
    $(t3) {
      var _a2;
      const { values: i3, _$litType$: s2 } = t3, e4 = "number" == typeof s2 ? this._$AC(t3) : (void 0 === s2.el && (s2.el = B.createElement(N(s2.h, s2.h[0]), this.options)), s2);
      if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e4) this._$AH.p(i3);
      else {
        const t4 = new F(e4, this), s3 = t4.u(this.options);
        t4.p(i3), this.T(s3), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i3 = V.get(t3.strings);
      return void 0 === i3 && V.set(t3.strings, i3 = new B(t3)), i3;
    }
    k(t3) {
      g(this._$AH) || (this._$AH = [], this._$AR());
      const i3 = this._$AH;
      let s2, e4 = 0;
      for (const h4 of t3) e4 === i3.length ? i3.push(s2 = new _et(this.O(lt()), this.O(lt()), this, this.options)) : s2 = i3[e4], s2._$AI(h4), e4++;
      e4 < i3.length && (this._$AR(s2 && s2._$AB.nextSibling, e4), i3.length = e4);
    }
    _$AR(t3 = this._$AA.nextSibling, i3) {
      var _a2;
      for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
        const i4 = t3.nextSibling;
        t3.remove(), t3 = i4;
      }
    }
    setConnected(t3) {
      var _a2;
      void 0 === this._$AM && (this.v = t3, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t3));
    }
  };
  var G = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t3, i3, s2, e4, h4) {
      this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = h4, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = D;
    }
    _$AI(t3, i3 = this, s2, e4) {
      const h4 = this.strings;
      let o4 = false;
      if (void 0 === h4) t3 = z(this, t3, i3, 0), o4 = !st(t3) || t3 !== this._$AH && t3 !== R, o4 && (this._$AH = t3);
      else {
        const e5 = t3;
        let n5, r4;
        for (t3 = h4[0], n5 = 0; n5 < h4.length - 1; n5++) r4 = z(this, e5[s2 + n5], i3, n5), r4 === R && (r4 = this._$AH[n5]), o4 ||= !st(r4) || r4 !== this._$AH[n5], r4 === D ? t3 = D : t3 !== D && (t3 += (r4 ?? "") + h4[n5 + 1]), this._$AH[n5] = r4;
      }
      o4 && !e4 && this.j(t3);
    }
    j(t3) {
      t3 === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
    }
  };
  var Y = class extends G {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === D ? void 0 : t3;
    }
  };
  var Z = class extends G {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      this.element.toggleAttribute(this.name, !!t3 && t3 !== D);
    }
  };
  var q = class extends G {
    constructor(t3, i3, s2, e4, h4) {
      super(t3, i3, s2, e4, h4), this.type = 5;
    }
    _$AI(t3, i3 = this) {
      if ((t3 = z(this, t3, i3, 0) ?? D) === R) return;
      const s2 = this._$AH, e4 = t3 === D && s2 !== D || t3.capture !== s2.capture || t3.once !== s2.once || t3.passive !== s2.passive, h4 = t3 !== D && (s2 === D || e4);
      e4 && this.element.removeEventListener(this.name, this, s2), h4 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      var _a2;
      "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var K = class {
    constructor(t3, i3, s2) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s2;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      z(this, t3);
    }
  };
  var Re = n3.litHtmlPolyfillSupport;
  Re == null ? void 0 : Re(B, et), (n3.litHtmlVersions ??= []).push("3.2.0");
  var Q = (t3, i3, s2) => {
    const e4 = (s2 == null ? void 0 : s2.renderBefore) ?? i3;
    let h4 = e4._$litPart$;
    if (void 0 === h4) {
      const t4 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
      e4._$litPart$ = h4 = new et(i3.insertBefore(lt(), t4), t4, void 0, s2 ?? {});
    }
    return h4._$AI(t3), h4;
  };

  // ../../node_modules/.pnpm/lit-element@4.1.0/node_modules/lit-element/lit-element.js
  var h3 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
    }
    createRenderRoot() {
      const t3 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t3.firstChild, t3;
    }
    update(t3) {
      const e4 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this.o = Q(e4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var _a2;
      super.connectedCallback(), (_a2 = this.o) == null ? void 0 : _a2.setConnected(true);
    }
    disconnectedCallback() {
      var _a2;
      super.disconnectedCallback(), (_a2 = this.o) == null ? void 0 : _a2.setConnected(false);
    }
    render() {
      return R;
    }
  };
  var _a;
  h3._$litElement$ = true, h3["finalized"] = true, (_a = globalThis.litElementHydrateSupport) == null ? void 0 : _a.call(globalThis, { LitElement: h3 });
  var f3 = globalThis.litElementPolyfillSupport;
  f3 == null ? void 0 : f3({ LitElement: h3 });
  (globalThis.litElementVersions ??= []).push("4.1.0");

  // ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/custom-element.js
  var t2 = (t3) => (e4, o4) => {
    void 0 !== o4 ? o4.addInitializer(() => {
      customElements.define(t3, e4);
    }) : customElements.define(t3, e4);
  };

  // ../../node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/decorators/property.js
  var o3 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r3 = (t3 = o3, e4, r4) => {
    const { kind: n5, metadata: i3 } = r4;
    let s2 = globalThis.litPropertyMetadata.get(i3);
    if (void 0 === s2 && globalThis.litPropertyMetadata.set(i3, s2 = /* @__PURE__ */ new Map()), s2.set(r4.name, t3), "accessor" === n5) {
      const { name: o4 } = r4;
      return { set(r5) {
        const n6 = e4.get.call(this);
        e4.set.call(this, r5), this.requestUpdate(o4, n6, t3);
      }, init(e5) {
        return void 0 !== e5 && this.P(o4, void 0, t3), e5;
      } };
    }
    if ("setter" === n5) {
      const { name: o4 } = r4;
      return function(r5) {
        const n6 = this[o4];
        e4.call(this, r5), this.requestUpdate(o4, n6, t3);
      };
    }
    throw Error("Unsupported decorator location: " + n5);
  };
  function n4(t3) {
    return (e4, o4) => "object" == typeof o4 ? r3(t3, e4, o4) : ((t4, e5, o5) => {
      const r4 = e5.hasOwnProperty(o5);
      return e5.constructor.createProperty(o5, r4 ? { ...t4, wrapped: true } : t4), r4 ? Object.getOwnPropertyDescriptor(e5, o5) : void 0;
    })(t3, e4, o4);
  }

  // src/config/file.ts
  var IconCARVID = "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='64'%20height='64'%20rx='32'%20fill='%23713FFE'/%3e%3crect%20x='1'%20y='1'%20width='62'%20height='62'%20rx='31'%20stroke='black'%20stroke-opacity='0.1'%20stroke-width='2'/%3e%3cpath%20d='M38.9118%2042.0725L49%2032.0743L38.9626%2021.9833L29.0324%2012L19.0158%2022.0701L28.9461%2032.0534L19%2042.0526L28.8945%2052L38.9118%2042.0725Z'%20fill='white'/%3e%3c/svg%3e";

  // src/config/url.ts
  var MapUrl = {
    ["dev" /* DEV */]: {
      CARV_ID_HOST: "https://carv-id-dev.carv.io",
      TELEGRAM_BOT_URL: "https://t.me/carv_identity_dev_bot",
      TELEGRAM_APP_URL: "https://t.me/carv_identity_dev_bot/carv_id"
    },
    ["prod" /* PROD */]: {
      CARV_ID_HOST: "https://carv-id.carv.io",
      TELEGRAM_BOT_URL: "https://t.me/carv_identity_bot",
      TELEGRAM_APP_URL: "https://t.me/carv_identity_bot/carv_id"
    }
  };

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_freeGlobal.js
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_root.js
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getRawTag.js
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e4) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getRawTag_default = getRawTag;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_objectToString.js
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseGetTag.js
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
  }
  var baseGetTag_default = baseGetTag;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isSymbol.js
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
  }
  var isSymbol_default = isSymbol;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_trimmedEndIndex.js
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  var trimmedEndIndex_default = trimmedEndIndex;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseTrim.js
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
  }
  var baseTrim_default = baseTrim;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isObject.js
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_default = isObject;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/toNumber.js
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol_default(value)) {
      return NAN;
    }
    if (isObject_default(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject_default(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim_default(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  var toNumber_default = toNumber;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/now.js
  var now = function() {
    return root_default.Date.now();
  };
  var now_default = now;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/debounce.js
  var FUNC_ERROR_TEXT = "Expected a function";
  var nativeMax = Math.max;
  var nativeMin = Math.min;
  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_default(wait) || 0;
    if (isObject_default(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber_default(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now_default();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
      return timerId === void 0 ? result : trailingEdge(now_default());
    }
    function debounced() {
      var time = now_default(), isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  var debounce_default = debounce;

  // ../../node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/throttle.js
  var FUNC_ERROR_TEXT2 = "Expected a function";
  function throttle(func, wait, options) {
    var leading = true, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT2);
    }
    if (isObject_default(options)) {
      leading = "leading" in options ? !!options.leading : leading;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    return debounce_default(func, wait, {
      "leading": leading,
      "maxWait": wait,
      "trailing": trailing
    });
  }
  var throttle_default = throttle;

  // src/utils/index.ts
  var utils_exports = {};
  __export(utils_exports, {
    HexUtils: () => HexUtils
  });
  var HexUtils = class {
    static jsonEncode(params) {
      return this.stringToHex(JSON.stringify(params));
    }
    static jsonDecode(str) {
      try {
        return JSON.parse(this.hexToString(str));
      } catch (e4) {
        return null;
      }
    }
    static stringToHex(str) {
      let hex = "";
      for (let i3 = 0; i3 < str.length; i3++) {
        hex += str.charCodeAt(i3).toString(16);
      }
      return hex;
    }
    static hexToString(hex) {
      let str = "";
      for (let i3 = 0; i3 < hex.length; i3 += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i3, 2), 16));
      }
      return str;
    }
  };

  // src/module/carv-id.ts
  var Enum_Env2 = /* @__PURE__ */ ((Enum_Env3) => {
    Enum_Env3["DEV"] = "dev";
    Enum_Env3["PROD"] = "prod";
    return Enum_Env3;
  })(Enum_Env2 || {});
  var Enum_CarvIdTheme = /* @__PURE__ */ ((Enum_CarvIdTheme2) => {
    Enum_CarvIdTheme2["LIGHT"] = "light";
    Enum_CarvIdTheme2["DARK"] = "dark";
    return Enum_CarvIdTheme2;
  })(Enum_CarvIdTheme || {});
  var Enum_CarvIdIconDirection = /* @__PURE__ */ ((Enum_CarvIdIconDirection2) => {
    Enum_CarvIdIconDirection2["TOP"] = "top";
    Enum_CarvIdIconDirection2["RIGHT"] = "right";
    Enum_CarvIdIconDirection2["BOTTOM"] = "bottom";
    Enum_CarvIdIconDirection2["LEFT"] = "left";
    return Enum_CarvIdIconDirection2;
  })(Enum_CarvIdIconDirection || {});
  var Enum_CarvIdIconPlacement = /* @__PURE__ */ ((Enum_CarvIdIconPlacement2) => {
    Enum_CarvIdIconPlacement2["TOP_LEFT"] = "top-left";
    Enum_CarvIdIconPlacement2["TOP_RIGHT"] = "top-right";
    Enum_CarvIdIconPlacement2["BOTTOM_LEFT"] = "bottom-left";
    Enum_CarvIdIconPlacement2["BOTTOM_RIGHT"] = "bottom-right";
    return Enum_CarvIdIconPlacement2;
  })(Enum_CarvIdIconPlacement || {});
  var Enum_CarvIdIntent = /* @__PURE__ */ ((Enum_CarvIdIntent2) => {
    Enum_CarvIdIntent2["AUTHORIZE"] = "authorize";
    Enum_CarvIdIntent2["IDENTITY"] = "identity";
    return Enum_CarvIdIntent2;
  })(Enum_CarvIdIntent || {});
  var FLAG_CARV_ID_WINDOW_SIZE = "carv_id_window_size";
  var FLAG_CARV_ID_BTN_POSITION = "carv_id_btn_position";
  var FLAG_CARV_ID_AUTH_CODE = "carv_id_auth_code";
  var defaultCarvIdWidgetOptions = {
    env: "dev" /* DEV */,
    theme: "light" /* LIGHT */,
    // icon: IconCARVID,
    size: "48px",
    className: "",
    draggable: true,
    watchResize: true,
    rememberPosition: true,
    entryUrl: MapUrl["dev" /* DEV */].TELEGRAM_APP_URL,
    placement: "bottom-right" /* BOTTOM_RIGHT */,
    offset: { left: 20, right: 20, top: 40, bottom: 60 }
  };
  var CarvIdWidget = class extends h3 {
    constructor() {
      super(...arguments);
      this.options = defaultCarvIdWidgetOptions;
      this.elBtn = null;
      this.config = defaultCarvIdWidgetOptions;
      // 拖拽实例
      this.isDragging = false;
      // 是否正在拖
      this.position = {
        x: 0,
        y: 0,
        direction: "right" /* RIGHT */
      };
    }
    // 记录位置信息到本地存储
    setButtonStorageData(data) {
      const { innerWidth, innerHeight } = window;
      localStorage.setItem(
        FLAG_CARV_ID_WINDOW_SIZE,
        `${innerWidth},${innerHeight}`
      );
      localStorage.setItem(
        FLAG_CARV_ID_BTN_POSITION,
        `${data.x},${data.y},${data.direction},${this.config.placement}`
      );
    }
    // 从本地存储中获取位置信息
    getButtonStorageData() {
      const { innerWidth, innerHeight } = window;
      const localPlacement = localStorage.getItem(FLAG_CARV_ID_BTN_POSITION);
      const [x2, y2, direction, placement] = localPlacement ? localPlacement.split(",") : [];
      const localWindowSize = localStorage.getItem(FLAG_CARV_ID_WINDOW_SIZE);
      const res = localWindowSize ? localWindowSize.split(",") : [];
      const width = Number(res[0] || 0);
      const height = Number(res[1] || 0);
      if (width && height && (width != innerWidth || height != innerHeight)) {
        this.clearButtonStorageData();
        return {
          x: innerWidth,
          y: innerHeight,
          direction: "right" /* RIGHT */,
          placement
        };
      }
      return {
        x: Number(x2 || 0),
        y: Number(y2 || 0),
        direction,
        placement
      };
    }
    // 清除本地存储的位置信息
    clearButtonStorageData() {
      localStorage.removeItem(FLAG_CARV_ID_WINDOW_SIZE);
      localStorage.removeItem(FLAG_CARV_ID_BTN_POSITION);
    }
    // 初始化按钮位置信息
    setInitialPosition() {
      const { innerWidth, innerHeight } = window;
      const { x: btnX, y: btnY } = this.getButtonStorageData();
      if (btnX && btnY) {
        if ((Number(btnX) || 0) < innerWidth && (Number(btnY) || 0) < innerHeight) {
          this.updatePosition(Number(btnX) || 0, Number(btnY) || 0);
        } else {
          this.updatePosition(innerWidth, innerHeight);
        }
      } else {
        const { top, right, bottom, left } = this.config.offset;
        let x2, y2;
        switch (this.config.placement) {
          case "top-left" /* TOP_LEFT */:
            x2 = left;
            y2 = top;
            break;
          case "top-right" /* TOP_RIGHT */:
            x2 = innerWidth - right;
            y2 = top;
            break;
          case "bottom-left" /* BOTTOM_LEFT */:
            x2 = left;
            y2 = innerHeight - bottom;
            break;
          case "bottom-right" /* BOTTOM_RIGHT */:
            x2 = innerWidth - right;
            y2 = innerHeight - bottom;
            break;
          default:
            x2 = innerWidth - right;
            y2 = innerHeight - bottom;
        }
        this.updatePosition(x2, y2);
      }
    }
    // 更新按钮位置信息
    updatePosition(x2, y2, type) {
      const {
        left: iconLeft,
        top: iconTop,
        width: iconWidth,
        height: iconHeight
      } = this.elBtn.getBoundingClientRect();
      const isResize = type === "windowResize";
      const iconOffsetLeft = isResize ? iconLeft : x2;
      const iconOffsetTop = isResize ? iconTop : y2;
      const maxX = window.innerWidth - iconWidth;
      const maxY = window.innerHeight - iconHeight;
      let newDirection;
      let newX;
      if (iconOffsetLeft <= maxX / 2) {
        newDirection = "left" /* LEFT */;
        newX = this.config.offset.left;
      } else {
        newDirection = "right" /* RIGHT */;
        newX = maxX - this.config.offset.right;
      }
      const newY = Math.max(
        this.config.offset.top,
        Math.min(iconOffsetTop, maxY - this.config.offset.bottom)
      );
      this.position = { x: newX, y: newY, direction: newDirection };
      if (this.elBtn) {
        this.elBtn.style.left = newX + "px";
        this.elBtn.style.top = newY + "px";
      }
      return {
        left: newX,
        top: newY,
        direction: newDirection
      };
    }
    // 点击悬浮图标
    handleClick() {
      const carvIdInstance = this.config.carvIdInstance;
      if (carvIdInstance.getAuthCode()) {
        alert("Authorized, open Identity page directly");
        window.open(this.config.entryUrl, "_blank");
      } else {
        alert(
          "Unauthorized, bring authorization parameters to the CARVID bot for authorization"
        );
        carvIdInstance.authenticateUser();
      }
    }
    // 销毁
    destroy() {
      var _a2, _b;
      localStorage.removeItem(FLAG_CARV_ID_WINDOW_SIZE);
      localStorage.removeItem(FLAG_CARV_ID_BTN_POSITION);
      localStorage.removeItem(FLAG_CARV_ID_AUTH_CODE);
      if (!this.elBtn) return;
      (_a2 = this.draggie) == null ? void 0 : _a2.destroy();
      (_b = this.elBtn.parentNode) == null ? void 0 : _b.removeChild(this.elBtn);
      this.elBtn = null;
      if (this.config.watchResize && this.resizeHandler) {
        window.removeEventListener("resize", this.resizeHandler);
        this.resizeHandler = void 0;
      }
    }
    // 初始化
    async firstUpdated() {
      var _a2, _b;
      this.config = Object.assign(this.config, {
        ...this.options,
        offset: Object.assign(this.config.offset, ((_a2 = this.options) == null ? void 0 : _a2.offset) || {})
      });
      this.resizeHandler = throttle_default(() => {
        const { left, top, direction } = this.updatePosition(
          0,
          0,
          "windowResize"
        );
        if (this.config.rememberPosition) {
          this.setButtonStorageData({
            x: left,
            y: top,
            direction
          });
        }
      }, 100);
      if (!this.config.rememberPosition) {
        this.clearButtonStorageData();
      }
      this.position = {
        x: 0,
        y: 0,
        direction: "right" /* RIGHT */
      };
      this.elBtn = (_b = this.shadowRoot) == null ? void 0 : _b.host;
      this.elBtn.style.setProperty("--icon-size", this.config.size);
      this.setInitialPosition();
      if (this.config.draggable) {
        const Draggabilly = (await import(
          // @ts-ignore
          'https://cdn.jsdelivr.net/npm/draggabilly@3.0.0/+esm'
        )).default;
        this.draggie = new Draggabilly(this.elBtn);
        this.draggie.on(
          "dragStart",
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          // (event: Event, pointer: MouseEvent | Touch) => {
          (event) => {
            event.stopPropagation();
            this.isDragging = true;
            this.elBtn.style.cursor = "move";
          }
        );
        this.draggie.on(
          "dragEnd",
          (event, pointer) => {
            event.stopPropagation();
            this.elBtn.style.cursor = "pointer";
            const { clientX, clientY } = pointer;
            const { left, top, direction } = this.updatePosition(
              clientX,
              clientY - 35
            );
            if (this.config.rememberPosition) {
              this.setButtonStorageData({
                x: left,
                y: top,
                direction
              });
            }
            setTimeout(() => {
              this.isDragging = false;
            }, 50);
          }
        );
        this.draggie.on("staticClick", (event) => {
          event.stopPropagation();
          this.handleClick();
        });
      }
      if (this.config.watchResize) {
        window.addEventListener("resize", this.resizeHandler);
      }
      console.log(this.config, "CarvID Widget Initialized\u{1F44C}\u{1F3FB}");
    }
    destroyed() {
      this.destroy();
    }
    render() {
      const cls = `${this.config.className ? `${this.config.className} ` : ""}${this.config.theme === "dark" /* DARK */ ? "dark" /* DARK */ : "light" /* LIGHT */}`;
      return ke`
      <div class="carv-id-widget ${cls}">
        <img src="${IconCARVID}" alt="CARV ID" />
      </div>
    `;
    }
  };
  // 窗口大小变化事件处理函数
  CarvIdWidget.styles = i`
    :host {
      position: fixed;
      z-index: 50;
      width: var(--icon-size);
      height: var(--icon-size);
      touch-action: none; /* 禁用默认的触摸滚动行为 */
    }
    .carv-id-widget {
      cursor: pointer;
      width: var(--icon-size);
      height: var(--icon-size);
      user-select: none;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  `;
  __decorateClass([
    n4({ type: Object })
  ], CarvIdWidget.prototype, "options", 2);
  CarvIdWidget = __decorateClass([
    t2("carv-id-widget")
  ], CarvIdWidget);
  var CarvId = class {
    // TODO: 更新版本号，和 package.json 一致
    constructor(options) {
      const env = ["dev" /* DEV */, "prod" /* PROD */].includes(options == null ? void 0 : options.env) ? options.env : "dev" /* DEV */;
      this.env = env;
      this.theme = ["light" /* LIGHT */, "dark" /* DARK */].includes(
        options == null ? void 0 : options.theme
      ) ? options.theme : "light" /* LIGHT */;
      this.authorizeConfig = options.authorizeConfig;
      this.onAuthSuccess = options == null ? void 0 : options.onAuthSuccess;
      this.onAuthFailed = options == null ? void 0 : options.onAuthFailed;
      this.authCode = this.getAuthCode();
      const encodeStartParams = HexUtils.jsonEncode({
        theme: this.theme,
        intent: "identity" /* IDENTITY */
      });
      this.entryUrl = `${MapUrl[this.env].TELEGRAM_APP_URL}?startapp=${encodeStartParams}`;
      this.authenticateUser = this.authenticateUser.bind(this);
      this.handleAuthCallback = this.handleAuthCallback.bind(this);
      this.openIdentityPage = this.openIdentityPage.bind(this);
      this.destroy = this.destroy.bind(this);
      if (options == null ? void 0 : options.showWidget) {
        const carvIdNode = document.createElement(
          "carv-id-widget"
        );
        carvIdNode.options = {
          env,
          theme: this.theme,
          ...(options == null ? void 0 : options.widgetOptions) || {},
          carvIdInstance: this,
          entryUrl: this.entryUrl
        };
        document.body.appendChild(carvIdNode);
      }
      if (options == null ? void 0 : options.onLoad) {
        options.onLoad(this);
      }
    }
    getAuthCode() {
      return localStorage.getItem(FLAG_CARV_ID_AUTH_CODE) || "";
    }
    // CARVID 授权流程
    async authenticateUser() {
      if (!this.authorizeConfig) {
        console.error("authorizeConfig is required");
        return;
      }
      const authCode = this.getAuthCode();
      if (!authCode) {
        const encodeStartParams = HexUtils.jsonEncode({
          theme: this.theme,
          intent: "authorize" /* AUTHORIZE */,
          authParams: JSON.stringify(this.authorizeConfig)
        });
        window.open(
          `${MapUrl[this.env].TELEGRAM_APP_URL}?startapp=${encodeStartParams}`
        );
      } else {
        this.authCode = authCode;
        const res = {
          code: authCode,
          state: "",
          message: "Authorization success: from cache"
        };
        if (this.onAuthSuccess) {
          this.onAuthSuccess(res);
        }
      }
    }
    async handleAuthCallback() {
      var _a2, _b;
      const tgapp = (_a2 = window == null ? void 0 : window.Telegram) == null ? void 0 : _a2.WebApp;
      const startParam = (_b = tgapp == null ? void 0 : tgapp.initDataUnsafe) == null ? void 0 : _b.start_param;
      if (!startParam) {
        return {
          code: "",
          state: "",
          message: "Authorization failed: no start param"
        };
      }
      const { code, state } = HexUtils.jsonDecode(startParam);
      if (code) {
        const result = { code, state, message: "Authorization success" };
        localStorage.setItem(FLAG_CARV_ID_AUTH_CODE, code);
        this.authCode = code;
        if (this.onAuthSuccess) {
          this.onAuthSuccess(result);
        }
        return result;
      } else {
        const result = { code, state, message: "Authorization failed" };
        localStorage.removeItem(FLAG_CARV_ID_AUTH_CODE);
        if (this.onAuthFailed) {
          this.onAuthFailed(result);
        }
        return result;
      }
    }
    // 打开 CARVID Bot 的首页，进去也会检查授权状态
    async openIdentityPage(user_id) {
      if (!user_id) {
        throw new Error("user_id is required");
      }
      window.open(this.entryUrl, "_blank");
    }
    // 销毁
    destroy() {
      var _a2;
      localStorage.removeItem(FLAG_CARV_ID_WINDOW_SIZE);
      localStorage.removeItem(FLAG_CARV_ID_BTN_POSITION);
      localStorage.removeItem(FLAG_CARV_ID_AUTH_CODE);
      const elWidget = document.querySelector("carv-id-widget");
      if (!elWidget) return;
      (_a2 = elWidget.parentNode) == null ? void 0 : _a2.removeChild(elWidget);
    }
  };
  CarvId.utils = utils_exports;
  CarvId.version = "0.0.0";
  /*! Bundled license information:

  @lit/reactive-element/css-tag.js:
    (**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/reactive-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  lit-html/lit-html.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  lit-element/lit-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  lit-html/is-server.js:
    (**
     * @license
     * Copyright 2022 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/custom-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/property.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/state.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/event-options.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/base.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query-all.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query-async.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query-assigned-elements.js:
    (**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query-assigned-nodes.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  lodash-es/lodash.js:
    (**
     * @license
     * Lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="es" -o ./`
     * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     *)
  */

  exports.CarvId = CarvId;
  exports.Enum_CarvIdIconDirection = Enum_CarvIdIconDirection;
  exports.Enum_CarvIdIconPlacement = Enum_CarvIdIconPlacement;
  exports.Enum_CarvIdIntent = Enum_CarvIdIntent;
  exports.Enum_CarvIdTheme = Enum_CarvIdTheme;
  exports.Enum_Env = Enum_Env2;

}));
