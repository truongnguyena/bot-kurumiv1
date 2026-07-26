/* eslint-disable no-self-assign */
/* eslint-disable linebreak-style */
const get = require('lodash/get');
const set = require('lodash/set');
const unset = require('lodash/unset');
const fs = require('fs-extra');
const request = require('request');
const deasync = require('deasync');

const dbDir = process.cwd() + '/Horizon_Database';
const jsonPath = dbDir + '/SyntheticDatabase.json';

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
    fs.writeFileSync(dbDir + '/A_README.md', 'This folder is used by ChernobyL(NANI =)) ) to store data. Do not delete this folder or any of the files in it.', 'utf8');
}

function readStore() {
    try {
        if (!fs.existsSync(jsonPath)) return {};
        return JSON.parse(fs.readFileSync(jsonPath, 'utf8') || '{}');
    } catch {
        return {};
    }
}

function writeStore(data) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
}

function splitKey(key) {
    if (typeof key !== 'string' || !key.includes('.')) {
        return { id: key, target: '' };
    }
    const parts = key.split('.');
    return { id: parts.shift(), target: parts.join('.') };
}

function Lset(key, value) {
    if (!key) throw new TypeError('No key specified.');
    const store = readStore();
    const { id, target } = splitKey(key);
    if (target) {
        const current = store[id] && typeof store[id] === 'object' ? store[id] : {};
        set(current, target, value);
        store[id] = current;
    } else {
        store[id] = value;
    }
    writeStore(store);
    return value;
}

function Lget(key) {
    if (!key) throw new TypeError('No key specified.');
    const store = readStore();
    const { id, target } = splitKey(key);
    if (!Object.prototype.hasOwnProperty.call(store, id)) return null;
    return target ? get(store[id], target) : store[id];
}

function Lhas(key) {
    if (!key) throw new TypeError('No key specified.');
    const value = Lget(key);
    return typeof value !== 'undefined' && value !== null;
}

function Lremove(key) {
    if (!key) throw new TypeError('No key specified.');
    const store = readStore();
    const { id, target } = splitKey(key);
    if (!Object.prototype.hasOwnProperty.call(store, id)) return false;
    if (target) {
        if (typeof store[id] !== 'object') return false;
        unset(store[id], target);
    } else {
        delete store[id];
    }
    writeStore(store);
    return true;
}

function LremoveMultiple(keys) {
    if (!keys) throw new TypeError('No key specified.');
    try {
        for (const key of keys) Lremove(key);
        return true;
    } catch {
        return false;
    }
}

function Llist() {
    const store = readStore();
    return Object.keys(store).map((ID) => ({ ID, data: store[ID] }));
}

function Replit_Set(key, value) {
    try {
        let done = false;
        request({
            url: process.env.REPLIT_DB_URL,
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`
        }, function () { done = true; });
        deasync.loopWhile(function () { return !done; });
    } catch (e) {
        console.log(e);
        return false;
    }
}

function Replit_Get(key) {
    try {
        let done = false;
        let response = null;
        request(process.env.REPLIT_DB_URL + '/' + key, function (error, res, body) {
            if (!error && res.statusCode == 200) response = body;
            done = true;
        });
        deasync.loopWhile(function () { return !done; });
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
        return false;
    }
}

function Replit_Has(key) {
    try {
        let done = false;
        let response = null;
        request(process.env.REPLIT_DB_URL + '/' + key, function (error, res, body) {
            if (!error && res.statusCode == 200) response = body;
            done = true;
        });
        deasync.loopWhile(function () { return !done; });
        return response != null;
    } catch (e) {
        console.log(e);
        return false;
    }
}

function Replit_Remove(key) {
    try {
        let done = false;
        request.delete(process.env.REPLIT_DB_URL + '/' + key, function () { done = true; });
        deasync.loopWhile(function () { return !done; });
    } catch (e) {
        console.log(e);
        return false;
    }
}

function Replit_RemoveMultiple(keys) {
    try {
        for (const key of keys) {
            request.delete(process.env.REPLIT_DB_URL + '/' + key, function () {});
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

function Replit_List() {
    let done = false;
    let response = null;
    request(process.env.REPLIT_DB_URL + '?encode=true' + `&prefix=${encodeURIComponent('')}`, function (error, res, body) {
        if (!error && res.statusCode == 200) response = body;
        done = true;
    });
    deasync.loopWhile(function () { return !done; });
    if (!response || response.length === 0) return [];
    return response.split('\n').map(decodeURIComponent);
}

const localStore = {
    set: Lset,
    get: Lget,
    has: Lhas,
    delete: Lremove,
    deleteMultiple: LremoveMultiple,
    list: Llist
};

const replitRemoteStore = {
    set: Replit_Set,
    get: Replit_Get,
    has: Replit_Has,
    delete: Replit_Remove,
    deleteMultiple: Replit_RemoveMultiple,
    list: Replit_List
};

module.exports = function ChernobyL(Local) {
    if (Local && process.env.REPL_ID) return localStore;
    if (!Local && process.env.REPL_ID) return replitRemoteStore;
    return localStore;
};
