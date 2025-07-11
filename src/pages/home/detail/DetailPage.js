import Component from '../../../core/Component.js';
import { getProduct, getProducts } from '../../../api/productApi.js';
import { numberUtils } from '../../../utils/numberUtils.js';
import { getFullPath, router } from '../../../utils/router.js';
import cartLocalStorage from '../../../store/cartLocalStorage.js';
import { toastSuccess } from '../../../store/toastStore.js';

class DetailPage extends Component {
  constructor(element, props) {
    super(element, props);
    this.state = {
      loading: true,
      product: null,
      quantity: 1,
      relatedProducts: null,
    };
    this.unsubscribeCartStorage = null;
  }

  async onMount() {
    const product = await getProduct(this.props.id);
    const relatedProducts = await getProducts({
      category1: product.category1,
      category2: product.category2,
    });
    this.setState({
      loading: false,
      product,
      relatedProducts,
    });

    // 장바구니 데이터 변경시 자동 리렌더
    this.unsubscribeCartStorage = cartLocalStorage.subscribe('shopping_cart', () => {
      this.render();
    });
  }

  onUnmount() {
    // 구독 해제
    if (this.unsubscribeCartStorage) this.unsubscribeCartStorage();
  }

  handleChangeQuantity(action) {
    if (action === 'increase') {
      this.setState({
        ...this.state,
        quantity: this.state.quantity + 1,
      });
    } else if (action === 'decrease') {
      this.setState({
        ...this.state,
        quantity: Math.max(1, this.state.quantity - 1),
      });
    }
  }

  handleAddCartItem(items, product) {
    const { quantity } = this.state;
    const existingItem = items.find((item) => item.productId === product.productId);

    let updatedCart;
    if (existingItem) {
      updatedCart = items.map((item) => {
        return item.productId === product.productId
          ? { ...item, quantity: item.quantity + quantity }
          : item;
      });
    } else {
      const newItem = {
        ...product,
        quantity,
        isSelected: false,
      };
      updatedCart = [...items, newItem];
    }

    cartLocalStorage.set('shopping_cart', updatedCart);
    toastSuccess('장바구니에 추가되었습니다');
  }

  attachEventListeners() {
    this.addEventListener(this.element, 'click', (event) => {
      const goToProductListBtn = event.target.closest('.go-to-product-list');
      if (goToProductListBtn) {
        router.push(getFullPath('/'));
        return;
      }

      const decreaseBtn = event.target.closest('#quantity-decrease');
      if (decreaseBtn) {
        this.handleChangeQuantity('decrease');
        return;
      }

      const increaseBtn = event.target.closest('#quantity-increase');
      if (increaseBtn) {
        this.handleChangeQuantity('increase');
        return;
      }

      const products = cartLocalStorage.get('shopping_cart') || [];
      const addToCartBtn = event.target.closest('#add-to-cart-btn');
      if (addToCartBtn) {
        this.handleAddCartItem(products, {
          productId: this.state.product.productId,
          title: this.state.product.title,
          image: this.state.product.image,
          lprice: this.state.product.lprice,
        });
        return;
      }

      const relatedProductCard = event.target.closest('.related-product-card');
      if (relatedProductCard) {
        const productId = relatedProductCard.dataset.productId;
        router.push(getFullPath(`/detail/${productId}`));
        return;
      }

      const breadcrumbLink = event.target.closest('.breadcrumb-link');
      if (breadcrumbLink) {
        const params = breadcrumbLink.dataset.category1
          ? `?category1=${this.state.product.category1}`
          : `?category1=${this.state.product.category1}&category2=${this.state.product.category2}`;
        router.push(getFullPath(`/${params}`));
      }
    });

    this.addEventListener(this.element, 'change', (event) => {
      const quantityInput = event.target.closest('#quantity-input');
      if (quantityInput) {
        this.setState({
          ...this.state,
          quantity: quantityInput.value,
        });
      }
    });
  }

  renderLoadingUI() {
    return /* HTML */ `
      <div class="py-20 bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
          ></div>
          <p class="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    `;
  }

  renderRelatedProducts() {
    const {
      relatedProducts: { products },
    } = this.state;

    const filteredProducts = products.filter((item) => item.productId !== this.props.id);

    return /* HTML */ `
      <!-- 관련 상품 -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
          <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3 responsive-grid">
            ${filteredProducts
              .map((product) => {
                return /* HTML */ `
                  <div
                    class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
                    data-product-id="${product.productId}"
                  >
                    <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                      <img
                        src="${product.image}"
                        alt="${product.title}"
                        class="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                      ${product.title}
                    </h3>
                    <p class="text-sm font-bold text-blue-600">
                      ${numberUtils.comma(product.lprice)}원
                    </p>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const { product } = this.state;

    this.element.innerHTML = /* HTML */ ` <main class="max-w-md mx-auto px-4 py-4">
      ${this.state.loading
        ? this.renderLoadingUI()
        : /* HTML */ `
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
                <button class="breadcrumb-link" data-category1="${product.category1}}">
                  ${product.category1}
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
                <button class="breadcrumb-link" data-category2="${product.category2}">
                  ${product.category2}
                </button>
              </div>
            </nav>
            <!-- 상품 상세 정보 -->
            <div class="bg-white rounded-lg shadow-sm mb-6">
              <!-- 상품 이미지 -->
              <div class="p-4">
                <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src="${product.image}"
                    alt="${product.title}"
                    class="w-full h-full object-cover product-detail-image"
                  />
                </div>
                <!-- 상품 정보 -->
                <div>
                  <p class="text-sm text-gray-600 mb-1"></p>
                  <h1 class="text-xl font-bold text-gray-900 mb-3">${product.title}</h1>
                  <!-- 평점 및 리뷰 -->
                  <div class="flex items-center mb-3">
                    <div class="flex items-center">
                      ${Array.from({ length: 5 })
                        .map((_, index) => {
                          const isFilled = index < product.rating;
                          const starClass = isFilled ? 'text-yellow-400' : 'text-gray-300';
                          return /* HTML */ `
                            <svg
                              class="w-4 h-4 ${starClass}"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              ></path>
                            </svg>
                          `;
                        })
                        .join('')}
                    </div>

                    <span class="ml-2 text-sm text-gray-600"
                      >${product.rating} (${product.reviewCount}개 리뷰)</span
                    >
                  </div>
                  <!-- 가격 -->
                  <div class="mb-4">
                    <span class="text-2xl font-bold text-blue-600"
                      >${numberUtils.comma(product.lprice)}원</span
                    >
                  </div>
                  <!-- 재고 -->
                  <div class="text-sm text-gray-600 mb-4">재고 ${product.stock}개</div>
                  <!-- 설명 -->
                  <div class="text-sm text-gray-700 leading-relaxed mb-6">
                    ${product.description}
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
                  data-product-id="${product.productId}"
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
            ${this.state.relatedProducts.products ? this.renderRelatedProducts() : ''}
          `}
    </main>`;
  }
}

export default DetailPage;
