## Pulse

*IMPORTANT: tote is mostly feature complete and the API is resonably stable. However,
since it is still officially in alpha, you should not use it in production.*

<dl class="well">
    <dt>Status</dt><dd>In active development</dd>
    <dt>Latest release</dt><dd>v0.2.1-a (Feb 4 2004)</dd>
    <dt>License</dt><dd>Open Source -- **MIT**</dd>
</dl>

The source code is available on [GitHub](https://github.com/rudylattae/tote) which is also the
tracker for issues. To see the roadmap, i.e. current issues being worked on and upcoming 
milestones, checkout the [Huboard](https://huboard.com/rudylattae/tote).


## Features

- Use localStorage through isolated containers -- namespaces
- What you store is what you get -- ints, bools, lists, objects, string (of course)...
- Simple API, about seven (7) methods with some compatibility aliases to boot.



## Installation and supported environments

<small class="muted"> Bower and AMD/CJS support comming soon.</small>

### Classic

Download the loatest release and include the script in your html:


```markup
<script src="lib/tote.js" type="text/javascript"></script>
```

<small>v0.2.1-a released Feb 4 2004</small>

<a href="dist/tote.js" class="btn btn-primary">Download Full</a>
<a href="dist/tote.min.js" class="btn">Download Minified</a>


## Basic usage

Let's see how we could use `tote` to store some user preferences.

```javascript
// Create a namespaced instance
var prefs = tote('settings');

// Stash an int
items.set('', 'Blazing Hoofs');
items.set('theme', 'Blazing Hoofs');

// Retrieve what you stored, as the original data type
prefs.get('theme');
// 'something'

// Delete stuff
prefs.remove('theme');
prefs.get('theme');
// null

// Add some more stuff
prefs.set('logo', 'http://example.com/my/logo.png');
prefs.set('language', 'es');
prefs.set('total', 4560);
prefs.set('average', 22.45);
prefs.set('isActive', true);
```

## Speed and efficiency 

[See how it performs](http://jsperf.com/tote-vs-native-storage) against the native (non-namespaced) localStorage.


## Tests

[Run](spec/) the specs in your current browser