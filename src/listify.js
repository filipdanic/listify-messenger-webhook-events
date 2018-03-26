import EVENT_TYPES from './eventTypes';

/**
 *
 * @param {Object} body
 * @returns {Array.<{ type: string, message: string|undefined, attachments: Array.<Object>|undefined, event: Object|undefined }>}
 */
export default (body = {}) => {
  const ret = [];
  (body.entry || []).forEach((entry) => {
    const events = entry.messaging || [];
    events.forEach((event) => {
      // handle inbound messages and echos
      if (event.message) {
        if (event.message.is_echo) {
          ret.push({ type: EVENT_TYPES.ECHO });
          return;
        } else if (event.message.quick_reply) {
          ret.push({
            type: EVENT_TYPES.QUICK_REPLY,
            message: event.message.quick_reply.payload,
          });
          return;
        } else if (event.message.attachments) {
          ret.push({
            type: EVENT_TYPES.ATTACHMENTS,
            attachments: event.message.attachments,
          });
          return;
        } else {
          ret.push({
            type: EVENT_TYPES.MESSAGE,
            message: event.message.text,
          });
          return;
        }
      }

      // handle postbacks
      if (event.postback) {
        ret.push({
          type: EVENT_TYPES.POSTBACK,
          postback: event.postback,
        });
        return;
      }

      // handle message delivered
      if (event.delivery) {
        ret.push({
          type: EVENT_TYPES.DELIVERY,
          deliveryObject: event.delivery,
        });
        return;
      }

      // handle message read
      if (event.read) {
        ret.push({
          type: EVENT_TYPES.READ,
          readObject: event.read,
        });
        return;
      }

      // handle authentication
      if (event.optin) {
        ret.push({
          type: EVENT_TYPES.OPTIN_AUTH,
          event: event,
        });
        return;
      }

      // handle referrals (e.g. m.me links)
      if (event.referral) {
        ret.push({
          type: EVENT_TYPES.REFERRAL,
          event: event,
        });
      }
    })
  });
  return ret;
};
