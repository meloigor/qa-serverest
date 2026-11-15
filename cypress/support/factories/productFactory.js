import { faker } from '@faker-js/faker';

export const productFactory = {
  build(overrides = {}) {
    return {
      nome: `${faker.commerce.productName()} ${faker.string.alphanumeric(8)}`,
      preco: faker.number.int({ min: 10, max: 2000 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 }),
      ...overrides,
    };
  },
};
