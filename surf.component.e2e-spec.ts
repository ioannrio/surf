// import { browser, element, protractor, promise, by, WebDriver } from 'protractor';
describe('Surf', () => {
	let EC = protractor.ExpectedConditions;
	let request = require('request');
	let path = require('path');
	let searchBar = element.all(by.css('input'));
	let navBar = element.all(by.css('a.m-main__link'));
	let sendFormBtn = element.all(by.css('span.btn__text'));
	let error = element.all(by.css('span.wpcf7-not-valid-tip'));


	it('should search moro systems in google', function () {
		browser.get('https://www.google.com/');
		browser.sleep(1000);

		//discover how many inputs are available on google search page
		expect(searchBar.count()).toBe(8);

		//click the correct one, and enter MoroSystems into search bar
		searchBar.get(3).click();
	 	searchBar.get(3).clear();
	 	searchBar.get(3).sendKeys('MoroSystems');
		browser.sleep(1000);
		browser.actions().sendKeys(protractor.Key.ENTER).perform();
		browser.sleep(1000);

		//Go to first found result
		element.all(by.css('div.ad_cclk')).get(0).click();
		browser.sleep(2000);

		//prove that MoroSystems page is displayed
		expect(browser.getTitle()).toEqual('MoroSystems');
		//longer waiting time for page to upload
		browser.sleep(2000);
	});


	it('should go to carrier page', function () {
		browser.get('https://www.morosystems.cz/');
		//discover how many nav bar buttons are available on google search page
		expect(navBar.count()).toBe(12);
		browser.sleep(1000);

		//click the one carrier related
		navBar.get(8).click();
		browser.sleep(1000);

		//prove that page urls is carrier
		expect(browser.getCurrentUrl()).toEqual('https://www.morosystems.cz/kariera/');
		browser.sleep(1000);
	});


	it('should go to automation test engineer page', function () {
		browser.actions().mouseMove(element(by.css('p.c-positions__annot'))).perform();
		browser.sleep(1000);

		//go to automation test engineer page
		element(by.cssContainingText('.c-positions__name', 'Automation Test Engineer')).click();
		browser.sleep(1000);

		//prove that we are in automation test engineer page
		expect(element(by.css('h1.b-annotation__title')).getText()).toBe('AUTOMATION TEST ENGINEER');
		browser.sleep(1000);
	});


	it('should try to send form with no information filled', function () {
		browser.get('https://www.morosystems.cz/automation-test-engineer/');
		browser.sleep(1000);
		browser.actions().mouseMove(element(by.css('h2.h3.f-job__title'))).perform();
		browser.sleep(1000);

		//send form with no information entered
		sendFormBtn.last().click();
		browser.sleep(1000);

		//prove that error messages appears
		expect(error.first().getText()).toBe('Toto pole je povinné.');
		browser.sleep(1000);
	});


	it('should try to send form without one mandatory input missing', function () {
		let nameInput = element(by.id('form_name'));
	 	nameInput.click();
	 	nameInput.clear();
	 	nameInput.sendKeys('Ivan Vasylyshyn');

		//remove for negative tests
		nameInput.clear();
		browser.sleep(1000);

		let emailInput = element(by.id('form_email'));
	 	emailInput.click();
	 	emailInput.clear();
	 	emailInput.sendKeys('ioannrio@gmail.com');
		browser.sleep(1000);

		let phoneInput = element(by.id('form_phone'));
	 	phoneInput.click();
	 	phoneInput.clear();
	 	phoneInput.sendKeys('+420777524486');
		browser.sleep(1000);

		let messageInput = element(by.id('form_message'));
	 	messageInput.click();
	 	messageInput.clear();
	 	messageInput.sendKeys('Aloha! Lets go surfing!');
		browser.sleep(1000);

		//send form with no information entered
		sendFormBtn.last().click();
		browser.sleep(1000);

		//prove that error messages appears
		expect(error.first().getText()).toBe('Toto pole je povinné.');
		browser.sleep(1000);
	});


	it('should send form with uploaded file', function () {
		//enter missing information
		let nameInput = element(by.id('form_name'));
		nameInput.click();
	 	nameInput.clear();
	 	nameInput.sendKeys('Ivan Vasylyshyn');

		//upload file to form
		let defaultImage = element.all(by.css('.wpcf7-form-control-wrap.form_cv.form-file')).get(0).getCssValue('background-image');
		let fileUpload = './img/CV_Vasylyshyn_Ivan.pdf';
		let absolutePath = path.resolve(__dirname, fileUpload);
		element.all(by.css('input[type="file"]')).get(0).sendKeys(absolutePath);
		browser.sleep(1000);

		//prove that file is uploaded
		expect(element(by.css('span.wpcf7-form-control-wrap.form_cv.form-file')).getText()).toContain('CV_Vasylyshyn_Ivan.pdf');
		browser.sleep(1000);

		/* ||| after click on agreemebt and on odeslat button form would be sent to moro systems |||*/
	});

});
