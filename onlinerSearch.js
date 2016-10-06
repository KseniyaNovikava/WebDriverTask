    "use strict";

    var webdriver = require('selenium-webdriver');
    var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

    const assert = require('assert');
    var until = webdriver.until;

    function testPassed(text){
        console.log(text);
    }
    function testFailed(err){
        console.error(err.message);
    }

    browser.get('https://www.onliner.by');
    browser.findElement(webdriver.By.css("input.fast-search__input")).
    sendKeys("Apple ").
    then(function(){

        browser.switchTo().frame(browser.findElement(webdriver.By.css("iframe.modal-iframe")))
    })
    .then(function(){
        return browser.wait(until.elementLocated(webdriver.By.css("input.search__input")));
    })
    .then(function(searchInput) {
        searchInput.sendKeys('iPhone 6s 16GB Silver');
    })
    .then(function(){
        return browser.wait(until.elementLocated(webdriver.By.css("a[href$='iphone6s16gbs']")));
    })
    .then(function(link) {
        link.click();
    })
    .then(function(){
        browser.wait(until.titleIs('Купить iPhone 6s'));
    })
    .then(function(){
        return browser.findElement(webdriver.By.css('tbody:nth-child(3) > tr:last-child > td:last-child > span')).getText();        
    })
    .then(function(camera){
        assert.equal(camera, "12 Мп","! CameraTest")
        return "+ CameraTest";
    }).then(testPassed,testFailed)

    .then(function(){
        return browser.findElement(webdriver.By.css('tbody:nth-child(4) > tr:nth-child(2) > td:last-child > span')).getText();  
    })
    .then(function(processor){
        assert.equal(processor, "Apple A9","! ProcessorTest");
        return "+ ProcessorTest"
    }).then(testPassed,testFailed)

    .then(function(){
        return browser.findElement(webdriver.By.css('tbody:nth-child(5) > tr:nth-child(12) > td:last-child > span')).getAttribute('class'); 
    })
    .then(function(fingerprint){
        assert.equal(fingerprint, "i-tip","! FingerprintTest");
        return "+ FingerprintTest"
    }).then(testPassed,testFailed)

    .then(function(){
        return browser.findElement(webdriver.By.css('tbody:nth-child(6) > tr:nth-child(2) > td:last-child > span')).getText();  
    })
    .then(function(length){
        assert.equal(length, "138.3 мм","! LengthTest");
        return "+ LengthTest"
    }).then(testPassed,testFailed)

    .then(function(){
        return browser.findElement(webdriver.By.css('tbody:nth-last-child(6) > tr:nth-child(3) > td:last-child > span')).getAttribute('class'); 
    })
    .then(function(fmTuner){
        assert.equal(fmTuner, "i-x","! FMtunerTest");
        return "+ FMtunerTest"
    }).then(testPassed,testFailed)

    .then(function() {
        browser.quit();
    });
