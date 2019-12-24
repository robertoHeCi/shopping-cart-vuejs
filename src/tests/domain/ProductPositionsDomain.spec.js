import ProductPositionsDomain from '@/domain/ProductPositionsDomain'

const productPositionsDomain = new ProductPositionsDomain()


test('Discount 5%', () => {
  let discountedPrice = productPositionsDomain.getProductPositionFinalPrice({ price: 20 , quantity:3, product: {price:20}}, 3, 5)
  expect(discountedPrice).toBe(19)
  discountedPrice = productPositionsDomain.getProductPositionFinalPrice({ price: 19 , quantity:2, product: {price:20}}, 3, 5)
  expect(discountedPrice).toBe(20)
})


test('Discount 10%', () => {
  let discountedPrice = productPositionsDomain.getProductPositionFinalPrice({ price: 20 , quantity:2, product: {price:20}}, 3, 10)
  expect(discountedPrice).toBe(20)
  discountedPrice = productPositionsDomain.getProductPositionFinalPrice({ price: 20 , quantity:3, product: {price:20}}, 3, 10)
  expect(discountedPrice).toBe(18)
  discountedPrice = productPositionsDomain.getProductPositionFinalPrice({ price: 18 , quantity:2, product: {price:20}}, 3, 10)
  expect(discountedPrice).toBe(20)
})
