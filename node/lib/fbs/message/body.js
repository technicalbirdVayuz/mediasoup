"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionListToBody = exports.unionToBody = exports.Body = void 0;
const log_1 = require("../../fbs/log/log");
const notification_1 = require("../../fbs/notification/notification");
const request_1 = require("../../fbs/request/request");
const response_1 = require("../../fbs/response/response");
var Body;
(function (Body) {
    Body[Body["NONE"] = 0] = "NONE";
    Body[Body["Request"] = 1] = "Request";
    Body[Body["Response"] = 2] = "Response";
    Body[Body["Notification"] = 3] = "Notification";
    Body[Body["Log"] = 4] = "Log";
})(Body || (exports.Body = Body = {}));
function unionToBody(type, accessor) {
    switch (Body[type]) {
        case 'NONE': return null;
        case 'Request': return accessor(new request_1.Request());
        case 'Response': return accessor(new response_1.Response());
        case 'Notification': return accessor(new notification_1.Notification());
        case 'Log': return accessor(new log_1.Log());
        default: return null;
    }
}
exports.unionToBody = unionToBody;
function unionListToBody(type, accessor, index) {
    switch (Body[type]) {
        case 'NONE': return null;
        case 'Request': return accessor(index, new request_1.Request());
        case 'Response': return accessor(index, new response_1.Response());
        case 'Notification': return accessor(index, new notification_1.Notification());
        case 'Log': return accessor(index, new log_1.Log());
        default: return null;
    }
}
exports.unionListToBody = unionListToBody;