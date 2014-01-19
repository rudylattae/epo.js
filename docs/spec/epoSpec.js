describe('epo', function() {

    function localStoreageHasData( key ) {
        return localStorage.getItem( key ) !== undefined;
    }


    describe('creating', function() {
        var ls;

        it('initializes with namespace', function() {
            ls = epo('mystash');

            expect( ls ).not.toBeNull();
        });

        it('initializes without namespace', function() {
            ls = epo();

            expect( ls ).not.toBeNull();
        });
    });

    describe('when handling strings', function() {
        var ls, store;

        beforeEach(function() {
            ls = epo('strings');
            localStorage.clear();
        });

        it('persists and retrieves simple string', function() {
            var key = 'simple',
                value = 'Simple String';

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });

        it('persists and retrieves string with crazy characters', function() {
            var key = 'complex',
                value = 'Some overly c\'omplex string/ with "quoted" and *strred* and & etc...';

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });
    });
});