(function(g) {
    // imports (sor to f)
    var storageAdapter = g.localStorage;


    function epo( namespace ) {
        return new Epo( namespace );
    }


    function Epo( namespace ) {
        this._ns = namespace;
    }

    Epo.prototype.set = function set( key, value ) {
        storageAdapter.setItem( key, value );
    };

    Epo.prototype.get = function get( key ) {
        return storageAdapter.getItem( key );
    };


    // exports
    g.epo = epo;
}( window ));