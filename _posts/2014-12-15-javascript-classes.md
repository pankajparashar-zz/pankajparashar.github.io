---
title: JavaScript Classes
date: 2014-12-15 00:00:00 Z
layout: post
type: post
excerpt: It shouldn't come as surprise that JavaScript doesn't have classes! However,
  the language is potent enough to match any OO-language and has the ammunition to
  functionally represent OOP concepts.
---

JavaScript has first-class functions, which means that we can treat functions like objects, return or pass them from other functions, just like any other object. This offers us the ability to re-create class-like semantics in JavaScript with functions. In this article, we'll focus on these features,

- Class objects.  
- Constructor.  
- Private members.  
- Public members.  
- Static members.  
- Inheritance.  

> Beware! throughout this article, I'll be using the terms `class` and `function` interchangeably. Although they are different terms, but are used in a similar way throughout the context of this article. Please do not get confused!.

#### Class objects  

{% highlight js %}
var Person = function(){};

var person1 = new Person();
var person2 = new Person();

console.log(person1 instanceof Person);  // true 
console.log(person2 instanceof Person); // true
{% endhighlight %}

Imagine a class `Person` created with a function expression. We can create objects of this class using the `new` keyword. 
Each object has a separate location in the memory but are of type `Person`.

#### Constructor

{% highlight js %}
var Person = function(firstName){
    this.firstName = firstName;
    console.log('Instance created');
};

var person1 = new Person("Foo"); // logs "Instance created"
var person2 = new Person("Bar"); // logs "Instance created"

console.log('person1 is ' + person1.firstName); // logs "Foo"
console.log('person2 is ' + person2.firstName); // logs "Bar"
{% endhighlight %}

The function definition acts as the constructor of the class `Person`. The arguments passed to the function are the parameters
passed to the constructor while creating an object. Using `this` keyword we can initialize the attributes of the class like `firstName`.

#### Private members

{% highlight js %}
var Person = function(firstName) {
    var firstName = firstName;
};

var person1 = new Person("Foo");
var person2 = new Person("Bar");

person1.firstName; // undefined
person1.firstName; // undefined
{% endhighlight %}

`firstName` has a local scope within the function `Person`, which makes it private to the class definition. The ideal way to access and manipulate private members of the class is by using `accessor` functions, similar to `setter()` and `getter()` in Java.

{% highlight js %}
var Person = function(firstName) {
    var firstName;
};

Person.prototype.setFirstName = function(firstName) {
    this.firstName = firstName;
}

Person.prototype.getFirstName = function() {
    return this.firstName;
}

var person1 = new Person();
var person2 = new Person();

person1.setFirstName('Foo');
person2.setFirstName('Bar');

person1.getFirstName(); // Foo
person2.getFirstName(); // Bar
{% endhighlight %}

#### Public members

{% highlight js %}
var Person = function(firstName) {
    this.firstName = firstName;
};

Person.prototype.sayHello = function() {
    console.log(this.firstName + ' says Hello!');
}

var person1 = new Person("Foo");
var person2 = new Person("Bar");

person1.sayHello(); // logs "Foo says Hello!"
person2.sayHello(); // logs "Bar says Hello!"
{% endhighlight %}

`firstName` and `sayHello` are public members of the class `Person` and can be accessed and manipulated from outside the definition of the function.

#### Static members

{% highlight js %}
var Person = function() {}
Person.firstName = "First Name";

var person1 = new Person();

console.log(person1.firstName); //logs undefined
console.log(Person.firstName); //logs "First Name"
{% endhighlight %}

Static members of the class can be accessed with the className and are not affected with the objects of the class.

#### Inheritance

{% highlight js %}
var Person = function(firstName) {
    this.firstName = firstName;
};

Person.prototype.sayHello = function(){
    console.log("Hello, I'm " + this.firstName);
};

var Student = function(firstName, subject) {
    Person.call(this, firstName);
    this.subject = subject;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

var student1 = new Student('Foo', 'Math');
student1.sayHello();   // "Hello, I'm Foo"

console.log(student1 instanceof Person);  // true 
console.log(student1 instanceof Student); // true
{% endhighlight %}

`Student` is a child of class `Parent` and automatically inherits all the members of the parent class. We make an explicit call to the parent class constructor using `Person.call` and make sure that the prototype inherits from `Person`. This type of inheritance is called `Prototypal inheritance`.

Using these concepts in your JavaScript module will bring modularity in your code and certainly improve the way you write JavaScript. I wish I knew these concepts back when I started with JavaScript!

> I realized that [@getify](http://getify.me/) had written an interesting article on [JavaScript objects](http://davidwalsh.name/javascript-objects) explaining
why **Prototypal Inheritance** is an awkard term for JavaScript and we should rather refer to **Behavior Delegation**. The article is divided into series of posts,  
  
- Part 1: JS Objects: [Inherited a Mess](http://davidwalsh.name/javascript-objects)  
- Part 2: JS Objects: [Distractions](http://davidwalsh.name/javascript-objects-distractions)  
- Part 3: JS Objects: [De"construct"ion](http://davidwalsh.name/javascript-objects-deconstruction)  