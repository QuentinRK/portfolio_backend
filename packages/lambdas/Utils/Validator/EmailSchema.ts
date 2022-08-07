import Ajv, { JSONSchemaType } from 'ajv';
import { Email } from '../Interfaces/EmailInterface';

const ajv = new Ajv();

const schema: JSONSchemaType<Email> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['email', 'message', 'name'],
  additionalProperties: false,
};

export default ajv.compile(schema);
