var Rn=Object.defineProperty;var Zn=(e,t,n)=>t in e?Rn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var _t=(e,t,n)=>(Zn(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(i){if(i.ep)return;i.ep=!0;const c=n(i);fetch(i.href,c)}})();function L(){}function zn(e){return e()}function In(){return Object.create(null)}function he(e){e.forEach(zn)}function Un(e){return typeof e=="function"}function Xe(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let Ke;function W(e,t){return e===t?!0:(Ke||(Ke=document.createElement("a")),Ke.href=t,e===Ke.href)}function Jn(e){return Object.keys(e).length===0}function xn(e,...t){if(e==null){for(const o of t)o(void 0);return L}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function Dt(e,t,n){e.$$.on_destroy.push(xn(t,n))}function On(e){return e??""}function s(e,t){e.appendChild(t)}function O(e,t,n){e.insertBefore(t,n||null)}function M(e){e.parentNode&&e.parentNode.removeChild(e)}function Hn(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function l(e){return document.createElement(e)}function b(e){return document.createTextNode(e)}function w(){return b(" ")}function Kn(){return b("")}function X(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function f(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Gn(e){return e===""?null:+e}function Wn(e){return Array.from(e.childNodes)}function I(e,t){t=""+t,e.data!==t&&(e.data=t)}function Nn(e,t){e.value=t??""}let Fe;function Se(e){Fe=e}function Xn(){if(!Fe)throw new Error("Function called outside component initialization");return Fe}function Yn(e){Xn().$$.on_mount.push(e)}const ge=[],$t=[];let me=[];const Pn=[],Qn=Promise.resolve();let St=!1;function eo(){St||(St=!0,Qn.then(qn))}function Ct(e){me.push(e)}const bt=new Set;let fe=0;function qn(){if(fe!==0)return;const e=Fe;do{try{for(;fe<ge.length;){const t=ge[fe];fe++,Se(t),to(t.$$)}}catch(t){throw ge.length=0,fe=0,t}for(Se(null),ge.length=0,fe=0;$t.length;)$t.pop()();for(let t=0;t<me.length;t+=1){const n=me[t];bt.has(n)||(bt.add(n),n())}me.length=0}while(ge.length);for(;Pn.length;)Pn.pop()();St=!1,bt.clear(),Se(e)}function to(e){if(e.fragment!==null){e.update(),he(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Ct)}}function no(e){const t=[],n=[];me.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),me=t}const Ge=new Set;let ie;function oo(){ie={r:0,c:[],p:ie}}function so(){ie.r||he(ie.c),ie=ie.p}function Ce(e,t){e&&e.i&&(Ge.delete(e),e.i(t))}function We(e,t,n,o){if(e&&e.o){if(Ge.has(e))return;Ge.add(e),ie.c.push(()=>{Ge.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}else o&&o()}function kn(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function Vn(e){e&&e.c()}function Mt(e,t,n){const{fragment:o,after_update:i}=e.$$;o&&o.m(t,n),Ct(()=>{const c=e.$$.on_mount.map(zn).filter(Un);e.$$.on_destroy?e.$$.on_destroy.push(...c):he(c),e.$$.on_mount=[]}),i.forEach(Ct)}function Tt(e,t){const n=e.$$;n.fragment!==null&&(no(n.after_update),he(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function io(e,t){e.$$.dirty[0]===-1&&(ge.push(e),eo(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function It(e,t,n,o,i,c,r=null,u=[-1]){const v=Fe;Se(e);const a=e.$$={fragment:null,ctx:[],props:c,update:L,not_equal:i,bound:In(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(v?v.$$.context:[])),callbacks:In(),dirty:u,skip_bound:!1,root:t.target||v.$$.root};r&&r(a.root);let F=!1;if(a.ctx=n?n(e,t.props||{},(d,h,...$)=>{const D=$.length?$[0]:h;return a.ctx&&i(a.ctx[d],a.ctx[d]=D)&&(!a.skip_bound&&a.bound[d]&&a.bound[d](D),F&&io(e,d)),h}):[],a.update(),F=!0,he(a.before_update),a.fragment=o?o(a.ctx):!1,t.target){if(t.hydrate){const d=Wn(t.target);a.fragment&&a.fragment.l(d),d.forEach(M)}else a.fragment&&a.fragment.c();t.intro&&Ce(e.$$.fragment),Mt(e,t.target,t.anchor),qn()}Se(v)}class Ot{constructor(){_t(this,"$$");_t(this,"$$set")}$destroy(){Tt(this,1),this.$destroy=L}$on(t,n){if(!Un(n))return L;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const i=o.indexOf(n);i!==-1&&o.splice(i,1)}}$set(t){this.$$set&&!Jn(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const co="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(co);const de=[];function Nt(e,t=L){let n;const o=new Set;function i(u){if(Xe(e,u)&&(e=u,n)){const v=!de.length;for(const a of o)a[1](),de.push(a,e);if(v){for(let a=0;a<de.length;a+=2)de[a][0](de[a+1]);de.length=0}}}function c(u){i(u(e))}function r(u,v=L){const a=[u,v];return o.add(a),o.size===1&&(n=t(i,c)||L),u(e),()=>{o.delete(a),o.size===0&&n&&(n(),n=null)}}return{set:i,update:c,subscribe:r}}let En=0;const ro=3e3;function ao(){const{subscribe:e,update:t}=Nt([]);function n(i){En+=1;const c=En,r={...i,id:c};t(u=>[...u,r].slice(-5)),setTimeout(()=>{o(c)},ro)}function o(i){t(c=>c.filter(r=>r.id!==i))}return{subscribe:e,addNotification:n,closeNotification:o}}const ve=ao();function An(e,t,n){const o=e.slice();return o[2]=t[n],o}function Ln(e){let t,n,o=e[2].text+"",i,c,r,u,v,a,F;function d(){return e[1](e[2])}return{c(){t=l("div"),n=l("div"),i=b(o),c=w(),r=l("button"),r.textContent="X",u=w(),f(r,"class","svelte-1mipv5u"),f(t,"class",v=On(`notification ${e[2].type}`)+" svelte-1mipv5u")},m(h,$){O(h,t,$),s(t,n),s(n,i),s(t,c),s(t,r),s(t,u),a||(F=X(r,"click",d),a=!0)},p(h,$){e=h,$&1&&o!==(o=e[2].text+"")&&I(i,o),$&1&&v!==(v=On(`notification ${e[2].type}`)+" svelte-1mipv5u")&&f(t,"class",v)},d(h){h&&M(t),a=!1,F()}}}function lo(e){let t,n=kn(e[0]),o=[];for(let i=0;i<n.length;i+=1)o[i]=Ln(An(e,n,i));return{c(){t=l("div");for(let i=0;i<o.length;i+=1)o[i].c();f(t,"id","notifications-container"),f(t,"class","svelte-1mipv5u")},m(i,c){O(i,t,c);for(let r=0;r<o.length;r+=1)o[r]&&o[r].m(t,null)},p(i,[c]){if(c&1){n=kn(i[0]);let r;for(r=0;r<n.length;r+=1){const u=An(i,n,r);o[r]?o[r].p(u,c):(o[r]=Ln(u),o[r].c(),o[r].m(t,null))}for(;r<o.length;r+=1)o[r].d(1);o.length=n.length}},i:L,o:L,d(i){i&&M(t),Hn(o,i)}}}function uo(e,t,n){let o;return Dt(e,ve,c=>n(0,o=c)),[o,c=>ve.closeNotification(c.id)]}class fo extends Ot{constructor(t){super(),It(this,t,uo,lo,Xe,{})}}const po="https://yup.perfdive.com/api",Ye=async(e,t)=>{const n=await fetch(`${po}${e}`,t);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return n},go=async e=>{try{return await Ye("/log",{method:"POST",headers:{"Content-Type":"application/json",device:localStorage.getItem("deviceAlias"),event:"trackCapabilities"},body:JSON.stringify(e)})}catch(t){console.error(t),ve.addNotification({text:"sendTrackCapabilities failed, "+t.message,type:"error"})}},mo=async e=>{try{return await Ye("/log",{method:"POST",headers:{"Content-Type":"application/json",device:localStorage.getItem("deviceAlias"),event:"trackSettings"},body:JSON.stringify(e)})}catch(t){console.error(t),ve.addNotification({text:"sendTrackSettings failed, "+t.message,type:"error"})}},Ft=async(e,t)=>{try{return await Ye("/log",{method:"POST",headers:{"Content-Type":"application/json",device:localStorage.getItem("deviceAlias"),event:e},body:JSON.stringify(t)})}catch(n){console.error(n),ve.addNotification({text:`Send ${e} event failed, `+n.message,type:"error"})}},vo=async e=>{const t=new FormData;t.append("photo",e);try{const n=await Ye("/upload",{method:"POST",body:t,headers:{device:localStorage.getItem("deviceAlias"),event:"trackSettings"}})}catch(n){console.error(n),ve.addNotification({text:"sendPhoto failed, "+n.message,type:"error"})}},ho=e=>{const t=e.getCapabilities(),n=e.getSettings();return go(t),mo(n),{capabilities:t,canAutoFocus:()=>t.focusDistance&&t.focusMode&&(t==null?void 0:t.focusMode.includes("manual"))||!1,getFocusDistance:()=>{const{focusDistance:d}=t;return d&&(d.max-d.min)/d.step,d},getSettings:()=>e.getSettings(),setFocusMode:d=>e.applyConstraints({advanced:[{focusMode:d}]}),setFocusDistance:d=>e.applyConstraints({advanced:[{focusMode:"manual",focusDistance:d}]}),setTorch:d=>{t.torch&&e.applyConstraints({advanced:[{torch:d}]})},settings:n,setFocusDistancePct:async d=>{const{focusDistance:h}=t;if(!h){alert("Focus distance not supported");return}const $=(h.max-h.min)/100,D=h.min+$*d;try{await e.applyConstraints({advanced:[{focusMode:"manual",focusDistance:D}]})}catch(p){alert(p.message),console.error(p)}return D},setZoom:d=>e.applyConstraints({advanced:[{zoom:d}]})}},_o=.1;let pe;const bo=({file:e,volume:t})=>{pe==null||pe.pause(),pe=new Audio(`public/sounds/${e}.ogg`),pe.volume=t||_o,pe.play()};function wo(){const e=["grabFrame","videoCapture"];let t="videoCapture",n=0,o=0,i=0,c=0,r=0,u,v=!1,a=null,F,d,h;function $(_,y,T,C){h=_,F=new ImageCapture(y),d=new BarcodeDetector({formats:["pdf417"]})}async function D(){if(t==="grabFrame")return F.grabFrame();if(t==="videoCapture")return h;if(t==="takePhoto"){const _=await F.takePhoto(),y=new Image;return y.src=URL.createObjectURL(_),await new Promise(T=>{y.onload=T}),y}}async function p(){const _=await D();return await d.detect(_)}async function S(){try{const _=await F.grabFrame(),y=document.createElement("canvas"),T=y.getContext("2d");y.width=_.width,y.height=_.height,T.drawImage(_,0,0),y.toBlob(C=>{vo(C)})}catch(_){console.log(_)}}function N(_){const y=Date.now()-_;c+=1,r=c>1?(r*(c-1)+y)/c:y,A(T=>({...T,scanCount:c,average:r}))}async function z(){try{const _=Date.now(),y=await p();if(v)return;N(_),y.length>0?(Ft("barcode",y[0].rawValue),n+=1,a=y[0].rawValue,A(T=>({...T,barcode:a,success:n})),bo({file:"Ceres",volume:1})):(o+=1,A(T=>({...T,fail:o})))}catch(_){i+=1,A(y=>({...y,error:i})),console.log(_)}finally{setTimeout(z,100)}}function R(){v=!0,clearInterval(u)}const{subscribe:Y,update:A}=Nt({mode:t,success:n,fail:o,barcode:a,scanCount:c,error:i,average:r,toggleMode:()=>{const y=(e.indexOf(t)+1)%e.length;t=e[y],A(T=>({...T,mode:t}))},resetStats:()=>{n=0,o=0},resetBarcode:()=>{a=null}});return{init:$,subscribe:Y,toggleMode:()=>A(_=>({..._,mode:e[(e.indexOf(_.mode)+1)%e.length]})),resetStats:()=>A(_=>({..._,success:0,fail:0,error:0,scanCount:0,average:0})),resetBarcode:()=>A(_=>({..._,barcode:null})),stop:R,start:()=>{v=!1,z(),u=setInterval(S,5e3)}}}function yo(e){var Yt,Qt,en,tn,nn,on,sn,cn,rn,an,ln,un,fn,dn,pn;let t,n,o,i=e[1].scanCount+"",c,r,u,v,a=e[1].average.toFixed(2)+"",F,d,h,$,D=e[1].fail+"",p,S,N,z,R=e[1].success+"",Y,A,_,y,T=((Yt=e[8])==null?void 0:Yt.exposureTime)+"",C,j,U,P,k=((Qt=e[8])==null?void 0:Qt.contrast)+"",B,x,Z,H,J=((en=e[8])==null?void 0:en.exposureMode)+"",ce,_e,Q,Pt,De=((tn=e[8])==null?void 0:tn.height)+"",Qe,kt,Me,Et,Te=((nn=e[8])==null?void 0:nn.width)+"",et,At,Ie,Lt,Oe=((on=e[8])==null?void 0:on.resizeMode)+"",tt,Bt,Ne,jt,Pe=((sn=e[8])==null?void 0:sn.saturation)+"",nt,zt,ke,Ut,Ee=((cn=e[8])==null?void 0:cn.sharpness)+"",ot,st,K,it,Ae,ct,q,re,be,ee,Le,qt,rt,Vt,ae,E,Be,Rt,G,at,je=((ln=(an=(rn=e[0])==null?void 0:rn.capabilities)==null?void 0:an.focusDistance)==null?void 0:ln.min.toFixed(2))+"",lt,Zt,ut,ze=(e[3]?e[3].toFixed(2):"-")+"",ft,Jt,dt,Ue=((dn=(fn=(un=e[0])==null?void 0:un.capabilities)==null?void 0:fn.focusDistance)==null?void 0:dn.max.toFixed(2))+"",pt,xt,le,we,te,qe,Ht,gt,mt,V,Ve,ne,oe,Re,Ze,Kt,Je,Gt,ue,xe=((pn=e[1])==null?void 0:pn.mode)+"",vt,Wt,ye,se,He,ht,Xt;return{c(){var g;t=l("div"),n=l("div"),o=b("Scan count: "),c=b(i),r=w(),u=l("div"),v=b("Average: "),F=b(a),d=w(),h=l("div"),$=b("Fail: "),p=b(D),S=w(),N=l("div"),z=b("Success: "),Y=b(R),A=w(),_=l("div"),y=b("exposureTime: "),C=b(T),j=w(),U=l("div"),P=b("Contrast "),B=b(k),x=w(),Z=l("div"),H=b("exposureMode: "),ce=b(J),_e=w(),Q=l("div"),Pt=b("height: "),Qe=b(De),kt=w(),Me=l("div"),Et=b("width: "),et=b(Te),At=w(),Ie=l("div"),Lt=b("resizeMode: "),tt=b(Oe),Bt=w(),Ne=l("div"),jt=b("saturation: "),nt=b(Pe),zt=w(),ke=l("div"),Ut=b("sharpness: "),ot=b(Ee),st=w(),K=l("video"),K.innerHTML="",it=w(),Ae=l("div"),ct=w(),q=l("div"),re=l("div"),be=l("button"),ee=l("img"),qt=w(),rt=b(e[7]),Vt=w(),ae=l("div"),E=l("input"),Rt=w(),G=l("div"),at=l("span"),lt=b(je),Zt=w(),ut=l("span"),ft=b(ze),Jt=w(),dt=l("span"),pt=b(Ue),xt=w(),le=l("div"),we=l("button"),te=l("img"),Ht=w(),gt=b(e[4]),mt=w(),V=l("div"),Ve=l("div"),ne=l("button"),oe=l("img"),Kt=w(),Je=l("div"),Je.textContent="build 2024-04-04T10:34:01.201Z",Gt=w(),ue=l("div"),vt=b(xe),Wt=w(),ye=l("button"),se=l("img"),f(t,"class","stats svelte-19f2afo"),K.autoplay=!0,f(K,"id","stream"),f(K,"class","svelte-19f2afo"),f(Ae,"class","overlay svelte-19f2afo"),W(ee.src,Le=`public/${e[7]}-focus.svg`)||f(ee,"src",Le),f(ee,"class","svelte-19f2afo"),f(be,"class","svelte-19f2afo"),f(re,"class","focus__group svelte-19f2afo"),E.disabled=Be=e[7]==="continuous",f(E,"id","zoom__range"),f(E,"type","range"),f(E,"min","0"),f(E,"max","100"),f(E,"class","svelte-19f2afo"),f(G,"class","focus__range svelte-19f2afo"),f(ae,"class","focus__group grow svelte-19f2afo"),W(te.src,qe=`public/${e[4]}-facingMode.svg`)||f(te,"src",qe),f(te,"class","svelte-19f2afo"),f(we,"class","svelte-19f2afo"),f(le,"class","focus__group svelte-19f2afo"),f(q,"id","focus"),f(q,"class","svelte-19f2afo"),W(oe.src,Re=`public/torch-${e[5]?"on":"off"}.svg`)||f(oe,"src",Re),f(oe,"class","svelte-19f2afo"),ne.disabled=Ze=!e[0]||!e[0].capabilities.torch,f(ne,"class","svelte-19f2afo"),f(Ve,"class","focus__group svelte-19f2afo"),f(Je,"class","build svelte-19f2afo"),W(se.src,He=`public/mode-${(g=e[1])==null?void 0:g.mode}.svg`)||f(se,"src",He),f(se,"class","svelte-19f2afo"),f(ye,"class","svelte-19f2afo"),f(ue,"class","focus__group svelte-19f2afo"),f(V,"id","toggles"),f(V,"class","svelte-19f2afo")},m(g,m){var $e;O(g,t,m),s(t,n),s(n,o),s(n,c),s(t,r),s(t,u),s(u,v),s(u,F),s(t,d),s(t,h),s(h,$),s(h,p),s(t,S),s(t,N),s(N,z),s(N,Y),s(t,A),s(t,_),s(_,y),s(_,C),s(t,j),s(t,U),s(U,P),s(U,B),s(t,x),s(t,Z),s(Z,H),s(Z,ce),s(t,_e),s(t,Q),s(Q,Pt),s(Q,Qe),s(t,kt),s(t,Me),s(Me,Et),s(Me,et),s(t,At),s(t,Ie),s(Ie,Lt),s(Ie,tt),s(t,Bt),s(t,Ne),s(Ne,jt),s(Ne,nt),s(t,zt),s(t,ke),s(ke,Ut),s(ke,ot),O(g,st,m),O(g,K,m),e[14](K),O(g,it,m),O(g,Ae,m),O(g,ct,m),O(g,q,m),s(q,re),s(re,be),s(be,ee),s(re,qt),s(re,rt),s(q,Vt),s(q,ae),s(ae,E),Nn(E,e[2]),s(ae,Rt),s(ae,G),s(G,at),s(at,lt),s(G,Zt),s(G,ut),s(ut,ft),s(G,Jt),s(G,dt),s(dt,pt),s(q,xt),s(q,le),s(le,we),s(we,te),s(le,Ht),s(le,gt),O(g,mt,m),O(g,V,m),s(V,Ve),s(Ve,ne),s(ne,oe),s(V,Kt),s(V,Je),s(V,Gt),s(V,ue),s(ue,vt),s(ue,Wt),s(ue,ye),s(ye,se),ht||(Xt=[X(be,"click",e[12]),X(E,"change",e[15]),X(E,"input",e[15]),X(E,"change",e[9]),X(we,"click",e[13]),X(ne,"click",e[10]),X(ye,"click",($e=e[11])==null?void 0:$e.toggleMode)],ht=!0)},p(g,[m]){var $e,gn,mn,vn,hn,_n,bn,wn,yn,$n,Sn,Cn,Fn,Dn,Mn,Tn;m&2&&i!==(i=g[1].scanCount+"")&&I(c,i),m&2&&a!==(a=g[1].average.toFixed(2)+"")&&I(F,a),m&2&&D!==(D=g[1].fail+"")&&I(p,D),m&2&&R!==(R=g[1].success+"")&&I(Y,R),m&256&&T!==(T=(($e=g[8])==null?void 0:$e.exposureTime)+"")&&I(C,T),m&256&&k!==(k=((gn=g[8])==null?void 0:gn.contrast)+"")&&I(B,k),m&256&&J!==(J=((mn=g[8])==null?void 0:mn.exposureMode)+"")&&I(ce,J),m&256&&De!==(De=((vn=g[8])==null?void 0:vn.height)+"")&&I(Qe,De),m&256&&Te!==(Te=((hn=g[8])==null?void 0:hn.width)+"")&&I(et,Te),m&256&&Oe!==(Oe=((_n=g[8])==null?void 0:_n.resizeMode)+"")&&I(tt,Oe),m&256&&Pe!==(Pe=((bn=g[8])==null?void 0:bn.saturation)+"")&&I(nt,Pe),m&256&&Ee!==(Ee=((wn=g[8])==null?void 0:wn.sharpness)+"")&&I(ot,Ee),m&128&&!W(ee.src,Le=`public/${g[7]}-focus.svg`)&&f(ee,"src",Le),m&128&&I(rt,g[7]),m&128&&Be!==(Be=g[7]==="continuous")&&(E.disabled=Be),m&4&&Nn(E,g[2]),m&1&&je!==(je=((Sn=($n=(yn=g[0])==null?void 0:yn.capabilities)==null?void 0:$n.focusDistance)==null?void 0:Sn.min.toFixed(2))+"")&&I(lt,je),m&8&&ze!==(ze=(g[3]?g[3].toFixed(2):"-")+"")&&I(ft,ze),m&1&&Ue!==(Ue=((Dn=(Fn=(Cn=g[0])==null?void 0:Cn.capabilities)==null?void 0:Fn.focusDistance)==null?void 0:Dn.max.toFixed(2))+"")&&I(pt,Ue),m&16&&!W(te.src,qe=`public/${g[4]}-facingMode.svg`)&&f(te,"src",qe),m&16&&I(gt,g[4]),m&32&&!W(oe.src,Re=`public/torch-${g[5]?"on":"off"}.svg`)&&f(oe,"src",Re),m&1&&Ze!==(Ze=!g[0]||!g[0].capabilities.torch)&&(ne.disabled=Ze),m&2&&xe!==(xe=((Mn=g[1])==null?void 0:Mn.mode)+"")&&I(vt,xe),m&2&&!W(se.src,He=`public/mode-${(Tn=g[1])==null?void 0:Tn.mode}.svg`)&&f(se,"src",He)},i:L,o:L,d(g){g&&(M(t),M(st),M(K),M(it),M(Ae),M(ct),M(q),M(mt),M(V)),e[14](null),ht=!1,he(Xt)}}}function $o(e,t,n){let o,i=0,c,r="environment",u=!1;async function v(C){console.log(C.target.value),n(2,i=C.target.value);const j=await(p==null?void 0:p.setFocusDistancePct(i));n(3,c=j||void 0)}async function a(){n(5,u=!u),await(p==null?void 0:p.setTorch(u))}const F=async()=>{const j=(await navigator.mediaDevices.enumerateDevices()).filter(({kind:P})=>P==="videoinput");Ft("cameras",j),console.log("cameras",j);let U=[];for await(const P of j){const k=P.deviceId;try{const B=await navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:k},facingMode:{exact:"environment"}},audio:!1}),x=B.getTracks()[0],Z=x.getConstraints(),H=x.getCapabilities();B.getTracks().forEach(J=>J.stop()),k===H.deviceId&&U.push({camera:P,constraints:Z,capabilities:H})}catch(B){console.log("error",B),console.log(B)}}return U.sort((P,k)=>{var B,x,Z,H,J,ce,_e,Q;return(((x=(B=k==null?void 0:k.capabilities)==null?void 0:B.width)==null?void 0:x.max)||0)*(((H=(Z=k==null?void 0:k.capabilities)==null?void 0:Z.height)==null?void 0:H.max)||0)-(((ce=(J=P==null?void 0:P.capabilities)==null?void 0:J.width)==null?void 0:ce.max)||0)*(((Q=(_e=P==null?void 0:P.capabilities)==null?void 0:_e.height)==null?void 0:Q.max)||0)}),console.log("validCameras",U),Ft("validCameras",U),U[0].capabilities.deviceId},d=C=>navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:C},facingMode:r,aspectRatio:{exact:1.7777777778}},audio:!1});let h,$,D,p,S=wo();Dt(e,S,C=>n(1,o=C));const N=["continuous","manual"];let z="continuous";const R=async C=>{try{D==null||D.stop(),S==null||S.stop(),$=await d(C),D=$.getVideoTracks()[0],n(6,h.srcObject=$,h),n(0,p=ho(D)),S.init(h,D,h.width,h.height),S.start()}catch(j){console.log("error",j),alert("Could not access the camera")}},Y=async()=>{const C=N[N.indexOf(z)+1]||N[0];try{await p.setFocusMode(z),n(7,z=C)}catch{alert("Could not set focus mode")}},A=async()=>{const C=await F();n(4,r=r==="environment"?"user":"environment"),await R(C)};Yn(()=>((async()=>{const C=await F();await R(C)})(),()=>S==null?void 0:S.stop()));let _;function y(C){$t[C?"unshift":"push"](()=>{h=C,n(6,h)})}function T(){i=Gn(this.value),n(2,i)}return e.$$.update=()=>{e.$$.dirty&3&&(o==null||o.scanCount,n(8,_=p==null?void 0:p.getSettings()))},[p,o,i,c,r,u,h,z,_,v,a,S,Y,A,y,T]}class So extends Ot{constructor(t){super(),It(this,t,$o,yo,Xe,{})}}const wt="deviceAlias",Co=()=>{const{subscribe:e,set:t}=Nt(localStorage.getItem(wt));return{subscribe:e,ask:()=>{if(localStorage.getItem(wt))return;let n=prompt("Please input your device alias","device");n?(localStorage.setItem(wt,n),t(n)):alert("You must provide a device alias")}}},Bn=Co();function Fo(e){let t;return{c(){t=l("h1"),t.textContent="BarcodeDetector not supported."},m(n,o){O(n,t,o)},d(n){n&&M(t)}}}function Do(e){let t;return{c(){t=l("h1"),t.textContent="Waiting for device alias..."},m(n,o){O(n,t,o)},i:L,o:L,d(n){n&&M(t)}}}function Mo(e){let t,n;return t=new So({}),{c(){Vn(t.$$.fragment)},m(o,i){Mt(t,o,i),n=!0},i(o){n||(Ce(t.$$.fragment,o),n=!0)},o(o){We(t.$$.fragment,o),n=!1},d(o){Tt(t,o)}}}function To(e){let t,n,o,i,c,r,u,v,a,F;o=new fo({});let d=!e[1]&&Fo();const h=[Mo,Do],$=[];function D(p,S){return p[0]?0:1}return u=D(e),v=$[u]=h[u](e),{c(){t=l("meta"),n=w(),Vn(o.$$.fragment),i=w(),c=l("main"),d&&d.c(),r=w(),v.c(),a=Kn(),f(t,"name","viewport"),f(t,"content","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")},m(p,S){s(document.head,t),O(p,n,S),Mt(o,p,S),O(p,i,S),O(p,c,S),d&&d.m(c,null),O(p,r,S),$[u].m(p,S),O(p,a,S),F=!0},p(p,[S]){let N=u;u=D(p),u!==N&&(oo(),We($[N],1,1,()=>{$[N]=null}),so(),v=$[u],v||(v=$[u]=h[u](p),v.c()),Ce(v,1),v.m(a.parentNode,a))},i(p){F||(Ce(o.$$.fragment,p),Ce(v),F=!0)},o(p){We(o.$$.fragment,p),We(v),F=!1},d(p){p&&(M(n),M(i),M(c),M(r),M(a)),M(t),Tt(o,p),d&&d.d(),$[u].d(p)}}}function Io(e,t,n){let o;Dt(e,Bn,c=>n(0,o=c));const i=typeof BarcodeDetector<"u";return Bn.ask(),[o,i]}class Oo extends Ot{constructor(t){super(),It(this,t,Io,To,Xe,{})}}const yt="0.0.11",jn=localStorage.getItem("version");yt!==jn&&(localStorage.setItem("version",yt),alert(`New version detected ${jn}>${yt}!`));new Oo({target:document.getElementById("app")});
