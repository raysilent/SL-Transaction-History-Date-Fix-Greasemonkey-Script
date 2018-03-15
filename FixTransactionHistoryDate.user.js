// ==UserScript==
// @name        L$ Transaction Today Button
// @namespace   accounts.secondlife.com
// @description L$ Transaction History Today Button
// @match       https://accounts.secondlife.com/transaction_history*
// @include     https://accounts.secondlife.com/transaction_history*
// @grant       none
// @copyright   2014-2018, Ray Silent
// @run-at      document-idle
// ==/UserScript==

// By Ray Silent

const fixDates = false;

function todayButton() {
  buttons = document.querySelectorAll("button");
  for ( var i = 0; i < buttons.length; i++ ) {
    if (buttons[i].textContent == "View") {
      var node = buttons[i];
      if (node.parentNode) {
        // remove a node from the tree, unless 
        // it's not in the tree already
        var clone = node.cloneNode(true);
        clone.textContent = "Today";
        //var today = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
        clone.setAttribute("disabled", "true");
        clone.setAttribute("id", "id-today-button");
        clone.setAttribute('onClick', `
        var today = new Date();
        controllerElement = document.querySelectorAll("div[ng-controller='TransactionsCtrl']");
        //document.getElementById('startDate').value=today.getFullYear()+"/"+(today.getMonth()<9?'0':'')+(today.getMonth()+1)+"/"+(today.getDate()<10?'0':'')+today.getDate();
        var scope = angular.element(controllerElement).scope();
        if (scope) {
          scope.$apply(function() {
            if (!scope.Spinning && !scope.history.collecting) {
              this.disabled = true;
              scope.history.startDate = moment(scope.history.now).startOf("day");
              scope.history.endDate = moment(scope.history.now).endOf("day");
              scope.fetchHistory();
              scope.showAll();
            }
          });
          
        }
        `);
        var todayNode = node.parentNode.appendChild(clone);

        clone = node.cloneNode(true);
        clone.textContent = "<";
        clone.setAttribute("disabled", "true");
        clone.setAttribute("id", "id-day-prev-button");
        clone.setAttribute('onClick', `
        controllerElement = document.querySelectorAll("div[ng-controller='TransactionsCtrl']");
        var scope = angular.element(controllerElement).scope();
        if (scope) {
          scope.$apply(function() {
            if (!scope.Spinning && !scope.history.collecting) {
              this.disabled = true;
              scope.history.startDate = scope.history.startDate.subtract(1, "days");
              scope.history.endDate = scope.history.endDate.subtract(1, "days");
              scope.fetchHistory();
              scope.showAll();
            }
          });
        }
        `);
        node.parentNode.insertBefore(clone, todayNode);

        clone = node.cloneNode(true);
        clone.textContent = ">";
        clone.setAttribute("disabled", "true");
        clone.setAttribute("id", "id-day-next-button");
        clone.setAttribute('onClick', `
        controllerElement = document.querySelectorAll("div[ng-controller='TransactionsCtrl']");
        var scope = angular.element(controllerElement).scope();
        if (scope) {
          if (scope.history.startDate.diff(moment(scope.history.now).startOf("day"), 'days')<0
              && scope.history.endDate.diff(moment(scope.history.now).endOf("day"), 'days')<0) {
            scope.$apply(function() {
              if (!scope.Spinning && !scope.history.collecting) {
                this.disabled = true;
                scope.history.startDate = scope.history.startDate.add(1, "days");
                scope.history.endDate = scope.history.endDate.add(1, "days");
                scope.fetchHistory();
                scope.showAll();
              }
            });
          }
        }
        `);
        node.parentNode.insertBefore(clone, null);

      }
    }
  }
}

function updateTransactionTimestamps() {
  
  
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

function run() {
    if (fixDates) updateTransactionTimestamps();
    todayButton();
    var timer = setInterval(function() {
      controllerElement = document.querySelectorAll("div[ng-controller='TransactionsCtrl']");
      var scope = angular.element(controllerElement).scope();
      if (scope) {
        if (!scope.Spinning && !scope.history.collecting) {
          document.getElementById('id-today-button').disabled = false;
          document.getElementById('id-day-prev-button').disabled = false;
          document.getElementById('id-day-next-button').disabled = false;
        }
      }
    }, 1000);



}

run();