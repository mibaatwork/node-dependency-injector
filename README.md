
 
![nDI](./docs/ndi-logo128x128.png) **node-dependency-injector**


### A small and smart Dependency injection package for node.js without external dependencie, inspired by the powerful Symfony DI container.
<hr>

### Why nDI?

One of the reasons to use a DI Container is to organize your code in better way.
Most Node.js projects use a lot of dependencies. 
Changes in dependencies often require a change in many files. 
Dependency management can help here to get an overview and to exchange components quickly.

With nDI you get a tool that helps you to better manage your external modules.
Especially for larger projects that are bigger than a HelloWorld-Example, a Dependency Injection Container is essential for the maintainability of your project.



#### How to install nDI?

```
npm install  // for development
```
or
```
npm install node-dependency-injector  // for useage in your project
```
easy!
    
<br>

By the way, the code is **100**% tested. **try it!**
```
npm test
```
<br>

The easiest way to integrate nDI is to use in the container and hand over your objects.
You get a di module that you can instantiate.

```js
const di = require('node-dependency-injector').getDic();

let MyDIC = new di();
```
or require a shared instance of the nDI if you use it in multiple files
```js
let MyDIC = require('node-dependency-injector');
```
Here you can register your objects.
```js
let myResource = { someProp: 'someData'};
MyDIC.set('myNamedResource', myResource);
```
at another place in the code you can use:
```js
let myIncredibleObject = MyDIC.get('myNamedResource');

// do something meaningful with your Object
console.log(myIncredibleObject.someProp);
```
This is nothing exciting and can be realized with normal variable declarations.

Wait, it will be more exciting!

You can test an existing resource with:
```js
let myConfig = { path: './someData/'};
MyDIC.set('config', myConfig);

if (MyDIC.has('config')){
 //... do something
}
```

Here we go! **The factory!**
```js
const animal = class Animal{ 
    constructor(){}
    bark(){ return 'GRRRRRR'; }
};

MyDIC.set('myAnimal', new animal());
```

... in the depths of the code ...

Get a Instance from your Resource

```js
let Fiffi = MyDIC.get('myAnimal');

console.log(Fiffi.bark());
```

#### More advanced code usage

for example you have a class file
```js
// animal.js
class Animal {
    constructor(name){
        this.name = name ;
     }

     getName(){
        return this.name;
     }
}

module.exports = Animal;
```
you can use a config variable or configFile
```js
let serviceConfig = {
       autoload: true,
       parameters: {
           'animal.name': 'Kitty'
       },
       services : {
           'animal': {
               fileName: __dirname + '/animal',
               args: ['%animal.name%'],
               shared: true
           }
       }
   };
```
set it to nDI via setConfig

```js
MyDIC.setConfig(serviceConfig);
```
and get your Class Instance from the DI
```js
let MyCat = MyDIC.get('@animal');
console.log(MyCat.getName()); // => Kitty
```

### Summary:
```
MyDIC.set('name', data); // inserts a resource 
```
```
MyDIC.get('name'); // will return a resource
```
```
MyDIC.has('...'); // will return a boolean, true if a resource is present
```
```
MyDIC.setConfig({...}); // will set your config, don't forget the autoloader!
```
```
MyDIC.get('@resourceName'); // will instantiate your resource from a config or configFile
```
and what is next?

- Fileloader integration for configfiles
- maybe yaml support

Happy Coding!
