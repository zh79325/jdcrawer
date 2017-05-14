define(['configs/module1-config'], function () {

   for (var i in arguments) {
      requirejs.config(arguments[i]);
   }

   return arguments;
})
