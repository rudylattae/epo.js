(function(g) {
    // imports (sor to f)
    var storageAdapter = g.localStorage;


    function tote( namespace ) {
        if ( namespace === null || namespace === '' ) throw new Error('null is not a valid namespace');
        return new Bag( namespace );
    }


    function Bag( namespace ) {
        this._ns = namespace;
    }

    Bag.prototype.set = function set( key, value ) {
        storageAdapter.setItem( this._nsKey(key), value );
    };

    Bag.prototype.get = function get( key ) {
        return storageAdapter.getItem( this._nsKey(key) );
    };

    Bag.prototype.remove = function remove( key ) {
        return storageAdapter.removeItem( this._nsKey(key) );
    };

    Bag.prototype.clear = function clear() {
        return storageAdapter.clear();
    };

    Bag.prototype._nsKey = function _nsKey( key ) {
        if ( !this._ns ) return key;
        return this._ns + '-' + key; 
    };


    // exports
    g.tote = tote;
}( window ));