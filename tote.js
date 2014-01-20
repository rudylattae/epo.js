(function(g) {

    function tote( namespace, options ) {
        if ( namespace === null || namespace === '' ) throw new Error('null is not a valid namespace');
        var options = options || {},
            storageAdapter = options.storageAdapter || g.localStorage,
            tracker = new Tracker( namespace, storageAdapter)
        return new Bag( namespace, storageAdapter, tracker );
    }


    function Bag( namespace, storage, tracker ) {
        this._ns = namespace;
        this._store = storage;
        this._index = tracker;
    }

    Bag.prototype.set = function set( key, value ) {
        this._index.add( key );
        this._store.setItem( this._namespacedKey(key), value );
    };

    Bag.prototype.get = function get( key ) {
        return this._store.getItem( this._namespacedKey(key) );
    };

    Bag.prototype.remove = function remove( key ) {
        this._store.removeItem( this._namespacedKey( key ) );
        this._index.remove( key );
    };

    Bag.prototype.clear = function clear() {
        if ( !this._ns ) this._store.clear();
        else {
            this._clearAllTrackedItems();
        }
    };

    Bag.prototype._clearAllTrackedItems = function _clearAllTrackedItems() {
        var keys = this._index.all(),
            i=0,
            z=keys.length;
        for(; i<z; i++) {
            key =  keys[i];
            this._store.removeItem( this._namespacedKey( key ) );
        }
        this._index.clear();
    };

    Bag.prototype._namespacedKey = function _namespacedKey( key ) {
        if ( !this._ns ) return key;
        return this._ns + '-' + key; 
    };


    function Tracker( name, storage ) {
        this._name = name;
        this._store = storage;
        this._keys = [];
    }

    Tracker.prototype.refresh = function() {
        var trackingKeys = this._store.getItem(this._name);
        this._keys = (trackingKeys && trackingKeys.split(',')) || [];
    };

    Tracker.prototype.all = function() {
        return this._keys;    
    };

    Tracker.prototype.add = function( key ) {
        if (this._keys.indexOf(key) < 0 ) {
            this._keys.push(key);
            this._saveState();
        }
    };

    Tracker.prototype.remove = function( key ) {
        var index = this._keys.indexOf(key);
        if (index !== -1) this._keys.splice(index, 1);
        this._saveState();
    };

    Tracker.prototype.clear = function() {
        this._store.removeItem(this._name);
        this.refresh();
    };

    Tracker.prototype._saveState = function save() {
        this._store.setItem(this._name, this._keys.join(","));   
    };


    // exports
    g.tote = tote;
}( window ));