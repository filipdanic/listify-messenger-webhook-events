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
 * @returns {Array.<{ type: string, message: string|undefined, attachments: Array.<Object>|undefined, event: Object|undefined }>}
 */
exports.default = function () {
  var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var ret = [];
  (body.entry || []).forEach(function (entry) {
    var events = entry.messaging || [];
    events.forEach(function (event) {
      // handle inbound messages and echos
      if (event.message) {
        if (event.message.is_echo) {
          ret.push({ type: _eventTypes2.default.ECHO });
          return;
        } else if (event.message.quick_reply) {
          ret.push({
            type: _eventTypes2.default.QUICK_REPLY,
            message: event.message.quick_reply.payload
          });
          return;
        } else if (event.message.attachments) {
          ret.push({
            type: _eventTypes2.default.ATTACHMENTS,
            attachments: event.message.attachments
          });
          return;
        } else {
          ret.push({
            type: _eventTypes2.default.MESSAGE,
            message: event.message.text
          });
          return;
        }
      }

      // handle postbacks
      if (event.postback) {
        ret.push({
          type: _eventTypes2.default.POSTBACK,
          postback: event.postback
        });
        return;
      }

      // handle message delivered
      if (event.delivery) {
        ret.push({
          type: _eventTypes2.default.DELIVERY,
          deliveryObject: event.delivery
        });
        return;
      }

      // handle message read
      if (event.read) {
        ret.push({
          type: _eventTypes2.default.READ,
          readObject: event.read
        });
        return;
      }

      // handle authentication
      if (event.optin) {
        ret.push({
          type: _eventTypes2.default.OPTIN_AUTH,
          event: event
        });
        return;
      }

      // handle referrals (e.g. m.me links)
      if (event.referral) {
        ret.push({
          type: _eventTypes2.default.REFERRAL,
          event: event
        });
      }
    });
  });
  return ret;
};