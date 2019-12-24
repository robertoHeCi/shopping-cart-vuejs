import PromotionsDomain from '@/domain/PromotionsDomain'

const promotionDomain = new PromotionsDomain()


test('PromotionCalculation 2X1', () => {
  let numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(2, 2, 1)
  expect(numberOfFreeProducts).toBe(0)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(3, 2, 1)
  expect(numberOfFreeProducts).toBe(1)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(5, 2, 1)
  expect(numberOfFreeProducts).toBe(1)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(6, 2, 1)
  expect(numberOfFreeProducts).toBe(2)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(10, 2, 1)
  expect(numberOfFreeProducts).toBe(3)
})

test('PromotionCalculation 3X1', () => {
  let numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(3, 3, 1)
  expect(numberOfFreeProducts).toBe(0)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(4, 3, 1)
  expect(numberOfFreeProducts).toBe(1)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(5, 3, 1)
  expect(numberOfFreeProducts).toBe(1)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(7, 3, 1)
  expect(numberOfFreeProducts).toBe(1)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(8, 3, 1)
  expect(numberOfFreeProducts).toBe(2)
})

test('PromotionCalculation 3X2', () => {
  let numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(4, 3, 2)
  expect(numberOfFreeProducts).toBe(0)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(5, 3, 2)
  expect(numberOfFreeProducts).toBe(2)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(10, 3, 2)
  expect(numberOfFreeProducts).toBe(4)
  numberOfFreeProducts = promotionDomain.getFreeProductsByPromotion(15, 3, 2)
  expect(numberOfFreeProducts).toBe(6)
})
