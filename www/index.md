## Synopsis

To use tote, first [download/install it](#quickstart) then include it in your markup/code.
Here is a simple example showing how to use tote to access localStorage.

```javascript
var about = tote('about-tote');

about.set('tags', ['simple', 'tiny']);
console.log( about.get('tags') );
// ['simple', 'tiny']

about.set('isActive', true);
console.log( about.get('isActive') );
// true

about.remove('isActive');
console.log( about.get('isActive') );
// null
```

<p class="note note-info">
This site will always include an active copy of the latest version of tote. So if you want to 
try out any of the examples here, just open up your browser developer console and copy/paste 
the example.
</p>

It's like a "try before you buy" feature -- minus the *buy* part cos it is **FREE!** :) 


## Features

- Use localStorage through isolated containers -- namespaces
- What you store is what you get -- Number, Boolean, Object, Array, String (of course)...
- Simple API, about seven (7) methods with some compatibility aliases to boot.


## <a name="quickstart"></a>Quickstart

Here are some pointers to get you up and running with `†ote` with no fuss.

### Install

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

As an example, let's pretend we need to store some user preferences.

```javascript
// Create a namespaced instance
var prefs = tote('settings');

// Store a number
prefs.set('count', 500);

// Retrieve what you stored, as the original data type
console.log( prefs.get('count') );
// 500 <-- it is an Integer!

// Store some more numbers
prefs.set('cost', 35.99);
prefs.set('temperature', -25);

// Take a look at what you have so far
console.log( prefs.get('cost') );
// 35.99

console.log( prefs.get('temperature') );
// -25

// Okay, now throw in a Boolean and a String
prefs.set('isActive', true);
prefs.set('fullName', 'Blazing Hoofs');

// Now look at the loot
console.log( prefs.all() );
// [500, 35.99, -25, true, "Blazing Hoofs"] 

// Delete one thing
prefs.remove('count');
console.log( prefs.get('count') );
// null

// Get rid of some more stuff
prefs.remove('temperature');
prefs.remove('fullName');

// So finally what are we left with?
console.log( prefs.all() );
// [35.99, true]
```

That's it! The full API (all 7 methods!) are documented below.


## <a name="api"></a>API

<p class="note note-info">
<strong>Coming soon<strong>.
</p>

#### set(key, value) || setItem(key, value)

#### get(key) || getItem(key)

#### remove(key) || removeItem(key)

#### all()

- all({compact:true})
- all({kvp:true})

#### clear()

#### length()

#### key(n)



