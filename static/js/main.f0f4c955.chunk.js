(this["webpackJsonpts-app"]=this["webpackJsonpts-app"]||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(7),s=n.n(r),u=(n(12),n(6),n(2)),i=n.n(u),o=n(3),l=n(4);n(14);function j(e){return p.apply(this,arguments)}function p(){return(p=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(h,"?language=").concat(t),e.abrupt("return",O(n));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e){return f.apply(this,arguments)}function f(){return(f=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(d,"?language=").concat(t),e.abrupt("return",O(n));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var h="https://uselessfacts.jsph.pl/random.json",d="https://uselessfacts.jsph.pl/today.json";function O(e){return m.apply(this,arguments)}function m(){return(m=Object(o.a)(i.a.mark((function e(t){var n,a,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.text();case 5:if(a=e.sent,c={status:n.status,json:null},n.ok){e.next=10;break}return console.error(a),e.abrupt("return",c);case 10:return c.json=JSON.parse(a),e.abrupt("return",c);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x=n(0);var v=function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!1),s=Object(l.a)(r,2),u=s[0],p=s[1],f=Object(a.useState)(""),h=Object(l.a)(f,2),d=h[0],O=h[1],m=Object(a.useState)("en"),v=Object(l.a)(m,2),g=v[0],k=v[1],N=Object(a.useState)(""),y=Object(l.a)(N,2),w=y[0],S=y[1],F=Object(a.useState)("https://uselessfacts.jsph.pl"),C=Object(l.a)(F,2),L=C[0],T=C[1],E=function(){c(!0);var e="Loading...";O(e),S(e)},J=function(){c(!1)},D=Object(a.useCallback)((function(){var e=function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E(),e.next=3,j(g);case 3:t=e.sent,B(t),J();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[g]),B=function(e){if(null!=e){if(S(JSON.stringify(e,null,2)),429===e.status){var t=(new Date).toLocaleTimeString();return O("(".concat(t,") Too many attempts! Try again later :)")),void T("")}if(null==e.json)return O("Ups, try again."),void T("");O(e.json.text),T(e.json.permalink)}};return Object(a.useEffect)((function(){var e=function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E(),e.next=3,b("en");case 3:t=e.sent,B(t),J();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),Object(a.useEffect)((function(){D()}),[D]),Object(x.jsxs)("div",{className:"Facts",children:[Object(x.jsx)("div",{className:"col mb-3 facts-search",children:Object(x.jsx)("textarea",{className:"form-control fact",value:u?w:d,readOnly:!0})}),Object(x.jsx)("div",{className:"col mb-3 search",children:Object(x.jsx)("button",{className:"btn btn-primary w-100",onClick:function(){D()},disabled:n,children:"Next"})}),Object(x.jsxs)("div",{className:"input-group mb-3 w-100",children:[Object(x.jsxs)("label",{className:"input-group-text",htmlFor:"languages",children:["Language:"," "]}),Object(x.jsxs)("select",{name:"languages",className:"form-select",onChange:function(e){k(e.target.value)},children:[Object(x.jsx)("option",{value:"en",children:"English"}),Object(x.jsx)("option",{value:"de",children:"German"})]})]}),Object(x.jsxs)("div",{className:"input-group-text mb-3 facts-debug",children:[Object(x.jsx)("div",{className:"input-group me-1 w-auto",children:Object(x.jsx)("input",{className:"form-check-input",type:"checkbox",checked:u,onChange:function(e){p(e.target.checked)}})}),Object(x.jsx)("label",{className:"form-check-label",children:"Debug mode"})]}),Object(x.jsx)("div",{className:"col facts-links",children:Object(x.jsxs)("p",{children:["Fact URL:"," ",Object(x.jsx)("a",{href:L,target:"_blank",rel:"noreferrer",children:L})]})})]})};var g=function(){return Object(x.jsxs)("div",{className:"App",children:[Object(x.jsx)("h1",{className:"mb-3",children:"Random Facts"}),Object(x.jsx)(v,{})]})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(g,{})}),document.getElementById("root")),k()},6:function(e,t,n){}},[[16,1,2]]]);
//# sourceMappingURL=main.f0f4c955.chunk.js.map