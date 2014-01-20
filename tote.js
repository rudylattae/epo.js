(function(g) {
    // imports (sor to f)
    var storageAdapter = g.localStorage;


    function tote( namespace, options ) {
        if ( namespace === null || namespace === '' ) throw new Error('null is not a valid namespace');
        var options = options || {},
            storageAdapter = options.storageAdapter || g.localStorage,
            tracker = new Tracker( namespace, storageAdapter)
        return new Bag( namespace, storageAdapter, tracker );
    }


    function Bag( namespace, storage, tracker ) {
        this._ns = namespace;
        this._storage = storage;
        this._keyIndex = tracker;
    }

    Bag.prototype.set = function set( key, value ) {
        this._keyIndex.add( key );
        this._storage.setItem( this._namespacedKey(key), value );
    };

    Bag.prototype.get = function get( key ) {
        return this._storage.getItem( this._namespacedKey(key) );
    };

    Bag.prototype.remove = function remove( key ) {
        this._storage.removeItem( this._namespacedKey( key ) );
        this._keyIndex.remove( key );
    };

    Bag.prototype.clear = function clear() {
        if ( !this._ns ) this._storage.clear();
        else {
            this._clearAllTrackedItems();
        }
    };

    Bag.prototype._clearAllTrackedItems = function _clearAllTrackedItems() {
        var keys = this._keyIndex.all(),
            i=0,
            z=keys.length;
        for(; i<z; i++) {
            key =  keys[i];
            this._storage.removeItem( this._namespacedKey( key ) );
        }
        this._keyIndex.clear();
    };

    Bag.prototype._namespacedKey = function _namespacedKey( key ) {
        if ( !this._ns ) return key;
        return this._ns + '-' + key; 
    };


    function Tracker( key, storage ) {
        this._key = key;
        this._storage = storage;
        this._tracking = [];
    }

    Tracker.prototype.refresh = function() {
        var trackingKeys = this._storage.getItem(this._key);
        this._tracking = (trackingKeys && trackingKeys.split(',')) || [];
    };

    Tracker.prototype.all = function() {
        return this._tracking;    
    };

    Tracker.prototype.add = function( key ) {
        if (this._tracking.indexOf(key) < 0 ) {
            this._tracking.push(key);
            this._saveState();
        }
    };

    Tracker.prototype.remove = function( key ) {
        var index = this._tracking.indexOf(key);
        if (index !== -1) this._tracking.splice(index, 1);
        this._saveState();
    };

    Tracker.prototype.clear = function() {
        this._storage.removeItem(this._key);
        this.refresh();
    };

    Tracker.prototype._saveState = function save() {
        this._storage.setItem(this._key, this._tracking.join(","));   
    };


    // exports
    g.tote = tote;
}( window ));