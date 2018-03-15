SL Transaction History Date Fix Greasemonkey (Violentmonkey) Script
===================================================

Current version of the script injects "Today" as well as "<" and ">" buttons to show **all** transaction history items for a single day.

![How it works](https://github.com/raysilent/SL-Transaction-History-Date-Fix-Greasemonkey-Script/raw/master/img/HowItWorks.gif)

Why? Since LL started showing 7 days by default with 25 items per page, I thought it was a bit too much to always click the dates instead of just one button. Besides, clicking "Show All" every time became quite annoying. The trick is to request Angular do all necessary modifications. 

Currently it works the best with the [Violentmonkey Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/).

Installation
____________

The way you add it, after installing Violentmonkey Addon, simply click [FixTransactionHistoryDate.user.js](https://github.com/raysilent/SL-Transaction-History-Date-Fix-Greasemonkey-Script/raw/master/FixTransactionHistoryDate.user.js) and it will offer you to review and install the script (Confirm Installation button on top right).

References
__________

Originall the script aimed to fix a temporary bug that whould show Second Life L$ Transaction History in local browser time zone. The bug is now fixed.

* https://jira.secondlife.com/browse/BUG-6335
