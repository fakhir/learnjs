#!/usr/bin/env node

/*
 * This is a JS refresher for various topics covered in the Mozilla JavaScript guide:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/
 * 
 * Reference manuals:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript
 * https://devdocs.io/javascript/
 */

(function() {
    "use strict";

    function variablesSample(value) {
        // var defines a global or function-scoped variable.
        // const/let define block scoped variables.
        var a;

        if (a === undefined) {
            // 'b' gets hoisted but its value will remain undefined.
            console.log(`This is ${a} and ${b}`);
            // Below is an error because 'let' and 'const' variables are not hoisted.
            //console.log('The value of c is ' + c);
        }

        var b = 10;
        let c = value;
        let d = NaN;

        // Checking for NaN is tricky.
        if (d !== d) {
            console.log('d is NaN');
        }

        // Contents of an Array are not protected by const.
        const myArray = [ 'HTML', 'CSS' ];
        myArray.push('JAVASCRIPT');
        console.log('myArray is ' + myArray);

        let e = null;
        let f = undefined;
        let g = true;
        let h = false;
        let i = NaN;
        let j = null;
        let k = 0x10 + 0b101101 + 0o6755;

        console.log('Literal values:', e, f, g, h, i, j, k);

        // Implicit conversions
        let l = 42 + ' is a number';    // '42 is a number'
        let m = 'A number is ' + 42;    // 'A number is 42'
        let n = '47' - 7;               // 40
        let o = '40' + 7;               // '407'
        console.log('Implicit conversons', l, m, n, o);

        let multiline_a = `Template literals
        can span multiple
        lines without escapes.`;

        let multiline_b = 'But literal strings\n\
        have to span multiple\n\
        lines with escapes';

        console.log(multiline_a);
        console.log(multiline_b);
    };

    function functionHoisting() {
        foo();

        // Following will give a TypeError.
        //bar();

        function foo() { console.log('Function foo is hoisted'); }
        var bar = function() { console.log('Function bar is not hoisted'); }
    };

    function arrayLiterals() {
        let fish = [ , 'Lion', , 'Angel', , ];
        fish.custom_property = 10;
        console.log('Output for "i in fish":');
        for (let i in fish) {
            console.log('  ', i);
        }
        console.log('Output for "j of fish":');
        for (let j of fish) {
            console.log('  ', j);
        }
    };

    function objectLiterals() {
        let cars = {
            manyCars: {
                a: 'Saab',
                b: 'Toyota'
            },
            7: 'Mitsubishi',
            'someCars': {
                a: 'Suzuki',
                b: 'Cultus'
            },
            '': 'EmptyCar',
            '!': 'BangCar'
        };

        console.log(cars.manyCars.a);
        console.log(cars['manyCars']['b']);
        console.log(cars[7]);
        console.log(cars[''], cars['!']);

        console.log('Output for "i in cars":');
        for (let i in cars) {
            console.log('  ', i);
        }
        // 'i of cars' would be an error because cars is not iterable.

        cars.model = 2019;
        cars['make name'] = 'Toyota';
    };

    function exceptionHandling() {
        try {
            // We can throw any expression.
            //throw 42;
            //throw { a: 'message', b: 10 };
            //throw 'Okay';
            throw 'myException';
        } catch (e) {
            console.log('An exception was caught:', e);
            return true;
        } finally {
            console.log('Finally is always executed');
            return false; // overwrites the catch return value so this function returns false
            // A return from the finally block also overrides any 'throw' statements in 'catch'.
        }
    };

    function loopsAndIteration() {
        let fruits = ['apple', 'strawberry', 'banana', 'mango'];

        for (let i = 0; i < 1; i++) {
            let j = 0;
            do {
                let k = 0;
                while (k < fruits.length) {
                    console.log('loops', i, j, k);
                    k++;
                }
                j++;
            } while (j < 1);
        }

        for (let i in fruits) {
            console.log('for in', i);
        }

        for (let i of fruits) {
            console.log('for of', i);
        }
    };

    function labeledLoops() {
        let iterations = [];
        breakOut:
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                iterations.push([i, j]);
                if (i === 2 && j === 2)
                    break breakOut;
                    // similarly the 'continue' statement can also take an optional label.
            }
        }
        console.log(iterations.length, 'iterations');
    };

    function functionsSample() {
        // A function can also refer to itself by 'arguments.callee'.
        var factorial = function fac(num) { return num < 2 ? 1 : num * fac(num - 1); };
        console.log('Factorial of 4:', factorial(4));

        // Closure example
        var createPet = function(name) {
            var gender;

            return {
                getName: function() { return name; },
                setName: function(newName) { name = newName; },
                getGender: function() { return gender; },
                setGender: function(newGender) {
                    newGender = newGender.toLowerCase();
                    if (newGender == 'male' || newGender == 'female')
                        gender = newGender;
                    else
                        throw Error('Invalid gender specified');
                }
            };
        };
        var myPet = createPet('Vixie');
        myPet.setGender('female');
        console.log('My pet', myPet.getName(), myPet.getGender());
        myPet.setName('Tomy');
        myPet.setGender('male');
        console.log('My pet', myPet.getName(), myPet.getGender());

        // Default arguments example
        function multiply(a, b = 1) { return a * b; };
        console.log('Multiple 10:', multiply(10));

        // Rest arguments example
        function multiplyMap(multiplier, ...theArgs) {
            return theArgs.map(x => x * multiplier);
        };
        console.log('Multiply map', multiplyMap(10, 2, 3, 4, 5));

        // Built-in functions: eval(), uneval(), isNaN(), isFinite(), parseInt(), parseFloat(),
        //                     decodeURI(), encodeURI(), decodeURIComponent(), encodeURIComponent()
    };

    function operatorsSample() {
        // JS equality table: https://dorey.github.io/JavaScript-Equality-Table/
        console.log("Operators 1234 == '1234':", 1234 == '1234');
        console.log("Operators 1234 === '1234':", 1234 === '1234');
        console.log("Operators [] == false:", [] == false);
        console.log("Operators [] === false:", [] === false);

        var cars = ['Toyota', 'Honda', 'Nissan'];
        // delete operator can be used to delete an object, an array element, or properties
        delete cars[1];
        for (let i = 0; i < cars.length; i++)
            console.log('Car', cars[i]);
        for (let i of cars)
            console.log('Car of', i);
        
        // typeof operator returns a type as a string (e.g. 'function', 'string', 'number', 'object', 'boolean').
        var typeStr = typeof cars;

        // void is used to evaluate an expression without returning a value
        void (10 + 10);

        // The 'in' operator checks whether a property exists in an object.
        console.log('Length in cars:', 'length' in cars);

        // The 'instanceof' operator is used to check the class of an object
        // And the 'new' operator creates a new object.
        var today = new Date();
        console.log('Today is instance of Date:', today instanceof Date)

        // The 'this' keyword refers to the parent object from within a method.
        // A => style function has no 'this' so it refers to its parent's 'this'.

        // The 'super' operator refers to an object's parent.
        // super() -- calls the parent's constructor.
        // super.someMethod() -- calls the parent's method.

        // Spread operator is used to compose one array from another, or to call functions
        var parts = ['knees', 'and'];
        var whole = ['heads', 'shoulders', ...parts, 'toes'];
        console.log(whole);
        function sumOfNumbers(x, y, z) { return x + y + z; };
        var numbers = [1, 2, 3];
        sumOfNumbers(...numbers);
    }

    function numberAndDateObjects() {
        // Built-in properties of Number should be used directly from Number object
        // and not from an instance of Number.
        let maxNumber = Number.MAX_VALUE;
        let minNumber = Number.MIN_VALUE;
        // Other properties of Number: NEGATIVE_INFINITY, POSITIVE_INFINITY, EPSILON,
        //                             MIN_SAFE_INTEGER, MAX_SAFE_INTEGER
        // Methods of Number: parseInt, parseFloat, isFinite, isInteger, isNaN, isSafeInteger
        // Methods of Number.prototype: toExponential, toFixed, toPrecision

        // You never create a 'Math' object yourself. Only use its properties/methods.
        // Important properties/methods of Math: floor, ceil, abs, sin/cos/tan, pow, min, max,
        //                                       random, round, sign, imul

        // The Date object. The values have these ranges:
        // - seconds/minutes: 0 to 59
        // - hours: 0 to 23
        // - day: 0 to 6
        // - date: 1 to 31
        // - month: 0 to 11
        // - year: since 1900
        let xmas19 = new Date("December 25, 2019 13:30:00");
        let xmas20 = new Date(2020, 11, 25, 9, 30, 0);
        console.log(xmas19, xmas20);

        // See Intl.DateTimeFormat / Intl.NumberFormat in next function for date/num text formatting.
    };

    function textFormattingAndStrings() {
        // Be careful as literal strings behave differently than String objects in some cases.
        console.log('Eval string literal 2 + 2:', eval('2+2'));             // = 4
        console.log('Eval string object 2 + 2:', eval(new String('2+2')));  // = String('2 + 2')

        // Useful methods of String objects (these also take literal strings as arguments).
        var str = new String('Hello world');
        console.log('charAt(1):', str.charAt(1));
        console.log('chatAt(1) on string literal:', 'hello'.charAt(1));

        // Other useful string methods:
        // indexOf / lastIndexOf, startsWith/endsWith/includes, concat, split, slice, substr/substring,
        // match/matchAll/replace/search, toLowerCase/toUpperCase, normalize, repeat, trim

        // The Intl.DateTimeFormat object is used to format date/time according to locale.
        // The Intl.NumberFormat is used to format numbers for currency, etc.
    };

    function regExpSample() {
        // Method which use regular expressions:
        // RegExp object methods: exec, test
        // String object methods: match, matchAll, search, replace, split

        // This will return an array ['aooooa', 'oooo', 'a'] -- i.e. the whole match and the groups.
        var matches = /a(o+)(a)/g.exec('aooooa sooos aooa');
        for (var oneMatch of matches)
            console.log('Match:', oneMatch)
        
        var myRe = new RegExp('a(o+)(a)', 'g');
        myRe.exec('aooooa sooos aooa');
    };

    function indexedCollections() {
        // Create an array using either literal syntax or Array object. Both are equivalent.
        var myArray1 = new Array('hello', 'world', 10);
        var myArray2 = ['hello', 'world', 10];

        myArray2.forEach(item => console.log('Array2 item', item));

        var myArray3 = new Array(10); // Creates a blank array of length 10.
        var myArray4 = [];
        myArray4.length = 10;

        myArray3.forEach(console.log); // Prints nothing as array is blank.
        for (var i = 0; i < myArray3.length; i++)
            console.log('Array3 item', i, myArray3[i]);

        // Array objects have these useful methods:
        // concat, join, push, pop, shift, unshift, slice, splice, reverse, sort, indexOf,
        // lastIndexOf, forEach, map/filter/reduce, every/some, reduceRight

        // Array-like objects like 'arguments' and strings can be used with Array methods.
        Array.prototype.forEach.call('hello', char => console.log('Char:', char));

        // Typed arrays use the classes: ArrayBuffer, Int8Array, Uint8Array (similar for 16/32 bits),
        // Float64Array, Float32Array, BitInt64Array, BitUint64Array
    };

    function keyedCollections() {
        var sayings = new Map();
        sayings.set('dog', 'woof');
        sayings.set('cat', 'meow');
        sayings.set('cow', 'moo');
        sayings.set('elephant', 'toot');
        sayings.get('fox');  // returns undefined
        sayings.has('bird'); // returns false
        sayings.delete('cow');

        console.log(sayings.size, 'items in sayings map');

        for (var [key, value] of sayings) {
            console.log(key, 'goes', value);
        }

        // Advantages of using Maps instead of Objects:
        // 1. keys can be any object and not just strings.
        // 2. iteration of items is in insertion order.
        // 3. can directly get size of a Map.
        // 4. There are default keys in an Object due to its prototypes.

        // Use Maps instead of objects if keys are unknown until run-time.
        // Use Objects instead of Maps if there is logic that operates on individual elements.

        // Set objects can be used as follows.
        var my_set = new Set();
        my_set.add(1);
        my_set.add(2);
        my_set.add('foo');
        my_set.add('bar');
        my_set.has('foo'); // returns true
        my_set.delete(2);

        for (var item of my_set) {
            console.log('Set item', item);
        }

        // Converting from Set to Array and vice-versa:
        var my_array = Array.from(my_set);
        var my_set_another = new Set([1,2,3,4]);

        // WeakMap is similar to Map but it doesn't allow enumeration of all keys/values.
        // WeakSet is similar to Set but doesn't allow enumeration and only stores objects.

        // Equality of Map and Set keys: equality works like ====, +0 and -0 are equal, NaN is equal to itself.
    };

    function objectHandling() {
        // Object creation using object initializers
        let car = {
            make: 'Toyota',
            5: 'Gears',
            'model': 'Corolla',
            year: 2021
        };

        // Object creation using constructor and new
        function Car(make, model, year) {
            this.make = make;
            this.model = model;
            this.year = year;
        }
        let anotherCar = new Car('Suzuki', 'Cultus', 1999);
        console.log(anotherCar);

        // Object creation using Object.create
        var Animal = {
            type: 'invertebrates',
            displayType: function() {
                console.log(this.type);
            },
            // This way to define a method also works
            displayTypeUpper() {
                console.log(this.type.toUpperCase());
            }
        };
        var animal1 = Object.create(Animal);
        animal1.displayType();
        var animal2 = Object.create(Animal);
        animal2.type = "fish";
        animal2.displayTypeUpper();

        // Here animal2.toString() is called to convert its key into a string.
        animal1[animal2] = 'the key is an object which first gets converted toString';
        console.log(animal1);

        // Enumerating properties of an object.

        anotherCar[car] = 'object ref';
        anotherCar[2] = 3.14;

        // Method 1: for..in loops -- enumerable properties of both object and its prototype chain.
        for (let i in anotherCar)
            console.log('Enum with for..i:', i);

        // Method 2: Object.keys(myObj) -- enumerable of properties of object but not its prototype chain.
        console.log('Enum with Object.keys():', Object.keys(anotherCar));

        // Method 3: Object.getOwnPropertyNames(myObj) -- enum + non-enumerable property names
        console.log('Enum with Object.getOwnPropertyNames():', Object.getOwnPropertyNames(anotherCar));

        // Adding a property to all instances of an object.
        Car.prototype.color = 'red';
        console.log('Color:', anotherCar.color);
        Car.prototype.show = function() {
            console.log('Show:', this.make, this.model, this.type);
        }
        anotherCar.show();

        // Adding getters/setters
        const myObj = {
            a: 0,
            get b() { return this.a + 1; },
            set c(x) { this.a = x / 2; },
            showMe() { console.log(this.a); },
        };

        Object.defineProperties(myObj, {
           y: {
            get() { return this.a + 2; }
           },
           z: {
            set(x) { this.a = x * 2; }
           }
        });

        myObj.a = 10;
        console.log('Getter/setter:', myObj.b); // 11
        myObj.c = 50;
        console.log('Getter/setter:', myObj.b); // 26
        myObj.z = 50;
        console.log('Getter/setter:', myObj.y); // 102
        myObj.showMe();

        // Two objects are never equal.
        const fruit = { name: "apple" };
        const fruitbear = { name: "apple" };

        fruit == fruitbear; // false
        fruit === fruitbear; // false

        // Prototypes are a powerful concept similar to inheritance.
        //
        // - A property is first searched in an object and then in its
        //   prototype and then in its prototype. An object may shadow a prop.
        // - The prototype of an object is stored in a property such as
        //   __proto__ but the name is not standard. Use Object.getPrototypeOf
        //   to look up the prototype.
        // - Prototype of an object can be set using these methods:
        //   - By using Object.create(), the parameter to create gets set
        //     as the object's prototype.
        //   - By a constructor function for which the "prototype" property
        //     of the constructor function is set appropriately. Such as
        //     follows: Object.assign(Person.prototype, personPrototype);
        // - Data properties are usually set within the constructor and are
        //   the object's "own" properties. Whereas methods are shared between
        //   all instances of the object, so they are not own properties and
        //   are set within the prototype.
        console.log('Prototype of:', Object.getPrototypeOf(anotherCar));
        const myDate = new Date();
        let myobj = myDate;
        do {
            myobj = Object.getPrototypeOf(myobj);
            console.log('Get prototype of date:', myobj);
        } while (myobj);
    };

    function classAndInheritance() {
        // Class declarations are not hoisted
        // There is also the expression syntax: const MyClass = class { ... };
        class MyStudent {
            #bloodGroup; // Uninitialized private field
            constructor(name) {
                this.name = name;
                this.homeworkDone = false;
                this.#bloodGroup = "o+";
                // Don't return any value from the constructor since it would
                // then become the result of the new operator.
            }
            // Instance field (set as this.school in constructor also)
            school = "Govt. High School";
            age = 10;
            // Instance method (old style was to set MyStudent.prototype.doHomework)
            // - A method can access private fields of other instances of the
            //   same class, but not of other classes. E.g. may pass another
            //   instance as a parameter to the method, for comparison.
            doHomework() {
                this.homeworkDone = true;
            }
            setAge(age) {
                if (age < 0 || age > 110) {
                    throw new RangeError('Invalid age value');
                }
                this.age = age;
            }
            getAge() { return this.age; }
            toString() { return this.name; }
            // Static field (common to all instances, old style was to set MyStudent.species)
            static species = "human";
            static goToHome() {
                console.log('Going home...');
            }
            // Static block with static initialization code.
            static {
                // ...
            }
            // Private fields, methods, static fields/methods
            #gender = "male";
        }

        let fred = new MyStudent('fred');
        fred.setAge(20);
        console.log('MyStudent age:', fred.getAge());

        // Inheritance
        // - Derived classes don't have access to parent's private fields.
        // - A class can only extend from one class.
        class MyGraduatedStudent extends MyStudent {
            #graduationYear;
            constructor(name, graduationYear) {
                super(name);
                this.#graduationYear = graduationYear;
            }
            get graduationYear() { return this.#graduationYear; }
            set graduationYear(x) { this.#graduationYear = x; }
            // Overriding class method here but even static methods can be overridden
            toString() { return `${super.toString()}/${this.#graduationYear}`; }
        }

        let grad = new MyGraduatedStudent('Javaid', 1940);
        console.log('MyGraduateStudent year:', grad.toString(), grad.graduationYear);
    }

    function promiseChaining() {
        // doSomething()
        //      .then((result) => doSomethingElse(result))
        //      .then((newResult) => doThirdThing(newResult))
        //      .then((finalResult) => console.log(`Got the final result: ${finalResult}`))
        //      .catch(failureCallback);
        //
        // - Either use a promise chain, or better to use async/await instead.
        // - .catch(failureCallback) is equivalent to .then(null, failureCallback) which
        //   is usually added to the end of the chain.
        // - Promise.all(), Promise.allSettled(), Promise.any() allow executing
        //   multiple promises in parallel.
        //
        // Equivalent chains can be built with async/await, which is more
        // preferred. The doSomething() function remains the same but the
        // rest of the chain becomes as follows:
        //
        // async function foo() {
        //   try {
        //     const result = await doSomething();
        //     const newResult = await doSomethingElse(result);
        //     const finalResult = await doThirdThing(newResult);
        //     console.log(`Got the final result: ${finalResult}`);
        //   } catch (error) {
        //     failureCallback(error);
        //   }
        // }

        function getRandom(seed) {
            return new Promise(function(resolve, reject) {
                const randNum = Date.now() + seed;
                resolve(randNum);
            })
        }

        function boundByTen(largeNum) {
            let smallNum = largeNum %10;
            if (smallNum >= 8) {
                const err = new Error('Threshhold exceeded');
                throw err;
            }
            // This is a shortcut for { 'smallNum': smallNum, 'largeNum': largeNum }
            return { smallNum, largeNum };
        }

        function evenOrOdd(bothNums) {
            let isEven = !(bothNums.smallNum % 2);
            bothNums['isEven'] = isEven;
            return bothNums;
        }

        function displayResult(result) {
            console.log('Promise:', result);
            return result;
        }

        function failureCallback(err) {
            console.log('Promise error:', err);
            // Error caught so now return a normal number result for next .then().
            // This is not needed and is optional. Usually the chain ends here
            // and no further return is needed in the failureCallback.
            return 10;
        }

        // Promise chain
        getRandom(123)
            .then(boundByTen)
            .then(evenOrOdd)
            .then(displayResult)
            .catch(failureCallback)
            .then(displayResult);

        // Converting traditional functions to promises: setTimeout
        const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve('resolved!'), ms));

        wait(2 * 1000)
            .then((msg) => console.log('Promise setTimeout fulfilled:', msg))
            .catch(failureCallback);
    }

    variablesSample(10);
    functionHoisting();
    arrayLiterals();
    objectLiterals();
    exceptionHandling();
    loopsAndIteration();
    labeledLoops();
    functionsSample();
    operatorsSample();
    numberAndDateObjects();
    textFormattingAndStrings();
    regExpSample();
    indexedCollections();
    keyedCollections();
    objectHandling();
    classAndInheritance();
    promiseChaining();

})();
