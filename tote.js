(function(g) {
    'use strict';

    function tote( name, options ) {
        if (!name || name === '') throw new Error('A tote must have a non-empty namespace');

        options = options || {};

        var storageAdapter = options.storageAdapter || g.localStorage,
            index = options.index || createIndex(name, storageAdapter);
            
        return createStorageWrapper(name, storageAdapter, index);
    }


    function createStorageWrapper(name, store, index) {
        function namespacedKey(key) {
            return name + '-' + key;
        }

        function clearAllTrackedItems() {
            var keys = index.all(),
                i=0,
                z=keys.length,
                key;

            for(; i<z; i++) {
                key = keys[i];
                store.removeItem(namespacedKey(key));
            }
            index.clear();
        }

        var wrapper = {
            setItem: function setItem(key, value) {
                index.add(key);
                store.setItem( namespacedKey(key), JSON.stringify(value) );
            },

            getItem: function getItem(key) {
                var value = store.getItem(namespacedKey(key));
                return value && value === 'undefined' ? value : JSON.parse(value);
            },

            removeItem: function removeItem(key) {
                store.removeItem(namespacedKey(key));
                index.remove(key);
            },

            all: function all(format) {
                var items = [],
                    keys = index.all(),
                    i=0,
                    z=keys.length,
                    formatter = getFormatter(format),
                    key;

                for(; i<z; i++) {
                    key = keys[i];
                    if (format)
                        items.push( formatter(key, this.getItem(key)) );
                    else
                        items.push( this.getItem(key) );
                }
                return items;
            },

            clear: function clear() {
                clearAllTrackedItems();
            },

            key: function key(pos) {
                return index.getKeyAt(pos);
            },

            length: function length() {
                return index.length();
            }
        };
        wrapper.set = wrapper.setItem;
        wrapper.get = wrapper.getItem;
        wrapper.remove = wrapper.removeItem;

        return wrapper;
    }


    function createIndex(name, store) {
        var keys = [];

        function refresh() {
            var trackingKeys = store.getItem(name);
            keys = (trackingKeys && trackingKeys.split(',')) || [];
        }

        function saveState() {
            store.setItem(name, keys.join(','));
        }

        return {
            add: function add(key) {
                if (keys.indexOf(key) < 0 ) {
                    keys.push(key);
                    saveState();
                }
            },

            remove: function remove(key) {
                var idx = keys.indexOf(key);
                if (idx !== -1) keys.splice(idx, 1);
                saveState();
            },

            all: function all() {
                return keys;
            },

            clear: function clear() {
                store.removeItem(name);
                refresh();
            },

            length: function length() {
                return keys.length;
            },

            getKeyAt: function getKeyAt(pos) {
                return keys[pos];
            }
        };
    }


    function getFormatter(format) {
        if (format && format.compact) return formatters.asCompact;
        if (format && format.kvp) return formatters.asKvp;
        return null;
    }

    var formatters = {
        asCompact: function asCompact(key, value) {
            var item = {};
            item[key] = value;
            return item;
        },

        asKvp: function asKvp(key, value) {
            return {key: key, value: value};
        }
    };


    // exports
    tote.createIndex = createIndex;
    tote.createStorageWrapper = createStorageWrapper;

    g.tote = tote;
}( window ));