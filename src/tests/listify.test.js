const listify = require('../../lib').default;
const EVENT_TYPES = require('../../lib').EVENT_TYPES;

const test = {
  object: 'page',
  entry: [
    {
      messaging: [
        {
          sender: {
            id: 1000,
          },
          message: {
            text: 'hello, world!',
            quick_reply: {
              payload: 'FOO1'
            }
          }
        },
        {
          sender: {
            id: 2000,
          },
          message: {
            attachments: [{ val: 'FOO2' }]
          },
        },
        {
          sender: {
            id: 3000,
          },
          message: {
            is_echo: true
          }
        }
      ]
    },
    {
      messaging: [
        {
          sender: {
            id: 4000,
          },
          postback: {
            payload: 'FOO3'
          }
        },
        {
          sender: {
            id: 5000,
          },
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

console.assert(result[0].senderId === 1000);
console.assert(result[1].senderId === 2000);
console.assert(result[2].senderId === 3000);
console.assert(result[3].senderId === 4000);
console.assert(result[4].senderId === 5000);
console.log('✅ all tests are passing.');
