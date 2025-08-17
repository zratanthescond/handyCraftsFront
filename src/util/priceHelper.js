export const priceFormater = price => new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 3, style: "currency", currency: "TND" }).format(price);

export const priceAfterDiscount = (price, discount) => {

     const discountValue = price * discount / 100;

     return Math.round(price - discountValue);
}