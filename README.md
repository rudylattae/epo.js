# tote

> Thin namespaced wrapper for localStorage

Use localStorage as though it is a bunch of small containers for specific areas of your app.
Each "namespaced" instance of tote writes to the same underlying data store, but does not 
interfere with any others.


## Usage

### Basic examples to get you started

#### Create a namespaced instance

```js
var prefs = tote('preferences');
```

#### Stash some data

```js
prefs.set('theme', 'something');
```

#### Retrieve what you stored

tote deserializes your stored data back to the original data type

```js
prefs.get('theme');
// 'something'
```

#### Delete stuff

```js
prefs.remove('theme');
prefs.get('theme');
// null
```

#### Add some more stuff

```js
prefs.set('logo', 'http://example.com/my/logo.png');
prefs.set('language', 'es');
prefs.set('total', 4560);
prefs.set('average', 22.45);
prefs.set('isActive', true);
```

#### Get all stored values as a list...

```js
prefs.all()
// ["http://example.com/my/logo.png", "es", 4560, 22.45, true]
```

#### ... or a compact list of key,value objects [{key:value}, ]...

```js
prefs.all({compact:true})
// [logo: "http://example.com/my/logo.png", language: "es", total: 4560, average: 22.45, isActive: true]
```

#### ... or a list of key-value pairs [{key:'KEY', value:'VALUE'}, ]

```js
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
```

#### If you need to, you may nuke the entire bunch

```js
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
