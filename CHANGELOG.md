<a name="v0.3.0-a"></a>
## v0.3.0-a (Mar 03 2014)

### Enhancements

- Re-implemented `all()` to always return a list of key value pairs
-- This method no longer accepts parameters that change how the return data is formatted.


<a name="v0.2.2-a"></a>
## v0.2.2-a (Feb 15 2014)

### Bug Fixes

- Fixed bug [#20] where `all()` would not return any values on page refresh
-- Also partially resolved an issue where `all()` would return stale data,
if another instance modified data in the same namespace.


<a name="v0.2.1-a"></a>
## v0.2.1-a (Feb 04 2014)

### Technical

- Refactored based on feedback from `'use strict';` and jshint


<a name="v0.2.0-a"></a>
## v0.2.0-a (Jan 23 2014)

### Bug Fixes

- Fixed bug where retrieving a value that is `undefined` would blow up. Now just returns as-is


### Enhancements

- Added serialize / deserialize of stored values using JSON.stringify and JSON.parse
- Updated `all()` to return a list of values by default


<a name="v0.1.0-a"></a>
## v0.1.0-a (Jan 22 2014)

- First public alpha
