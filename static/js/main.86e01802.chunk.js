(this["webpackJsonpts-app"]=this["webpackJsonpts-app"]||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(7),s=n.n(r),u=(n(12),n(6),n(2)),i=n.n(u),o=n(3),l=n(4);n(14);function j(e){return p.apply(this,arguments)}function p(){return(p=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(d,"?language=").concat(t),e.abrupt("return",m(n));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e){return f.apply(this,arguments)}function f(){return(f=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(h,"?language=").concat(t),e.abrupt("return",m(n));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var d="https://uselessfacts.jsph.pl/random.json",h="https://uselessfacts.jsph.pl/today.json";function m(e){return O.apply(this,arguments)}function O(){return(O=Object(o.a)(i.a.mark((function e(t){var n,a,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.text();case 5:if(a=e.sent,c={status:n.status,json:null},n.ok){e.next=10;break}return console.error(a),e.abrupt("return",c);case 10:return c.json=JSON.parse(a),e.abrupt("return",c);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var v=n(0);var x=function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!1),s=Object(l.a)(r,2),u=s[0],p=s[1],f=Object(a.useState)(""),d=Object(l.a)(f,2),h=d[0],m=d[1],O=Object(a.useState)("en"),x=Object(l.a)(O,2),g=x[0],k=x[1],y=Object(a.useState)(""),N=Object(l.a)(y,2),w=N[0],S=N[1],F=Object(a.useState)("https://uselessfacts.jsph.pl"),C=Object(l.a)(F,2),L=C[0],T=C[1],D=function(){c(!0);var e="Loading...";m(e),S(e)},E=function(){c(!1)},J=Object(a.useCallback)((function(){var e=function(){var e=Object(o.a)(i.a.mark((function e(){var t,n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D(),e.next=3,j(g);case 3:return t=e.sent,I(t),E(),e.next=8,navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment",width:{ideal:1920},height:{ideal:1080}}});case 8:if(n=e.sent,null!=(a=document.querySelector("video"))){e.next=12;break}return e.abrupt("return");case 12:a.srcObject=n;case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[g]),I=function(e){if(null!=e){if(S(JSON.stringify(e,null,2)),429===e.status){var t=(new Date).toLocaleTimeString();return m("(".concat(t,") Too many attempts! Try again later :)")),void T("")}if(null==e.json)return m("Ups, try again."),void T("");m(e.json.text),T(e.json.permalink)}};return Object(a.useEffect)((function(){var e=function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D(),e.next=3,b("en");case 3:t=e.sent,I(t),E();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),Object(a.useEffect)((function(){J()}),[J]),Object(v.jsxs)("div",{className:"Facts",children:[Object(v.jsx)("video",{autoPlay:!0,playsInline:!0,muted:!0}),Object(v.jsx)("div",{className:"col mb-3 facts-search",children:Object(v.jsx)("textarea",{className:"form-control fact",value:u?w:h,readOnly:!0})}),Object(v.jsx)("div",{className:"col mb-3 search",children:Object(v.jsx)("button",{className:"btn btn-primary w-100",onClick:function(){J()},disabled:n,children:"Next"})}),Object(v.jsxs)("div",{className:"input-group mb-3 w-100",children:[Object(v.jsxs)("label",{className:"input-group-text",htmlFor:"languages",children:["Language:"," "]}),Object(v.jsxs)("select",{name:"languages",className:"form-select",onChange:function(e){k(e.target.value)},children:[Object(v.jsx)("option",{value:"en",children:"English"}),Object(v.jsx)("option",{value:"de",children:"German"})]})]}),Object(v.jsxs)("div",{className:"input-group-text mb-3 facts-debug",children:[Object(v.jsx)("div",{className:"input-group me-1 w-auto",children:Object(v.jsx)("input",{className:"form-check-input",type:"checkbox",checked:u,onChange:function(e){p(e.target.checked)}})}),Object(v.jsx)("label",{className:"form-check-label",children:"Debug mode"})]}),Object(v.jsx)("div",{className:"col facts-links",children:Object(v.jsxs)("p",{className:"w-100",children:["Fact URL:"," ",Object(v.jsx)("a",{href:L,target:"_blank",rel:"noreferrer",children:L})]})})]})};var g=function(){return Object(v.jsxs)("div",{className:"App",children:[Object(v.jsx)("h1",{className:"mb-3 text-center",children:"Random Facts"}),Object(v.jsx)(x,{})]})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(g,{})}),document.getElementById("root")),k()},6:function(e,t,n){}},[[16,1,2]]]);
//# sourceMappingURL=main.86e01802.chunk.js.map