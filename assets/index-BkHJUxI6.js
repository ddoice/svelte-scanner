var Rn=Object.defineProperty;var Vn=(e,t,n)=>t in e?Rn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ft=(e,t,n)=>(Vn(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();function P(){}function Bn(e){return e()}function Tn(){return Object.create(null)}function ie(e){e.forEach(Bn)}function zn(e){return typeof e=="function"}function Ze(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let Ue;function U(e,t){return e===t?!0:(Ue||(Ue=document.createElement("a")),Ue.href=t,e===Ue.href)}function Zn(e){return Object.keys(e).length===0}function Hn(e,...t){if(e==null){for(const o of t)o(void 0);return P}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function bt(e,t,n){e.$$.on_destroy.push(Hn(t,n))}function qn(e){return e??""}function s(e,t){e.appendChild(t)}function q(e,t,n){e.insertBefore(t,n||null)}function D(e){e.parentNode&&e.parentNode.removeChild(e)}function Jn(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function a(e){return document.createElement(e)}function h(e){return document.createTextNode(e)}function b(){return h(" ")}function Kn(){return h("")}function R(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function f(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Wn(e){return e===""?null:+e}function Xn(e){return Array.from(e.childNodes)}function M(e,t){t=""+t,e.data!==t&&(e.data=t)}function In(e,t){e.value=t??""}let fe;function ae(e){fe=e}function Yn(){if(!fe)throw new Error("Function called outside component initialization");return fe}function Gn(e){Yn().$$.on_mount.push(e)}const oe=[],vt=[];let se=[];const On=[],Qn=Promise.resolve();let ht=!1;function xn(){ht||(ht=!0,Qn.then(jn))}function _t(e){se.push(e)}const pt=new Set;let ee=0;function jn(){if(ee!==0)return;const e=fe;do{try{for(;ee<oe.length;){const t=oe[ee];ee++,ae(t),eo(t.$$)}}catch(t){throw oe.length=0,ee=0,t}for(ae(null),oe.length=0,ee=0;vt.length;)vt.pop()();for(let t=0;t<se.length;t+=1){const n=se[t];pt.has(n)||(pt.add(n),n())}se.length=0}while(oe.length);for(;On.length;)On.pop()();ht=!1,pt.clear(),ae(e)}function eo(e){if(e.fragment!==null){e.update(),ie(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(_t)}}function to(e){const t=[],n=[];se.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),se=t}const Re=new Set;let X;function no(){X={r:0,c:[],p:X}}function oo(){X.r||ie(X.c),X=X.p}function de(e,t){e&&e.i&&(Re.delete(e),e.i(t))}function Ve(e,t,n,o){if(e&&e.o){if(Re.has(e))return;Re.add(e),X.c.push(()=>{Re.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}else o&&o()}function Nn(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function Un(e){e&&e.c()}function wt(e,t,n){const{fragment:o,after_update:i}=e.$$;o&&o.m(t,n),_t(()=>{const l=e.$$.on_mount.map(Bn).filter(zn);e.$$.on_destroy?e.$$.on_destroy.push(...l):ie(l),e.$$.on_mount=[]}),i.forEach(_t)}function yt(e,t){const n=e.$$;n.fragment!==null&&(to(n.after_update),ie(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function so(e,t){e.$$.dirty[0]===-1&&(oe.push(e),xn(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function $t(e,t,n,o,i,l,c=null,d=[-1]){const v=fe;ae(e);const r=e.$$={fragment:null,ctx:[],props:l,update:P,not_equal:i,bound:Tn(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(v?v.$$.context:[])),callbacks:Tn(),dirty:d,skip_bound:!1,root:t.target||v.$$.root};c&&c(r.root);let F=!1;if(r.ctx=n?n(e,t.props||{},(u,S,...w)=>{const $=w.length?w[0]:S;return r.ctx&&i(r.ctx[u],r.ctx[u]=$)&&(!r.skip_bound&&r.bound[u]&&r.bound[u]($),F&&so(e,u)),S}):[],r.update(),F=!0,ie(r.before_update),r.fragment=o?o(r.ctx):!1,t.target){if(t.hydrate){const u=Xn(t.target);r.fragment&&r.fragment.l(u),u.forEach(D)}else r.fragment&&r.fragment.c();t.intro&&de(e.$$.fragment),wt(e,t.target,t.anchor),jn()}ae(v)}class St{constructor(){ft(this,"$$");ft(this,"$$set")}$destroy(){yt(this,1),this.$destroy=P}$on(t,n){if(!zn(n))return P;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const i=o.indexOf(n);i!==-1&&o.splice(i,1)}}$set(t){this.$$set&&!Zn(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const io="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(io);const te=[];function Ct(e,t=P){let n;const o=new Set;function i(d){if(Ze(e,d)&&(e=d,n)){const v=!te.length;for(const r of o)r[1](),te.push(r,e);if(v){for(let r=0;r<te.length;r+=2)te[r][0](te[r+1]);te.length=0}}}function l(d){i(d(e))}function c(d,v=P){const r=[d,v];return o.add(r),o.size===1&&(n=t(i,l)||P),d(e),()=>{o.delete(r),o.size===0&&n&&(n(),n=null)}}return{set:i,update:l,subscribe:c}}let Pn=0;const lo=3e3;function co(){const{subscribe:e,update:t}=Ct([]);function n(i){Pn+=1;const l=Pn,c={...i,id:l};t(d=>[...d,c].slice(-5)),setTimeout(()=>{o(l)},lo)}function o(i){t(l=>l.filter(c=>c.id!==i))}return{subscribe:e,addNotification:n,closeNotification:o}}const pe=co();function En(e,t,n){const o=e.slice();return o[2]=t[n],o}function kn(e){let t,n,o=e[2].text+"",i,l,c,d,v,r,F;function u(){return e[1](e[2])}return{c(){t=a("div"),n=a("div"),i=h(o),l=b(),c=a("button"),c.textContent="X",d=b(),f(c,"class","svelte-1mipv5u"),f(t,"class",v=qn(`notification ${e[2].type}`)+" svelte-1mipv5u")},m(S,w){q(S,t,w),s(t,n),s(n,i),s(t,l),s(t,c),s(t,d),r||(F=R(c,"click",u),r=!0)},p(S,w){e=S,w&1&&o!==(o=e[2].text+"")&&M(i,o),w&1&&v!==(v=qn(`notification ${e[2].type}`)+" svelte-1mipv5u")&&f(t,"class",v)},d(S){S&&D(t),r=!1,F()}}}function ro(e){let t,n=Nn(e[0]),o=[];for(let i=0;i<n.length;i+=1)o[i]=kn(En(e,n,i));return{c(){t=a("div");for(let i=0;i<o.length;i+=1)o[i].c();f(t,"id","notifications-container"),f(t,"class","svelte-1mipv5u")},m(i,l){q(i,t,l);for(let c=0;c<o.length;c+=1)o[c]&&o[c].m(t,null)},p(i,[l]){if(l&1){n=Nn(i[0]);let c;for(c=0;c<n.length;c+=1){const d=En(i,n,c);o[c]?o[c].p(d,l):(o[c]=kn(d),o[c].c(),o[c].m(t,null))}for(;c<o.length;c+=1)o[c].d(1);o.length=n.length}},i:P,o:P,d(i){i&&D(t),Jn(o,i)}}}function uo(e,t,n){let o;return bt(e,pe,l=>n(0,o=l)),[o,l=>pe.closeNotification(l.id)]}class ao extends St{constructor(t){super(),$t(this,t,uo,ro,Ze,{})}}const fo="https://yup.perfdive.com/api",Ft=async(e,t)=>{const n=await fetch(`${fo}${e}`,t);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return n},po=async e=>{try{return await Ft("/log",{method:"POST",headers:{"Content-Type":"application/json",device:localStorage.getItem("deviceAlias"),event:"trackCapabilities"},body:JSON.stringify(e)})}catch(t){console.error(t),pe.addNotification({text:"sendTrackCapabilities failed, "+t.message,type:"error"})}},go=async e=>{try{return await Ft("/log",{method:"POST",headers:{"Content-Type":"application/json",device:localStorage.getItem("deviceAlias"),event:"trackSettings"},body:JSON.stringify(e)})}catch(t){console.error(t),pe.addNotification({text:"sendTrackSettings failed, "+t.message,type:"error"})}},mo=async e=>{const t=new FormData;t.append("photo",e);try{const n=await Ft("/upload",{method:"POST",body:t,headers:{device:localStorage.getItem("deviceAlias"),event:"trackSettings"}})}catch(n){console.error(n),pe.addNotification({text:"sendPhoto failed, "+n.message,type:"error"})}},vo=e=>{const t=e.getCapabilities(),n=e.getSettings();return po(t),go(n),{capabilities:t,canAutoFocus:()=>t.focusDistance&&t.focusMode&&(t==null?void 0:t.focusMode.includes("manual"))||!1,getFocusDistance:()=>{const{focusDistance:u}=t;return u&&(u.max-u.min)/u.step,u},getSettings:()=>e.getSettings(),setFocusMode:u=>e.applyConstraints({advanced:[{focusMode:u}]}),setFocusDistance:u=>e.applyConstraints({advanced:[{focusMode:"manual",focusDistance:u}]}),setTorch:u=>{t.torch&&e.applyConstraints({advanced:[{torch:u}]})},settings:n,setFocusDistancePct:async u=>{const{focusDistance:S}=t;if(!S){alert("Focus distance not supported");return}const w=(S.max-S.min)/100,$=S.min+w*u;try{await e.applyConstraints({advanced:[{focusMode:"manual",focusDistance:$}]})}catch(g){alert(g.message),console.error(g)}return $},setZoom:u=>e.applyConstraints({advanced:[{zoom:u}]})}},ho=.1;let ne;const _o=({file:e,volume:t})=>{ne==null||ne.pause(),ne=new Audio(`public/sounds/${e}.ogg`),ne.volume=t||ho,ne.play()};function bo(){const e=["grabFrame","videoCapture"];let t="videoCapture",n=0,o=0,i=0,l=0,c=0,d,v=!1,r=null,F,u,S;function w(_,C,y,A){S=_,F=new ImageCapture(C),u=new BarcodeDetector({formats:["pdf417"]})}async function $(){if(t==="grabFrame")return F.grabFrame();if(t==="videoCapture")return S;if(t==="takePhoto"){const _=await F.takePhoto(),C=new Image;return C.src=URL.createObjectURL(_),await new Promise(y=>{C.onload=y}),C}}async function g(){const _=await $();return await u.detect(_)}async function T(){try{const _=await F.grabFrame(),C=document.createElement("canvas"),y=C.getContext("2d");C.width=_.width,C.height=_.height,y.drawImage(_,0,0),C.toBlob(A=>{mo(A)})}catch(_){console.log(_)}}function I(_){const C=Date.now()-_;l+=1,c=l>1?(c*(l-1)+C)/l:C,O(y=>({...y,scanCount:l,average:c}))}async function L(){try{const _=Date.now(),C=await g();if(v)return;I(_),C.length>0?(n+=1,r=C[0].rawValue,O(y=>({...y,barcode:r,success:n})),_o({file:"Ceres",volume:1})):(o+=1,O(y=>({...y,fail:o})))}catch(_){i+=1,O(C=>({...C,error:i})),console.log(_)}finally{setTimeout(L,100)}}function B(){v=!0,clearInterval(d)}const{subscribe:V,update:O}=Ct({mode:t,success:n,fail:o,barcode:r,scanCount:l,error:i,average:c,toggleMode:()=>{const C=(e.indexOf(t)+1)%e.length;t=e[C],O(y=>({...y,mode:t}))},resetStats:()=>{n=0,o=0},resetBarcode:()=>{r=null}});return{init:w,subscribe:V,toggleMode:()=>O(_=>({..._,mode:e[(e.indexOf(_.mode)+1)%e.length]})),resetStats:()=>O(_=>({..._,success:0,fail:0,error:0,scanCount:0,average:0})),resetBarcode:()=>O(_=>({..._,barcode:null})),stop:B,start:()=>{v=!1,L(),d=setInterval(T,5e3)}}}function wo(e){var Gt,Qt,xt,en,tn,nn,on,sn,ln,cn,rn,un,an,dn,fn;let t,n,o,i=e[1].scanCount+"",l,c,d,v,r=e[1].average.toFixed(2)+"",F,u,S,w,$=e[1].fail+"",g,T,I,L,B=e[1].success+"",V,O,_,C,y=((Gt=e[8])==null?void 0:Gt.exposureTime)+"",A,Dt,ge,Mt,me=((Qt=e[8])==null?void 0:Qt.contrast)+"",He,Tt,ve,qt,he=((xt=e[8])==null?void 0:xt.exposureMode)+"",Je,It,_e,Ot,be=((en=e[8])==null?void 0:en.height)+"",Ke,Nt,we,Pt,ye=((tn=e[8])==null?void 0:tn.width)+"",We,Et,$e,kt,Se=((nn=e[8])==null?void 0:nn.resizeMode)+"",Xe,At,Ce,Lt,Fe=((on=e[8])==null?void 0:on.saturation)+"",Ye,Bt,De,zt,Me=((sn=e[8])==null?void 0:sn.sharpness)+"",Ge,Qe,z,xe,Te,et,E,Y,le,Z,qe,jt,tt,Ut,G,N,Ie,Rt,j,nt,Oe=((rn=(cn=(ln=e[0])==null?void 0:ln.capabilities)==null?void 0:cn.focusDistance)==null?void 0:rn.min.toFixed(2))+"",ot,Vt,st,Ne=(e[3]?e[3].toFixed(2):"-")+"",it,Zt,lt,Pe=((dn=(an=(un=e[0])==null?void 0:un.capabilities)==null?void 0:an.focusDistance)==null?void 0:dn.max.toFixed(2))+"",ct,Ht,Q,ce,H,Ee,Jt,rt,ut,k,ke,J,K,Ae,Le,Kt,Be,Wt,x,ze=((fn=e[1])==null?void 0:fn.mode)+"",at,Xt,re,W,je,dt,Yt;return{c(){var p;t=a("div"),n=a("div"),o=h("Scan count: "),l=h(i),c=b(),d=a("div"),v=h("Average: "),F=h(r),u=b(),S=a("div"),w=h("Fail: "),g=h($),T=b(),I=a("div"),L=h("Success: "),V=h(B),O=b(),_=a("div"),C=h("exposureTime: "),A=h(y),Dt=b(),ge=a("div"),Mt=h("Contrast "),He=h(me),Tt=b(),ve=a("div"),qt=h("exposureMode: "),Je=h(he),It=b(),_e=a("div"),Ot=h("height: "),Ke=h(be),Nt=b(),we=a("div"),Pt=h("width: "),We=h(ye),Et=b(),$e=a("div"),kt=h("resizeMode: "),Xe=h(Se),At=b(),Ce=a("div"),Lt=h("saturation: "),Ye=h(Fe),Bt=b(),De=a("div"),zt=h("sharpness: "),Ge=h(Me),Qe=b(),z=a("video"),z.innerHTML="",xe=b(),Te=a("div"),et=b(),E=a("div"),Y=a("div"),le=a("button"),Z=a("img"),jt=b(),tt=h(e[7]),Ut=b(),G=a("div"),N=a("input"),Rt=b(),j=a("div"),nt=a("span"),ot=h(Oe),Vt=b(),st=a("span"),it=h(Ne),Zt=b(),lt=a("span"),ct=h(Pe),Ht=b(),Q=a("div"),ce=a("button"),H=a("img"),Jt=b(),rt=h(e[4]),ut=b(),k=a("div"),ke=a("div"),J=a("button"),K=a("img"),Kt=b(),Be=a("div"),Be.textContent="build 2024-04-04T08:38:19.185Z",Wt=b(),x=a("div"),at=h(ze),Xt=b(),re=a("button"),W=a("img"),f(t,"class","stats svelte-1eq53du"),z.autoplay=!0,f(z,"id","stream"),f(z,"class","svelte-1eq53du"),f(Te,"class","overlay svelte-1eq53du"),U(Z.src,qe=`public/${e[7]}-focus.svg`)||f(Z,"src",qe),f(Z,"class","svelte-1eq53du"),f(le,"class","svelte-1eq53du"),f(Y,"class","focus__group svelte-1eq53du"),N.disabled=Ie=e[7]==="continuous",f(N,"id","zoom__range"),f(N,"type","range"),f(N,"min","0"),f(N,"max","100"),f(N,"class","svelte-1eq53du"),f(j,"class","focus__range svelte-1eq53du"),f(G,"class","focus__group grow svelte-1eq53du"),U(H.src,Ee=`public/${e[4]}-facingMode.svg`)||f(H,"src",Ee),f(H,"class","svelte-1eq53du"),f(ce,"class","svelte-1eq53du"),f(Q,"class","focus__group svelte-1eq53du"),f(E,"id","focus"),f(E,"class","svelte-1eq53du"),U(K.src,Ae=`public/torch-${e[5]?"on":"off"}.svg`)||f(K,"src",Ae),f(K,"class","svelte-1eq53du"),J.disabled=Le=!e[0]||!e[0].capabilities.torch,f(J,"class","svelte-1eq53du"),f(ke,"class","focus__group svelte-1eq53du"),f(Be,"class","build svelte-1eq53du"),U(W.src,je=`public/mode-${(p=e[1])==null?void 0:p.mode}.svg`)||f(W,"src",je),f(W,"class","svelte-1eq53du"),f(re,"class","svelte-1eq53du"),f(x,"class","focus__group svelte-1eq53du"),f(k,"id","toggles"),f(k,"class","svelte-1eq53du")},m(p,m){var ue;q(p,t,m),s(t,n),s(n,o),s(n,l),s(t,c),s(t,d),s(d,v),s(d,F),s(t,u),s(t,S),s(S,w),s(S,g),s(t,T),s(t,I),s(I,L),s(I,V),s(t,O),s(t,_),s(_,C),s(_,A),s(t,Dt),s(t,ge),s(ge,Mt),s(ge,He),s(t,Tt),s(t,ve),s(ve,qt),s(ve,Je),s(t,It),s(t,_e),s(_e,Ot),s(_e,Ke),s(t,Nt),s(t,we),s(we,Pt),s(we,We),s(t,Et),s(t,$e),s($e,kt),s($e,Xe),s(t,At),s(t,Ce),s(Ce,Lt),s(Ce,Ye),s(t,Bt),s(t,De),s(De,zt),s(De,Ge),q(p,Qe,m),q(p,z,m),e[14](z),q(p,xe,m),q(p,Te,m),q(p,et,m),q(p,E,m),s(E,Y),s(Y,le),s(le,Z),s(Y,jt),s(Y,tt),s(E,Ut),s(E,G),s(G,N),In(N,e[2]),s(G,Rt),s(G,j),s(j,nt),s(nt,ot),s(j,Vt),s(j,st),s(st,it),s(j,Zt),s(j,lt),s(lt,ct),s(E,Ht),s(E,Q),s(Q,ce),s(ce,H),s(Q,Jt),s(Q,rt),q(p,ut,m),q(p,k,m),s(k,ke),s(ke,J),s(J,K),s(k,Kt),s(k,Be),s(k,Wt),s(k,x),s(x,at),s(x,Xt),s(x,re),s(re,W),dt||(Yt=[R(le,"click",e[12]),R(N,"change",e[15]),R(N,"input",e[15]),R(N,"change",e[9]),R(ce,"click",e[13]),R(J,"click",e[10]),R(re,"click",(ue=e[11])==null?void 0:ue.toggleMode)],dt=!0)},p(p,[m]){var ue,pn,gn,mn,vn,hn,_n,bn,wn,yn,$n,Sn,Cn,Fn,Dn,Mn;m&2&&i!==(i=p[1].scanCount+"")&&M(l,i),m&2&&r!==(r=p[1].average.toFixed(2)+"")&&M(F,r),m&2&&$!==($=p[1].fail+"")&&M(g,$),m&2&&B!==(B=p[1].success+"")&&M(V,B),m&256&&y!==(y=((ue=p[8])==null?void 0:ue.exposureTime)+"")&&M(A,y),m&256&&me!==(me=((pn=p[8])==null?void 0:pn.contrast)+"")&&M(He,me),m&256&&he!==(he=((gn=p[8])==null?void 0:gn.exposureMode)+"")&&M(Je,he),m&256&&be!==(be=((mn=p[8])==null?void 0:mn.height)+"")&&M(Ke,be),m&256&&ye!==(ye=((vn=p[8])==null?void 0:vn.width)+"")&&M(We,ye),m&256&&Se!==(Se=((hn=p[8])==null?void 0:hn.resizeMode)+"")&&M(Xe,Se),m&256&&Fe!==(Fe=((_n=p[8])==null?void 0:_n.saturation)+"")&&M(Ye,Fe),m&256&&Me!==(Me=((bn=p[8])==null?void 0:bn.sharpness)+"")&&M(Ge,Me),m&128&&!U(Z.src,qe=`public/${p[7]}-focus.svg`)&&f(Z,"src",qe),m&128&&M(tt,p[7]),m&128&&Ie!==(Ie=p[7]==="continuous")&&(N.disabled=Ie),m&4&&In(N,p[2]),m&1&&Oe!==(Oe=(($n=(yn=(wn=p[0])==null?void 0:wn.capabilities)==null?void 0:yn.focusDistance)==null?void 0:$n.min.toFixed(2))+"")&&M(ot,Oe),m&8&&Ne!==(Ne=(p[3]?p[3].toFixed(2):"-")+"")&&M(it,Ne),m&1&&Pe!==(Pe=((Fn=(Cn=(Sn=p[0])==null?void 0:Sn.capabilities)==null?void 0:Cn.focusDistance)==null?void 0:Fn.max.toFixed(2))+"")&&M(ct,Pe),m&16&&!U(H.src,Ee=`public/${p[4]}-facingMode.svg`)&&f(H,"src",Ee),m&16&&M(rt,p[4]),m&32&&!U(K.src,Ae=`public/torch-${p[5]?"on":"off"}.svg`)&&f(K,"src",Ae),m&1&&Le!==(Le=!p[0]||!p[0].capabilities.torch)&&(J.disabled=Le),m&2&&ze!==(ze=((Dn=p[1])==null?void 0:Dn.mode)+"")&&M(at,ze),m&2&&!U(W.src,je=`public/mode-${(Mn=p[1])==null?void 0:Mn.mode}.svg`)&&f(W,"src",je)},i:P,o:P,d(p){p&&(D(t),D(Qe),D(z),D(xe),D(Te),D(et),D(E),D(ut),D(k)),e[14](null),dt=!1,ie(Yt)}}}function yo(e,t,n){let o,i=0,l,c="environment",d=!1;async function v(y){console.log(y.target.value),n(2,i=y.target.value);const A=await($==null?void 0:$.setFocusDistancePct(i));n(3,l=A||void 0)}async function r(){n(5,d=!d),await($==null?void 0:$.setTorch(d))}const F=()=>navigator.mediaDevices.getUserMedia({video:{facingMode:c,aspectRatio:{exact:1.7777777778}},audio:!1});let u,S,w,$,g=bo();bt(e,g,y=>n(1,o=y));const T=["continuous","manual"];let I="continuous";const L=async()=>{try{w==null||w.stop(),g==null||g.stop(),S=await F(),w=S.getVideoTracks()[0],n(0,$=vo(w)),g.init(u,w,u.width,u.height),g.start()}catch(y){console.log("error",y),alert("Could not access the camera")}},B=async()=>{const y=T[T.indexOf(I)+1]||T[0];try{await $.setFocusMode(I),n(7,I=y)}catch{alert("Could not set focus mode")}},V=async()=>{n(4,c=c==="environment"?"user":"environment"),await L()};Gn(()=>((async()=>await L())(),()=>g==null?void 0:g.stop()));let O;function _(y){vt[y?"unshift":"push"](()=>{u=y,n(6,u)})}function C(){i=Wn(this.value),n(2,i)}return e.$$.update=()=>{e.$$.dirty&3&&(o==null||o.scanCount,n(8,O=$==null?void 0:$.getSettings()))},[$,o,i,l,c,d,u,I,O,v,r,g,B,V,_,C]}class $o extends St{constructor(t){super(),$t(this,t,yo,wo,Ze,{})}}const gt="deviceAlias",So=()=>{const{subscribe:e,set:t}=Ct(localStorage.getItem(gt));return{subscribe:e,ask:()=>{if(localStorage.getItem(gt))return;let n=prompt("Please input your device alias","device");n?(localStorage.setItem(gt,n),t(n)):alert("You must provide a device alias")}}},An=So();function Co(e){let t;return{c(){t=a("h1"),t.textContent="BarcodeDetector not supported."},m(n,o){q(n,t,o)},d(n){n&&D(t)}}}function Fo(e){let t;return{c(){t=a("h1"),t.textContent="Waiting for device alias..."},m(n,o){q(n,t,o)},i:P,o:P,d(n){n&&D(t)}}}function Do(e){let t,n;return t=new $o({}),{c(){Un(t.$$.fragment)},m(o,i){wt(t,o,i),n=!0},i(o){n||(de(t.$$.fragment,o),n=!0)},o(o){Ve(t.$$.fragment,o),n=!1},d(o){yt(t,o)}}}function Mo(e){let t,n,o,i,l,c,d,v,r,F;o=new ao({});let u=!e[1]&&Co();const S=[Do,Fo],w=[];function $(g,T){return g[0]?0:1}return d=$(e),v=w[d]=S[d](e),{c(){t=a("meta"),n=b(),Un(o.$$.fragment),i=b(),l=a("main"),u&&u.c(),c=b(),v.c(),r=Kn(),f(t,"name","viewport"),f(t,"content","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")},m(g,T){s(document.head,t),q(g,n,T),wt(o,g,T),q(g,i,T),q(g,l,T),u&&u.m(l,null),q(g,c,T),w[d].m(g,T),q(g,r,T),F=!0},p(g,[T]){let I=d;d=$(g),d!==I&&(no(),Ve(w[I],1,1,()=>{w[I]=null}),oo(),v=w[d],v||(v=w[d]=S[d](g),v.c()),de(v,1),v.m(r.parentNode,r))},i(g){F||(de(o.$$.fragment,g),de(v),F=!0)},o(g){Ve(o.$$.fragment,g),Ve(v),F=!1},d(g){g&&(D(n),D(i),D(l),D(c),D(r)),D(t),yt(o,g),u&&u.d(),w[d].d(g)}}}function To(e,t,n){let o;bt(e,An,l=>n(0,o=l));const i=typeof BarcodeDetector<"u";return An.ask(),[o,i]}class qo extends St{constructor(t){super(),$t(this,t,To,Mo,Ze,{})}}const mt="0.0.5",Ln=localStorage.getItem("version");mt!==Ln&&(localStorage.setItem("version",mt),alert(`New version detected ${Ln}>${mt}!`));new qo({target:document.getElementById("app")});
