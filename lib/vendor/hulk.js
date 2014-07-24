(function($) {
    // ie hack, http://stackoverflow.com/a/10183573/329700
    if(!(window.console && console.log)) {
      console = {
        log: function(){},
        debug: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
      };
    }

    var DEFAULT_SEPARATOR = "=>";

    /**
     * Return a jQuery element for a save button
     */
    var getSaveButton = function() {
        var button = document.createElement('button');
        button.setAttribute('class', 'hulk-save');
        button.innerHTML = 'Save';
        return button;
    };

    /**********************      Handlers      ******************************/

    var attachSaveHandler = function(button, callback) {
        $(button).on('click', callback);
    };

    var attachCollapseHandler = function(button) {
        $(button).on('click', function(e) {
            e.preventDefault();
            var value = $(button).next();
            if ($(button).hasClass('collapsed')) {
                // Expand it
                $(button).text('Collapse');
                $(value).slideDown('slow', function() {
                    $(button).removeClass('collapsed');
                });
            } else {
                $(value).slideUp('slow', function() {
                    $(button).addClass('collapsed');
                    $(button).text('Expand');
                });
            }
        });
    };

    /**
     * Add a handler to append a new element as HTML to the list
     */
    var attachAddArrayElementHandler = function(button, options) {
        $(button).on('click', function(e) {
            e.preventDefault();
            var elementHTML = createArrayElementHTML("", options);
            $(button).before(elementHTML);
        });
    };

    /**
     * Add a handler to append a new dictionary as HTML to the list
     *
     * XXX: consider refactoring this with the function above
     */
    var attachAddKeyValuePairElementHandler = function(button, options) {
        $(button).on('click', function(e) {
            e.preventDefault();
            var elementHTML = createArrayElementHTML({"": ""}, options);
            $(button).before(elementHTML);
        });
    };

    var attachKeyValuePairHandler = function(button, options) {
        $(button).on('click', function(e) {
            e.preventDefault();
            var elementHTML = createKeyValuePairHTML("", "", options);
            $(button).before(elementHTML);
        });
    };

    /**********************      Utilities      ******************************/

    var getOptionOrDefault = function(options, optionName, defaultValue) {
        if (typeof options === "undefined") {
            return defaultValue;
        }
        if (typeof options[optionName] === "undefined") {
            return defaultValue;
        }
        return options[optionName];
    };

    /**
     * Detect whether a string is a number-ish value
     *
     * @param n string
     * @return boolean Whether the string is a number
     */
    var isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    /**
     * Detect whether an object is a dictionary (eg, {}) instead of a list or
     * another data type
     *
     * Implementation taken from goog.typeOf here:
     * docs.closure-library.googlecode.com/git/closure_goog_base.js.source.html
     */
    var isDictionary = function(obj) {
        return typeof obj === "object" && ! (obj instanceof Array);
    };

    /**
     * Detect whether a list is a list of dictionaries
     *
     * Of course in Javascript a list can combine any types, in this case we are
     * strict and care only if the list is made up entirely of dictionaries. You
     * shouldn't mix types in a list.
     */
    var isArrayOfDictionaries = function(list) {
        try {
            return list.filter(isDictionary).length === list.length;
        } catch (TypeError) {
            return false;
        }
    };

    /*********   These functions take JSON and return HTML     **********/

    /**
     * Create HTML for a map key/value pair
     */
    var createKeyValuePairHTML = function(key, value, options) {
        var separator = getOptionOrDefault(
            options, "separator", DEFAULT_SEPARATOR);
        var depth = getOptionOrDefault(options, "depth", -1);

        var pair = $(document.createElement('div'));
        pair.addClass('hulk-map-pair');

        var keyHTML = $(document.createElement('input'));
        keyHTML.addClass('hulk-map-key');
        keyHTML.attr('value', key);
        pair.append(keyHTML);

        var separatorElement = $(document.createElement('p'));
        separatorElement.addClass('hulk-separator');
        separatorElement.text(separator);
        pair.append(separatorElement);

        var optionsCopy = jQuery.extend(true, {}, options);
        if (depth > 0) {
            optionsCopy.depth = depth - 1;
        }

        var valueHTML = convertJSONToHTML(value, optionsCopy, key);
        valueHTML.addClass('hulk-map-value-container');
        if (valueHTML.children('.hulk-map-pair, .hulk-array-element').length > 0) {
            var button = $(document.createElement('button'));
            button.addClass('hulk-collapse-item');
            if (depth !== 0) {
                button.text("Collapse");
                attachCollapseHandler(button);
                pair.append(button);
            } else {
                button.addClass('collapsed');
                button.text("Expand");
                valueHTML.hide();
                attachCollapseHandler(button);
                pair.append(button);
            }
        }
        pair.append(valueHTML);
        return pair;
    };

    var createMapHTML = function(map, options, optionalKey) {
        var mapHTML = $(document.createElement('div'));
        mapHTML.addClass('hulk-map');

        // ugh, http://stackoverflow.com/q/5467129/329700
        var key;
        var keys = [];
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        keys.sort();

        for (var j = 0; j < keys.length; j++) {
            key = keys[j];
            var value = map[key];
            var pair = createKeyValuePairHTML(key, value, options);
            mapHTML.append(pair);
        }
        var addPairElement = $(document.createElement('button'));
        addPairElement.addClass('hulk-map-add-pair');
        var text = getAddElementText("key/value pair", optionalKey);
        addPairElement.text(text);
        attachKeyValuePairHandler(addPairElement, options);
        mapHTML.append(addPairElement);
        return mapHTML;
    };

    /**
     * Create HTML for a JSON array element
     *
     * @return a jQuery object for the element, plus what's inside the element
     */
    var createArrayElementHTML = function(element, options) {
        var elementHTML = $(document.createElement('div'));
        elementHTML.addClass('hulk-array-element');
        elementHTML.html(convertJSONToHTML(element, options));
        return elementHTML;
    };

    var getAddElementText = function(elementName, optionalKey) {
        var type = typeof optionalKey;
        var maxKeyLength = 30;
        if (type === "undefined" || type !== "string") {
            return ["Add new ", elementName].join("");
        }
        if (optionalKey.length > maxKeyLength) {
            return [
                "Add new ",
                elementName,
                " to ",
                optionalKey.substring(0, maxKeyLength),
                "..."
            ].join("");
        } else {
            return [
                "Add new ",
                elementName,
                " to ",
                optionalKey
            ].join("");
        }
    };

    var createArrayHTML = function(data, options, optionalKey) {
        var array = $(document.createElement('div'));
        array.addClass('hulk-array');
        for (var i = 0; i < data.length; i++) {
            var elementHTML = createArrayElementHTML(data[i], options);
            array.append(elementHTML);
        }
        // If it's a list of dictionaries, add an option to add
        // a dictionary.
        var text;
        if (isArrayOfDictionaries(data)) {
            var addPairElement = $(document.createElement('button'));
            addPairElement.addClass('hulk-array-add-pair');
            text = getAddElementText("object", optionalKey);
            addPairElement.text(text);
            attachAddKeyValuePairElementHandler(addPairElement, options);
            array.append(addPairElement);
        } else {
            // Otherwise, you can only add new values.
            var addRowElement = $(document.createElement('button'));
            addRowElement.addClass('hulk-array-add-row');
            text = getAddElementText("element", optionalKey);
            addRowElement.text(text);
            attachAddArrayElementHandler(addRowElement, options);
            array.append(addRowElement);
        }
        return array;
    };

    /**
     * Converts a simple JSON value (string, boolean, number) into HTML
     *
     * @return jQuery
     */
    var createInputHTML = function(input, type) {
        var maxInputTextLength = 80;
        var valueInput;
        if (type === "string" && input.length > maxInputTextLength) {
            valueInput = $(document.createElement('textarea'));
            // XXX Make this configurable?
            valueInput.attr('rows', 7);
            valueInput.attr('cols', 80);
            valueInput.addClass('hulk-input-textarea');
        } else if (type === "boolean") {
            valueInput = $(document.createElement('select'));
            var trueOption = $(document.createElement('option'));
            trueOption.attr('value', 'true').text('true');
            var falseOption = $(document.createElement('option'));
            falseOption.attr('value', 'false').text('false');
            valueInput.append(trueOption);
            valueInput.append(falseOption);
            valueInput.addClass('hulk-input-select');
        } else {
            valueInput = $(document.createElement('input'));
            valueInput.addClass('hulk-input-text');
        }
        valueInput.addClass('hulk-map-value');
        if (type === "boolean") {
            valueInput.val(input.toString());
        } else {
            valueInput.val(input);
        }
        return valueInput;
    };

    /**
     * Convert a JSON object into HTML
     *
     * This should handle most JSON objects, per the specification here:
     * http://www.json.org/
     *
     * This function calls itself recursively
     *
     * @param object data the JSON object to convert
     * @param object|undefined options the user specified options
     * @param string optionalKey for dictionary values, pass in the associated key
     */
    var convertJSONToHTML = function(data, options, optionalKey) {
        var type = typeof data;
        // typeof null === "object", so we compare directly against null
        if (type === "string" || type === "number" || type === "boolean" || data === null) {
            return createInputHTML(data, type);
        }

        // XXX: the JSON specification allows for fractions and exponents.
        // Handle them here.

        // javascript you're drunk. http://stackoverflow.com/a/4775737/329700
        if (Object.prototype.toString.call(data) === '[object Array]') {
            return createArrayHTML(data, options, optionalKey);
        }

        // Now that we've covered the other cases, only dictionaries should be
        // left, in theory.
        return createMapHTML(data, options, optionalKey);
    };

    /************  these functions take HTML and return JSON    ***************/

    /**
     * Take a value and try to parse it into JSON data types
     *
     * For example, "true" => true
     *
     * @param string value
     * @param object|undefined options
     * @return The returned data type
     */
    var parseTextInput = function(value, options) {

        // XXX: the JSON specification allows for fractions and exponents,
        // handle them here.
        if (isNumber(value)) {
            return parseFloat(value);
        }

        if (value === "true") {
            return true;
        }
        if (value === "false") {
            return false;
        }

        /**
         * Note: there's some data loss here as we cannot detect between the
         * empty string and null. In theory we could attach a data-* attribute
         * to the input and use that but you'd still break if the user voided a
         * field while editing the JSON.
         */
        if (value === null || value === "null") {
            return null;
        }
        if (value.length === 0) {
            var emptyString = getOptionOrDefault(options, "emptyString", false);
            return emptyString === true ? "" : null;
        }

        return value;
    };

    /**
     * this function calls itself recursively
     *
     * input: a JQuery object (the editor in JSON)
     * output: a JSON object
     */
    var reassembleJSON = function(html, options) {

        var mapChildren = html.children('.hulk-map');
        if (mapChildren.length > 0) {
            return reassembleJSON(mapChildren, options);
        }

        var mapItems = html.children('.hulk-map-pair');
        if (mapItems.length > 0) {
            var d = {};
            mapItems.each(function(index, element) {
                var $element = $(element);
                var key = $element.children('.hulk-map-key');
                // XXX if multiple elements have the same key, last one wins.
                // what should actually be done here? warn?
                if (key.val() === "") {
                    return;
                }
                d[key.val()] = reassembleJSON(
                    $element.children('.hulk-map-value-container'), options);
            });
            return d;
        }

        var arrayChildren = html.children('.hulk-array');
        if (arrayChildren.length > 0) {
            return reassembleJSON(arrayChildren, options);
        }

        if (html.hasClass('hulk-array')) {
            var array = [];
            html.children('.hulk-array-element').each(function(index, element) {
                array.push(reassembleJSON($(element), options));
            });
            return array;
        }

        if (html.hasClass('hulk-map-value')) {
            var smartParsing = getOptionOrDefault(options, "smartParsing", true);
            if (!smartParsing) {
                return html.val();
            }
            return parseTextInput(html.val(), options);
        }

        // hack, merge this with the above conditional
        var valueChild = html.children('.hulk-map-value');
        if (valueChild.length) {
            return reassembleJSON(valueChild, options);
        }

        if (html.hasClass('hulk-map-value-container')) {
            return reassembleJSON(html.children('.hulk-map-value'), options);
        }

        return {};
    };

    /*********************      Exported Functions       **********************/

    $.hulk = function(selector, data, callback, options) {
        if (isDictionary(callback)) {
            console.warn("Dictionary " + JSON.stringify(callback) + " passed " +
                "as the callback (3rd) argument, probably meant to pass it " +
                "as the options (4th) argument");
        };
        // get option settings
        var $element = $(selector);
        $element.addClass('hulk');
        if ($element.length === 0) {
            // XXX console doesn't always exist
            console.error("Attempting to hulk-ify element with selector " +
                selector + " failed because the element does not exist. " +
                "Quitting");
            return;
        }
        var html = convertJSONToHTML(data, options);
        $element.html(html);

        var showSaveButton = getOptionOrDefault(options, "showSaveButton", true);
        if (showSaveButton) {
            var button = getSaveButton();
            attachSaveHandler(button, function(event) {
                var newData = reassembleJSON($element.children(), options);
                callback(newData);
                event.preventDefault();
            });
            $element.append(button);
        }
        return $element;
    };

    $.hulkSmash = function(selector, options) {
        return reassembleJSON($(selector), options);
    };
}(jQuery));