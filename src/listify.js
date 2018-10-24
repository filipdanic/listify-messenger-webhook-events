import EVENT_TYPES from './eventTypes';

/**
 *
 * @param {Object} body
 * @returns {Array.<{ type: string, senderId: string, message: string|undefined, attachments: Array.<Object>|undefined, event: Object|undefined }>}
 */
export default (body = {}) => {
  const ret = [];
  (body.entry || []).forEach((entry) => {
    const events = entry.messaging || [];
    events.forEach((event) => {
      const senderId = event.sender.id;
      // handle inbound messages and echos
      if (event.message) {
        if (event.message.is_echo) {
          ret.push({
            type: EVENT_TYPES.ECHO,
            senderId,
          });
          return;
        } else if (event.message.quick_reply) {
          ret.push({
            type: EVENT_TYPES.QUICK_REPLY,
            message: event.message.quick_reply.payload,
            senderId,
          });
          return;
        } else if (event.message.attachments) {
          ret.push({
            type: EVENT_TYPES.ATTACHMENTS,
            attachments: event.message.attachments,
            senderId,
          });
          return;
        } else {
          ret.push({
            type: EVENT_TYPES.MESSAGE,
            message: event.message.text,
            senderId,
          });
          return;
        }
      }

      // handle postbacks
      if (event.postback) {
        ret.push({
          type: EVENT_TYPES.POSTBACK,
          message: event.postback.payload,
          postback: event.postback,
          senderId,
        });
        return;
      }

      // handle message delivered
      if (event.delivery) {
        ret.push({
          type: EVENT_TYPES.DELIVERY,
          deliveryObject: event.delivery,
          senderId,
        });
        return;
      }

      // handle message read
      if (event.read) {
        ret.push({
          type: EVENT_TYPES.READ,
          readObject: event.read,
          senderId,
        });
        return;
      }

      // handle authentication
      if (event.optin) {
        ret.push({
          type: EVENT_TYPES.OPTIN_AUTH,
          event: event,
          senderId,
        });
        return;
      }

      // handle referrals (e.g. m.me links)
      if (event.referral) {
        ret.push({
          type: EVENT_TYPES.REFERRAL,
          event: event,
          senderId,
        });
      }

      if (event.account_linking) {
        ret.push({
          accountLinking: event.account_linking,
          type: EVENT_TYPES.ACCOUNT_LINKING,
          event: event,
          senderId,
        });
      }
    })
  });
  return ret;
};
