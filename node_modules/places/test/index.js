var Cities = require('../index.js').Cities,
    FeaturedCities = require('../index.js').FeaturedCities,
    Countries = require('../index.js').Countries,
    _ = require('underscore');

describe('Cities', function() {

  it('contains a list of cities', function(done) {
    Cities.should.be.instanceof(Array);
    Cities.length.should.not.equal(0);
    done();
  });

  it('contains New Delhi', function(done) {
    var nd = _.find(Cities, function(city){
      return city.slug == 'new-delhi';
    });
    nd.should.be.instanceof(Object);
    done();
  });

});

describe('Featured cities', function() {

  it('contains a only a list of featured cities in order', function(done) {
    FeaturedCities.should.be.instanceof(Array);
    FeaturedCities.length.should.equal(10);
    FeaturedCities[0].slug.should.equal('new-york');
    FeaturedCities[9].slug.should.equal('tokyo');
    done();
  });

  it('contains New York', function(done) {
    var ny = _.find(FeaturedCities, function(city){
      return city.slug == 'new-york';
    });
    ny.should.be.instanceof(Object);
    done();
  });

});

describe('Countries', function() {

  it('contains a list of "countries"', function() {
    Countries.should.be.instanceof(Array);
    Countries.length.should.not.equal(0);
  });

  it('has a western bias', function() {
    Countries[0].should.equal('United States');
    Countries[1].should.equal('United Kingdom');
    Countries[2].should.equal('France');
  });

});