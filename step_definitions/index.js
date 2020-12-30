require('geckodriver');
const { Builder, By, until, Condition } = require('selenium-webdriver');
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');     //Dokumentáció
const assert = require('assert');
const { count, dirxml, Console } = require('console');
const { captureRejectionSymbol } = require('events');
const { exec } = require('child_process');
const { Type } = require('selenium-webdriver/lib/logging');
const { IncomingMessage } = require('http');
const { parse } = require('path');
const { defaultInstance } = require('geckodriver');


let driver;

setDefaultTimeout(15000);

BeforeAll(async () => {
    driver = new Builder().forBrowser('firefox').build();
    driver.isElementVisible = async locator => {
        try {
            await driver.findElement(locator);
        } catch (e) {
            return false;
        }
        try {
            return await driver.findElement(locator).isDisplayed();
        } catch (e) {
            return false;
        }
    };
    await driver.manage().window().maximize();
});

AfterAll(async () => {
    await driver.sleep(5000);
    await driver.quit();
});


    Given('the Local Website is open',async function () {
        driver.sleep(500);
        await driver.get('http://localhost:4500')
    });

    When('the all button is clicked',async function () {
        driver.sleep(500);
        await driver.findElement(By.xpath('//button[. = "All"]')).click();
    });


    let counter = 0;
    Then('every item should be visible {string} items',async function (string) {
        driver.sleep(500);
        let myList = await driver.findElements(By.xpath('//div[@class = "card m-1 p-1 bg-light"]'))
        counter = myList.length;
        expect(counter).to.equal(parseInt(string), 'The number of items in the list is incorrect! The expected number is: ' + string + ', but it is: ' + counter + '.')

    });


    When('the {string} button is clicked',async function (string) {
        driver.sleep(500);
        await driver.findElement(By.xpath('//button[. = "'+ string +'"]')).click();
    });


    Then('items related to this category should be visible, must contain {string}',async function (string) {
        driver.sleep(500);
        let myList = await driver.findElements(By.xpath('//div[@class = "card-text bg-white p-1"]'));
        //let incorrectArray = [];

        for(i = 1; i < myList.length + 1; i++){     //The list's indexing starts from 1 (MyList)
            let text = await driver.findElement(By.xpath('(//div[@class = "card-text bg-white p-1"])[' + i + ']')).getText();
            expect(text).to.contain(string, 'The ' + i + '. item in the ' + string + ' category is incorrect!')
    }
           
        /*try{
                expect(text).to.contain(string);
            } catch(err){
                incorrectArray.push(i);
            }
        }

        if (incorrectArray.length != 0){
            let incorrectString = ""
            for (i = 0; i < incorrectArray.length; i++){
                incorrectString += incorrectArray[i] + '. ';
            }
            console.log('The following item are incorrect in the "' + string + '" category: ' + incorrectString)
        }*/

    });

    
      When('the {string} quantity selection menu is clicked',async function (string) {
        driver.sleep(500);
        let dropDown = await driver.findElement(By.xpath('(//div[@class = "card-text bg-white p-1"])[' + string + ']/select'));
        dropDown.click();
        });
        

      Then('the {string} quantity options should be visible',async function (string) {
        let options = await driver.findElement(By.xpath('(//select[@class = "form-control-inline float-right m-1 bg-info"])["' + string +  '"]')).getText();
        //console.log(typeof(options));
        //options = options.replace(/(\r\n|\n|\r)/gm,"");       //https://www.textfixer.com/tutorials/javascript-line-breaks.php
        options = options.replace(/(\n)/gm,"");                 //Removing line breaks
        options = parseInt(options);
        expect(options).to.equal(123, 'The quantity options are incorrect.')
        console.log(options);

      });

      When('I add one from every item to the Cart',async function () {
        let myList = await driver.findElements(By.xpath('//div[@class = "card-text bg-white p-1"]'))
        for(i = 1; i < myList.length + 1; i++){
            driver.sleep(500);
            await driver.findElement(By.xpath('(//div[@class = "card-text bg-white p-1"])[' + i + ']/button')).click();
        } 
      });

      Then('Total Amount should be {int}',async function (int) {
        let quantityAndPrice = await driver.findElement(By.className("p-1 bg-secondary text-white text-right")).getText();
        let quantityAndPriceList = quantityAndPrice.split(',')
        quantityAndPriceList[0] = quantityAndPriceList[0].replace(/\D/g,'')
        quantityAndPriceList[1] = quantityAndPriceList[1].replace(/\D/g,'')     //Removing all characters except numbers
        quantityAndPriceList[1] = quantityAndPriceList[1].slice(0,quantityAndPriceList[1].length-2)     //Removing 2 characters because of decimals
        console.log(quantityAndPriceList)
        expect(parseInt(quantityAndPriceList[1])).to.equal(int, 'The Total Amount in the Cart is not correct, it should be $' + int + ', but it is $' + quantityAndPriceList[1] + '.');
        
      });

      Then('the number of Total Items should be {int}',async function (int) {
        let quantityAndPrice = await driver.findElement(By.className("p-1 bg-secondary text-white text-right")).getText();
        let quantityAndPriceList = quantityAndPrice.split(',')
        quantityAndPriceList[0] = quantityAndPriceList[0].replace(/\D/g,'')
        expect(parseInt(quantityAndPriceList[0])).to.equal(int, 'The number of Total Items in the Cart is incorrect, it shoud be ' + int + ', but it is ' + quantityAndPriceList[0] + '.')
      });


      Then('the Back button should be visible',async function () {
        let element = await driver.findElement(By.className("btn btn-secondary m-1")).isDisplayed();
        console.log(element)
      });

      Then('the message {string} should be visible',async function (string) {
        let visible = await driver.findElement(By.className("m-2 text-center")).isDisplayed();
        console.log(visible);
        let text = await driver.findElement(By.className("m-2 text-center")).getText();
        expect(text).to.contain(string, 'The message is incorrect, it should contain: ' + string);
        
      });


      Then('All categories should be visible',async function () {
        let visible = await driver.findElement(By.xpath('//button[. = "All"]')).isDisplayed();
        console.log(visible);
      });




//https://riptutorial.com/selenium-webdriver/example/22102/different-ways-to-select-from-dropdown-list      How to select a value from options?