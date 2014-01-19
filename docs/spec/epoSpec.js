describe('epo', function() {

    function getItemFromLocalStorage( key ) {
        return localStorage.getItem( key );
    }


    describe('when creating', function() {
        var ls;

        it('initializes with a namespace', function() {
            ls = epo('mystash');

            expect( ls ).not.toBeNull();
        });

        it('initializes without a namespace', function() {
            ls = epo();

            expect( ls ).not.toBeNull();
        });

        it('throws exception, given a null namespace', function() {
            
            function createWithNullNamespace() {
                ls = epo(null);
            }

            expect( createWithNullNamespace ).toThrow();
        });

        it('throws exception, given an empty string namespace', function() {
            
            function createWithEmptyStringNamespace() {
                ls = epo('');
            }

            expect( createWithEmptyStringNamespace ).toThrow();
        });
    });


    describe('namespaced instance', function() {
        var ls;

        beforeEach(function() {
            ls = epo('myarea');
        });

        it('#set, writes values with namespaced key', function() {
            var key = 'foo',
                value = 'FOO!!!';

            ls.set(key, value);

            expect( getItemFromLocalStorage('myarea-foo') ).toEqual( value );
        });

        it('#get, retrieves values with namespaced key', function() {
            var key = 'bar',
                value = '!!!BAR';

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });
    });


    describe('non-namespaced instance', function() {
        var ls;

        beforeEach(function() {
            ls = epo();
        });

        it('#set, writes values with key as-is', function() {
            var key = 'mysimplekey',
                value = 'A Key!!!';

            ls.set(key, value);

            expect( getItemFromLocalStorage(key) ).toEqual( value );
        });

        it('#get, retrieves values with key as-is', function() {
            var key = 'barybarfed',
                value = 'Barfy Barfed';

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });

        it('#clear, removes all persisted data from localStorage', function() {
            ls.set('a', 'AAA');
            ls.set('b', 'BBB');
            ls.set('c', 'CCC');

            ls.clear();

            expect( ls.get('a') ).toBeNull();
            expect( ls.get('b') ).toBeNull();
            expect( ls.get('c') ).toBeNull();
        });
    });

    describe('when handling strings', function() {
        var ls;

        beforeEach(function() {
            ls = epo('mystrings');
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