var through = require('through2');
var shasum = require('shasum');
var isarray = require('isarray');

module.exports = function (opts) {
    if (!opts) opts = {};
    var rows = [];
    return through.obj(write, end);
    
    function write (row, enc, next) { rows.push(row); next() }
    
    function end () {
        var tr = this;
        rows.sort(cmp);
        sorter(rows, tr, opts);
    }
};

function sorter (rows, tr, opts) {
    var expose = opts.expose || {};
    if (isarray(expose)) {
        expose = expose.reduce(function (acc, key) {
            acc[key] = true;
            return acc;
        }, {});
    }
    
    var hashes = {}, deduped = {};
    var sameDeps = depCmp();
    
    if (opts.dedupe) {
        rows.forEach(function (row) {
            var h = shasum(row.source);
            sameDeps.add(row, h);
            
            if (hashes[h]) {
                row.dedupe = hashes[h].id;
                row.sameDeps = sameDeps.cmp(row.deps, hashes[h].deps);
                deduped[row.id] = hashes[h].id;
            }
            else {
                hashes[h] = row;
            }
        });
    }
    
    if (opts.index) {
        var index = {};
        var offset = 0;
        rows.forEach(function (row, ix) {
            if (has(expose, row.id)) {
                row.index = row.id;
                offset ++;
                if (expose[row.id] !== true) {
                    index[expose[row.id]] = row.index;
                }
            }
            else {
                row.index = ix + 1 - offset;
            }
            index[row.id] = row.index;
        });
        rows.forEach(function (row) {
            row.indexDeps = {};
            Object.keys(row.deps).forEach(function (key) {
                var id = row.deps[key];
                row.indexDeps[key] = index[id];
            });
            if (row.dedupe) {
                row.dedupeIndex = index[row.dedupe];
            }
            tr.push(row);
        });
    }
    else {
        rows.forEach(function (row) { tr.push(row) });
    }
    tr.push(null);
};

function cmp (a, b) {
    return a.id + a.hash < b.id + b.hash ? -1 : 1;
}

function has (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function depCmp (hashes) {
    var deps = {}, hashes = {};
    return { add: add, cmp: cmp }
    
    function add (row, hash) {
        deps[row.id] = row.deps;
        hashes[row.id] = hash;
    }
    function cmp (a, b, limit) {
        var keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) return false;

        for (var i = 0; i < keys.length; i++) {
            var k = keys[i], ka = a[k], kb = b[k];
            var ha = hashes[ka];
            var hb = hashes[kb];
            var da = deps[ka];
            var db = deps[kb];

            if (ka === kb) continue;
            if (ha !== hb || (!limit && !cmp(da, db, 1))) {
                return false;
            }
        }
        return true;
    }
}
