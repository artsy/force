/*
	compiles a selector to an executable function
*/

module.exports = compile;

var parse       = require("CSSwhat"),
    DomUtils    = require("domutils"),
    isTag       = DomUtils.isTag,
    Rules       = require("./general.js"),
    sortRules   = require("./sort.js"),
    BaseFuncs   = require("./basefunctions.js"),
    rootFunc    = BaseFuncs.rootFunc,
    trueFunc    = BaseFuncs.trueFunc,
    falseFunc   = BaseFuncs.falseFunc;

function compile(selector, options){
	var next = parse(selector, options)
		.map(compileRules)
		.reduce(reduceRules, falseFunc);

	return function(elem){
		return isTag(elem) && next(elem);
	};
}

function compileRules(arr){
	return sortRules(arr).reduce(function(func, rule){
		if(func === falseFunc) return func;
		return Rules[rule.type](func, rule);
	}, rootFunc);
}

function reduceRules(a, b){
	if(
		b === falseFunc ||
		b === rootFunc ||
		a === trueFunc
	) return a;
	if(
		a === falseFunc ||
		a === rootFunc  ||
		b === trueFunc
	) return b;

	return function combine(elem){
		return a(elem) || b(elem);
	};	
}

//:not and :has have to compile selectors
//doing this in lib/pseudos.js would lead to circular dependencies,
//so we add them here

var filters     = require("./pseudos.js").filters,
    findOne     = DomUtils.findOne,
    getChildren = DomUtils.getChildren;

filters.not = function(next, select){
	var func = compile(select);

	if(func === falseFunc){
		return next === rootFunc ? trueFunc : next;
	}
	if(func === trueFunc || func === rootFunc){
		return falseFunc;
	}

	return function(elem){
		return !func(elem) && next(elem);
	};
};

filters.has = function(next, selector){
	var func = compile(selector);

	if(func === falseFunc) return falseFunc;

	return function proc(elem){
		return next(elem) && findOne(func, getChildren(elem)) !== null;
	};
};
