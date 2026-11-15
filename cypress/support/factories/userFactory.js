import { faker } from '@faker-js/faker';

export const userFactory = {
  build(overrides = {}) {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email({ provider: 'qa-serverest.dev' }).toLowerCase(),
      password: faker.internet.password({ length: 10 }),
      administrador: 'false',
      ...overrides,
    };
  },
};
