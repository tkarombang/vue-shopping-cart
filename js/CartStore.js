import { ref, reactive, computed } from "vue";

const cart = ref([]);
export let style = reactive({
  label: ["form-label", "w-25", "text-nowrap"],
  // label: ["font-weight-bold", "mr-2"],
  inputWidth: 65,
  sliderStatus: false,
});

//Mengekspose object style ke window global
window.style = style;

export const sliderState = computed(() => {
  return style.sliderStatus ? "d-flex" : "d-none";
});

// export function addToCart(product) {
//   return cart.value.push(product);
// }

const addToCart = (product, qty = 1) => {
  const itemIndex = cart.value.findIndex((item) => item.product.id === product.id);

  if (itemIndex !== -1) {
    cart.value[itemIndex].qty += qty;
    cart.value[itemIndex].totalPrice = (cart.value[itemIndex].product.price * cart.value[itemIndex].qty).toFixed(2);
  } else {
    cart.value.push({ product, qty, totalPrice: product.price * qty });
  }
};

const totalCartPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0).toFixed(2);
});
const totalQuantity = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.qty, 0);
});
const removeFromCart = (product, qty = 1) => {
  const itemIndex = cart.value.findIndex((item) => item.product.id === product.id);

  if (itemIndex !== -1) {
    console.log(cart.value[itemIndex].qty);
    console.log(qty);
    if (cart.value[itemIndex].qty > qty) {
      cart.value[itemIndex].qty -= qty;
      cart.value[itemIndex].totalPrice = (cart.value[itemIndex].product.price * cart.value[itemIndex].qty).toFixed(2);
    } else {
      cart.value.splice(itemIndex, 1);
    }
  }
};

export { addToCart, cart, totalCartPrice, totalQuantity, removeFromCart };
