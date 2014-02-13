# tote

> A thin namespaced localStorage API.

**IMPORTANT** tote is not yet stable so you should not use it in production. If you like what you see so far,
star it on GitHub so I know you want to use it.

Use localStorage as though it is a bunch of small containers for specific areas of your app.
Each "namespaced" instance of tote writes to the same underlying data store, but does not 
interfere with any others.

For more detailed examples, and the ability to try it out in your browser console, go to **http://rudylattae.github.io/tote/**


## Usage

### Basic example to get you started

#### Create a namespaced instance

```js
var prefs = tote('preferences');

// Stash some data
prefs.set('theme', 'something');

// Retrieve what you stored
// NOTE: tote deserializes your stored data back to the original data type
prefs.get('theme');
// 'something'

// Delete stuff
prefs.remove('theme');
prefs.get('theme');

// Store some more data
prefs.set('logo', 'http://example.com/my/logo.png');
prefs.set('language', 'es');
prefs.set('total', 4560);
prefs.set('average', 22.45);
prefs.set('isActive', true);

// Get all stored values as a list...
prefs.all()
// ["http://example.com/my/logo.png", "es", 4560, 22.45, true]

// ... or a compact list of key,value objects [{key:value}, ]...
prefs.all({compact:true})
// [logo: "http://example.com/my/logo.png", language: "es", total: 4560, average: 22.45, isActive: true]

// ... or a list of key-value pairs [{key:'KEY', value:'VALUE'}, ]
prefs.all({kvp:true})
/*
[
    { key: "logo", value: "http://example.com/my/logo.png" },
    { key: "language", value: "es" },
    { key: "total", value: 4560 },
    { key: "average", value: 22.45 },
    { key: "isActive", value: true }
]
*/

// If you need to, you may nuke the entire bunch
prefs.clear();
prefs.get('logo');
// null  
prefs.all()
// []
```


## API

- set(key, value) || setItem(key, value)
- get(key) || getItem(key)
- remove(key) || removeItem(key)
- all()
-- all({compact:true})
-- all({kvp:true})
- clear()
- length()
- key(n)
