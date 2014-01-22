# tote

> Thin namespaced wrapper for localStorage

With tote you may interact with localStorage as though it is a bunch of small containers 
where you stash specific things. Each "namespaced" instance of tote writes to the same underlying data store, but does not 
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
prefs.set('color1', '#ddd');
prefs.set('color2', '#555');
prefs.set('language', 'es');
```

#### See all you have stashed

```js
prefs.all()
// [logo: "http://example.com/my/logo.png", color1: "#ddd", color2: "#555", language: "es"]
```


## API

- set(key, value)
- get(key)
- remove(key)

