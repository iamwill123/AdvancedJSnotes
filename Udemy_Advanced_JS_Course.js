// Advanced JS Udemy course
1. `what is 'use strict' mode:
- it allows you to place a program or a function in a strict operating context.
- (in a nutshell) it makes debugging easier
- Code errors that would otherwise have been ignored or would have failed
  silently will now generates errors and throw exceptions.
- this alerts you sooner to problems in your code and directs you quickly
  to the probable source.
`
You just type 'use strict'; on the top

`For legacy browsers, usually wont run into this`

// Not strict mode...
function newCode() {
  'use strict';
  // Strict mode...
}

`it does not let you delete variables & functions`
var foo = 1;
delete foo;     // throws an error

function moo() {};
delete moo;     // throws an error

function moo(arg) {
  delete arg;    // throws an error
};

`eval function`
  `non strict mode`
  var a = 2;
  eval('var a = 1');  // sets a = 1 within eval
  console.log(a);     // prints 1

  'use strict'
  var a = 2;
  eval('var a = 1');  // sets a = 1 scoped within eval
  console.log(a);     // prints 2

  eval('var a = 1');  // scoped in eval
  console.log(a);     // a is not defined

  `powerful feature, it makes eval safer to use`

2.`Does Javascript pass by value or pass by reference:`
  // The question here when you pass the variable a to the function foo as a parameter.
  // Are you passing by value or by reference?
  `[Pass by Value]:`
  var a;
  function foo(a) {
      // 1. Quick answer, passing primitive types such as strings, values, numbers, booleans are passed by value.
      //    & objects are passed by reference. (Correct answer)
  }
  `Follow-up question: explain to me what's pass by value & pass by reference:`
  `Deeper answer:`
  // Pass by value first
  var a = 1;        // outer scope with a primitive type (number)
  function foo(a) { // inner function scope
    a = 2;          // if you change the variable in the inner scope,
  }                 // it will not effect the value in the outer scope
  foo(a);           // a way of thinking is that you're passing a copy of a, not a itself
  console.log(a);   // logs 1

  var a = true;     // outer scope with a primitive type (number)
  function foo(a) { // inner function scope
    a = false;
  }
  foo(a);
  console.log(a);   // logs true.
  `Summary of [pass by value] you are passing in a copy of 'a' because it's a primitive type, and not a itself`

  `[Pass by Reference]:`
  // What is pass by reference?
  `Your passing something that points to something else`
  Part1:
    var a = {};        // outer scope with an object
    function foo(a) {
      a.moo = false;  // if you add a property [key: value], it will change the outer a object
    }
    foo(a);           // a way of thinking is that you're passing object a itself
    console.log(a);   ->  Object {'moo': false}
    `You can change it's references, properties of the object but you can not change what a points to`
  Part2:
    var a = {'moo':'too'};        // outer scope with an object
    function foo(a) {
      a = {'too':'moo'};  // can not change what 'a' points, you can only change its property
    }
    foo(a);           //
    console.log(a);   ->  Object {'moo': 'too'} // this doesnt change
    `Pass by reference, you can not change what a object points to but you can change it's property`

THE ANSWER: // you must grasp this concept
    'Primitive types such as strings, numbers, booleans, values, symbols are passed by value'
    'objects are passed by reference'

QUIZ 1:
  "use strict";
  var a = 1;  // pass by value
  var b = {}; // pass by ref
  function foo(x, y) {
    x = 2;      // x = 2;
    y.moo = 3;  // Y { 'moo': 3 }
  }
  foo(a, b);    //
  console.log("a = " + a + "; b = " + JSON.stringify(b)); // a = 1; b = {'moo': 3}

  ` "a" is passed by value so updates to "a" in function foo will NOT be visible outside of the function foo.`

QUIZ 2:
  // What will the below code print out?
  "use strict";
  var asimsVar = 3;
  asimVar = 1;
  console.log(asimVar); // throws an error
  // In strict mode we can't use variables that have not been declared with var first, check the code closely you will see that "asimVar" is spelt differently to "asimsVar"


3. `What are the different types in JS`
  Boolean   // true/false
  Number   // 1, 1.0
  String   // 'a', "a"
  Null   // null
  Undefined   // undefined

  Object   // {} or new Object()

  typeof(1) -> "number"
  typeof('a') -> "string"
  typeof(true) -> "boolean"
  typeof(undefined) -> "undefined"    // it's used for uninitialized variables, when it doesn't know what type something is
  typeof(null) -> "object"  // This is wrong, its currently not changed
  typeof({}) -> 'object'

  `What does it mean to be a dynamically typed language?`
  For example Java[statically typed] vs. Javascript[dynamically typed]
  // In Java we must specify the typeof statically before run time
  `Java:` String a = 'moo';  // you have to declare it's type statically for every variable before run time
          a = 1;             // result in ERROR
  // In JS the typeof variables are determined dynamically at run time
  // when we actually run the application
  `JS`: var a = 'moo';
        typeof(a);
        a = 1;
        typeof(a);
  `advantages: of dynamically typed, we can get it up and running very quickly`
  `disadvantages: prone to errors only after we run our program, things can silently fail and we would know`
  `advantages of statically typed, less errors everything is accounted for before compiling the app and if we somehow wrote the wrong type it will throw up an error`
  `disadvantages: long winded code to make something small happen, some issues with memory management and performance can be tightly controlled`

  Deeper into undefined:
  var a;
  console.log(a); // The Javascript engine will return undefined because it doesn't know what type it is, it's not initialized with another value

  `So undefined is used by JS and means no value, its used for uninitialized variables,
  it's used for missing parameters to functions, and it's used for unknown variables & unknown properties
  to do things like the window object`

  window.hello // undefined.
  so undefined is used by the `JavaScript engine` to inform you that this is either:
  1. `uninitialized variable`
  2. `missing parameters to function parameters list`
  3. `perhaps an unknown property of an object`

  var a = null;
  console.log(a); // null
  `Key difference here so the null is the same as undefined but it is set by the `programmer`, not the JS engine.`

  4. `Whats the difference between == & ===`:
      Short answer:
        - the triple equals [===] `checks for both type as well as value equality for both operators on the left & right`
        - the double equals [==]  `only checks for value equality for both operators on the left & right.`
  ==  // equality , you will have to look at a table to figure it out
  === // strict equality , predictable
  0 == '0' -> true // JavaScript intelligently coerces (converts) both values to be of the same type
                   // the number 0 is coerced into a string '0' ( this is called type coercion ), String(0) = '0'
  0 === '0' -> false

  5. `What is NaN?`
  typeof(NaN) -> 'number'
  'abc'/4 -> NaN

  `NaN equal to ANYTHING is always false, even when compared to itself`
  NaN === NaN  -> false // so strange anything equal to NaN is false

  HOW DO WE COMPARE THIS?:
  var num = 1;   // number
  var num = "1"; // string
  isNaN(num); // both will be false, isNaN will performs type coercion

  isNaN(NaN); // true
  isNaN(1); // false
  isNaN('1'); // false    implicit coercion
  Number('1') -> 1 // coerces it to a number 1
  isNaN(Number('1'));
  isNaN('A'); // true     JavaScript is performing type coercion doing this: Number('A')
  Number('A') // NaN
  isNaN(Number('A')) basically isNaN(NaN) -> true // coercing string A into a number becomes NaN

  `The only way to check if a variable is in fact NaN`
  NaN !== NaN  -> true
  a !== a -> false

  undefined == null -> true  // value of null is undefined
  undefined === null -> false  // type undefined does not equal type object of null

  6. `What are the different scopes in Javascript`
      `SCOPE is the lifetime of a variable,
       i.e. where that variable is visible and available for you to use in your code.`
  `Global scope:`
    var asim = 1; // global variable, global scope available even in deeply nested scopes as long as it's not set var asim again
    window.moo = 1; // in browser type moo and it's 1, in node, it's global.moo
  `function scope:`
    function moo() {
      var foo = 1;  // foo is block scoped in this function
    };
    console.log(foo); // foo is not defined,

    function moo() {
      var foo = 1;  // foo is block scoped in this function
      console.log(foo); // foo is not defined,
    };
    moo(); // 1
    `There are only 2 scopes, global and function scope`
    `JavaScript does not have a sense of block level scope like other languages`

    `the for loop if not in a function will be available in the global scope`
    for (var i = Things.length - 1; i >= 0; i--) {
      Things[i]
    }

  7. `What is variable hoisting?`
     Answer: `it's the automatic hoisting of the variable declaration
              to the top of it's enclosing scope`
    `Example:`
      'use strict';
      console.log(a);    // undefined
      var a = 1;
      // run the code
      // after it compiles, the javascript engine internally hoists up the variable a
      var a;
      console.log(a); // undefined
      a = 1;

    `Example in a function:`
      'use strict';
      function foo() {            function foo() {
        console.log(a);             var a;    // hoisted to the top of the function scope.
        var a = 1;                  console.log(a);
      }                             a = 1;
      foo();                      }
      // calling foo() first.
      foo();              // the function gets hoisted up
      function foo() {            function foo() {...};
        console.log(a);           foo();
        var a = 1;
      }

      foo();                      var foo;    // gets split up, called at the top now
      var foo = function() {      foo();      // foo is not a function error
        console.log(a);           foo = function() {...};
        var a = 1;
      }

  8. `What is the scope chain?`
      /important, the scope chain is defined by the way the program is written in the file/
important:
      `The scope chain is defined 'Lexically', the scope chain is
       defined in the order in which the code is written on the page`

      `function scopes can be nest into other functions, it will look into
       variables inside its outer function scope, and outer and outer until
       they find what they need or until they reach the global scope`

      `Remember, the scope chain is that the variables are resolved in
       the order in which the code is written on the page`

      function foo() {
        console.log(myvar);
      }
      function goo() {
        var myvar = 1;
        foo();
      }
      goo();    // myvar is not defined


      function goo() {
        var myvar = 1;        // finds it here
        function foo() {
          console.log(myvar); // looks into the outer scope
        }
        foo();
      }
      goo();   // logs 1
      `The interviewer wants to know if you understand the lexical nature of the scope chain`
      `The lexical nature of the scope chain, is defined by how the code is physically
      written on the page versus how the functions are called`

  9. `What is an IIFE and why might you use it? (immediately invoked function expression)`
      Example 1:
        Our file structure: /[index.html], [mainjs], [other.js]/
        `main.js:`
        var thing = {'hello': 'main'};
        console.log('main: ', thing);

        `other.js`
        var thing = {'hello': 'other'};
        console.log('other: ', thing);

        both files are called in index.html
        <script src="main.js"></script>
        <script src="other.js"></script>

        the console log returns:
          // main: Object {hello: 'main'}
          // other: Object {hello: 'other'}
        but, now the global scope, when you call var thing,
          it will return // other: Object {hello: 'other'}, thing in main has been overwritten.

    (function() {
      var thing = {'hello':'main'};
      console.log('main: ', thing);
    })(); // this is an IIFE, you dont want your variables to pollute the global space.

    10. `What are function closures?`
      a.
        function sayHello(name) {
          var text = 'Hello ' + name;
            return function(){        // returning a function
                console.log(text);
            }
        };
        var sayAsim = sayHello('Asim');
        sayAsim();      // Hello Asim
      b.
        `When the closure is created, it doesnt get a copy of i,
         closure points to the actual value of i in the outer scope in example b`
        var foo = [];
        for(var i = 0; i < 10; i++) {
          foo[i] = function() { return i };
        }
        console.log(foo[0]());  // 10
        console.log(foo[1]());  // 10
        console.log(foo[2]());  // 10

        `closure just points to the current value of whatever variables are used in its function body.`

        /To fix it to how we actually want it to work:/
        var foo = [];
        for(var i = 0; i < 10; i++) {
          (function(){
            var y = i;                          // we're using y to store the value of i for each loop through
            foo[i] = function() { return y };   // returning y
          })();
        }
        console.log(foo[0]());  // 0
        console.log(foo[1]());  // 1
        console.log(foo[2]());  // 2

        important: `we're basically creating a snapshot (using IIFE) to capture the value in that moment of time,
                    creating a copy of i and set = to y`

        What is a closure?:
          `a. a closure can refer to outer scope variables or functions even if that outer scope function has exited`
          important fact:
          `b. closures point to the current value of that outer scope variable not the value of the outer scope variable
          when that closure was initially created.` // for example so initial value i = 0, in the loop, end value is 10

        // Taking it a step furthur, solving the problem with IIFE to show the interviewer. (1 step further)
        var foo = [];
        for(var i = 0; i < 10; i++) {
          (function(y){   // var y here gets passed in as a copy of i.
            foo[y] = function() {
              return y;
            };
          })(i);  // pass in value of i
        }

        test:
        for (var i = 0; i < 5; i++) {
          var btn = document.createElement('button');
          btn.appendChild(document.createTextNode('Button ' + i));
          btn.addEventListener('click', function(){ console.log(i); });
          document.body.appendChild(btn);
        }
        // prints out Button 4

        console.log(
          (function f(n){
            return ((n > 1) ? n * f(n-1) : n)   // this actually performs a factorial 4!
          })(4));
                //4*3*2*1=24

        function(x) {
          return (function(y) {
            console.log(x);         // logs 1
          })(2)
        })(1);

        var salary = "1000$";
        (function () {
          console.log("Original salary was " + salary);     // undefined
          var salary = "5000$";
          console.log("My New Salary " + salary);
        })();

        var salary = "1000$";
        (function () {
          var salary; // undefined, due to hoisting
          console.log("Original salary was " + salary);     // undefined
          salary = "5000$";
          console.log("My New Salary " + salary);
        })();
        // Original salary was undefined.
    11. `What does |this| in JS mean`?
          console.log(this);  // window object in the browser
          this.asim = 1;

          console.log(this.asim); // 1
          console.log(window.asim); // 1
          console.log(asim); // 1

          function checkThis(){
            console.log(this);
          }
          checkThis(); // still points to the global object.

          var asim = {              // calling context is asim
            checkThis: function() {
              console.log(this);
            }
          };
          asim.checkThis(); // `this` is pointing to the object asim
          console.log(asim); // same, point to the asim object
          // important:
          var func = asim.checkThis;
          func();  // now this points to the global object

    important: `So in javascript |this| is determined by the calling context,
                it is determined by the WAY in which a function is called.`
               `if it doesn't have a calling context, then the |this| is set to the global window object`
          var asim = {
            checkThis: function() {
              var self = this;        // prevents this as a global window object
              console.log(self);

              function checkOther() {
                console.log(self);
                self.moo = 1;
              }

              checkOther();

              console.log(self.moo);
              console.log(window.moo);
            }
          };

    12. `What do the functions call, bind, & apply do?` - `helps lock down what this keyword means when
         executing different functions` `helps point /this/ to the correct context`

        `Since /this\ keyword is unstable in the above context, it isnt determined by how the code
        is written on the page, it's not lexical, it's determined by context by how a function is
        executed. We can then look for ways to stabilize this so we can be more confident in what its
        value will be as we're coding.`

        `FUNCTIONS are also objects:`

        function will() {
          console.log(this);  // refers to the global window
        }
        console.log(will.name);  // will
        `the function is an object, it has properties already on it.`
        will.moo = 1;

        will();         //the same as
        will.call();

        You can pass in anything into call(1) to set the this keyword.

        memorize:
          `function expression`: var a = function() {}; // we create an object, we can use for later
          `function declaration or function statement`: function a() {};

          functions have properties:
            - `arguments, __proto___, name` `, and etc`

    3 ways to stabilize this:
      call() function:
        'use strict';

        var will = {
          checkThis: function() {
            // this
            function checkOther() {
              console.log(this);    // this will be the object will
            };
            checkOther.call(this);  // the call is passing the object will using this
          }
        }
        will.checkThis();   // Object {}

        function a(b,c,d) {
          console.log(this);
          console.log(b);
          console.log(c);
          console.log(d);
        }

        a.call(1,2,3,4);  // 1, 2, 3, 4 -> the first param is 'this', the rest are the variables

      apply() function:
        a.apply(1, [2,3,4]); // 1, 2, 3, 4 apply you have input an array.

        why use call or apply? if you have a variable amount of parameters.

        function sum() {
          var total = 0;
          for(var i = 0; i < arguments.length; i++) {
            total += arguments[i];
          }
          return total;
        }

        var x = sum.call(null, 1,4,5,6,7); // you want to pass in null for this, if there is no 'this' keyword
        console.log(x); // sum, so this is hardcoded

        var things = [1,23,43,45454,656,6]; // when you need to take in a variable amount of parameters
        var y = sum.apply(null, things);
        console.log(y); // takes in the array

      bind() function:
        `function expression:` 'ONLY, doesnt work on function declarations.'
        var a = function() {
          console.log(this);
        }.bind(1);    // bind locks down the value to a
        a(); // 1
        a(); // 1

        function a() {
          console.log(this);
        }.bind(1);  // doesn't WORK

        `why? cause...`
        var a = function a() {
          console.log(this);
        };
        a = a.bind(1);    // the direct bind is just short-circuiting this process.
        a();

        `how to use bind in here`:
        var will = {
          checkThis: function() {
            var checkOther = function() {
              console.log(this);
            }.bind(this);
            checkOther();
          }
        }

    13. `What is the object's prototype?`
        var animal = {
          kind: 'human'
        };
        console.log(animal);
        var will = {};
        will.__proto__ = animal;
        console.log(will.kind);   // human
        console.log(animal.isPrototypeOf(will)); // true

        `the prototypal chain:`
          `assigning prototypes to objects`
          one way is to:
            will.kind = 'humanoid';
            console.log(will.kind); // humanoid
            console.log(animal.kind) // human

          The accepted way to assign prototypes to objects:
            var will = Object.create(animal); // what object create does is it will create a new object & assign animals
                                             // as the prototype of that new object and return that
            // Object.create(animal) does exactly this...:
            var will = {};  // creates object will
            will.__proto__ = animal;  // sets proto to animals.

    14. `What's the difference between prototypal & classical inheritance?`
        // Inheritance has 2 branches: `Prototypal` & `Classical`
          // Java, C++, uses Class, class is an architectural diagram. Create an architectural instance.
          Javascript uses prototypal inheritance natively.
          - In JS, new objects are created from existing ones.
          What does classical inheritance mean?:
          - There is a way to write JS that looks like its classical inheritance:

        - 3 ways to call it: //classical inheritance, the constructor pattern, the pseudo-classical-pattern

                                      inheritance
                                          /\
                                         /  \
                                Prototypal   Classical
                                  / \
                                 /   \
                        Prototypal    Pseudo-Classical
                        Pattern       Pattern

// The Prototypal Pattern for OO is built into JS, the pseudo-classical-pattern for OO is used by those coming from different

      QUIZ: // What does the below code print out?
      "use strict";
      var animal = {
        kind: "Cow",
        which: function () {
          console.log(this.kind);
        }
      };
      var animalFunc = animal.which;
      animalFunc();       // Throws an error
                          // Because we are in use strict mode and not calling the function directly from the animal object, this is now undefined

      // What does the below code print out?
      "use strict";
      function sayHello(last_name) {
        console.log("Hello " + this + " " + last_name);
      }.bind("Asim");
      sayHello("Hussain"); // Uncaught SyntaxError. Unexpected token.
                           // bind can only be used on functions after they have been created and assigned to a variable

      "use strict";
      var sayHello = function(last_name) {
        console.log("Hello " + this + " " + last_name);
      }.bind("Asim");
      sayHello("Hussain");  // Hello Asim Hussain
                            // bind can be used on function expressions to fix the value
                            // of this regardless of how the function is called later on

    How to implement pseudo classical object oriented principles. ( called pseudo-classical-inheritance, the contructor pattern,
      or (not correct) classical inheritance ) mimics syntax & styles from java & C++.
    No `Class` in es5, but in es6 there is `Class`

    - `The class describes the behavior of an object via a member functions & also the state of an object via properties.`
      `This is performed using the function` Contructor
      Example:

      'use strict';

      function Person(first_name, last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
      };

      var dude = Person('william', 'yuan'); // Ucaught TypeError, can not set prop 'first_name' of undefined, that's because this is set by default to undefined in
                                            // use strict mode.
      var dude = new Person('william', 'yuan');  // Correct way using the new keyword, creates an instance of person.

      // Very SIMILAR not the same as the new keyword.
      var dude = {};
      Person.call(dude, 'william', 'yuan');
      console.log(dude);

      `2 ways in the pseudo-classical approach to add functions to our classes.:`
      `First Way-` Contructor pattern or pseudo-classical-pattern

        function Person(first_name, last_name) {  // Person is the function constructor
          this.first_name = first_name;
          this.last_name = last_name;
          this.full_name = function() {
            return this.first_name + ' ' + this.last_name;
          };
        };
        var dude = new Person('william', 'yuan');
        console.log(dude.full_name());

      `Second Way- using prototypes or function prototypes`
        `we create an instance of the person pseudo class by calling the person constructor with the 'new' keyword`

        var dude = new Person('william', 'yuan');   // what does this point to? points to another object

        Object  ->      Function  ->      Object   ->     null

        dude            Person            {}
        ---------       ----------        -----------
        william         first_name        constructor  <-- `points to the Person function `
        ---------       ----------        -----------
        yuan            last_name    ->   __proto___
        ---------       ----------
        __proto___      prototype              ^
            |                                  |
            |------>---------->-------->-------|

      `So the object dude instance points to the same __proto___ property as the person function prototype`
      `When the dude instance gets created, it ends up having a prototype chain that points to the prototype of the
      function constructor which was used to create the dude instance & again & again down the chain until you reach:` null.

        Object          Object

        dude      ->    {}
        ----------      -----------
        william         constructor
        ----------      -----------
        yuan            __proto___
        ----------      -----------
        __proto___

        `So any added functions on the prototype of person, is then made available to a dude in it's prototype chain.`

        function Person(first_name, last_name) {  // Person is the function constructor
          this.first_name = first_name;
          this.last_name = last_name;
        };

        Person.prototype.full_name_proto = function() {
          return this.first_name + ' ' + this.last_name;
        }
        var dude = new Person('william', 'yuan');
        console.log(dude.full_name_proto());        // the browswer will look for the full_name_proto()
                                                    dude object -> __proto___ obejct -> `then it's own `__proto___ object -> null

                                Pros:                                     &                   Cons:
Constructor Pattern:    Simulate a private member variable                               each function created in the body of the constructor is also created in every instance. Too much load, bad for memory if you have too many instances.
Pseudo-Classical        That's another feature in other OO langs.
                        Some variables are public avail & priv avail.
                        (most common pattern, used everywhere)

                        function Person(first_name, last_name) {
                          this.first_name = first_name;
                          this.last_name = last_name;
                          this.full_name = function() {
                            return this.first_name + ' ' + this.last_name;
                          };
                        };
                        var dude = new Person('william', 'yuan');
                        console.log(dude.full_name());

Prototypal Pattern:     `They all share the same prototype function we added.`          No private member variables.
                        `Saves a lot on memory`
                        `easy to get the pattern, more natural way to work with JS`
                        `Most of the time it's correct to use prototype for extra functions.`

                       `to make private variables we need to use closure:`

Constructor Pattern Examples: (how to make private member variables)
                       function Person(first_name, last_name) {
                          this.first_name = first_name;
                          this.last_name = last_name;
                          this.full_name = function() {
                            return first_name + ' ' + last_name;    // took out this, so that it doesn't point to this in the body, now it's closed to only pass in it's initial reference.
                          };
                        };
                        var dude = new Person('william', 'yuan');
                        dude.first_name = 'Moo';        // this will be used in the body on the contructor but not actully used in the full name.
                        console.log(dude.full_name());    // william yuan , because of closure

                        Closure (Person)            // output from browser
                            first_name: "william"
                            last_name: "yuan"

`Adding more methods using Constructor Pattern or Pseudo-Classical` (how do we add inheritance?)

                        'use strict';

                        function Person(first_name, last_name) {                    // Our base class
                          this.first_name = first_name;
                          this.last_name = last_name;
                        };

                        Person.prototype.full_name_proto = function() {           // doesnt know about Professional's prototype
                          return this.first_name + ' ' + this.last_name;
                        }

                        function Professional(honorific, first_name, last_name) {     // derived class
                          Person.call(this, first_name, last_name);                   // this executes the body of the Person function, using call so that we dont have to copy and paste this.fir, this.last , etc.
                          this.honorific = honorific;                                 // this is not implementing any inheritance.
                        }

                        Professional.prototype.professional_name = function() {     // doesn't know about Person's prototype.
                          return this.honorific + ' ' + this.first_name + ' ' + this.last_name;
                        }

                        var prof = new Professional('Sir', 'William', 'Yuan');
                        console.log(prof);
                        console.log(prof.professional_name());    // Sir William Yuan
                        console.log(prof.full_name_proto());      // TypeError, not a function,

                        `In the above we didn't implement inheritance, to do that we use:` Object.create();

                        Professional.prototype = Object.create(Person.prototype);     // this is how we CREATE inheritance.

`REFER TO THIS: <img src="Object.prototype.png">`

                        `We're chaining the prototypes using JS's prototype chain via __proto___.`

                        function Person(first_name, last_name) {                    // Our base class
                          this.first_name = first_name;
                          this.last_name = last_name;
                        };

                        Person.prototype.full_name_proto = function() {           // doesnt know about Professional's prototype
                          return this.first_name + ' ' + this.last_name;
                        }

                        function Professional(honorific, first_name, last_name) {     // derived class
                          Person.call(this, first_name, last_name);                   // this executes the body of the Person function, using call so that we dont have to copy and paste this.fir, this.last , etc.
                          this.honorific = honorific;                                 // this is not implementing any inheritance.
                        }

                        Professional.prototype = Object.create(Person.prototype);   // connects the __proto__ chain.

                        Professional.prototype.professional_name = function() {     // doesn't know about Person's prototype.
                          return this.honorific + ' ' + this.first_name + ' ' + this.last_name;
                        }

                        var prof = new Professional('Sir', 'William', 'Yuan');
                        console.log(prof);
                        console.log(prof.professional_name());    // Sir William Yuan
                        console.log(prof.full_name_proto());      // TypeError, not a function,

`Adding more methods using Prototypal inheritance`
            `- also an alternative to object oriented solution.`
            `- some argue it's a more natural OO solution, at the very least it's much easier to understand.`

  `what's the prototypal inheritance?`
        - `It's just the prototype chain, no pseudo class, no function contructors or the new keyword`.
            - "Hey create an object whose prototype is this other object, and also please drop this new object with some properties!"
            - `function constructors and new key word do not work with javascript natively, it's pretty much fake.`

Prototype pattern:

        var Person = {                // Base object
          full_name: function() {
            return this.first_name + ' ' + this.last_name;
          }
        }

        var will = Object.create(Person);
        console.log(will); // prints to object

        console.log(will.full_name()); // doesnt print out anything because we havent set any defaults for it.

`First way of initializing the will object:`

        var Person = {                // Base object
          init: function(first_name, last_name) {  // bootstrap to this.
            this.first_name = first_name;
            this.last_name = last_name;
            return this;                          // retrun this, but you dont have to.
          },
          full_name: function() {
            return this.first_name + ' ' + this.last_name;
          }
        }

        var will = Object.create(Person);   // create an instance here and connects the __proto__
        will.init('william', 'yuan');
        console.log(will.full_name());

`Second way of initializing the will object`:
        var Person = {                // Base object
          full_name: function() {
            return this.first_name + ' ' + this.last_name;
          }
        }

        var will = Object.create(Person, {
          first_name: {                     // this is a reference, and how to set it
            value: 'will'                   // value must be specified
          },
          last_name: {
            value: 'yuan'
          }
        });
        console.log(will.full_name());    // will yuan

`Third way of initializing the will object`:
      a person factory, it just creates objects.
      'use strict';
      var Person = {                // Base object
        full_name: function() {
          return this.first_name + ' ' + this.last_name;
        }
      }

      function PersonFactory(first_name, last_name) {
        var person = Object.create(Person);
        person.first_name = first_name;
        person.last_name = last_name;
        return person;
      }

      var will = PersonFactory('will', 'yuan');

      console.log(will.full_name());

`<img src="prototypal-inheritance.png"> inheritance is done through the Object.create() function`


`Adding functions to Prototypal chains:`
      `this is using one type of method:`
      var Person = {                // Base object
        full_name: function() {
          return this.first_name + ' ' + this.last_name;
        }
      }

      var Professional = Object.create(Person, {      // bootstrap properties via the object.create method.
        init: {
          value: function(honorific, first_name, last_name) {
            this.honorific = honorific;
            this.first_name = first_name;
            this.last_name = last_name;
          }
        },
        professional_name: {
          value: function() {
            return this.honorific + " " + this.first_name + " " + this.last_name;
          }
        }
      });
      var will = Object.create(Professional);         //
      will.init("Sir", "William", "Yuan");

      console.log(will.full_name());
      console.log(will.professional_name());

---------This is the prototype pattern!!!-------------------

15. // CORS is currently the accepted method of bending the rules of cross origin policies
    CORS - cross origin resource sharing. `(It's for safety of APIs)`
    `If you have to access data from another site, foo.com, it's automatically blocked by the browser as a safety feature.`
    `CORS- allows you to break the same origin policy of a browser (resource sharing of a browser)`
    Example:
      `Go to moo.com, -> moo.com has JS code that request an API from foo.com, foo.com does some processing and sends a response. `
      `And now resources must only come from or be sent to moo.com.`
      `B/c the moo.com sent js request for some data from foo.com, when the data is returned, it's blocked by the browser.`
      `That's the same origin policy of the browsers, it's a safety feature`
      -`if a black hat dev takes data without notifying foo.com`
      `CORS is a way of opening up the rules so you can selectively start letting ppl get access to servers from different origins.`

      // 2 high level ways of opening the connection because it is blocked by default:
     1 `In order for CORS to work:`
      `<img src="GETreqCORS.png">`
        `browser sends a GET request with 'Origin: moo.com'`
        `foo.com's database sends back a response with 'Access-Control-Allow-Origin: moo.com'` or `'Access-Control-Allow-Origin: *' <- for all browsers`
        `And lets your application run with your JS code.`

        Important to know: its the response from the server that gets blocked by the browser and not the request sent.
        `if 'Access-Control-Allow-Origin: google.com' <- browser will block it, if that is anything other than * or the original origin url`
     2 PUT, POST, DELETE `(anything that actually changes the database)`
        Now the request has a pre-flight or "handshake" request before it actually allows anything to happen.
        Preflight `<img src="PUTPOSTDELETEpreflightReq.png">`
        Once the handshake / pre-flight request is allowed
        Completed `<img src="preFlightReqAllowed.png">`
        Reference: test-cors.org

16. What is JSONP? (`It's a solution to the same origin policy of a browser`)
    `It pre-dates CORS, predates it's standard, it's a pseudo way.
     Limitations: only for GET requests.`

    `So it's not a .json response, it's a valid piece of JavaScript.`
    // json.js file:
      willCallBackFunction([
        {
          "id": 1,
          "first_name": "will",
          "last_name": "yuan"
        }
      ]);
      // so the script tag doesn't need adhere to any cross origin policies, not like an AJAX request
      // it does not have any limitations as to which domain it can pull down a script from.
      // index.html
      function willCallBackFunction(json) {  // this matches exactly the jsonp function in the json.js file.
        console.log(json);
      }
      <script src="json.js"></script>  // any jsonp url.
      // This is usually handled by jQuery or Angular.js
      `<img src="JSONPexample.png">`


17. What is difference b/w event bubbling & event capturing in JavaScript?
    `event bubbling is the default phase (phase2) ` `from target to the root(window)`
    <body class="body item">
      <div class="first item">
        <div class="second item">
          <div class="third item">
            <button class="fourth item">Click Me!</button>
          </div>
        </div>
      </div>
    </body>

    var items = document.getElementByClassName("item");
    for (var i = 0; i < items.length; i++) {
      (function () {      // Closure being used here
        var y = i;        // To capture every copy of i
        item[y].addEventListener("click", function(event){
          console.log(items[y], event);   // printing out the right item
        }, false );  // if false or blank, it's event bubbling phase, if true, event capturing phase.
      })();
    }
      `<img src="buttonClickMe.png">` // visual rep of the button

    // The DOM representation of the HTML
    `- the event is fired from window to target(button) and touches every event lister if it has an event`
    `- by default it listens to the event bubbling phase`
    Example:
      The sequence of the phases: `<img src="eventBubbleEventCapture.png">`

      Event capturing phase [from root to target] `<img src="eventCapturingPhase.png">`

      Event bubbling phase [from target to root] `<img src="eventBubblingPhase.png">`

18. What is the difference b/w stopPropagation() & preventDefault()?
    - `First thing to understand is that as each event listener is being triggered & propagating, it's not
     asynchronous.`
    - `The next event listener won't be called until the previous event listener has finished executing.`

    - stopPropagation() `actually stops the event from moving to the next callback, it completely stops it.`
      `using a checkbox`

      <input type="checkbox" class="fourth item">Check Me!</input>

      var items = document.getElementByClassName("item");
      for (var i = 0; i < items.length; i++) {
        (function () {      // Closure being used here
          var y = i;        // To capture every copy of i
          item[y].addEventListener("click", function(event){
            if(y === 2) {               // this will stop it at the second item
              event.stopPropagation();          `<img src="stopPropagationMethod.png">`
            }
            console.log(items[y], event);   // printing out the right item
          }, false );  // if false or blank, it's event bubbling phase, if true, event capturing phase.
        })();
      }

    - preventDefault() `it stops the default behavior that the event would HAVE triggered in whatever
                        element you perform the event on`
                        `For example below, it will prevent the tick on the checkbox from being applied.`

      var items = document.getElementByClassName("item");
      for (var i = 0; i < items.length; i++) {
        (function () {      // Closure being used here
          var y = i;        // To capture every copy of i
          item[y].addEventListener("click", function(event){
            // for every event we will call prevent default. what it does is that it prevents
            // it from being checked on all of the event but the event still propagates through.
            event.preventDefault();          `<img src="preventDefaultMethod.png">`

            console.log(items[y], event);
          }, false );  // if false or blank, it's event bubbling phase, if true, event capturing phase.
        })();
      }










The benefits of Promises vs callbacks?
// https://softwareengineering.stackexchange.com/questions/302455/is-there-really-a-fundamental-difference-between-callbacks-and-promises

https://www.quora.com/Whats-the-difference-between-a-promise-and-a-callback-in-Javascript

What are the benefits of named functions.
What is your favorite testing framework.

































































