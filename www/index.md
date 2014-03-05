<a name="about"></a>
## About

tote is a tiny JavaScript library that turns localStorage into isolated containers. 
Use multiple totes in the same app, with minimal overhead and no fear of key collisions.

### Features

- Use localStorage through isolated containers -- namespaces
- What you store is what you get -- Number, Boolean, Object, Array, String (of course)...
- Simple API, about seven (7) methods -- fully compatible with native methods.


<a name="quickstart"></a>
## Quickstart

<p class="note note-info">
This site includes a copy of the latest version of tote. So you may try out any of the 
examples on the site, right in your browser console. It's like a "try before you buy" feature
-- minus the *buy* part 'cos it is **FREE!**
</p>

To use tote, first download/install it then include it in your markup/code.
Here are some pointers to get you up and running with `†ote` with no fuss.


### Download / Install

Kicking it old school? Simply download the latest release: <a href="dist/tote.js">Full</a>
/ <a href="dist/tote.min.js">Minified</a>

OR install it:

<small class="muted">coming soon.</small>


### Import

If you want to use `tote` as a regular browser global, just include it in your webpage:

```markup
<script src="lib/tote.js" type="text/javascript"></script>
```

OR if you are an an environment with module a loader...

<small class="muted">AMD / CJS support coming soon.</small>


### Basic usage example

In the following made-up example, we will pretend we need to store some user preferences
for an awesome application.

```javascript
// Create a namespaced instance
var prefs = tote('settings');

// For the purposes of this example,
// delete all the values stored in this namespace
prefs.clear();

// Confirm that we have nothing
console.log( prefs.length() );
// 0

// Store a number
prefs.set('count', 500);

// Retrieve what we stored, as the original data type
console.log( prefs.get('count') );
// 500 <-- Note that it is an Integer.

// Store some more numbers (floats and negatives)
prefs.set('cost', 35.99);
prefs.set('temperature', -25);

// Throw in a Boolean and a String
prefs.set('isActive', true);
prefs.set('fullName', 'Blazing Hoofs');

// Look at EVERYTHING in our tote and check the size
console.log( prefs.all() );
// [
//   { key: "count": value: 500 }, 
//   { key: "cost", value: 35.99 }, 
//   { key: "temperature", value: -25 }, 
//   { key: "isActive", value: true }, 
//   { key: "fullName", value: "Blazing Hoofs" } 
// ] 
console.log( prefs.length() );
// 5

// Remove an item from the tote and verify it's gone
prefs.remove('count');
console.log( prefs.get('count') );
// null

// Get rid of some more stuff.
prefs.remove('temperature');
prefs.remove('fullName');

// What are we left with?
console.log( prefs.all() );
// [
//   { key: "cost", value: 35.99 }, 
//   { key: "isActive", value: true }
// ]
console.log( prefs.length() );
// 2

// You can figure out the key for the value 
// at position 'n'. Like this:
console.log( prefs.key(1) );
// "isActive" 

// If you want to nuke everything in this tote...
prefs.clear();
console.log( prefs.all() );
// []
console.log( prefs.length() );
// 0 
// Note that `clear()` only affects the namespace of the tote it is called on. 
// Everything else in localStorage is untouched
```

That's it! The full API, which is just 7 methods is described in the example above.
You may see the [API documentation](#api) below for a clean list and additional details.


<a name="api"></a>
## API

#### set(key, value)

Aliases: setItem

Store `value` identified by `key`

#### get(key)

Aliases: getItem

Retrieve `value` stored with `key`

#### remove(key)

Aliases: removeItem(key)

Delete the `value` stored with `key`

#### all()

Retrieve an array of all the values stored in this namespace.

#### clear()

Delete *all* the values stored in this namespace.

#### length()

Get the number of items stored in this namespace.

#### key(n)

Get the key stored at position 'n'.

