define(['md5'], function () {
   if (typeof String.prototype.endsWith !== 'function') {
      String.prototype.endsWith = function (suffix) {
         return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };
   }

   if (typeof String.prototype.startsWith !== 'function') {
      String.prototype.startsWith = function (prefix) {
         return this.indexOf(prefix, 0) === 0;
      };
   }

   var uuid = function (len, radix) {    
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');    
      var uuid = [],
         i;    
      radix = radix || chars.length;     
      if (len) {       // Compact form
               
         for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];    
      }
      else {       // rfc4122, version 4 form
               
         var r;        // rfc4122 requires these characters
               
         uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';      
         uuid[14] = '4';        // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
               
         for (i = 0; i < 36; i++) {        
            if (!uuid[i]) {          
               r = 0 | Math.random() * 16;          
               uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];        
            }      
         }    
      }     
      return uuid.join('');
   }

   return {
      md5: arguments[0],
      uuid:uuid
   }
});
