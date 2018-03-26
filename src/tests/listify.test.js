const listify = require('../../lib').default;
const EVENT_TYPES = require('../../lib').EVENT_TYPES;

const test = {
  object: 'page',
  entry: [
    {
      messaging: [
        {
          message: {
            text: 'hello, world!',
            quick_reply: {
              payload: 'FOO1'
            }
          }
        },
        {
          message: {
            attachments: [{ val: 'FOO2' }]
          },
        },
        {
          message: {
            is_echo: true
          }
        }
      ]
    },
    {
      messaging: [
        {
          postback: {
            payload: 'FOO3'
          }
        },
        {
          read: {
            watermark: 1458668856253
          }
        }
      ]
    }
  ]
};

const result = listify(test);

console.assert(result.length === 5);
console.assert(result[0].type === EVENT_TYPES.QUICK_REPLY);
console.assert(result[1].type === EVENT_TYPES.ATTACHMENTS);
console.assert(result[2].type === EVENT_TYPES.ECHO);
console.assert(result[3].type === EVENT_TYPES.POSTBACK);
console.assert(result[4].type === EVENT_TYPES.READ);
console.log('✅ all tests are passing.');
