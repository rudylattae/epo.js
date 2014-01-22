describe('tote', function() {

    function getItemFromLocalStorage( key ) {
        return localStorage.getItem( key );
    }


    describe('when creating', function() {
        var ls;

        afterEach(function() {
            ls.clear();
        });


        it('initializes with a namespace', function() {
            ls = tote('mystash');

            expect( ls ).not.toBeNull();
        });

        it('throws exception, given a null namespace', function() {
            function createWithNullNamespace() {
                ls = tote(null);
            }

            expect( createWithNullNamespace ).toThrow();
        });

        it('throws exception, given an empty string namespace', function() {
            function createWithEmptyStringNamespace() {
                ls = tote('');
            }

            expect( createWithEmptyStringNamespace ).toThrow();
        });
    });


    describe('general usage of an instance', function() {
        var ls;

        beforeEach(function() {
            ls = tote('myarea');
        });

        afterEach(function() {
            ls.clear();
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

        it('#remove, deletes value associated with namespaced key', function() {
            var key1 = 'getridofthis',
                key2 = 'leavealone',
                value = 'Will be gone soon';
            ls.set(key1, value);
            ls.set(key2, value);

            ls.remove(key1);
            
            expect( ls.get(key1) ).toBeNull();
            expect( ls.get(key2) ).toEqual( value );
        });

        it('#all, returns an array of all the key-value pairs stored in namespace', function() {
            var item1 = {'a':'Me'},
                item2 = {'b':'You'}
                key2 = 'you',
                value1 = 'Happy',
                value2 = 'Happier';
            ls.set('a', item1.a);
            ls.set('b', item2.b);

            var all = ls.all();
            
            expect( all[0] ).toEqual( item1 );
            expect( all[1] ).toEqual( item2 );
        });

        it('#clear, removes only values associated with self', function() {
            var lsOther = tote('another'),
                key1 = 'one',
                key2 = 'two',
                value1 = 'First value',
                value2 = 'Second value';
            ls.set(key1, value1);
            ls.set(key2, value2);
            lsOther.set(key1, value1);
            lsOther.set(key2, value2);

            ls.clear();
            
            expect( ls.get(key1) ).toBeNull();
            expect( ls.get(key2) ).toBeNull();
            
            expect( lsOther.get(key1) ).toEqual( value1 );
            expect( lsOther.get(key2) ).toEqual( value2 );
        });
    });


    describe('when handling strings', function() {
        var ls;

        beforeEach(function() {
            ls = tote('mystrings');
        });

        afterEach(function() {
            ls.clear();
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