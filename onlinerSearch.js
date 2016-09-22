
 
"use strict";
 
var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
 

 
function clickLink(link) {
    link.click();
}
 
function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}
function findAppleCheckbox() {
    return browser.findElements(webdriver.By.css("span.i-checkbox__faux")).then(function(result) {
        return result[0];
    });
}
 function findPhone() {
    return browser.findElements(webdriver.By.linkText("Apple iPhone 6s 16GB Silver")).then(function(result) {
        return result[0];
    });
}
function closeBrowser() {
    browser.quit();
}
 
browser.get('https://www.onliner.by');
browser.findElement(webdriver.By.linkText("Мобильные телефоны")).click();
browser.wait(findAppleCheckbox, 5000).then(clickLink);
browser.wait(findPhone, 5000).then(clickLink).then(handleFailure);