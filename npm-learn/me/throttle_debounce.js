/**
 * throttle debounce函数 
 * 
 */

function throttle(delay, fn){
  var timeoutId;
  var lastExecTime = 0;

  return function () {
    var elapseTime = Date.now() - lastExecTime;
    var self = this;
    var args = arguments;

    clearTimeout(timeoutId);

    function exec(){
      lastExecTime = Date.now();
      return fn.apply(self, args);
    }

    if (elapseTime > delay){
      exec();
    } else {
      timeoutId = setTimeout(exec, delay - elapseTime);
    }
  };

}


function debounce (delay, fn){
  var timeoutId;

  return function (){
    var self = this;
    var args = arguments;
    clearTimeout(timeoutId);

    function exec (){
      return fn.apply(self, args);
    }

    timeoutId = setTimeout(exec, delay);
  };

}