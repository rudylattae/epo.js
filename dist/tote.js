/*!
  tote v0.3.0-a -- A thin namespaced wrapper for localStorage
  http://rudylattae.github.io/tote
  (c) 2014 Rudy Lattae <rudylattae@gmail.com>, MIT License
 */
(function( g ) {
  'use strict';

  function tote( name, options ) {
    if ( !name || name === '' ) {
      throw new Error('A tote must have a non-empty namespace');
    }

    options = options || {};

    var storageAdapter = options.storageAdapter || g.localStorage,
      index = options.index || createIndex( name, storageAdapter );
      
    return createStorageWrapper( name, storageAdapter, index );
  }


  function createStorageWrapper( name, store, index ) {
    function namespacedKey( key ) {
      return name + '-' + key;
    }

    function clearAllTrackedItems() {
      var keys = index.all(),
        i=0,
        z=keys.length,
        key;

      for( ; i<z; i++ ) {
        key = keys[i];
        store.removeItem( namespacedKey(key) );
      }
      index.clear();
    }

    var wrapper = {
      setItem: function setItem( key, value ) {
        index.add( key );
        store.setItem( namespacedKey(key), JSON.stringify(value) );
      },

      getItem: function getItem( key ) {
        var value = store.getItem( namespacedKey(key) );
        return value && value === 'undefined' ? value : JSON.parse(value);
      },

      removeItem: function removeItem( key ) {
        store.removeItem( namespacedKey(key) );
        index.remove( key );
      },

      key: function key( pos ) {
        return index.getKeyAt(pos);
      },

      length: function length() {
        return index.length();
      },

      clear: function clear() {
        clearAllTrackedItems();
      },

      all: function all() {
        var items = [],
          keys = index.all(),
          i=0,
          z=keys.length,
          key;

        for( ; i<z; i++ ) {
          key = keys[i];
          items.push({ key: key, value: this.getItem(key) });
        }
        return items;
      }
    };
    wrapper.set = wrapper.setItem;
    wrapper.get = wrapper.getItem;
    wrapper.remove = wrapper.removeItem;

    return wrapper;
  }


  function createIndex( name, store ) {
    var keys = [];

    function refresh() {
      var trackingKeys = store.getItem( name );
      keys = ( trackingKeys && trackingKeys.split(',') ) || [];
    }

    function saveState() {
      store.setItem( name, keys.join(',') );
    }

    return {
      add: function add( key ) {
        if ( keys.indexOf(key) < 0 ) {
          keys.push( key );
          saveState();
        }
      },

      remove: function remove( key ) {
        var idx = keys.indexOf( key );
        if ( idx !== -1 ) {
          keys.splice( idx, 1 );
        }
        saveState();
      },

      all: function all() {
        if (!keys.length) {
          refresh();
        }
        return keys;
      },

      clear: function clear() {
        store.removeItem( name );
        refresh();
      },

      length: function length() {
        return keys.length;
      },

      getKeyAt: function getKeyAt( pos ) {
        return keys[pos];
      }
    };
  }


  // exports
  tote.createIndex = createIndex;
  tote.createStorageWrapper = createStorageWrapper;

  g.tote = tote;
}( window ));