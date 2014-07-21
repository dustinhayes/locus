locus
=====

A `window.location` simulator for the browser.


## Simulated properties
* protocol
* hostname
* pathname
* search
* hash 
* href


## Examples

### Creating new simulators
```javascript
var locsim = locus.new();
```

### Setting a simulators properties
The `set` method takes a path. If the protocol is omitted, it is set relative to the current origin.
```javascript
locsim.set('http://example.com#locus');
```

### Getting properties from the simulator
#### All properties
```javascript
locsim.get();

/* 
Object {
    protocol: "http:",
    hostname: "google.com",
    pathname: "/",
    search: "",
    hash: "#locus",
    href: "http://google.com/#locus"
} 
*/
```

#### A subset of properties
```javascript
locsim.get(['protocol', 'hostname']);

// Object {protocol: "http:", hostname: "google.com"}
```

#### A single value
```javascript
locsim.get('hash');

// '#locus'
```


### Checking for equality
When checking for equality, it's based on the current `window.location` object. For these examples lets assume the page we're on is 'http://example.com#random'.

#### Checking for similarities
##### Check all properties
```javascript
locsim.same()

// false
```
##### Check a subset of properites
```javascript
locsim.same(['protocol', 'hostname']);

// true
```
##### Check a single property
```javascript
locsim.same('protocol');

// true
```

#### Checking for differences
##### Check all properties
If any of the properties are different, return true
```javascript
locsim.diff();

// true
```
##### Check a subset of properties
```javascript
locsim.diff(['protocol', 'hostname']);

// false
```

##### Check a single property
```javascript
locsim.diff('hash');

// true
```
