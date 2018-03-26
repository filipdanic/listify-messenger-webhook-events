# listify-messenger-webhook-events

Parses the events object from Messenger webhook and returns an array of events.

## Usage

```javascript
import listify, { EVENT_TYPES } from 'listify-messenger-webhook-events';

// ...
const result = listify(parsedFbWebhookBody);
// result is an array of objects in chronological order
// each having a key `type` which is some value of EVENT_TYPES 
```
