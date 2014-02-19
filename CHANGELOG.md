## v0.2.2-a

> Feb 15 2014

- Fixed bug [#20] where `all()` would not return any values on page refresh
-- Also partially resolved an issue where `all()` would return stale data,
if another instance modified data in the same namespace.


## v0.2.1-a

> Feb 04 2014 

- Refactored based on feedback from `'use strict';` and jshint


## v0.2.0-a 

> Jan 23 2014

- Added serialize / deserialize of stored values using JSON.stringify and JSON.parse
- Updated `all()` to return a list of values by default
- Fixed bug where retrieving a value that is `undefined` would blow up. Now just returns as-is


## v0.1.0-a 

> Jan 22 2014

- First public alpha
