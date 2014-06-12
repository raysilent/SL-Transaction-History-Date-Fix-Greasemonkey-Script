// ==UserScript==
// @name        L$ Transaction History Date Fix
// @namespace   accounts.secondlife.com
// @description L$ Transaction History Date Fix From Local To SLT
// @match       https://accounts.secondlife.com/transaction_history*
// @include     https://accounts.secondlife.com/transaction_history*
// @version     1
// @grant       none
// @copyright   2014, Ray Silent
// ==/UserScript==

// By Ray Silent

var run = false;

function updateTransactionTimestamps() {
  if (run) return;
  
  ngBindingElements = document.getElementsByClassName('ng-binding');
  for (var i = 0; i < ngBindingElements.length; i++) {
    var element = ngBindingElements[i];
    if (element.tagName === "TD") {
      var source=element.innerHTML.substring(0,20);
      var trimmed = String.trim(source);
      var splitted = trimmed.split(' ', 2);
      var first = splitted[0];
      var second = splitted[1];
      if (typeof first!='undefined' && typeof second!='undefined'
          && first.length == 10 && second.length == 8) {
        var dateSpl = first.split('-',3);
        var timeSpl = second.split(':',3);
        if (dateSpl.length==3 && timeSpl.length==3) {
          var dateObj=Date.UTC(dateSpl[0],dateSpl[1]-1,dateSpl[2],timeSpl[0],timeSpl[1],timeSpl[2]); 
          var d = new Date();
          d.setTime(dateObj);
          
          localDate = new Date();
          UTCDate = new Date();
          UTCDate.setTime(d.getTime()+localDate.getTimezoneOffset()*60000-7*60*60000);
          
          element.innerHTML = source+"<br/><br/>SLT:<br/>"
                   +UTCDate.toISOString().substring(0, 10)+' '
                   +UTCDate.toISOString().substring(11, 19);
        }
        
        
      }
    }
    
  }
}

var timerVar = setInterval( function(){ updateTransactionTimestamps() }, 5000);