'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventTypes = require('./eventTypes');

var _eventTypes2 = _interopRequireDefault(_eventTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Object} body
 * @returns {Array.<{ type: string, senderId: string, message: string|undefined, attachments: Array.<Object>|undefined, event: Object|undefined }>}
 */
exports.default = function () {
  var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var ret = [];
  (body.entry || []).forEach(function (entry) {
    var events = entry.messaging || [];
    events.forEach(function (event) {
      var senderId = event.sender.id;
      // handle inbound messages and echos
      if (event.message) {
        if (event.message.is_echo) {
          ret.push({
            type: _eventTypes2.default.ECHO,
            senderId: senderId
          });
          return;
        } else if (event.message.quick_reply) {
          ret.push({
            type: _eventTypes2.default.QUICK_REPLY,
            message: event.message.quick_reply.payload,
            senderId: senderId
          });
          return;
        } else if (event.message.attachments) {
          ret.push({
            type: _eventTypes2.default.ATTACHMENTS,
            attachments: event.message.attachments,
            senderId: senderId
          });
          return;
        } else {
          ret.push({
            type: _eventTypes2.default.MESSAGE,
            message: event.message.text,
            senderId: senderId
          });
          return;
        }
      }

      // handle postbacks
      if (event.postback) {
        ret.push({
          type: _eventTypes2.default.POSTBACK,
          message: event.postback.payload,
          postback: event.postback,
          senderId: senderId
        });
        return;
      }

      // handle message delivered
      if (event.delivery) {
        ret.push({
          type: _eventTypes2.default.DELIVERY,
          deliveryObject: event.delivery,
          senderId: senderId
        });
        return;
      }

      // handle message read
      if (event.read) {
        ret.push({
          type: _eventTypes2.default.READ,
          readObject: event.read,
          senderId: senderId
        });
        return;
      }

      // handle authentication
      if (event.optin) {
        ret.push({
          type: _eventTypes2.default.OPTIN_AUTH,
          event: event,
          senderId: senderId
        });
        return;
      }

      // handle referrals (e.g. m.me links)
      if (event.referral) {
        ret.push({
          type: _eventTypes2.default.REFERRAL,
          event: event,
          senderId: senderId
        });
      }
    });
  });
  return ret;
};