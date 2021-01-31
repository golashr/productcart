export const ProductSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'http://example.com/example.json',
  type: 'object',
  title: 'The root schema',
  description: 'The root schema comprises the entire JSON document.',
  default: {},
  examples: [
    {
      id: 'wf',
      name: 'Workflow',
      price: 111.99,
      img: './images/image2.jpg'
    }
  ],
  required: ['id', 'name', 'price', 'img'],
  properties: {
    id: {
      $id: '#/properties/id',
      type: 'string',
      title: 'The id schema',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: ['wf']
    },
    name: {
      $id: '#/properties/name',
      type: 'string',
      title: 'The name schema',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: ['Workflow']
    },
    price: {
      $id: '#/properties/price',
      type: 'number',
      title: 'The price schema',
      description: 'An explanation about the purpose of this instance.',
      default: 0.0,
      examples: [111.99]
    },
    img: {
      $id: '#/properties/img',
      type: 'string',
      title: 'The img schema',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: ['./images/image2.jpg']
    }
  },
  additionalProperties: true
};
