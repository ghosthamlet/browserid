/*jshint browsers:true, forin: true, laxbreak: true */
/*global wrappedAsyncTest: true, start: true, stop: true, module: true, ok: true, equal: true, BrowserID: true */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mozilla BrowserID.
 *
 * The Initial Developer of the Original Code is Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

BrowserID.Mocks.xhr = (function() {
  var  contextInfo = {
      server_time: new Date().getTime(),
      domain_key_creation_time: (new Date().getTime() - (30 * 24 * 60 * 60 * 1000)),
      csrf_token: "csrf",
      authenticated: false,
      code_version: "ABC123"
    };

  // this cert is meaningless, but it has the right format
  var random_cert = "eyJhbGciOiJSUzEyOCJ9.eyJpc3MiOiJpc3N1ZXIuY29tIiwiZXhwIjoxMzE2Njk1MzY3NzA3LCJwdWJsaWMta2V5Ijp7ImFsZ29yaXRobSI6IlJTIiwibiI6IjU2MDYzMDI4MDcwNDMyOTgyMzIyMDg3NDE4MTc2ODc2NzQ4MDcyMDM1NDgyODk4MzM0ODExMzY4NDA4NTI1NTk2MTk4MjUyNTE5MjY3MTA4MTMyNjA0MTk4MDA0NzkyODQ5MDc3ODY4OTUxOTA2MTcwODEyNTQwNzEzOTgyOTU0NjUzODEwNTM5OTQ5Mzg0NzEyNzczMzkwMjAwNzkxOTQ5NTY1OTAzNDM5NTIxNDI0OTA5NTc2ODMyNDE4ODkwODE5MjA0MzU0NzI5MjE3MjA3MzYwMTA1OTA2MDM5MDIzMjk5NTYxMzc0MDk4OTQyNzg5OTk2NzgwMTAyMDczMDcxNzYwODUyODQxMDY4OTg5ODYwNDAzNDMxNzM3NDgwMTgyNzI1ODUzODk5NzMzNzA2MDY5IiwiZSI6IjY1NTM3In0sInByaW5jaXBhbCI6eyJlbWFpbCI6InRlc3R1c2VyQHRlc3R1c2VyLmNvbSJ9fQ.aVIO470S_DkcaddQgFUXciGwq2F_MTdYOJtVnEYShni7I6mqBwK3fkdWShPEgLFWUSlVUtcy61FkDnq2G-6ikSx1fUZY7iBeSCOKYlh6Kj9v43JX-uhctRSB2pI17g09EUtvmb845EHUJuoowdBLmLa4DSTdZE-h4xUQ9MsY7Ik";

  /**
   * This is the results table, the keys are the request type, url, and
   * a "selector" for testing.  The right is the expected return value, already
   * decoded.  If a result is "undefined", the request's error handler will be
   * called.
   */
  var xhr = {
    results: {
      "get /wsapi/session_context valid": contextInfo,
      "get /wsapi/session_context invalid": contextInfo,
      // We are going to test for XHR failures for session_context using
      // call to serverTime.  We are going to use the flag contextAjaxError
      "get /wsapi/session_context ajaxError": contextInfo,
      "get /wsapi/session_context complete": contextInfo,
      "get /wsapi/session_context throttle": contextInfo,
      "get /wsapi/session_context multiple": contextInfo,
      "get /wsapi/session_context no_identities": contextInfo,
      "get /wsapi/session_context contextAjaxError": undefined,
      "get /wsapi/email_for_token?token=token valid": { email: "testuser@testuser.com" },
      "get /wsapi/email_for_token?token=token invalid": { success: false },
      "post /wsapi/authenticate_user valid": { success: true },
      "post /wsapi/authenticate_user invalid": { success: false },
      "post /wsapi/authenticate_user ajaxError": undefined,
      "post /wsapi/cert_key valid": random_cert,
      "post /wsapi/cert_key invalid": undefined,
      "post /wsapi/cert_key ajaxError": undefined,
      "post /wsapi/complete_email_addition valid": { success: true },
      "post /wsapi/complete_email_addition invalid": { success: false },
      "post /wsapi/complete_email_addition ajaxError": undefined,
      "post /wsapi/stage_user valid": { success: true },
      "post /wsapi/stage_user invalid": { success: false },
      "post /wsapi/stage_user throttle": 403,
      "post /wsapi/stage_user ajaxError": undefined,
      "get /wsapi/user_creation_status?email=registered%40testuser.com pending": { status: "pending" },
      "get /wsapi/user_creation_status?email=registered%40testuser.com complete": { status: "complete" },
      "get /wsapi/user_creation_status?email=registered%40testuser.com mustAuth": { status: "mustAuth" },
      "get /wsapi/user_creation_status?email=registered%40testuser.com noRegistration": { status: "noRegistration" },
      "get /wsapi/user_creation_status?email=registered%40testuser.com ajaxError": undefined,
      "post /wsapi/complete_user_creation valid": { success: true },
      "post /wsapi/complete_user_creation invalid": { success: false },
      "post /wsapi/complete_user_creation ajaxError": undefined,
      "post /wsapi/logout valid": { success: true },
      "post /wsapi/logout ajaxError": undefined,
      "get /wsapi/have_email?email=registered%40testuser.com valid": { email_known: true },
      "get /wsapi/have_email?email=registered%40testuser.com throttle": { email_known: true },
      "get /wsapi/have_email?email=registered%40testuser.com ajaxError": undefined,
      "get /wsapi/have_email?email=unregistered%40testuser.com valid": { email_known: false },
      "post /wsapi/remove_email valid": { success: true },
      "post /wsapi/remove_email invalid": { success: false },
      "post /wsapi/remove_email ajaxError": undefined,
      "post /wsapi/account_cancel valid": { success: true },
      "post /wsapi/account_cancel invalid": { success: false },
      "post /wsapi/account_cancel ajaxError": undefined,
      "post /wsapi/stage_email valid": { success: true },
      "post /wsapi/stage_email invalid": { success: false },
      "post /wsapi/stage_email throttle": 403,
      "post /wsapi/stage_email ajaxError": undefined,
      "post /wsapi/cert_key ajaxError": undefined,
      "get /wsapi/email_addition_status?email=registered%40testuser.com pending": { status: "pending" },
      "get /wsapi/email_addition_status?email=registered%40testuser.com complete": { status: "complete" },
      "get /wsapi/email_addition_status?email=registered%40testuser.com mustAuth": { status: "mustAuth" },
      "get /wsapi/email_addition_status?email=registered%40testuser.com noRegistration": { status: "noRegistration" },
      "get /wsapi/email_addition_status?email=registered%40testuser.com ajaxError": undefined,
      "get /wsapi/list_emails valid": {"testuser@testuser.com":{}},
      "get /wsapi/list_emails multiple": {"testuser@testuser.com":{}, "testuser2@testuser.com":{}},
      "get /wsapi/list_emails no_identities": [],
      "get /wsapi/list_emails ajaxError": undefined,
      // Used in conjunction with registration to do a complete userflow
      "get /wsapi/list_emails complete": {"registered@testuser.com":{}}
    },

    setContextInfo: function(field, value) {
      contextInfo[field] = value;
    },

    useResult: function(result) {
      xhr.resultType = result;
    },

    getLastRequest: function() {
      return this.req;
    },

    ajax: function(obj) {
      //console.log("ajax request");
      var type = obj.type ? obj.type.toLowerCase() : "get";

      var req = this.req = {
        type: type,
        url: obj.url,
        data: obj.data
      };


      if(type === "post" && !obj.data.csrf) {
        ok(false, "missing csrf token on POST request");
      }

      var resName = req.type + " " + req.url + " " + xhr.resultType;
      var result = xhr.results[resName];

      var type = typeof result;
      if(!(type == "number" || type == "undefined")) {
        if(obj.success) {
          obj.success(result);
        }
      }
      else if (obj.error) {
        // Invalid result - either invalid URL, invalid GET/POST or
        // invalid resultType
        obj.error({ status: result || 400 }, "errorStatus", "errorThrown");
      }
    }
  };


  return xhr;
}());


