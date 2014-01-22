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


    describe('api', function() {
        var ls;

        beforeEach(function() {
            ls = tote('myarea');
        });

        afterEach(function() {
            ls.clear();
        });


        it('#set, writes serialized values with namespaced key', function() {
            var key = 'foo',
                value = 'FOO!!!';

            ls.set(key, value);

            expect( getItemFromLocalStorage('myarea-foo') ).toEqual( '"' + value + '"' );
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

        it('#all, returns an array of all values', function() {
            var key1 = 'x',
                value1 = 'The simple things',
                key2 = 'y',
                value2 = 'Are free?';
            ls.set(key1, value1);
            ls.set(key2, value2);

            var all = ls.all();
            
            expect( all[0] ).toEqual( value1 );
            expect( all[1] ).toEqual( value2 );
        });

        it('#all({compact:true}), returns an array of a compact representation of all items', function() {
            var item1 = {'a':'Me'},
                item2 = {'b':'You'};
            ls.set('a', item1.a);
            ls.set('b', item2.b);

            var all = ls.all({compact:true});
            
            expect( all[0] ).toEqual( item1 );
            expect( all[1] ).toEqual( item2 );
        });

        it('#all({kvp:true}), returns an array key-value pairs stored in namespace', function() {
            var item1 = {key:'x', value:'Me'},
                item2 = {key:'y', value:'You'};
            ls.set(item1.key, item1.value);
            ls.set(item2.key, item2.value);

            var all = ls.all({kvp:true});
            
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


    describe('handling different datatypes', function() {
        var ls;

        beforeEach(function() {
            ls = tote('datatypes');
        });

        afterEach(function() {
            ls.clear();
        });


        it('persists and retrieves simple string', function() {
            var key = 'string-simple',
                value = 'Simple String';

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });

        it('persists and retrieves string with crazy characters', function() {
            var key = 'string-complex',
                value = 'Some overly c\'omplex string/ with "quoted" and *strred* and & etc...';

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });

        it('persists and retrieves a positive number', function() {
            var key = 'number-positive',
                value = 23434;

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });

        it('persists and retrieves a negative number', function() {
            var key = 'number-negative',
                value = -4747;

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });

        it('persists and retrieves a float', function() {
            var key = 'number-float',
                value = 3700.894;

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });

        it('persists and retrieves a boolean true', function() {
            var key = 'bool-true',
                value = true;

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });

        it('persists and retrieves a boolean false', function() {
            var key = 'bool-false',
                value = false;

            ls.set(key, value);

            expect( ls.get(key) ).toEqual( value );
        });

    });
});