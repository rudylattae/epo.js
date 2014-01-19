# tote

> Thin namespaced wrapper for localStorage

With tote you may interact with localStorage as though it is a bunch of small containers 
where you stash specific things. Each "namespaced" instance of tote writes to the same underlying data store, but does not 
interfere with any others.


## Usage

### Create a namespaced instance

```js
var prefs = tote('preferences');
```

### Stash some data

```js
prefs.set('theme', 'something');
```

### Retrieve what you stored

tote deserializes your stored data back to the original data type

```js
var theme = prefs.get('theme');
// 'something'
```

### Delete what you don't care about anymore

```js
prefs.remove('theme');
prefs.get('theme');
// undefined
```
