export const usuarioSchema = {
  type: 'object',
  required: ['nome', 'email', 'password', 'administrador', '_id'],
  properties: {
    nome: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    administrador: { type: 'string' },
    _id: { type: 'string' },
  },
};

export const createUserResponseSchema = {
  type: 'object',
  required: ['message', '_id'],
  properties: {
    message: { type: 'string' },
    _id: { type: 'string' },
  },
};

export const messageSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: { type: 'string' },
  },
};
