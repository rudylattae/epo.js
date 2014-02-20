# tote

> A thin namespaced localStorage API.

**IMPORTANT** tote is not yet stable so you should not use it in production. If you like what you
see so far, star it on GitHub so I know you want to use it.

Use localStorage as though it is a bunch of small containers for specific areas of your app.
Each "namespaced" instance of tote writes to the same underlying data store, but does not 
interfere with any others.

For more detailed examples, and the ability to try it out in your browser console, 
go to the project website at **http://rudylattae.github.io/tote/**


## Setup

Download the latest release from the website, or get the *bleeding edge* right from GitHub:
<a href="./dist/tote.js">Full</a>
/ <a href="./dist/tote.min.js">Minified</a>

OR install it:

<small class="muted">coming soon.</small>


Include it in your webpage:

```markup
<script src="lib/tote.js" type="text/javascript"></script>
```

OR if you are an an environment with module a loader...

<small class="muted">AMD / CJS support coming soon.</small>


## Usage

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


## Developing / Contributing

Here are some quick pointers to get you started hacking on tote. I welcome bugfixes and other
helpful contributions.

### Versioning style

tote is versioned based on the Semantic Versioning system. When contributing
bug fixes or new features, it helps to be mindful of how it would impact the public API and what 
that means in terms of the resulting version number. Please read http://semver.org/ if you are not
already familiar with it.

### Prerequisites

- [Node.js][nodejs]. This is a library destined for the browser, but all the tools I use for,
building and minifying, documenting and creating the website are all node based. 
- [PhantomJS][phantomjs]. A headless browser in which the project specs are run straight int the
command line.
- [Testem][testem]. Runs the specs live in multiple browsers as you develop.
It also runs the specs in "ci" mode (one-off, multiple browsers) and reports on the results.

Before you can begin hacking on the project, you will need to make sure you have [Node.js][nodejs]
installed. Technically, I could include `Testem` as a development dependency in the
[`package.json`][package.json], but due to it's size, I currently install Testem to my global
node_modules space. 

To install testem globally in your nodejs environment run:

```console
npm install -g testem
```

Now, you are ready to hack on tote.

### Core tools

One more thing befor you get going. Here are the tools that are used to write specs,
build the package and the peoject website.

- [Jasmine][jasmine]. Used to create and execute tote's specs
- [Gulp][gulpjs]. The build automation tool. Reduces most of the complex build workflows
to simple tasks that you run from the command line.
- [Harp][harpjs]. A deceptively simple static webserver which builds the project website.

### Setup

To setup the project for development on your machine:

1. Clone this repo or fork then clone it into a local directory (the project directory).
2. In order to work on the website, you will 
2. Go to the project directory and run `npm install`
-- This should install all the development dependencies

Great now you are all setup.

### Crank the engine

You are ready to hack up a storm. First do a quick check to confirm that everything is in order.
Go to the project directory and run:

```console
gulp
```

This runs the default task in the [gulpfile][gulpfile.js] which creates the package, runs the 
specs in phantomjs.

### Coding style

I am trying to keep with the essence of https://github.com/rwaldron/idiomatic.js/ .
Please check it out sometime. In general:

- 2 `  ` spaces for indentation (no tabs)
- Use semicolons;
- Commas last,
- Prefer `'` to `"`
- `'use strict';`
- 100 character line length -- let's break some rules!

And one important point:

**Code contributions should come with relevant tests where appropriate.**

Cheers!


[nodejs]: http://nodejs.org/
[phantomjs]: http://phantomjs.org/
[testem]: https://github.com/airportyh/testem
[jasmine]: http://jasmine.github.io/2.0/introduction.html
[gulpjs]: http://gulpjs.com/
[harpjs]: http://harpjs.com/
[package.json]: /package.json
[gulpfile.js]: /gulpfile.js
