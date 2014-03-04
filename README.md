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

// Get all stored values as a list of key-value pairs [{key:'KEY', value:'VALUE'}, ]
prefs.all()
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

To setup the project for development on your machine, make sure you have all the prerequisites
listed below installed and setup.

- [Node.js][nodejs]. This is a library destined for the browser, but all the tools I use for,
building and minifying, documenting and creating the website are all node based. 
- [PhantomJS][phantomjs]. A headless browser in which the project specs are run straight int the
command line.
- [Testem][testem]. Runs the specs live in multiple browsers as you develop.
It also runs the specs in "ci" mode (one-off, multiple browsers) and reports on the results.
 - To install as a node module, run: `npm install -g testem`
- [Gulp][gulpjs]. The build automation tool. Reduces most of the complex build workflows
to simple tasks that you run from the command line.
 - To install as a node module, run: `npm install -g gulp`
- [Harp][harpjs]. A deceptively simple static webserver which builds the project website.
 - To install as a node module, run: `npm install -g harp`

Note that technically, I could include `Testem` as a development dependency in the
[`package.json`][package.json], but I think it is better as a global install (for now. I currently
install Testem to my global node_modules space. 

Now, you are ready to hack up a storm.

### Crank the engine

1. Clone this repo, better yet, fork, then clone it into a local directory (the project directory).
1. Go to the project directory and run `npm install`
 - This should install all the development dependencies
2. To confirm that everything is in order, in the project directory, run `gulp`

This runs the default task in the [gulpfile][gulpfile.js] which creates the package, runs the 
specs in phantomjs.

If all goes well and there are no errors, then all is well, you may start coding.

### Specifications (tests) libraries

One more thing:

- [Jasmine][jasmine]. Used to create and execute tote's specs

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
