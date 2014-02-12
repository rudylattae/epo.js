## Pulse

*IMPORTANT: tote is mostly feature complete and the API is resonably stable. However,
since it is still officially in alpha, you should not use it in production.*

<dl class="well">
    <dt>Status</dt><dd>In active development</dd>
    <dt>License</dt><dd>Open Source -- MIT</dd>
    <dt>Version</dt><dd>v0.2.1-a | <date>Feb 4 2004</date></dd>
    <dt>Download</dt>
    <dd>
        <a href="dist/tote.js">Development ()</a>&nbsp;&nbsp;
        <a href="dist/tote.min.js">Minified ()</a>
    </dd>
    <dt>Install</dt><dd><small>Coming soon! Bower, Component, Npm, NuGet...</small><dd>
</dl>

The source code is available on [GitHub](https://github.com/rudylattae/tote) which is also the
tracker for issues. To see the roadmap, i.e. current issues being worked on and upcoming 
milestones, checkout the [Huboard](https://huboard.com/rudylattae/tote).


## Features

- Use localStorage through isolated containers -- namespaces
- What you store is what you get -- Number, Boolean, Object, Array, String (of course)...
- Simple API, about seven (7) methods with some compatibility aliases to boot.


## <a name="quickstart"></a>Quickstart

Here are some pointers to get you up and running with `†ote` with no fuss.

### Install

Kicking old school? Simply download the latest release:

<a href="dist/tote.js" class="btn btn-primary">Download Full</a>
<a href="dist/tote.min.js" class="btn">Download Minified</a>

OR install it:

<small class="muted">Bower and Component support coming soon.</small>

### Import

If you want to use `tote` as a regular browser global, just include it in your webpage:

```markup
<script src="lib/tote.js" type="text/javascript"></script>
```

OR if you are an an environment with module a loader...

<small class="muted">AMD / CJS support coming soon.</small>


### Basic usage example

By way of a made-up example, let's pretend we need to store some user preferences.

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

That's it! Continue reading for details on the API.


## <a name="api"></a>API

- set(key, value) || setItem(key, value)
- get(key) || getItem(key)
- remove(key) || removeItem(key)
- all()
-- all({compact:true})
-- all({kvp:true})
- clear()
- length()
- key(n)



