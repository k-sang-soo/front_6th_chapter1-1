var e=function(exports){function t(e){"@babel/helpers - typeof";return t=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},t(e)}function n(e,n){if(t(e)!=`object`||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var i=r.call(e,n||`default`);if(t(i)!=`object`)return i;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(n===`string`?String:Number)(e)}function r(e){var r=n(e,`string`);return t(r)==`symbol`?r:r+``}function i(e,t,n){return(t=r(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}return exports.defineProperty=i,exports}({});(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();let t={currentPath:`/`,currentParams:{},currentMatch:null,subscribers:[]};function n(e){return e.replace(/^\/+|\/+$/g,``).split(`/`).filter(Boolean)}function r(e){return e&&e[0]===`:`}function i(e,t,n={}){for(let a of t){let t=a.path.split(`/`).filter(Boolean);if(t.length>e.length)continue;let o=!0,s={...n};for(let n=0;n<t.length;++n){let i=t[n];if(r(i)){let t=i.slice(1);s[t]=e[n]}else if(i!==e[n]){o=!1;break}}if(!o)continue;let c=e.slice(t.length);if(c.length===0&&a.component)return a.layout?{layout:a.layout,component:a.component,params:s}:{component:a.component,params:s};if(a.children&&c.length===0){let e=a.children.find(e=>e.path===``);if(e)return a.layout?{layout:a.layout,component:e.component,params:s}:{component:e.component,params:s}}if(a.children&&c.length>0){let e=i(c,a.children,s);if(e)return a.layout?{layout:a.layout,component:e.component,params:e.params}:e}}return null}function a(e,n){t.currentPath=e,t.currentParams=n?n.params:{},t.currentMatch=n,t.subscribers.forEach(e=>{e(t)})}function o(e){let t=null,r=r=>{let o=n(r),s=i(o,e),c=document.getElementById(`root`);c.innerHTML=``;let l=document.createElement(`div`);if(c.appendChild(l),t&&typeof t.unmount==`function`&&t.unmount(),a(r,s),s)s.layout?(t=new s.layout(l,{...s.params,children:s.component}),t.mount()):s.component&&(t=new s.component(l,s.params),t.mount());else{let n=e.find(e=>e.path===`404`);n&&(t=new n.component(l),t.mount())}},o=e=>{let t=e.target.closest(`a[data-link]`);if(t){e.preventDefault();let n=t.getAttribute(`href`);window.history.pushState({},``,n),r(window.location.pathname)}};return window.addEventListener(`popstate`,()=>{r(window.location.pathname)}),document.body.addEventListener(`click`,o),r(window.location.pathname),{renderRoute:r}}const s={push(e,t={}){t.replace?window.history.replaceState({},``,e):window.history.pushState({},``,e),window.dispatchEvent(new Event(`popstate`))},replace(e){this.push(e,{replace:!0})},back(){window.history.back()},forward(){window.history.forward()},getCurrentRoute(){return{path:t.currentPath,params:t.currentParams,match:t.currentMatch}},isCurrentPath(e){return t.currentPath===e},isCurrentPathStartsWith(e){return t.currentPath.startsWith(e)},subscribe(e){return t.subscribers.push(e),()=>{let n=t.subscribers.indexOf(e);n>-1&&t.subscribers.splice(n,1)}}};function c(){return{...s,state:t}}const l=`modulepreload`,u=function(e){return`/`+e},d={},f=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},i=document.getElementsByTagName(`link`),a=document.querySelector(`meta[property=csp-nonce]`),o=a?.nonce||a?.getAttribute(`nonce`);r=e(t.map(e=>{if(e=u(e,n),e in d)return;d[e]=!0;let t=e.endsWith(`.css`),r=t?`[rel="stylesheet"]`:``,a=!!n;if(a)for(let n=i.length-1;n>=0;n--){let r=i[n];if(r.href===e&&(!t||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${e}"]${r}`))return;let s=document.createElement(`link`);if(s.rel=t?`stylesheet`:l,t||(s.as=`script`),s.crossOrigin=``,s.href=e,o&&s.setAttribute(`nonce`,o),document.head.appendChild(s),t)return new Promise((t,n)=>{s.addEventListener(`load`,t),s.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${e}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[]){if(e.status!==`rejected`)continue;i(e.reason)}return e().catch(i)})};var p=class{constructor(e,t){this.element=e,this.props=t,this.state={},this.mounted=!1,this.eventListeners=[]}setState(e){this.state={...this.state,...e},this.mounted&&this.render()}addEventListener(e,t,n){e.addEventListener(t,n),this.eventListeners.push({element:e,event:t,handler:n})}mount(){this.mounted=!0,this.onMount(),this.render(),this.attachEventListeners()}unmount(){this.mounted=!1,this.onUnmount(),this.eventListeners.forEach(({element:e,event:t,handler:n})=>{e.removeEventListener(t,n)}),this.eventListeners=[]}onMount(){}onUnmount(){}render(){}attachEventListeners(){}},m=p,h=class{constructor(t){e.defineProperty(this,`state`,{}),e.defineProperty(this,`listeners`,[]),this.state=t}getState(){return this.state}setState(e){this.state={...this.state,...e},this.listeners.forEach(e=>e(this.state))}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}},g=h;const _=new g({isOpen:!1});var v=_,y=class{constructor(e=window.localStorage){this.storage=e,this.listeners={}}get(e){let t=this.storage.getItem(e);try{return JSON.parse(t)}catch{return t}}set(e,t){let n=typeof t==`string`?t:JSON.stringify(t);this.storage.setItem(e,n),this.notify(e)}remove(e){this.storage.removeItem(e)}clear(){this.storage.clear()}subscribe(e,t){return this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t),()=>{this.listeners[e]=this.listeners[e].filter(e=>e!==t)}}notify(e){if(!this.listeners[e])return;let t=this.get(e);this.listeners[e].forEach(e=>e(t))}},b=y;const x=new b;var S=x,ee=class extends m{constructor(e,t){super(e,t),this.unsubscribeCartStorage=null,this.unsubscribeRouter=null,this.router=c()}onMount(){this.unsubscribeCartStorage=S.subscribe(`shopping_cart`,()=>{this.render()}),this.unsubscribeRouter=this.router.subscribe(()=>{this.render()})}onUnmount(){this.unsubscribeCartStorage&&this.unsubscribeCartStorage(),this.unsubscribeRouter&&this.unsubscribeRouter()}attachEventListeners(){this.addEventListener(this.element,`click`,e=>{e.target.closest(`#cart-icon-btn`)&&v.setState({isOpen:!0}),e.target.closest(`#back-btn`)&&this.router.back()})}renderNormalHeader(){return`
      <h1 class="text-xl font-bold text-gray-900">
        <a href="/" data-link="">쇼핑몰</a>
      </h1>
    `}renderDetailHeader(){return`
      <div class="flex items-center space-x-3">
        <button id="back-btn" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
      </div>
    `}render(){let e=this.router.isCurrentPathStartsWith(`/detail`),t=S.get(`shopping_cart`)||[],n=t.length||0;this.element.innerHTML=`
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            ${e?this.renderDetailHeader():this.renderNormalHeader()}
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button
                id="cart-icon-btn"
                class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                  ></path>
                </svg>
                ${n?`<span
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >${n}</span`:``}
              </button>
            </div>
          </div>
        </div>
      </header>
    `}},te=ee,ne=class extends m{render(){this.element.innerHTML=`
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    `}},C=ne;const w={comma:e=>e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,`,`)};var T=class extends m{constructor(e,t){super(e,t),this.unsubscribeCartStorage=null}onMount(){this.unsubscribeCartStorage=S.subscribe(`shopping_cart`,()=>{this.render()})}onUnmount(){this.unsubscribeCartStorage&&this.unsubscribeCartStorage()}closeCartModal(){v.setState({isOpen:!1}),this.unmount()}handleSelectAllItems(e){let t=e.map(e=>({...e,isSelected:!e.isSelected}));S.set(`shopping_cart`,t)}handleSelectItem(e,t){let n=e.map(e=>e.productId===t?{...e,isSelected:!e.isSelected}:e);S.set(`shopping_cart`,n)}handleChangeQuantity(e,t,n){let r=e.map(e=>{if(e.productId!==t)return e;let r=e.quantity;return n===`increase`?r+=1:n===`decrease`&&(r=Math.max(1,e.quantity-1)),{...e,quantity:r}});S.set(`shopping_cart`,r)}handleRemoveItem(e,t){let n=e.filter(e=>e.productId!==t);S.set(`shopping_cart`,n)}handleClearAllItems(){S.set(`shopping_cart`,[]),S.remove(`shopping_cart`)}handleSelectedRemoveItem(e){let t=e.filter(e=>!e.isSelected);S.set(`shopping_cart`,t)}attachEventListeners(){this.addEventListener(this.element,`click`,e=>{if(e.target.closest(`#cart-modal-close-btn`)){this.closeCartModal();return}let t=v.getState();if(!e.target.closest(`#cart-content`)&&t.isOpen){this.closeCartModal();return}let n=S.get(`shopping_cart`),r=e.target.closest(`.quantity-decrease-btn`);if(r){let e=r.dataset.productId;this.handleChangeQuantity(n,e,`decrease`);return}let i=e.target.closest(`.quantity-increase-btn`);if(i){let e=i.dataset.productId;this.handleChangeQuantity(n,e,`increase`);return}let a=e.target.closest(`.cart-item-checkbox`);if(a){let e=a.dataset.productId;this.handleSelectItem(n,e);return}let o=e.target.closest(`#cart-modal-select-all-checkbox`);o&&this.handleSelectAllItems(n);let s=e.target.closest(`.cart-item-remove-btn`);if(s){let e=s.dataset.productId;this.handleRemoveItem(n,e)}let c=e.target.closest(`#cart-modal-clear-cart-btn`);c&&this.handleClearAllItems();let l=e.target.closest(`#cart-modal-remove-selected-btn`);l&&this.handleSelectedRemoveItem(n)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.closeCartModal()})}renderCartEmpty(){return`
      <!-- 빈 장바구니 -->
      <div class="flex-1 flex items-center justify-center p-8">
        <div class="text-center">
          <div class="text-gray-400 mb-4">
            <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
          <p class="text-gray-600">원하는 상품을 담아보세요!</p>
        </div>
      </div>
    `}renderCartSelectAllBar(e,t){return`
      <div class="p-4 border-b border-gray-200 bg-gray-50">
        <label class="flex items-center text-sm text-gray-700">
          <input
            type="checkbox"
            id="cart-modal-select-all-checkbox"
            ${t?`checked`:``}
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
          />
          전체선택 (${e}개)
        </label>
      </div>
    `}renderCartItems(e){return`
      <div class="flex-1 overflow-y-auto">
        ${e.map(e=>`
              <div class="p-4 space-y-4">
                <div
                  class="flex items-center py-3 border-b border-gray-100 cart-item"
                  data-product-id="${e.productId}"
                >
                  <!-- 선택 체크박스 -->
                  <label class="flex items-center mr-3">
                    <input
                      type="checkbox"
                      ${e.isSelected?`checked`:``}
                      class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded
                focus:ring-blue-500"
                      data-product-id="${e.productId}"
                    />
                  </label>
                  <!-- 상품 이미지 -->
                  <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                    <img
                      src="${e.image}"
                      alt="${e.title}"
                      class="w-full h-full object-cover cursor-pointer cart-item-image"
                      data-product-id="${e.productId}"
                    />
                  </div>
                  <!-- 상품 정보 -->
                  <div class="flex-1 min-w-0">
                    <h4
                      class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title"
                      data-product-id="${e.productId}"
                    >
                      ${e.title}
                    </h4>
                    <p class="text-sm text-gray-600 mt-1">${w.comma(e.lprice)}원</p>
                    <!-- 수량 조절 -->
                    <div class="flex items-center mt-2">
                      <button
                        class="quantity-decrease-btn w-7 h-7 flex items-center justify-center
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                        data-product-id="${e.productId}"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 12H4"
                          ></path>
                        </svg>
                      </button>
                      <input
                        type="number"
                        value="${e.quantity}"
                        min="1"
                        class="quantity-input w-12 h-7 text-center text-sm border-t border-b
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        disabled=""
                        data-product-id="${e.productId}"
                      />
                      <button
                        class="quantity-increase-btn w-7 h-7 flex items-center justify-center
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                        data-product-id="${e.productId}"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <!-- 가격 및 삭제 -->
                  <div class="text-right ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      ${w.comma(e.quantity*e.lprice)}원
                    </p>
                    <button
                      class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800"
                      data-product-id="${e.productId}"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            `).join(``)}
      </div>
    `}renderCartBottomBar(e,t,n){return`
      <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <!-- 선택된 아이템 정보 -->
        ${e?`
              <div class="flex justify-between items-center mb-3 text-sm">
                <span class="text-gray-600">선택한 상품 (${e}개)</span>
                <span class="font-medium">${w.comma(t)}원</span>
              </div>
            `:``}

        <!-- 총 금액 -->
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-bold text-gray-900">총 금액</span>
          <span class="text-xl font-bold text-blue-600">${w.comma(n)}원</span>
        </div>
        <!-- 액션 버튼들 -->
        <div class="space-y-2">
          ${e?`<button
                id="cart-modal-remove-selected-btn"
                class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                       hover:bg-red-700 transition-colors text-sm"
              >
                선택한 상품 삭제 (${e}개)
              </button>`:``}

          <div class="flex gap-2">
            <button
              id="cart-modal-clear-cart-btn"
              class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                       hover:bg-gray-700 transition-colors text-sm"
            >
              전체 비우기
            </button>
            <button
              id="cart-modal-checkout-btn"
              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors text-sm"
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    `}render(){let e=S.get(`shopping_cart`)||[],t=e.length>0&&e.every(e=>e.isSelected),n=e.filter(e=>e.isSelected),r=n.length||0,i=n.reduce((e,t)=>e+t.lprice*t.quantity,0),a=e.reduce((e,t)=>e+t.lprice*t.quantity,0);this.element.innerHTML=`
      <div
        class="cart-modal cart-modal-overlay fixed top-0 left-0 w-full h-full bg-[#000]/30 z-[100]"
      >
        <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
          <div
            id="cart-content"
            class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
          >
            <!-- 헤더 -->
            <div
              class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between"
            >
              <h2 class="text-lg font-bold text-gray-900 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                  ></path>
                </svg>
                장바구니
                ${e.length?`<span class="text-sm font-normal text-gray-600 ml-1">(${e.length})</span>`:``}
              </h2>

              <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <!-- 컨텐츠 -->
            <div class="flex flex-col max-h-[calc(90vh-120px)]">
              ${e.length?`
                    ${this.renderCartSelectAllBar(e.length,t)}
                    ${this.renderCartItems(e)}
                    ${this.renderCartBottomBar(r,i,a)}
                  `:this.renderCartEmpty()}
            </div>
          </div>
        </div>
      </div>
    `}},E=T;const D=new g({isOpen:!1,type:`success`,message:``});var O=D;function k({message:e,type:t=`info`,duration:n=3e3}){D.setState({isOpen:!0,type:t,message:e}),n>0&&setTimeout(()=>{A()},n)}function A(){D.setState({isOpen:!1})}function j(e,t){k({message:e,type:`success`,duration:t})}const M={success:{bg:`bg-green-600`,icon:` <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>`},info:{bg:`bg-blue-600`,icon:` <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>`},error:{bg:`bg-red-600`,icon:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>`}};var N=class extends m{constructor(e,t){super(e,t)}attachEventListeners(){this.addEventListener(this.element,`click`,e=>{let t=O.getState(),n=e.target.closest(`#toast-close-btn`);n&&t.isOpen&&A()})}renderToast(e,t){let{bg:n,icon:r}=M[e]||M.info;return`
      <div
        class="${n} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm"
      >
        <div class="flex-shrink-0">${r}</div>
        <p class="text-sm font-medium">${t}</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    `}render(){let{type:e,message:t}=O.getState();this.element.innerHTML=`<div
      class="fixed bottom-[40px] left-1/2 -translate-x-1/2 "
    >
      ${this.renderToast(e,t)}
    </div>`}},P=N,F=class extends m{constructor(e,t){super(e,t),this.unsubscribeCart=null,this.unsubscribeToast=null}render(){this.element.innerHTML=`
      <div class="min-h-screen bg-gray-50">
        <div id="header"></div>
        <main id="content"></main>
        <div id="footer"></div>
        <div id="cart"></div>
        <div id="toast"></div>
      </div>
    `,new te(this.element.querySelector(`#header`)).mount(),new C(this.element.querySelector(`#footer`)).mount(),this.props&&this.props.children&&new this.props.children(this.element.querySelector(`#content`),this.props).mount(),this.updateCart(v.getState()),this.updateCart(O.getState()),this.unsubscribeCart||=v.subscribe(this.updateCart.bind(this)),this.unsubscribeToast||=O.subscribe(this.updateToast.bind(this))}updateCart(e){let t=this.element.querySelector(`#cart`);t&&(t.innerHTML=``,e.isOpen&&new E(t).mount())}updateToast(e){let t=this.element.querySelector(`#toast`);t&&(t.innerHTML=``,e.isOpen&&new P(t).mount())}onUnmount(){this.unsubscribeCart&&this.unsubscribeCart(),this.unsubscribeToast&&this.unsubscribeToast()}},I=F;async function L(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function R(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function z(){let e=await fetch(`/api/categories`);return await e.json()}var B=class extends m{constructor(e,t){super(e,t),this.state={loading:!0,product:null,quantity:1,relatedProducts:null},this.unsubscribeCartStorage=null}async onMount(){let e=await R(this.props.id),t=await L({category1:e.category1,category2:e.category2});this.setState({loading:!1,product:e,relatedProducts:t}),this.unsubscribeCartStorage=S.subscribe(`shopping_cart`,()=>{this.render()})}onUnmount(){this.unsubscribeCartStorage&&this.unsubscribeCartStorage()}handleChangeQuantity(e){e===`increase`?this.setState({...this.state,quantity:this.state.quantity+1}):e===`decrease`&&this.setState({...this.state,quantity:Math.max(1,this.state.quantity-1)})}handleAddCartItem(e,t){let{quantity:n}=this.state,r=e.find(e=>e.productId===t.productId),i;if(r)i=e.map(e=>e.productId===t.productId?{...e,quantity:e.quantity+n}:e);else{let r={...t,quantity:n,isSelected:!1};i=[...e,r]}S.set(`shopping_cart`,i),j(`장바구니에 추가되었습니다`)}attachEventListeners(){this.addEventListener(this.element,`click`,e=>{let t=e.target.closest(`.go-to-product-list`);if(t){s.push(`/`);return}let n=e.target.closest(`#quantity-decrease`);if(n){this.handleChangeQuantity(`decrease`);return}let r=e.target.closest(`#quantity-increase`);if(r){this.handleChangeQuantity(`increase`);return}let i=S.get(`shopping_cart`)||[],a=e.target.closest(`#add-to-cart-btn`);if(a){this.handleAddCartItem(i,{productId:this.state.product.productId,title:this.state.product.title,image:this.state.product.image,lprice:this.state.product.lprice});return}let o=e.target.closest(`.related-product-card`);if(o){let e=o.dataset.productId;s.push(`/detail/${e}`);return}let c=e.target.closest(`.breadcrumb-link`);if(c){let e=c.dataset.category1?`?category1=${this.state.product.category1}`:`?category1=${this.state.product.category1}&category2=${this.state.product.category2}`;s.push(`/${e}`)}}),this.addEventListener(this.element,`change`,e=>{let t=e.target.closest(`#quantity-input`);t&&(console.log(t.value),this.setState({...this.state,quantity:t.value}))})}renderLoadingUI(){return`
      <div class="py-20 bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
          ></div>
          <p class="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    `}renderRelatedProducts(){let{relatedProducts:{products:e}}=this.state,t=e.filter(e=>e.productId!==this.props.id);return`
      <!-- 관련 상품 -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
          <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3 responsive-grid">
            ${t.map(e=>`
                  <div
                    class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
                    data-product-id="${e.productId}"
                  >
                    <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                      <img
                        src="${e.image}"
                        alt="${e.title}"
                        class="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                      ${e.title}
                    </h3>
                    <p class="text-sm font-bold text-blue-600">
                      ${w.comma(e.lprice)}원
                    </p>
                  </div>
                `).join(``)}
          </div>
        </div>
      </div>
    `}render(){let{product:e}=this.state;this.element.innerHTML=` <main class="max-w-md mx-auto px-4 py-4">
      ${this.state.loading?this.renderLoadingUI():`
            <!-- 브레드크럼 -->
            <nav class="mb-4">
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
                <button class="breadcrumb-link" data-category1="${e.category1}}">
                  ${e.category1}
                </button>
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
                <button class="breadcrumb-link" data-category2="${e.category2}">
                  ${e.category2}
                </button>
              </div>
            </nav>
            <!-- 상품 상세 정보 -->
            <div class="bg-white rounded-lg shadow-sm mb-6">
              <!-- 상품 이미지 -->
              <div class="p-4">
                <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src="${e.image}"
                    alt="${e.title}"
                    class="w-full h-full object-cover product-detail-image"
                  />
                </div>
                <!-- 상품 정보 -->
                <div>
                  <p class="text-sm text-gray-600 mb-1"></p>
                  <h1 class="text-xl font-bold text-gray-900 mb-3">${e.title}</h1>
                  <!-- 평점 및 리뷰 -->
                  <div class="flex items-center mb-3">
                    <div class="flex items-center">
                      ${Array.from({length:5}).map((t,n)=>{let r=n<e.rating,i=r?`text-yellow-400`:`text-gray-300`;return`
                            <svg
                              class="w-4 h-4 ${i}"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              ></path>
                            </svg>
                          `}).join(``)}
                    </div>

                    <span class="ml-2 text-sm text-gray-600"
                      >${e.rating} (${e.reviewCount}개 리뷰)</span
                    >
                  </div>
                  <!-- 가격 -->
                  <div class="mb-4">
                    <span class="text-2xl font-bold text-blue-600"
                      >${w.comma(e.lprice)}원</span
                    >
                  </div>
                  <!-- 재고 -->
                  <div class="text-sm text-gray-600 mb-4">재고 ${e.stock}개</div>
                  <!-- 설명 -->
                  <div class="text-sm text-gray-700 leading-relaxed mb-6">
                    ${e.description}
                  </div>
                </div>
              </div>
              <!-- 수량 선택 및 액션 -->
              <div class="border-t border-gray-200 p-4">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm font-medium text-gray-900">수량</span>
                  <div class="flex items-center">
                    <button
                      id="quantity-decrease"
                      class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-l-md bg-gray-50 hover:bg-gray-100"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        ></path>
                      </svg>
                    </button>
                    <input
                      type="number"
                      id="quantity-input"
                      value="${this.state.quantity}"
                      min="1"
                      max="107"
                      class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      id="quantity-increase"
                      class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-r-md bg-gray-50 hover:bg-gray-100"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 액션 버튼 -->
                <button
                  id="add-to-cart-btn"
                  data-product-id="${e.productId}"
                  class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium"
                >
                  장바구니 담기
                </button>
              </div>
            </div>
            <!-- 상품 목록으로 이동 -->
            <div class="mb-6">
              <button
                class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
            hover:bg-gray-200 transition-colors go-to-product-list"
              >
                상품 목록으로 돌아가기
              </button>
            </div>
            <!-- 관련 상품 -->
            ${this.state.relatedProducts.products?this.renderRelatedProducts():``}
          `}
    </main>`}},V=B,H=class extends m{render(){this.element.innerHTML=`
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
          <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
              </linearGradient>
              <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="8"
                  flood-color="#000000"
                  flood-opacity="0.1"
                />
              </filter>
            </defs>

            <!-- 404 Numbers -->
            <text
              x="160"
              y="85"
              font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              font-size="48"
              font-weight="600"
              fill="url(#blueGradient)"
              text-anchor="middle"
            >
              404
            </text>

            <!-- Icon decoration -->
            <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
            <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
            <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5" />
            <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5" />

            <!-- Message -->
            <text
              x="160"
              y="110"
              font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              font-size="14"
              font-weight="400"
              fill="#5f6368"
              text-anchor="middle"
            >
              페이지를 찾을 수 없습니다
            </text>

            <!-- Subtle bottom accent -->
            <rect
              x="130"
              y="130"
              width="60"
              height="2"
              rx="1"
              fill="url(#blueGradient)"
              opacity="0.3"
            />
          </svg>

          <a
            href="/"
            data-link
            class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >홈으로</a
          >
        </div>
      </main>
    `}},re=H,U=class extends m{constructor(e,t){super(e,t)}addCartItem(){let{productId:e,title:t,image:n,lprice:r}=this.props,i=S.get(`shopping_cart`)||[],a=i.findIndex(t=>t.productId===e);a>-1?i[a].quantity+=1:i.push({productId:e,title:t,image:n,lprice:r,quantity:1,isSelected:!1}),S.set(`shopping_cart`,i)}attachEventListeners(){this.addEventListener(this.element,`click`,e=>{if(e.target.id===`cart-add-button`){e.stopPropagation(),this.addCartItem(),j(`장바구니에 추가되었습니다`,3e3);return}let t=e.target.closest(`.product-card`);if(t){let e=t.dataset.productId;s.push(`/detail/${e}`)}})}render(){let{productId:e,title:t,image:n,lprice:r,brand:i}=this.props;this.element.innerHTML=`
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
         data-product-id="${e}">
      <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
        <img src="${n}"
             alt="${t}"
             class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
             loading="lazy">
      </div>
      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            ${t}
          </h3>
          <p class="text-xs text-gray-500 mb-2">${i}</p>
          <p class="text-lg font-bold text-gray-900">
            ${w.comma(r)}원
          </p>
        </div>
        <!-- 장바구니 버튼 -->
        <button id="cart-add-button" class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
               hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${e}">
          장바구니 담기
        </button>
      </div>
    </div>
    `}},W=U,G=class extends m{constructor(e,t){super(e,t)}render(){this.element.innerHTML=`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div class="aspect-square bg-gray-200"></div>
      <div class="p-3">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div class="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
    `}},K=G,q=class extends m{constructor(e,t){super(e,t)}renderNextPageLoading(){return this.props.products&&!this.props.products.pagination.hasNext?``:`
      <div class="text-center py-4">
        <div class="inline-flex items-center">
          <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
        </div>
      </div>
    `}render(){this.element.innerHTML=`
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid"></div>
      ${this.renderNextPageLoading()}
    `;let e=this.element.querySelector(`#products-grid`);if(this.props.loading){let t=document.createDocumentFragment();[...[,,,,]].forEach(()=>{let e=document.createElement(`div`);new K(e).mount(),t.appendChild(e)}),e.appendChild(t);return}if(this.props.products.products){let t=this.props.products.products,n=document.createDocumentFragment();t.forEach(e=>{let t=document.createElement(`div`);new W(t,e).mount(),n.appendChild(t)}),e.appendChild(n)}}},J=q,Y=class extends m{constructor(e,t){super(e,t)}render(){this.props.loading&&(this.element.innerHTML=`
        <div id="product-list"></div>
      `),this.props.loading||(this.element.innerHTML=`
        <!-- 상품 개수 정보 -->
        <div class="mb-4 text-sm text-gray-600">
          총 <span class="font-medium text-gray-900">${this.props.products.pagination.total}개</span>의 상품
        </div>
        <div id="product-list"></div>
      `),new J(this.element.querySelector(`#product-list`),{loading:this.props.loading,products:this.props.products?this.props.products:null}).mount()}},X=Y,ie=class extends m{constructor(e,t){super(e,t),this.state={search:this.props.query.search}}onMount(){let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(this.props.loading||this.props.onFetchNextPageProducts())})}),t=document.querySelector(`#footer`);e.observe(t)}attachEventListeners(){this.addEventListener(this.element,`change`,e=>{let t=e.target.value;e.target.id===`limit-select`&&this.props.onChangeLimit(t),e.target.id===`sort-select`&&this.props.onChangeSort(t)}),this.addEventListener(this.element,`input`,e=>{let t=e.target.value;e.target.id===`search-input`&&(this.state={...this.state,search:t})}),this.addEventListener(this.element,`keydown`,e=>{e.target.id===`search-input`&&e.key===`Enter`&&this.props.onChangeSearch(this.state.search)}),this.addEventListener(this.element,`click`,e=>{if(e.target.classList.contains(`category2-filter-btn`)){let t=e.target.dataset.category1,n=e.target.dataset.category2?e.target.dataset.category2:``;this.props.onChangeCategory(t,n)}if(e.target.dataset.breadcrumb){let t=e.target.dataset.breadcrumb===`reset`?``:e.target.dataset.breadcrumb;this.props.onChangeCategory(t,``)}})}renderBreadcrumb(){return`
      ${this.props.query.category1?`
            <span class="text-xs text-gray-500">&gt;</span
            ><button
              data-breadcrumb="${this.props.query.category1}"
              data-category1="${this.props.query.category1}"
              class="text-xs hover:text-blue-800 hover:underline"
            >
              ${this.props.query.category1}
            </button>
          `:``}
      ${this.props.query.category2?`
            <span class="text-xs text-gray-500">&gt;</span
            ><span class="text-xs text-gray-600 cursor-default">${this.props.query.category2}</span>
          `:``}
    `}renderCategories(){if(this.props.loading)return`<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`;let e=Object.keys(this.props.categories),t=this.props.query.category1&&this.props.categories[this.props.query.category1]?Object.keys(this.props.categories[this.props.query.category1]):null,n=`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50`,r=`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-blue-100 border-blue-300 text-blue-800`;return t?`
        <div class="flex flex-wrap gap-2">
          ${t.map(e=>`
                <button
                  data-category1="${this.props.query.category1}"
                  data-category2="${e}"
                  class="${e===this.props.query.category2?r:n} "
                >
                  ${e}
                </button>
              `).join(``)}
        </div>
      `:`
        <div class="flex flex-wrap gap-2">
          ${e.map(e=>`
                <button
                  data-category1="${e}"
                  class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  ${e}
                </button>
              `).join(``)}
        </div>
      `}render(){this.element.innerHTML=`
      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <!-- 검색창 -->
        <div class="mb-4">
          <div class="relative">
            <input
              type="text"
              id="search-input"
              placeholder="상품명을 검색해보세요..."
              value="${this.state.search}"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <!-- 필터 옵션 -->
        <div class="space-y-3">
          <!-- 카테고리 필터 -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">카테고리:</label>
              <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">
                전체
              </button>
              ${this.renderBreadcrumb()}
            </div>
            <!-- 1depth 카테고리 -->
            <div class="flex flex-wrap gap-2">${this.renderCategories()}</div>
            <!-- 2depth 카테고리 -->
          </div>
          <!-- 기존 필터들 -->
          <div class="flex gap-2 items-center justify-between">
            <!-- 페이지당 상품 수 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">개수:</label>
              <select
                id="limit-select"
                class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="10" ${this.props.query.limit===10?`selected`:``}>10개</option>
                <option value="20" ${this.props.query.limit===20?`selected`:``}>20개</option>
                <option value="50" ${this.props.query.limit===50?`selected`:``}>50개</option>
                <option value="100" ${this.props.query.limit===100?`selected`:``}>
                  100개
                </option>
              </select>
            </div>
            <!-- 정렬 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">정렬:</label>
              <select
                id="sort-select"
                class="text-sm border border-gray-300 rounded px-2 py-1
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option
                  value="price_asc"
                  ${this.props.query.sort===`price_asc`?`selected`:``}
                >
                  가격 낮은순
                </option>
                <option
                  value="price_desc"
                  ${this.props.query.sort===`price_desc`?`selected`:``}
                >
                  가격 높은순
                </option>
                <option value="name_asc" ${this.props.query.sort===`name_asc`?`selected`:``}>
                  이름순
                </option>
                <option
                  value="name_desc"
                  ${this.props.query.sort===`name_desc`?`selected`:``}
                >
                  이름 역순
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `}},ae=ie;const Z={updateUrlParams:e=>{let t=new URL(window.location),n=new URLSearchParams(t.search);Object.entries(e).forEach(([e,t])=>{t&&t!==``?n.set(e,t):n.delete(e)});let r=`${t.pathname}?${n.toString()}`;window.history.pushState({},``,r)}},Q=1,oe=20,$=`price_asc`,se=``,ce=``,le=``;var ue=class extends m{constructor(t,n){super(t,n),e.defineProperty(this,`handleLimitChange`,async e=>{let t=Number(e),n=await this.fetchProducts({...this.state.query,page:this.state.query.page,limit:t});this.setState({...this.state,loading:!1,products:n,query:{...this.state.query,limit:t}}),Z.updateUrlParams({limit:e})}),e.defineProperty(this,`handleSortChange`,async e=>{let t=e,n=await this.fetchProducts({...this.state.query,page:Q,sort:t});this.setState({...this.state,loading:!1,products:n,query:{...this.state.query,page:Q,sort:t}}),Z.updateUrlParams({sort:t})}),e.defineProperty(this,`handleSearchChange`,async e=>{let t=e,n=await this.fetchProducts({...this.state.query,page:Q,search:t});this.setState({...this.state,loading:!1,products:n,query:{...this.state.query,page:Q,search:t}}),Z.updateUrlParams({search:t,page:Q})}),e.defineProperty(this,`handleCategoryChange`,async(e=``,t=``)=>{let n=await this.fetchProducts({...this.state.query,page:Q,category1:e,category2:t});this.setState({...this.state,loading:!1,products:n,query:{...this.state.query,page:Q,category1:e,category2:t}}),Z.updateUrlParams({category1:e,category2:t,page:Q})}),e.defineProperty(this,`fetchNextPageProducts`,async()=>{if(this.state.loading||!this.state.products.pagination.hasNext)return;let e=this.state.query.page+1,t=await this.fetchProducts({...this.state.query,page:e,limit:this.state.query.limit,sort:this.state.query.sort});this.setState({...this.state,loading:!1,products:{...t,products:[...this.state.products.products,...t.products]},query:{...this.state.query,page:e}})});let r=new URLSearchParams(window.location.search);this.state={loading:!0,products:null,categories:null,query:{page:Number(r.get(`page`))||Q,limit:Number(r.get(`limit`))||oe,sort:r.get(`sort`)||$,search:r.get(`search`)||se,category1:r.get(`category1`)||ce,category2:r.get(`category2`)||le}}}async onMount(){console.log(`asd`,this.state.query);let[e,t]=await Promise.all([L(this.state.query),z()]);this.setState({loading:!1,products:e,categories:t})}fetchProducts({page:e,limit:t,sort:n,search:r,category1:i,category2:a}){return L({page:e,limit:t,sort:n,search:r,category1:i,category2:a})}render(){this.element.innerHTML=`
      <main class="max-w-md mx-auto px-4 py-4">
        <div id="filter-container"></div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div id="product-container"></div>
      </main>
    `,new ae(this.element.querySelector(`#filter-container`),{loading:this.state.loading,categories:this.state.categories,query:this.state.query,onChangeLimit:this.handleLimitChange,onChangeSort:this.handleSortChange,onChangeSearch:this.handleSearchChange,onChangeCategory:this.handleCategoryChange,onFetchNextPageProducts:this.fetchNextPageProducts}).mount(),new X(this.element.querySelector(`#product-container`),{loading:this.state.loading,products:this.state.products}).mount()}},de=ue,fe=class extends m{render(){let e=`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-900">
              <a href="/" data-link="">쇼핑몰</a>
            </h1>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div class="mb-4">
            <div class="relative">
              <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">카테고리:</label>
                <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
              </div>
              <!-- 1depth 카테고리 -->
              <div class="flex flex-wrap gap-2">
                <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
              </div>
              <!-- 2depth 카테고리 -->
            </div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">
              <!-- 페이지당 상품 수 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">개수:</label>
                <select id="limit-select"
                        class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="10">
                    10개
                  </option>
                  <option value="20" selected="">
                    20개
                  </option>
                  <option value="50">
                    50개
                  </option>
                  <option value="100">
                    100개
                  </option>
                </select>
              </div>
              <!-- 정렬 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">정렬:</label>
                <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="price_asc" selected="">가격 낮은순</option>
                  <option value="price_desc">가격 높은순</option>
                  <option value="name_asc">이름순</option>
                  <option value="name_desc">이름 역순</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 그리드 -->
            <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
              <!-- 로딩 스켈레톤 -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            
            <div class="text-center py-4">
              <div class="inline-flex items-center">
                <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `,t=`
    <div class="bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-900">
              <a href="/" data-link="">쇼핑몰</a>
            </h1>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
                <span
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">4</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div class="mb-4">
            <div class="relative">
              <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">카테고리:</label>
                <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
              </div>
              <!-- 1depth 카테고리 -->
              <div class="flex flex-wrap gap-2">
                <button data-category1="생활/건강" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                   bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  생활/건강
                </button>
                <button data-category1="디지털/가전" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                   bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  디지털/가전
                </button>
              </div>
              <!-- 2depth 카테고리 -->
            </div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">
              <!-- 페이지당 상품 수 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">개수:</label>
                <select id="limit-select"
                        class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="10">
                    10개
                  </option>
                  <option value="20" selected="">
                    20개
                  </option>
                  <option value="50">
                    50개
                  </option>
                  <option value="100">
                    100개
                  </option>
                </select>
              </div>
              <!-- 정렬 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">정렬:</label>
                <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="price_asc" selected="">가격 낮은순</option>
                  <option value="price_desc">가격 높은순</option>
                  <option value="name_asc">이름순</option>
                  <option value="name_desc">이름 역순</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 개수 정보 -->
            <div class="mb-4 text-sm text-gray-600">
              총 <span class="font-medium text-gray-900">340개</span>의 상품
            </div>
            <!-- 상품 그리드 -->
            <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
                   data-product-id="85067212996">
                <!-- 상품 이미지 -->
                <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
                  <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg"
                       alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장"
                       class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                       loading="lazy">
                </div>
                <!-- 상품 정보 -->
                <div class="p-3">
                  <div class="cursor-pointer product-info mb-3">
                    <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장
                    </h3>
                    <p class="text-xs text-gray-500 mb-2"></p>
                    <p class="text-lg font-bold text-gray-900">
                      220원
                    </p>
                  </div>
                  <!-- 장바구니 버튼 -->
                  <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                         hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="85067212996">
                    장바구니 담기
                  </button>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
                   data-product-id="86940857379">
                <!-- 상품 이미지 -->
                <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg"
                       alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이"
                       class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                       loading="lazy">
                </div>
                <!-- 상품 정보 -->
                <div class="p-3">
                  <div class="cursor-pointer product-info mb-3">
                    <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                    </h3>
                    <p class="text-xs text-gray-500 mb-2">이지웨이건축자재</p>
                    <p class="text-lg font-bold text-gray-900">
                      230원
                    </p>
                  </div>
                  <!-- 장바구니 버튼 -->
                  <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                         hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="86940857379">
                    장바구니 담기
                  </button>
                </div>
              </div>
            </div>
            
            <div class="text-center py-4 text-sm text-gray-500">
              모든 상품을 확인했습니다
            </div>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `,n=`
    <main class="max-w-md mx-auto px-4 py-4">
      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <!-- 검색창 -->
        <div class="mb-4">
          <div class="relative">
            <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 필터 옵션 -->
        <div class="space-y-3">

          <!-- 카테고리 필터 -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">카테고리:</label>
              <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button><span class="text-xs text-gray-500">&gt;</span><button data-breadcrumb="category1" data-category1="생활/건강" class="text-xs hover:text-blue-800 hover:underline">생활/건강</button>
            </div>
            <div class="space-y-2">
              <div class="flex flex-wrap gap-2">
                <button data-category1="생활/건강" data-category2="생활용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  생활용품
                </button>
                <button data-category1="생활/건강" data-category2="주방용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  주방용품
                </button>
                <button data-category1="생활/건강" data-category2="문구/사무용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  문구/사무용품
                </button>
              </div>
            </div>
          </div>
          
          <!-- 기존 필터들 -->
          <div class="flex gap-2 items-center justify-between">
            <!-- 페이지당 상품 수 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">개수:</label>
              <select id="limit-select"
                      class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="10">
                  10개
                </option>
                <option value="20" selected="">
                  20개
                </option>
                <option value="50">
                  50개
                </option>
                <option value="100">
                  100개
                </option>
              </select>
            </div>
            <!-- 정렬 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">정렬:</label>
              <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                           focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="price_asc" selected="">가격 낮은순</option>
                <option value="price_desc">가격 높은순</option>
                <option value="name_asc">이름순</option>
                <option value="name_desc">이름 역순</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,r=`
    <main class="max-w-md mx-auto px-4 py-4">
      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <!-- 검색창 -->
        <div class="mb-4">
          <div class="relative">
            <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 필터 옵션 -->
        <div class="space-y-3">

          <!-- 카테고리 필터 -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">카테고리:</label>
              <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button><span class="text-xs text-gray-500">&gt;</span><button data-breadcrumb="category1" data-category1="생활/건강" class="text-xs hover:text-blue-800 hover:underline">생활/건강</button><span class="text-xs text-gray-500">&gt;</span><span class="text-xs text-gray-600 cursor-default">주방용품</span>
            </div>
            <div class="space-y-2">
              <div class="flex flex-wrap gap-2">
                <button data-category1="생활/건강" data-category2="생활용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  생활용품
                </button>
                <button data-category1="생활/건강" data-category2="주방용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-blue-100 border-blue-300 text-blue-800">
                  주방용품
                </button>
                <button data-category1="생활/건강" data-category2="문구/사무용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  문구/사무용품
                </button>
              </div>
            </div>
          </div>
          
          <!-- 기존 필터들 -->
          <div class="flex gap-2 items-center justify-between">
            <!-- 페이지당 상품 수 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">개수:</label>
              <select id="limit-select"
                      class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="10">
                  10개
                </option>
                <option value="20" selected="">
                  20개
                </option>
                <option value="50">
                  50개
                </option>
                <option value="100">
                  100개
                </option>
              </select>
            </div>
            <!-- 정렬 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">정렬:</label>
              <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                           focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="price_asc" selected="">가격 낮은순</option>
                <option value="price_desc">가격 높은순</option>
                <option value="name_asc">이름순</option>
                <option value="name_desc">이름 역순</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,i=`
    <div class="flex flex-col gap-2 items-center justify-center mx-auto" style="width: fit-content;">
      <div class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p class="text-sm font-medium">장바구니에 추가되었습니다</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>
        </div>
        <p class="text-sm font-medium">선택된 상품들이 삭제되었습니다</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <p class="text-sm font-medium">오류가 발생했습니다.</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  `,a=`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니 
          </h2>
          
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 빈 장바구니 -->
          <div class="flex-1 flex items-center justify-center p-8">
            <div class="text-center">
              <div class="text-gray-400 mb-4">
                <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
              <p class="text-gray-600">원하는 상품을 담아보세요!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,o=`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니
            <span class="text-sm font-normal text-gray-600 ml-1">(2)</span>
          </h2>
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 전체 선택 섹션 -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <label class="flex items-center text-sm text-gray-700">
              <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
              전체선택 (2개)
            </label>
          </div>
          <!-- 아이템 목록 -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-4">
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="85067212996">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="85067212996">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="85067212996">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="85067212996">
                    PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    220원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="2" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="85067212996">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    440원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="85067212996">
                    삭제
                  </button>
                </div>
              </div>
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="86940857379">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="86940857379">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="86940857379">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="86940857379">
                    샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    230원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="1" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="86940857379">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    230원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="86940857379">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 하단 액션 -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <!-- 선택된 아이템 정보 -->
          <!-- 총 금액 -->
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-gray-900">총 금액</span>
            <span class="text-xl font-bold text-blue-600">670원</span>
          </div>
          <!-- 액션 버튼들 -->
          <div class="space-y-2">
            <div class="flex gap-2">
              <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                       hover:bg-gray-700 transition-colors text-sm">
                전체 비우기
              </button>
              <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors text-sm">
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,s=`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니
            <span class="text-sm font-normal text-gray-600 ml-1">(2)</span>
          </h2>
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 전체 선택 섹션 -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <label class="flex items-center text-sm text-gray-700">
              <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
              전체선택 (2개)
            </label>
          </div>
          <!-- 아이템 목록 -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-4">
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="85067212996">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" checked="" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="85067212996">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="85067212996">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="85067212996">
                    PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    220원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="2" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="85067212996">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    440원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="85067212996">
                    삭제
                  </button>
                </div>
              </div>
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="86940857379">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="86940857379">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="86940857379">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="86940857379">
                    샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    230원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="1" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="86940857379">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    230원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="86940857379">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 하단 액션 -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <!-- 선택된 아이템 정보 -->
          <div class="flex justify-between items-center mb-3 text-sm">
            <span class="text-gray-600">선택한 상품 (1개)</span>
            <span class="font-medium">440원</span>
          </div>
          <!-- 총 금액 -->
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-gray-900">총 금액</span>
            <span class="text-xl font-bold text-blue-600">670원</span>
          </div>
          <!-- 액션 버튼들 -->
          <div class="space-y-2">
            <button id="cart-modal-remove-selected-btn" class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                       hover:bg-red-700 transition-colors text-sm">
              선택한 상품 삭제 (1개)
            </button>
            <div class="flex gap-2">
              <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                       hover:bg-gray-700 transition-colors text-sm">
                전체 비우기
              </button>
              <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors text-sm">
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,c=`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="py-20 bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">상품 정보를 불러오는 중...</p>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `,l=`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <nav class="mb-4">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <button class="breadcrumb-link" data-category1="생활/건강">
              생활/건강
            </button>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <button class="breadcrumb-link" data-category2="생활용품">
              생활용품
            </button>
          </div>
        </nav>
        <!-- 상품 상세 정보 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <!-- 상품 이미지 -->
          <div class="p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover product-detail-image">
            </div>
            <!-- 상품 정보 -->
            <div>
              <p class="text-sm text-gray-600 mb-1"></p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장</h1>
              <!-- 평점 및 리뷰 -->
              <div class="flex items-center mb-3">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <span class="ml-2 text-sm text-gray-600">4.0 (749개 리뷰)</span>
              </div>
              <!-- 가격 -->
              <div class="mb-4">
                <span class="text-2xl font-bold text-blue-600">220원</span>
              </div>
              <!-- 재고 -->
              <div class="text-sm text-gray-600 mb-4">
                재고 107개
              </div>
              <!-- 설명 -->
              <div class="text-sm text-gray-700 leading-relaxed mb-6">
                PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장에 대한 상세 설명입니다. 브랜드의 우수한 품질을 자랑하는 상품으로, 고객 만족도가 높은 제품입니다.
              </div>
            </div>
          </div>
          <!-- 수량 선택 및 액션 -->
          <div class="border-t border-gray-200 p-4">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-gray-900">수량</span>
              <div class="flex items-center">
                <button id="quantity-decrease" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-l-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <input type="number" id="quantity-input" value="1" min="1" max="107" class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <button id="quantity-increase" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-r-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
            <!-- 액션 버튼 -->
            <button id="add-to-cart-btn" data-product-id="85067212996" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium">
              장바구니 담기
            </button>
          </div>
        </div>
        <!-- 상품 목록으로 이동 -->
        <div class="mb-6">
          <button class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
            hover:bg-gray-200 transition-colors go-to-product-list">
            상품 목록으로 돌아가기
          </button>
        </div>
        <!-- 관련 상품 -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
            <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 gap-3 responsive-grid">
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="86940857379">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover" loading="lazy">
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이</h3>
                <p class="text-sm font-bold text-blue-600">230원</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="82094468339">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img src="https://shopping-phinf.pstatic.net/main_8209446/82094468339.4.jpg" alt="실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제" class="w-full h-full object-cover" loading="lazy">
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제</h3>
                <p class="text-sm font-bold text-blue-600">280원</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `,u=`
    <main class="max-w-md mx-auto px-4 py-4">
      <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
          </linearGradient>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
          </filter>
        </defs>
        
        <!-- 404 Numbers -->
        <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
        
        <!-- Icon decoration -->
        <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
        <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
        <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
        <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
        
        <!-- Message -->
        <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
        
        <!-- Subtle bottom accent -->
        <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
      </svg>
      
      <a href="/" data-link class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
    </div>
    </main>
  `;this.element.innerHTML=`
      ${e}
      <br />
      ${t}
      <br />
      ${n}
      <br />
      ${r}
      <br />
      ${i}
      <br />
      ${a}
      <br />
      ${o}
      <br />
      ${s}
      <br />
      ${c}
      <br />
      ${l}
      <br />
      ${u}
  `}},pe=fe;const me=[{path:``,layout:I,children:[{path:``,component:de},{path:`detail/:id`,component:V},{path:`example`,component:pe}]},{path:`404`,component:re}],he=()=>f(async()=>{let{worker:e}=await import(`./browser-CTZrstzj.js`);return{worker:e}},[]).then(({worker:e})=>e.start({onUnhandledRequest:`bypass`}));function ge(){o(me)}he().then(ge);