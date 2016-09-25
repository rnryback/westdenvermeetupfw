var webdriverio = require('webdriverio');
var expect = require('chai').expect;
var EbayHome = require('./pages/ebay_home');
var PageObjectScope = require('./lib/page_object_scope');
var driver;
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

describe('Initial Firefox Test', function() {
  this.timeout(20000);

  beforeEach(function(done) {
    driver = webdriverio.remote(options)
    .init();
    on = new PageObjectScope(driver);
    return done();
  });

  afterEach(function() {
    driver.end();
  });

  it('Should load google and return title', function(done) {
    driver
    .url('http://www.google.com')
    .getTitle().then(function(title) {
      console.log('Title was: ' + title);
      done();
    });

  });

  it.only('Should load ebay using page objects', function() {
    return on.ebayHome().open()
    .then(function() {
      return on.ebayHome().searchFor('New Camera')
    })
    .then(function() {
      return on.ebayHome().getTitle();
    })
    .then(function(title) {
      expect(title).to.eql('New Camera | eBay');
    })

  });
})