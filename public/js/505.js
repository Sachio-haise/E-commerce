"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[505],{4201:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(4015),o=n.n(a),r=n(3645),s=n.n(r)()(o());s.push([e.id,".paper[data-v-42f22644]{background-color:#f5f5f5;border-radius:5px;box-shadow:0 4px 14px 4px rgba(0,0,0,.62);min-width:400px}a[data-v-42f22644]{color:#1877f2;text-decoration:none}.btn-primary[data-v-42f22644]{background-color:#1877f2;border:none}","",{version:3,sources:["webpack://./resources/js/components/Form/EmailVerify.vue"],names:[],mappings:"AA0EA,wBACI,wBAA4B,CAE5B,iBAAkB,CADlB,yCAA6C,CAE7C,eACJ,CACA,mBAEI,aAAc,CADd,oBAEJ,CACA,8BACI,wBAAyB,CACzB,WACJ",sourcesContent:['<template>\n    <Master>\n        <div class="container my-5">\n            <div class="row">\n                <div class="col-6 offset-3 paper text text-center p-5">\n\n                    <h1 class="mb-3">\n                        <i class="fa-solid fa-shopping-bag"></i>\n                        Shop\n                    </h1>\n                    <h6 class="mb-3">\n                        Welcome <span class="text-success">{{user.user.name}}!</span><br>\n                        <span class="text-success" v-if="resendFlag">Email Resend!</span>  Please Check your email!\n                    </h6>\n                    <p>\n                        We sent your code to:<br/>\n                        <span class="text-success">{{ user.user.email }}!</span>\n                    </p>\n                    <a href="#" for="resend">Didn\'t get email?</a> <br>\n                    <button  class="btn btn-primary py-2 mt-2" id="resend" :disabled="loading" @click.prevent="resend">Resent Email <i class="fa-solid fa-paper-plane ms-2 "></i></button>\n                </div>\n            </div>\n        </div>\n    </Master>\n</template>\n<script>\nimport Master from "../layouts/Master";\nexport default {\n    components: {Master},\n    data(){\n        return{\n            resendFlag:false,\n            loading:false\n        }\n    },\n    created(){\n        this.$Progress.start();\n    },\n    mounted(){\n        this.$Progress.finish();\n    },\n    computed:{\n        user(){\n            return this.$store.state.auth;\n        },\n        verify(){\n            return this.$store.state.EmailVerification;\n        }\n    },\n    methods:{\n        async   resend(){\n            this.loading =true;\n            await  axios.get(\'/api/email/verification-notification\', {\n                headers: {\n                    \'Authorization\': `Bearer ${this.user.token}`\n                }\n            })\n                .then((res)=> {\n                    console.log(res.data);\n                    this.loading = false;\n                    this.resendFlag = true;\n                })\n                .catch(err => {\n                    console.log(err);\n                    this.loading = false;\n                    this.resendFlag = true;\n                });\n\n        }\n    }\n\n}\n<\/script>\n<style scoped>\n.paper{\n    background-color: whitesmoke;\n    box-shadow: 0px 4px 14px 4px rgba(0,0,0,0.62);\n    border-radius: 5px;\n    min-width: 400px;\n}\na{\n    text-decoration: none;\n    color: #1877F2;\n}\n.btn-primary{\n    background-color: #1877F2;\n    border: none;\n}\n</style>\n'],sourceRoot:""}]);const c=s},3645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,a){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(a)for(var r=0;r<this.length;r++){var s=this[r][0];null!=s&&(o[s]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);a&&o[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},4015:e=>{function t(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null==n)return;var a,o,r=[],s=!0,c=!1;try{for(n=n.call(e);!(s=(a=n.next()).done)&&(r.push(a.value),!t||r.length!==t);s=!0);}catch(e){c=!0,o=e}finally{try{s||null==n.return||n.return()}finally{if(c)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}e.exports=function(e){var n=t(e,4),a=n[1],o=n[3];if(!o)return a;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),c="/*# ".concat(s," */"),l=o.sources.map((function(e){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(e," */")}));return[a].concat(l).concat([c]).join("\n")}return[a].join("\n")}},3379:(e,t,n)=>{var a,o=function(){return void 0===a&&(a=Boolean(window&&document&&document.all&&!window.atob)),a},r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),s=[];function c(e){for(var t=-1,n=0;n<s.length;n++)if(s[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},a=[],o=0;o<e.length;o++){var r=e[o],l=t.base?r[0]+t.base:r[0],i=n[l]||0,d="".concat(l," ").concat(i);n[l]=i+1;var u=c(d),m={css:r[1],media:r[2],sourceMap:r[3]};-1!==u?(s[u].references++,s[u].updater(m)):s.push({identifier:d,updater:b(m,t),references:1}),a.push(d)}return a}function i(e){var t=document.createElement("style"),a=e.attributes||{};if(void 0===a.nonce){var o=n.nc;o&&(a.nonce=o)}if(Object.keys(a).forEach((function(e){t.setAttribute(e,a[e])})),"function"==typeof e.insert)e.insert(t);else{var s=r(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(t)}return t}var d,u=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function m(e,t,n,a){var o=n?"":a.media?"@media ".concat(a.media," {").concat(a.css,"}"):a.css;if(e.styleSheet)e.styleSheet.cssText=u(t,o);else{var r=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function f(e,t,n){var a=n.css,o=n.media,r=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}var p=null,h=0;function b(e,t){var n,a,o;if(t.singleton){var r=h++;n=p||(p=i(t)),a=m.bind(null,n,r,!1),o=m.bind(null,n,r,!0)}else n=i(t),a=f.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var a=0;a<n.length;a++){var o=c(n[a]);s[o].references--}for(var r=l(e,t),i=0;i<n.length;i++){var d=c(n[i]);0===s[d].references&&(s[d].updater(),s.splice(d,1))}n=r}}}},3744:(e,t)=>{t.Z=(e,t)=>{const n=e.__vccOpts||e;for(const[e,a]of t)n[e]=a;return n}},7505:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var a=n(821),o=function(e){return(0,a.pushScopeId)("data-v-42f22644"),e=e(),(0,a.popScopeId)(),e},r={class:"container my-5"},s={class:"row"},c={class:"col-6 offset-3 paper text text-center p-5"},l=o((function(){return(0,a.createElementVNode)("h1",{class:"mb-3"},[(0,a.createElementVNode)("i",{class:"fa-solid fa-shopping-bag"}),(0,a.createTextVNode)(" Shop ")],-1)})),i={class:"mb-3"},d=(0,a.createTextVNode)(" Welcome "),u={class:"text-success"},m=o((function(){return(0,a.createElementVNode)("br",null,null,-1)})),f={key:0,class:"text-success"},p=(0,a.createTextVNode)(" Please Check your email! "),h=(0,a.createTextVNode)(" We sent your code to:"),b=o((function(){return(0,a.createElementVNode)("br",null,null,-1)})),v={class:"text-success"},g=o((function(){return(0,a.createElementVNode)("a",{href:"#",for:"resend"},"Didn't get email?",-1)})),x=(0,a.createTextVNode)(),V=o((function(){return(0,a.createElementVNode)("br",null,null,-1)})),N=["disabled"],y=[(0,a.createTextVNode)("Resent Email "),o((function(){return(0,a.createElementVNode)("i",{class:"fa-solid fa-paper-plane ms-2"},null,-1)}))];var k=n(7757),E=n.n(k);function w(e,t,n,a,o,r,s){try{var c=e[r](s),l=c.value}catch(e){return void n(e)}c.done?t(l):Promise.resolve(l).then(a,o)}const C={components:{Master:n(887).Z},data:function(){return{resendFlag:!1,loading:!1}},created:function(){this.$Progress.start()},mounted:function(){this.$Progress.finish()},computed:{user:function(){return this.$store.state.auth},verify:function(){return this.$store.state.EmailVerification}},methods:{resend:function(){var e,t=this;return(e=E().mark((function e(){return E().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,axios.get("/api/email/verification-notification",{headers:{Authorization:"Bearer ".concat(t.user.token)}}).then((function(e){console.log(e.data),t.loading=!1,t.resendFlag=!0})).catch((function(e){console.log(e),t.loading=!1,t.resendFlag=!0}));case 3:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(a,o){var r=e.apply(t,n);function s(e){w(r,a,o,s,c,"next",e)}function c(e){w(r,a,o,s,c,"throw",e)}s(void 0)}))})()}}};var B=n(3379),A=n.n(B),S=n(4201),T={insert:"head",singleton:!1};A()(S.Z,T);S.Z.locals;const M=(0,n(3744).Z)(C,[["render",function(e,t,n,o,k,E){var w=(0,a.resolveComponent)("Master");return(0,a.openBlock)(),(0,a.createBlock)(w,null,{default:(0,a.withCtx)((function(){return[(0,a.createElementVNode)("div",r,[(0,a.createElementVNode)("div",s,[(0,a.createElementVNode)("div",c,[l,(0,a.createElementVNode)("h6",i,[d,(0,a.createElementVNode)("span",u,(0,a.toDisplayString)(E.user.user.name)+"!",1),m,k.resendFlag?((0,a.openBlock)(),(0,a.createElementBlock)("span",f,"Email Resend!")):(0,a.createCommentVNode)("",!0),p]),(0,a.createElementVNode)("p",null,[h,b,(0,a.createElementVNode)("span",v,(0,a.toDisplayString)(E.user.user.email)+"!",1)]),g,x,V,(0,a.createElementVNode)("button",{class:"btn btn-primary py-2 mt-2",id:"resend",disabled:k.loading,onClick:t[0]||(t[0]=(0,a.withModifiers)((function(){return E.resend&&E.resend.apply(E,arguments)}),["prevent"]))},y,8,N)])])])]})),_:1})}],["__scopeId","data-v-42f22644"]])},887:(e,t,n)=>{n.d(t,{Z:()=>Ee});var a=n(821);var o={class:"pt-4 px-3 mt-5 bg-light"},r={class:"container"},s={class:"row py-5"},c=(0,a.createStaticVNode)('<div class="col-5"><h5 class="mb-3"> Contact Us </h5><h3 class="text-warning">1800 97 97 69</h3><p class="text-black-50 mb-4"> 502 New Design Str, Melbourne, Australia <br> contact@martfury.co </p><div class="social-icons d-flex"><i class="me-3 fa-brands fa-facebook-f"></i><i class="me-3 fa-brands fa-twitter"></i><i class="me-3 fa-brands fa-google-plus-g"></i><i class="me-3 fa-brands fa-instagram"></i></div></div>',1),l={class:"col-7"},i={class:"row"},d={class:"col-4"},u=(0,a.createElementVNode)("h5",{class:"mb-3"}," Categories ",-1),m=["textContent"],f=(0,a.createStaticVNode)('<div class="col-4"><h5 class="mb-3"> Company </h5><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> About Us </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Affilate </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Career </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Contact </p></a></div><div class="col-4"><h5 class="mb-3"> Quick Links </h5><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Policy </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Term &amp; Condition </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Shipping </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Return </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> FAQs </p></a></div>',2),p=(0,a.createStaticVNode)('<div class="row border-top pt-3 px-4"><div class="col-12"><div class="d-flex justify-content-between"><p class="">© 2022</p><p class="">created by <b>Wai Phyo Aung</b></p></div></div></div>',1);const h={name:"Footer"};var b=n(3744);const v=(0,b.Z)(h,[["render",function(e,t,n,h,b,v){return(0,a.openBlock)(),(0,a.createElementBlock)("footer",o,[(0,a.createElementVNode)("div",r,[(0,a.createElementVNode)("div",s,[c,(0,a.createElementVNode)("div",l,[(0,a.createElementVNode)("div",i,[(0,a.createElementVNode)("div",d,[u,((0,a.openBlock)(!0),(0,a.createElementBlock)(a.Fragment,null,(0,a.renderList)(this.$store.state.categories,(function(e){return(0,a.openBlock)(),(0,a.createElementBlock)("a",{href:"",class:"text-decoration-none",key:e.id},[(0,a.createElementVNode)("p",{class:"text-black-50 mb-0",textContent:(0,a.toDisplayString)(e.name)},null,8,m)])})),128))]),f])])])]),p])}]]);var g={class:"header-top header-border-bottom small bg-black"},x={class:"container"},V={class:"d-flex justify-content-between align-items-center"},N=(0,a.createStaticVNode)('<div class="d-flex align-items-center justify-content-center d-none d-lg-block"><ul class="nav white-link"><li class="nav-link ps-0 me-3 text-white"><span><i class="fa fa-clock me-2"></i> Visit time: Mon-Sat 9:00-19:00 </span></li><li class="nav-item"><a href="#" class="nav-link text-white"><i class="fa-solid fa-square-phone me-2"></i> Call us now: +01 035-477-5588 </a></li></ul></div>',1),y={class:"d-flex align-items-center justify-content-center"},k={class:"nav ms-auto ms-lg-3"},E=(0,a.createElementVNode)("li",{class:"nav-item"},[(0,a.createElementVNode)("a",{href:"#",class:"nav-link text-white"},"Contact")],-1),w={class:"nav-item"},C=(0,a.createElementVNode)("i",{class:"fa fa-user-circle me-2"},null,-1),B=(0,a.createTextVNode)("Login "),A=[(0,a.createElementVNode)("i",{class:"fa fa-sign-out me-2"},null,-1),(0,a.createTextVNode)("Logout ")],S=(0,a.createStaticVNode)('<div class="nav header-social justify-content-end d-none d-lg-block"><a class="px-2 text-white" href="#"><i class="fa-brands fa-facebook"></i></a><a class="px-2 text-white" href="#"><i class="fa-brands fa-twitter"></i></a><a class="px-2 text-white" href="#"><i class="fa-brands fa-linkedin"></i></a></div>',1);const T={name:"Header-top",data:function(){return{isVerify:""}},computed:{user:function(){return this.$store.state.auth.user}},created:function(){var e=this;if(this.$store.state.loadOnce&&(location.reload(),this.$store.commit("setLoadOnce")),JSON.parse(localStorage.getItem("auth"))){var t=JSON.parse(localStorage.getItem("auth")).token;axios.get("/api/me",{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){e.isVerify=t.data.verify,!1===e.isVerify&&console.log(e.isVerify)})).catch((function(e){return e}))}}},M=(0,b.Z)(T,[["render",function(e,t,n,o,r,s){var c=this,l=(0,a.resolveComponent)("router-link");return(0,a.openBlock)(),(0,a.createElementBlock)("div",g,[(0,a.createElementVNode)("div",x,[(0,a.createElementVNode)("div",V,[N,(0,a.createElementVNode)("div",y,[(0,a.createElementVNode)("ul",k,[E,(0,a.createElementVNode)("li",w,[r.isVerify?(0,a.createCommentVNode)("",!0):((0,a.openBlock)(),(0,a.createBlock)(l,{key:0,class:"nav-link text-white",to:"/login"},{default:(0,a.withCtx)((function(){return[C,B]})),_:1})),r.isVerify?((0,a.openBlock)(),(0,a.createElementBlock)("button",{key:1,class:"btn text-white",onClick:t[0]||(t[0]=function(e){return c.$store.dispatch("logout")})},A)):(0,a.createCommentVNode)("",!0)])]),S])])])])}]]);var j={class:"navbar-light bg-white py-2 position-sticky top-0 shadow-sm",style:{"z-index":"10000"}},F={class:"container"},I={class:"d-flex justify-content-between align-items-center"},D=(0,a.createElementVNode)("a",{class:"navbar-brand fw-bold",href:"/"},[(0,a.createElementVNode)("h2",null,[(0,a.createElementVNode)("i",{class:"fa-solid fa-shopping-bag text-primary"}),(0,a.createTextVNode)(" Sh"),(0,a.createElementVNode)("span",{class:"text-primary"},"o"),(0,a.createTextVNode)("p ")])],-1),L={class:""},O={class:"list-unstyled d-flex me-auto mb-2 mb-lg-0"},R={class:"nav-item"},P=(0,a.createTextVNode)(" Home "),_=(0,a.createElementVNode)("li",{class:"nav-item"},[(0,a.createElementVNode)("a",{class:"nav-link text-black",href:"#"},"Store")],-1),Z={class:"nav-item dropdown"},H=(0,a.createElementVNode)("a",{class:"nav-link text-black dropdown-toggle",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," Products ",-1),J={class:"dropdown-menu","aria-labelledby":"navbarDropdown"},U=(0,a.createElementVNode)("li",{class:"nav-item"},[(0,a.createElementVNode)("a",{class:"nav-link text-black",href:""},"Shop")],-1),z=(0,a.createElementVNode)("li",{class:"nav-item"},[(0,a.createElementVNode)("a",{class:"nav-link text-black",href:""},"Contact")],-1),W={class:""},q={class:"list-unstyled d-flex align-items-center me-auto mb-2 mb-lg-0"},Q=(0,a.createElementVNode)("li",{class:"nav-item"},[(0,a.createElementVNode)("a",{href:"",class:"nav-link text-black",type:"button","data-bs-toggle":"modal","data-bs-target":"#searchModal"},[(0,a.createElementVNode)("i",{class:"fa fa-search"})])],-1),G={class:"modal fade",id:"searchModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},K={class:"modal-dialog modal-dialog-centered modal-fullscreen"},X={class:"modal-content",style:{"background-color":"rgba(0,0,0, 0.4)","\x3c!-- backdrop-filter":"blur(3px) --\x3e"}},Y={class:"modal-body d-flex align-items-center justify-content-center"},ee=(0,a.createElementVNode)("button",{class:"btn me-2","data-bs-dismiss":"modal"},[(0,a.createElementVNode)("i",{class:"fa fa-x"})],-1),te=(0,a.createElementVNode)("i",{class:"fa fa-search text-black-50",style:{top:"13px"}},null,-1),ne={class:"nav-item"},ae={class:"position-relative"},oe=(0,a.createElementVNode)("i",{class:"fa-solid fa-shopping-cart"},null,-1),re={class:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary",style:{"font-size":"0.50em"}},se={key:0,class:"nav-item"},ce=(0,a.createElementVNode)("a",{href:"#",class:"nav-link text-black",id:"loginDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"},[(0,a.createElementVNode)("i",{class:"fa fa-user-circle fs-5"})],-1),le={class:"dropdown-menu","aria-labelledby":"loginDropdown"},ie=(0,a.createTextVNode)("Login"),de=(0,a.createTextVNode)("Register"),ue={key:1,class:"nav-item"},me={key:0,class:"dropdown"},fe={class:"btn dropdown-toggle",type:"button",id:"dropdownMenuButton1","data-bs-toggle":"dropdown","aria-expanded":"false"},pe=["src"],he={class:"dropdown-menu","aria-labelledby":"dropdownMenuButton1"},be={key:0},ve=(0,a.createTextVNode)("Dashboard"),ge={key:1},xe=(0,a.createTextVNode)("Profile"),Ve=(0,a.createElementVNode)("li",{class:"dropdown-divider"},null,-1),Ne=[(0,a.createElementVNode)("i",{class:"fa fa-sign-out me-2"},null,-1),(0,a.createTextVNode)("Logout ")];const ye={name:"Header-bottom",data:function(){return{isVerify:"",searchText:""}},computed:{role:function(){return localStorage.getItem("r%o%l%e")},user:function(){return this.$store.state.auth.user},categories:function(){return this.$store.state.categories}},created:function(){var e=this;if(JSON.parse(localStorage.getItem("auth"))){var t=JSON.parse(localStorage.getItem("auth")).token;axios.get("/api/me",{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){e.isVerify=t.data.verify,!1===e.isVerify&&console.log(e.isVerify)})).catch((function(e){return e}))}},methods:{submit:function(){$("#modalBtn").click()},search:function(e){this.searchText&&this.$router.push({name:"products.search",params:{search:e}})}}},ke={components:{HeaderBottom:(0,b.Z)(ye,[["render",function(e,t,n,o,r,s){var c=this,l=(0,a.resolveComponent)("router-link");return(0,a.openBlock)(),(0,a.createElementBlock)("nav",j,[(0,a.createElementVNode)("div",F,[(0,a.createElementVNode)("div",I,[D,(0,a.createElementVNode)("div",L,[(0,a.createElementVNode)("ul",O,[(0,a.createElementVNode)("li",R,[(0,a.createVNode)(l,{class:"nav-link text-black",to:"/"},{default:(0,a.withCtx)((function(){return[P]})),_:1})]),_,(0,a.createElementVNode)("li",Z,[H,(0,a.createElementVNode)("ul",J,[((0,a.openBlock)(!0),(0,a.createElementBlock)(a.Fragment,null,(0,a.renderList)(s.categories,(function(e){return(0,a.openBlock)(),(0,a.createElementBlock)("li",{key:e.id},[(0,a.createVNode)(l,{class:"dropdown-item",to:{name:"products.category",params:{category:e.slug}},textContent:(0,a.toDisplayString)(e.name)},null,8,["to","textContent"])])})),128))])]),U,z])]),(0,a.createElementVNode)("div",W,[(0,a.createElementVNode)("ul",q,[Q,(0,a.createElementVNode)("div",G,[(0,a.createElementVNode)("div",K,[(0,a.createElementVNode)("div",X,[(0,a.createElementVNode)("div",Y,[ee,(0,a.createElementVNode)("form",{class:"d-flex search-item me-2",onSubmit:t[1]||(t[1]=(0,a.withModifiers)((function(e){return s.submit()}),["prevent"]))},[(0,a.withDirectives)((0,a.createElementVNode)("input",{id:"searchBox",ref:"searchBox",class:"form-control form-control-lg me-2","onUpdate:modelValue":t[0]||(t[0]=function(e){return r.searchText=e}),placeholder:"Search",autofocus:""},null,512),[[a.vModelText,r.searchText]]),te],32),(0,a.createElementVNode)("button",{class:"btn btn-primary text-white",onClick:t[2]||(t[2]=function(e){return s.search(r.searchText)}),id:"modalBtn","data-bs-dismiss":"modal"},"Search")])])])]),(0,a.createElementVNode)("li",ne,[(0,a.createVNode)(l,{to:"/cart",class:"nav-link text-black"},{default:(0,a.withCtx)((function(){return[(0,a.createElementVNode)("div",ae,[oe,(0,a.createElementVNode)("span",re,(0,a.toDisplayString)(c.$store.state.cartCount),1)])]})),_:1})]),r.isVerify?(0,a.createCommentVNode)("",!0):((0,a.openBlock)(),(0,a.createElementBlock)("li",se,[ce,(0,a.createElementVNode)("ul",le,[(0,a.createElementVNode)("li",null,[(0,a.createVNode)(l,{class:"dropdown-item",to:"/login"},{default:(0,a.withCtx)((function(){return[ie]})),_:1})]),(0,a.createElementVNode)("li",null,[(0,a.createVNode)(l,{class:"dropdown-item",to:"/register"},{default:(0,a.withCtx)((function(){return[de]})),_:1})])])])),r.isVerify?((0,a.openBlock)(),(0,a.createElementBlock)("li",ue,[s.user?((0,a.openBlock)(),(0,a.createElementBlock)("div",me,[(0,a.createElementVNode)("button",fe,[(0,a.createElementVNode)("img",{src:s.user.profile,class:"user-img rounded-circle shadow-sm",style:{width:"25px",height:"25px"},alt:""},null,8,pe)]),(0,a.createElementVNode)("ul",he,["admin"===s.role?((0,a.openBlock)(),(0,a.createElementBlock)("li",be,[(0,a.createVNode)(l,{class:"dropdown-item",to:{name:"dashboard"}},{default:(0,a.withCtx)((function(){return[ve]})),_:1})])):(0,a.createCommentVNode)("",!0),"user"===s.role?((0,a.openBlock)(),(0,a.createElementBlock)("li",ge,[(0,a.createVNode)(l,{class:"dropdown-item",to:{name:"user.profile"}},{default:(0,a.withCtx)((function(){return[xe]})),_:1},8,["to"])])):(0,a.createCommentVNode)("",!0),Ve,(0,a.createElementVNode)("li",null,[(0,a.createElementVNode)("button",{class:"btn dropdown-item",onClick:t[3]||(t[3]=function(e){return c.$store.dispatch("logout")})},Ne)])])])):(0,a.createCommentVNode)("",!0)])):(0,a.createCommentVNode)("",!0)])])])])])}]]),HeaderTop:M,Footer:v}},Ee=(0,b.Z)(ke,[["render",function(e,t,n,o,r,s){var c=(0,a.resolveComponent)("HeaderTop"),l=(0,a.resolveComponent)("HeaderBottom"),i=(0,a.resolveComponent)("Footer");return(0,a.openBlock)(),(0,a.createElementBlock)("div",null,[(0,a.createVNode)(c),(0,a.createVNode)(l),(0,a.renderSlot)(e.$slots,"default"),(0,a.createVNode)(i)])}]])}}]);
//# sourceMappingURL=505.js.map