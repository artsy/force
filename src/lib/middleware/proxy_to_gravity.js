//
// Try to proxy unhandled requests to Gravity using node-http-proxy
// If the req can be handled by Gravity, proxy it to G
// If not, simply pass it to the next middleware
//

const { API_URL } = require("../../config")
const httpProxy = require("http-proxy")
const proxy = httpProxy.createProxyServer()
const express = require("express")

module.exports.api = (req, res) => proxy.web(req, res, { target: API_URL })
