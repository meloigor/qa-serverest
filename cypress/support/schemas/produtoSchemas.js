export const produtoSchema = {
  type: 'object',
  required: ['nome', 'preco', 'descricao', 'quantidade', '_id'],
  properties: {
    nome: { type: 'string' },
    preco: { type: 'number' },
    descricao: { type: 'string' },
    quantidade: { type: 'number' },
    _id: { type: 'string' },
  },
};

export const createProdutoResponseSchema = {
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
