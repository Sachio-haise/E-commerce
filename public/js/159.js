"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[159],{3744:(e,t)=>{t.Z=(e,t)=>{const a=e.__vccOpts||e;for(const[e,o]of t)a[e]=o;return a}},4159:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var o=a(821),n={class:"container"},l={class:"row py-5"},r={class:"col-12 d-flex align-items-center justify-content-center",style:{"min-height":"376px"}},s={class:"text-black-50 my-auto"};const c={components:{Master:a(887).Z},methods:{loginUser:function(){var e=this;this.$store.dispatch("socialLoginCallback",{payload:{code:this.$route.query.code},provider:this.$route.params.provider}).then((function(t){t.data.data.token&&e.$router.push({name:"products.index"})})),console.log(this.$route.query.code)}},mounted:function(){this.$Progress.finish()},created:function(){this.$Progress.start(),this.loginUser()}};const i=(0,a(3744).Z)(c,[["render",function(e,t,a,c,i,d){var m=this,u=(0,o.resolveComponent)("Master");return(0,o.openBlock)(),(0,o.createBlock)(u,null,{default:(0,o.withCtx)((function(){return[(0,o.createElementVNode)("div",n,[(0,o.createElementVNode)("div",l,[(0,o.createElementVNode)("div",r,[(0,o.createElementVNode)("h5",s,"login with "+(0,o.toDisplayString)(m.$route.params.provider)+" , please wait ....",1)])])])]})),_:1})}]])},887:(e,t,a)=>{a.d(t,{Z:()=>ye});var o=a(821);var n={class:"pt-4 px-3 mt-5 bg-light"},l={class:"container"},r={class:"row py-5"},s=(0,o.createStaticVNode)('<div class="col-5"><h5 class="mb-3"> Contact Us </h5><h3 class="text-warning">1800 97 97 69</h3><p class="text-black-50 mb-4"> 502 New Design Str, Melbourne, Australia <br> contact@martfury.co </p><div class="social-icons d-flex"><i class="me-3 fa-brands fa-facebook-f"></i><i class="me-3 fa-brands fa-twitter"></i><i class="me-3 fa-brands fa-google-plus-g"></i><i class="me-3 fa-brands fa-instagram"></i></div></div>',1),c={class:"col-7"},i={class:"row"},d={class:"col-4"},m=(0,o.createElementVNode)("h5",{class:"mb-3"}," Categories ",-1),u=["textContent"],f=(0,o.createStaticVNode)('<div class="col-4"><h5 class="mb-3"> Company </h5><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> About Us </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Affilate </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Career </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Contact </p></a></div><div class="col-4"><h5 class="mb-3"> Quick Links </h5><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Policy </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Term &amp; Condition </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Shipping </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> Return </p></a><a href="" class="text-decoration-none"><p class="text-black-50 mb-0"> FAQs </p></a></div>',2),p=(0,o.createStaticVNode)('<div class="row border-top pt-3 px-4"><div class="col-12"><div class="d-flex justify-content-between"><p class="">© 2022</p><p class="">created by <b>Wai Phyo Aung</b></p></div></div></div>',1);const h={name:"Footer"};var b=a(3744);const V=(0,b.Z)(h,[["render",function(e,t,a,h,b,V){return(0,o.openBlock)(),(0,o.createElementBlock)("footer",n,[(0,o.createElementVNode)("div",l,[(0,o.createElementVNode)("div",r,[s,(0,o.createElementVNode)("div",c,[(0,o.createElementVNode)("div",i,[(0,o.createElementVNode)("div",d,[m,((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(this.$store.state.categories,(function(e){return(0,o.openBlock)(),(0,o.createElementBlock)("a",{href:"",class:"text-decoration-none",key:e.id},[(0,o.createElementVNode)("p",{class:"text-black-50 mb-0",textContent:(0,o.toDisplayString)(e.name)},null,8,u)])})),128))]),f])])])]),p])}]]);var x={class:"header-top header-border-bottom small bg-black"},N={class:"container"},v={class:"d-flex justify-content-between align-items-center"},g=(0,o.createStaticVNode)('<div class="d-flex align-items-center justify-content-center d-none d-lg-block"><ul class="nav white-link"><li class="nav-link ps-0 me-3 text-white"><span><i class="fa fa-clock me-2"></i> Visit time: Mon-Sat 9:00-19:00 </span></li><li class="nav-item"><a href="#" class="nav-link text-white"><i class="fa-solid fa-square-phone me-2"></i> Call us now: +01 035-477-5588 </a></li></ul></div>',1),k={class:"d-flex align-items-center justify-content-center"},E={class:"nav ms-auto ms-lg-3"},y=(0,o.createElementVNode)("li",{class:"nav-item"},[(0,o.createElementVNode)("a",{href:"#",class:"nav-link text-white"},"Contact")],-1),w={class:"nav-item"},B=(0,o.createElementVNode)("i",{class:"fa fa-user-circle me-2"},null,-1),C=(0,o.createTextVNode)("Login "),S=[(0,o.createElementVNode)("i",{class:"fa fa-sign-out me-2"},null,-1),(0,o.createTextVNode)("Logout ")],T=(0,o.createStaticVNode)('<div class="nav header-social justify-content-end d-none d-lg-block"><a class="px-2 text-white" href="#"><i class="fa-brands fa-facebook"></i></a><a class="px-2 text-white" href="#"><i class="fa-brands fa-twitter"></i></a><a class="px-2 text-white" href="#"><i class="fa-brands fa-linkedin"></i></a></div>',1);const D={name:"Header-top",data:function(){return{isVerify:""}},computed:{user:function(){return this.$store.state.auth.user}},created:function(){var e=this;if(this.$store.state.loadOnce&&(location.reload(),this.$store.commit("setLoadOnce")),JSON.parse(localStorage.getItem("auth"))){var t=JSON.parse(localStorage.getItem("auth")).token;axios.get("/api/me",{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){e.isVerify=t.data.verify,!1===e.isVerify&&console.log(e.isVerify)})).catch((function(e){return e}))}}},M=(0,b.Z)(D,[["render",function(e,t,a,n,l,r){var s=this,c=(0,o.resolveComponent)("router-link");return(0,o.openBlock)(),(0,o.createElementBlock)("div",x,[(0,o.createElementVNode)("div",N,[(0,o.createElementVNode)("div",v,[g,(0,o.createElementVNode)("div",k,[(0,o.createElementVNode)("ul",E,[y,(0,o.createElementVNode)("li",w,[l.isVerify?(0,o.createCommentVNode)("",!0):((0,o.openBlock)(),(0,o.createBlock)(c,{key:0,class:"nav-link text-white",to:"/login"},{default:(0,o.withCtx)((function(){return[B,C]})),_:1})),l.isVerify?((0,o.openBlock)(),(0,o.createElementBlock)("button",{key:1,class:"btn text-white",onClick:t[0]||(t[0]=function(e){return s.$store.dispatch("logout")})},S)):(0,o.createCommentVNode)("",!0)])]),T])])])])}]]);var L={class:"navbar-light bg-white py-2 position-sticky top-0 shadow-sm",style:{"z-index":"10000"}},_={class:"container"},j={class:"d-flex justify-content-between align-items-center"},Z=(0,o.createElementVNode)("a",{class:"navbar-brand fw-bold",href:"/"},[(0,o.createElementVNode)("h2",null,[(0,o.createElementVNode)("i",{class:"fa-solid fa-shopping-bag text-primary"}),(0,o.createTextVNode)(" Sh"),(0,o.createElementVNode)("span",{class:"text-primary"},"o"),(0,o.createTextVNode)("p ")])],-1),A={class:""},H={class:"list-unstyled d-flex me-auto mb-2 mb-lg-0"},O={class:"nav-item"},F=(0,o.createTextVNode)(" Home "),P=(0,o.createElementVNode)("li",{class:"nav-item"},[(0,o.createElementVNode)("a",{class:"nav-link text-black",href:"#"},"Store")],-1),I={class:"nav-item dropdown"},U=(0,o.createElementVNode)("a",{class:"nav-link text-black dropdown-toggle",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," Products ",-1),z={class:"dropdown-menu","aria-labelledby":"navbarDropdown"},J=(0,o.createElementVNode)("li",{class:"nav-item"},[(0,o.createElementVNode)("a",{class:"nav-link text-black",href:""},"Shop")],-1),q=(0,o.createElementVNode)("li",{class:"nav-item"},[(0,o.createElementVNode)("a",{class:"nav-link text-black",href:""},"Contact")],-1),Q={class:""},R={class:"list-unstyled d-flex align-items-center me-auto mb-2 mb-lg-0"},W=(0,o.createElementVNode)("li",{class:"nav-item"},[(0,o.createElementVNode)("a",{href:"",class:"nav-link text-black",type:"button","data-bs-toggle":"modal","data-bs-target":"#searchModal"},[(0,o.createElementVNode)("i",{class:"fa fa-search"})])],-1),G={class:"modal fade",id:"searchModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},K={class:"modal-dialog modal-dialog-centered modal-fullscreen"},X={class:"modal-content",style:{"background-color":"rgba(0,0,0, 0.4)","\x3c!-- backdrop-filter":"blur(3px) --\x3e"}},Y={class:"modal-body d-flex align-items-center justify-content-center"},ee=(0,o.createElementVNode)("button",{class:"btn me-2","data-bs-dismiss":"modal"},[(0,o.createElementVNode)("i",{class:"fa fa-x"})],-1),te=(0,o.createElementVNode)("i",{class:"fa fa-search text-black-50",style:{top:"13px"}},null,-1),ae={class:"nav-item"},oe={class:"position-relative"},ne=(0,o.createElementVNode)("i",{class:"fa-solid fa-shopping-cart"},null,-1),le={class:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary",style:{"font-size":"0.50em"}},re={key:0,class:"nav-item"},se=(0,o.createElementVNode)("a",{href:"#",class:"nav-link text-black",id:"loginDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"},[(0,o.createElementVNode)("i",{class:"fa fa-user-circle fs-5"})],-1),ce={class:"dropdown-menu","aria-labelledby":"loginDropdown"},ie=(0,o.createTextVNode)("Login"),de=(0,o.createTextVNode)("Register"),me={key:1,class:"nav-item"},ue={key:0,class:"dropdown"},fe={class:"btn dropdown-toggle",type:"button",id:"dropdownMenuButton1","data-bs-toggle":"dropdown","aria-expanded":"false"},pe=["src"],he={class:"dropdown-menu","aria-labelledby":"dropdownMenuButton1"},be={key:0},Ve=(0,o.createTextVNode)("Dashboard"),xe={key:1},Ne=(0,o.createTextVNode)("Profile"),ve=(0,o.createElementVNode)("li",{class:"dropdown-divider"},null,-1),ge=[(0,o.createElementVNode)("i",{class:"fa fa-sign-out me-2"},null,-1),(0,o.createTextVNode)("Logout ")];const ke={name:"Header-bottom",data:function(){return{isVerify:"",searchText:""}},computed:{role:function(){return localStorage.getItem("r%o%l%e")},user:function(){return this.$store.state.auth.user},categories:function(){return this.$store.state.categories}},created:function(){var e=this;if(JSON.parse(localStorage.getItem("auth"))){var t=JSON.parse(localStorage.getItem("auth")).token;axios.get("/api/me",{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){e.isVerify=t.data.verify,!1===e.isVerify&&console.log(e.isVerify)})).catch((function(e){return e}))}},methods:{submit:function(){$("#modalBtn").click()},search:function(e){this.searchText&&this.$router.push({name:"products.search",params:{search:e}})}}},Ee={components:{HeaderBottom:(0,b.Z)(ke,[["render",function(e,t,a,n,l,r){var s=this,c=(0,o.resolveComponent)("router-link");return(0,o.openBlock)(),(0,o.createElementBlock)("nav",L,[(0,o.createElementVNode)("div",_,[(0,o.createElementVNode)("div",j,[Z,(0,o.createElementVNode)("div",A,[(0,o.createElementVNode)("ul",H,[(0,o.createElementVNode)("li",O,[(0,o.createVNode)(c,{class:"nav-link text-black",to:"/"},{default:(0,o.withCtx)((function(){return[F]})),_:1})]),P,(0,o.createElementVNode)("li",I,[U,(0,o.createElementVNode)("ul",z,[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(r.categories,(function(e){return(0,o.openBlock)(),(0,o.createElementBlock)("li",{key:e.id},[(0,o.createVNode)(c,{class:"dropdown-item",to:{name:"products.category",params:{category:e.slug}},textContent:(0,o.toDisplayString)(e.name)},null,8,["to","textContent"])])})),128))])]),J,q])]),(0,o.createElementVNode)("div",Q,[(0,o.createElementVNode)("ul",R,[W,(0,o.createElementVNode)("div",G,[(0,o.createElementVNode)("div",K,[(0,o.createElementVNode)("div",X,[(0,o.createElementVNode)("div",Y,[ee,(0,o.createElementVNode)("form",{class:"d-flex search-item me-2",onSubmit:t[1]||(t[1]=(0,o.withModifiers)((function(e){return r.submit()}),["prevent"]))},[(0,o.withDirectives)((0,o.createElementVNode)("input",{id:"searchBox",ref:"searchBox",class:"form-control form-control-lg me-2","onUpdate:modelValue":t[0]||(t[0]=function(e){return l.searchText=e}),placeholder:"Search",autofocus:""},null,512),[[o.vModelText,l.searchText]]),te],32),(0,o.createElementVNode)("button",{class:"btn btn-primary text-white",onClick:t[2]||(t[2]=function(e){return r.search(l.searchText)}),id:"modalBtn","data-bs-dismiss":"modal"},"Search")])])])]),(0,o.createElementVNode)("li",ae,[(0,o.createVNode)(c,{to:"/cart",class:"nav-link text-black"},{default:(0,o.withCtx)((function(){return[(0,o.createElementVNode)("div",oe,[ne,(0,o.createElementVNode)("span",le,(0,o.toDisplayString)(s.$store.state.cartCount),1)])]})),_:1})]),l.isVerify?(0,o.createCommentVNode)("",!0):((0,o.openBlock)(),(0,o.createElementBlock)("li",re,[se,(0,o.createElementVNode)("ul",ce,[(0,o.createElementVNode)("li",null,[(0,o.createVNode)(c,{class:"dropdown-item",to:"/login"},{default:(0,o.withCtx)((function(){return[ie]})),_:1})]),(0,o.createElementVNode)("li",null,[(0,o.createVNode)(c,{class:"dropdown-item",to:"/register"},{default:(0,o.withCtx)((function(){return[de]})),_:1})])])])),l.isVerify?((0,o.openBlock)(),(0,o.createElementBlock)("li",me,[r.user?((0,o.openBlock)(),(0,o.createElementBlock)("div",ue,[(0,o.createElementVNode)("button",fe,[(0,o.createElementVNode)("img",{src:r.user.profile,class:"user-img rounded-circle shadow-sm",style:{width:"25px",height:"25px"},alt:""},null,8,pe)]),(0,o.createElementVNode)("ul",he,["admin"===r.role?((0,o.openBlock)(),(0,o.createElementBlock)("li",be,[(0,o.createVNode)(c,{class:"dropdown-item",to:{name:"dashboard"}},{default:(0,o.withCtx)((function(){return[Ve]})),_:1})])):(0,o.createCommentVNode)("",!0),"user"===r.role?((0,o.openBlock)(),(0,o.createElementBlock)("li",xe,[(0,o.createVNode)(c,{class:"dropdown-item",to:{name:"user.profile"}},{default:(0,o.withCtx)((function(){return[Ne]})),_:1},8,["to"])])):(0,o.createCommentVNode)("",!0),ve,(0,o.createElementVNode)("li",null,[(0,o.createElementVNode)("button",{class:"btn dropdown-item",onClick:t[3]||(t[3]=function(e){return s.$store.dispatch("logout")})},ge)])])])):(0,o.createCommentVNode)("",!0)])):(0,o.createCommentVNode)("",!0)])])])])])}]]),HeaderTop:M,Footer:V}},ye=(0,b.Z)(Ee,[["render",function(e,t,a,n,l,r){var s=(0,o.resolveComponent)("HeaderTop"),c=(0,o.resolveComponent)("HeaderBottom"),i=(0,o.resolveComponent)("Footer");return(0,o.openBlock)(),(0,o.createElementBlock)("div",null,[(0,o.createVNode)(s),(0,o.createVNode)(c),(0,o.renderSlot)(e.$slots,"default"),(0,o.createVNode)(i)])}]])}}]);
//# sourceMappingURL=159.js.map