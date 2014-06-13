var _ = require('underscore');

var parser = module.exports = {};

parser.parseName = function (name) {
    var salutations = ['mr', 'master', 'mister', 'mrs', 'miss', 'ms', 'dr', 'prof', 'rev', 'fr', 'judge', 'honorable', 'hon']
        , suffixes = ['i', 'ii', 'iii', 'iv', 'v', 'senior', 'junior', 'jr', 'sr', 'phd', 'apr', 'rph', 'pe', 'md', 'ma', 'dmd', 'cme']
        , compound = ['vere', 'von', 'van', 'de', 'del', 'della', 'der', 'di', 'da', 'pietro', 'vanden', 'du', 'st.', 'st', 'la', 'lo', 'ter'];

    var parts = name.trim().split(/\s+/)
        , attrs = {};

    if (!parts.length) {
        return attrs;
    }

    if ( parts.length === 1 ) {
        attrs.firstName = parts[0];
    }

    if ( parts.length > 1 && _.indexOf(salutations, _.first(parts).toLowerCase().replace(/\./g, '')) > -1) {
        attrs.salutation = parts.shift();
        attrs.firstName = parts.shift();
    } else {
        attrs.firstName = parts.shift();
    }

    if ( parts.length > 1 && _.indexOf(suffixes, _.last(parts).toLowerCase().replace(/\./g, '')) > -1) {
        attrs.suffix = parts.pop();
        attrs.lastName = parts.pop();
    } else {
        attrs.lastName = parts.pop();
    }

    // test for compound last name, we reverse because middle name is last bit to be defined.
    // We already know lastname, so check next word if its part of a compound last name.
    var revParts = parts.reverse()
        , compoundParts = [];

    _.every(revParts, function(part, i, all){
        var test = part.toLowerCase().replace(/\./g, '');

        if (_.indexOf(compound, test) > -1 ) {
            compoundParts.push(part);

            return true;
        }

        //break on first non compound word
        return false;
    });

    //join compound parts with known last name
    if ( compoundParts.length ) {
        attrs.lastName = compoundParts.reverse().join(' ') + ' ' + attrs.lastName;

        parts = _.difference(parts, compoundParts);
    }

    if ( parts.length ) {
        attrs.middleName = parts.join(' ');
    }

    //remove comma like "<lastName>, Jr."
    if ( attrs.lastName ) {
        attrs.lastName = attrs.lastName.replace(',', '');
    }

    //save a copy of original
    attrs.fullName = name;

    //console.log('attrs:', JSON.stringify(attrs));
    return attrs;
};

parser.getFullestName = function(str){
    var name = str
        , names = [];

    //find fullname from strings like 'Jon and Sue Doyle'
    if ( name.indexOf('&') > -1 || name.toLowerCase().indexOf(' and ') > -1 ) {
        names = name.split(/\s+(?:and|&)\s+/gi);

        //pluck the name with the most parts (first, middle, last) from the array.
        //will grab 'Sue Doyle' in 'Jon & Sue Anne Doyle'
        if ( names.length ) {
            name = names.sort(function(a, b) {
                return b.split(/\s+/).length - a.split(/\s+/).length;
            })[0];
        }
    }

    return name;
};

parser.parseAddress = function(str){
    //416 W. Manchester Blvd., Inglewood, CA  90301
    var parts = str.split(/,\s+/).reverse()
        , stateZip
        , city
        , address = {};

    stateZip = parts[0].split(/\s+/);
    parts.shift();

    city = parts.shift();

    address.address = parts.reverse().join(', ');
    address.city = city;
    address.state = stateZip[0];
    address.zip = stateZip[1];
    address.fullAddress = str;

    return address;
};