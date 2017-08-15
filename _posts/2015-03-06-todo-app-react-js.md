---
title: Building a Todo app with React.js
date: 2015-03-06 00:00:00 Z
layout: post
type: post
excerpt: This is my first attempt with React.js to build a basic Todo app. React has
  gained massive traction as a JavaScript library for building user interfaces largely
  because it is built by Facebook and their engineers have challenged the age-old
  best practice for separation of concerns. We'll learn how.
---

In this article, we'll build an extremely simple app using Facebook's [react.js](http://facebook.github.io/react/). If you are
unfamiliar with this library, then I would strongly recommend reading the complete tutorial on building a [Comment system](http://facebook.github.io/react/docs/tutorial.html) using React.

> This article has been updated several times in the past few months, to prevent it
from becoming outdated in lieu with the rapid changes in the react.js library

### Thinking in components

The fundamental way of building a React.js app is to break down your app into bunch of useful components and then work your
way backwards to build them separately. Once the individual components are ready, we can wire them up to exchange data
between the components. For instance, our Todo app can be decomposed into the following components and hierarchies,

{% highlight sh %}
- TODO APP
	- TODO BANNER
	- TODO LIST
    	- TODO LIST ITEM #1
		- TODO LIST ITEM #2
		  ...
		- TODO LIST ITEM #n
	- TODO FORM
{% endhighlight %}

### Wiring dependencies

React ofcourse needs the `react.js` library and the JSX Transformer for sugar syntax. Before, we proceed we'll add these dependencies
into the `head` of our document.

{% highlight html %}
<head>
	<script src="https://fb.me/react-0.12.2.min.js"></script>
	<script src="https://fb.me/JSXTransformer-0.12.2.js"></script>
</head>
<body>
	<script type="text/jsx">
   		<!-- This is where your code will live -->
    </script>
</body>
{% endhighlight %}

### Basic Skeleton

{% highlight js %}
/* [TODO APP] */
var TodoApp = React.createClass({ ... });

	/* [TODO BANNER] && [TODO LIST] */
	var TodoBanner = React.createClass({ ... });
	var TodoList = React.createClass({ ... });

		/* [TODO LIST ITEM] */
		var TodoListItem = React.createClass({ ... });

	/* [TODO FORM] */
	var TodoForm = React.createClass({ ... });

React.render(<TodoApp/>, document.body);
{% endhighlight %}

### Component 1 - TodoApp

This component will hold a list of todo items that will be shared by its child components in various forms. The initial state
of `items` will be a blank list. The list will be updated as soon as a new item is added via the `TodoForm` component.

{% highlight js %}
/* [TODO APP] */
var TodoApp = React.createClass({
	getInitialState: function(){
		return {items: []};
	},
	updateItems: function(newItem){
		var allItems = this.state.items.concat([newItem]);
		this.setState({items: allItems});
	},
	render: function(){
		return (
			<div>
				<TodoBanner/>
				<TodoList items={this.state.items}/>
				<TodoForm onFormSubmit={this.updateItems}/>
			</div>
		);
	}
});

{% endhighlight %}

### Component 2 - TodoBanner

It simply contains a heading tag. Nothing fancy here!

{% highlight js %}
/* [TODO BANNER] */
var TodoBanner = React.createClass({
	render: function(){
		return (
			<h3>TODO</h3>
		);
	}
});
{% endhighlight %}

### Component 3 - TodoList

It accepts a list of items and wraps each item around a `TodoListItem` component. The final result is then wrapped with `<ul>` tag.

{% highlight js %}
/* [TODO LIST] */
var TodoList = React.createClass({
	render: function() {
		var createItem = function(itemText) {
			return (
				<TodoListItem>{itemText}</TodoListItem>
			);
		};
		return <ul>{this.props.items.map(createItem)}</ul>;
	}
});
{% endhighlight %}

### Component 4 - TodoListItem

It wraps list elements with `<li>` so that it renders as a list block in the final HTML. `this.props.children` predictably contains
all the descendents passed to the `TodoListItem` tag from its parent component.

{% highlight js %}
/* [TODO LISTITEM] */
var TodoListItem = React.createClass({
	render: function(){
		return (
			<li>{this.props.children}</li>
		);
	}
});
{% endhighlight %}

### Component 5 - TodoForm

It contains a text field followed by a button to trigger the addition of item in the Todo list. This component will hold the
current `item` entered in the textfield and both of them are kept in sync using the `onChange` event. As soon as the submit
button is pressed, the `item` is passed to its parent component and the focus is returned back to the textfield.

{% highlight js %}
/* [TODO FORM] */
var TodoForm = React.createClass({
	getInitialState: function() {
		return {item: ''};
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.props.onFormSubmit(this.state.item);
		this.setState({item: ''});
		React.findDOMNode(this.refs.item).focus();
		return;
	},
	onChange: function(e){
		this.setState({
			item: e.target.value
		});
	},
	render: function(){
		return (
			<form onSubmit={this.handleSubmit}>
				<input type='text' ref='item' onChange={this.onChange} value={this.state.item}/>
				<input type='submit' value='Add'/>
			</form>
		);
	}
});
{% endhighlight %}

The complete working demo can be found [here](http://codepen.io/pankajparashar/full/MYzgyW/) on Codepen. Ofcourse there's lot
to improve but the code is modular enough to handle any kind of enhancement.
