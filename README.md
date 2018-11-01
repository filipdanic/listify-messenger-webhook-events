# listify-messenger-webhook-events

Parses the events object from Messenger webhook and returns an array of events.

## Usage

Install with `yarn add listify-messenger-webhook-events`.

```javascript
import listify, { EVENT_TYPES } from 'listify-messenger-webhook-events';

// ...
const result = listify(parsedFbWebhookBody);
// result is an array of objects in chronological order (see below)
// each having a key `type` which is some value of EVENT_TYPES 
```

## Event Types & Payload

### Message
```
{
    type: EVENT_TYPES.MESSAGE,
    message: string,
    senderId: string,
}
```

### Postback
```
{
    type: EVENT_TYPES.POSTBACK,
    message: string,
    postback: postbackObject,
    senderId: string,
}
```

### Attachments
```
{
    type: EVENT_TYPES.ATTACHMENTS,
    attachments: Array<AttachmentObjects>,
    senderId: string,
}
```

### Quick Reply
```
{
    type: EVENT_TYPES.QUICK_REPLY,
    message: devPayload,
    senderId: string,
}
```

### Delivery
```
{
    type: EVENT_TYPES.DELIVERY,
    deliveryObject: deliveryObject,
    senderId: string,
}
```

### Read
```
{
    type: EVENT_TYPES.READ,
    readObject: readObject,
    senderId: string,
}
```

### Opt-in Auth
```
{
    type: EVENT_TYPES.OPTIN_AUTH,
    event: Object,
    senderId: string,
}
```

### Referral
```
{
    type: EVENT_TYPES.REFERRAL,
    event: eventObject,
    senderId: string,
}
```

### Account Linking
```
{
    type: EVENT_TYPES.ACCOUNT_LINKING,
    event: eventObject,
    accountLinking: accountLinkingObject,
    senderId: string,
}
```

### Echo
```
{
    type: EVENT_TYPES.ECHO,
    senderId: string,
}
```

### All Event Types

- `ECHO`
- `MESSAGE`
- `POSTBACK`
- `DELIVERY`
- `READ`
- `OPTIN_AUTH`
- `REFERRAL`
- `ATTACHMENTS`
- `QUICK_REPLY`
- `ACCOUNT_LINKING`
