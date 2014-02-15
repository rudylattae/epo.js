## <a name="about"></a>About

tote is a tiny JavaScript library that turns localStorage into isolated containers. 
Use multiple totes in the same app, with minimal overhead and no fear of key collisions.

### Features

- Use localStorage through isolated containers -- namespaces
- What you store is what you get -- Number, Boolean, Object, Array, String (of course)...
- Simple API, about seven (7) methods with some compatibility aliases to boot.


## <a name="quickstart"></a>Quickstart

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

// For the purposes of this example, let's clean house
prefs.clear();
// deletes all the values stored in this namespace

// Confirm that we have nothing
console.log( prefs.length() );
// 0 <-- See, I told you!

// Okay, now we store a number (I don't know what its for)
prefs.set('count', 500);

// Retrieve what we stored, as the original data type
console.log( prefs.get('count') );
// 500 <-- Kyaa! it is an Integer!

// Store some more numbers
prefs.set('cost', 35.99);
prefs.set('temperature', -25);

// Take a look at what we have so far
console.log( prefs.get('cost') );
// 35.99
console.log( prefs.get('temperature') );
// -25

// At this point, the number of items in our tote has gone up a bit
console.log( prefs.length() );
// 3 <-- It's a decent number, could go much higher


// Okay, it's time to jazz it up a bit with a Boolean and a String
prefs.set('isActive', true);
prefs.set('fullName', 'Blazing Hoofs');

// Now, say we want to see EVERYTHING in our tote
console.log( prefs.all() );
// [500, 35.99, -25, true, "Blazing Hoofs"] 
console.log( prefs.length() );
// 5 <-- Good going, we are stuffing out tote full of goodies!


// So far we had some fun putting stuff in our tote,
// but it's getting heavy so we want to take some items out. 
// How?
// It's simple. Say you are tired of the `count`. 
// Just reach in an toss it.
prefs.remove('count');
console.log( prefs.get('count') );
// null <-- Gasp! We really chucked it eh?

// Now let's just go crazy and get rid of some more stuff.
prefs.remove('temperature');
prefs.remove('fullName');

// What are we left with?
console.log( prefs.all() );
// [35.99, true]
console.log( prefs.length() );
// 2 <-- Nice, the tote is not too heavy and not too light, just right.


// Oh, I almost forgot. Here's another neat thing you can do.
// You can figure out the key for the value at position 'n'. Like this:
console.log( prefs.key(2) );
// undefined <-- WTF! I know there are 2 items in there, what gives?
// Awww, shucks, it behaves just like an array, it is zero-based.
// So the available n values are 0 and 1. 
// Let's try that again, this time, with feeling:
console.log( prefs.key(1) );
// "isActive" <-- There we have it.

// Just in case you were wondering, this #key(n) method is very handy.
// It's for those times when you absolutely must-

// You caught me in a lie there, better stop while you still trust me. 
// Honestly, I don't really know what it is good for.


// Great, having recovered from that near disaster,
// I can confidently say that this little walk, tote in hand, 
// can't possibly get any worse. 
// We should finish off with a bang!

// Do you remember our old friend at the beginning? #clear()
// No, not Clare, clear(). Here let me show you:
prefs.clear();
// OMGWTFBBQ! Uhm, I did not mean to actually do that!
// Let's take a peak, see what we have in our tote now:
console.log( prefs.all() );
// [] <-- Blue Blistering Barnacles! We are ruined, finished, kaput!

// It's okay, it's okay. Don't Panic! 
// We just need to ask the right questions...
// Something like, "What is the answer?"
console.log( prefs.length() );
// 0 <-- Phew! Now, that's a relief. Psst. Between you an me...
// I was half expecting it to be 42. So you can imagine my joy, yes?
// No? Well it's unfortunate that I nuked everything in the tote.
// I was just trying to remind you of clear().
// Let's call it a day then. 
// If anyone asks, just say we sold all our Girl Guides Cookies, K?
// Good.
```

That's it! The full API, which is just 7 methods is described in the example above.
You may see the [API documentation](#api) below for a clean list and additional details.


## <a name="api"></a>API

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

Retrieve an array of all the 
- all({compact:true})
- all({kvp:true})

#### clear()

Delete *all* the values stored in this namespace.

#### length()

Get the number of items stored in this namespace.

#### key(n)

Get the key stored at position 'n'.

