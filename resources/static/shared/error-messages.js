/*global BrowserID: true*/
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
BrowserID.Errors = (function(){
  "use strict";

  var Errors = {
    authenticate: {
      title: "Authenticating User"
    },

    addEmail: {
      title: "Adding Address"
    },

    cancelUser: {
      title: "Cancelling User Account"
    },

    checkAuthentication: {
      title: "Checking Authentication"
    },

    checkScriptVersion: {
      title: "Checking Script Version"
    },

    completeUserRegistration: {
      title: "Completing User Registration"
    },

    createUser: {
      title: "Creating Account"
    },

    getAssertion: {
      title: "Getting Assertion"
    },

    isEmailRegistered: {
      title: "Checking Email Address"
    },

    logoutUser: {
      title: "Logout Failed"
    },

    offline: {
      title: "You are offline!",
      message: "Unfortunately, BrowserID cannot communicate while offline!"
    },

    registration: {
      title: "Registration Failed"
    },

    relaySetup: {
      title: "Establishing Relay",
      message: "Relay frame could not be found"
    },

    requestPasswordReset: {
      title: "Resetting Password"
    },

    removeEmail: {
      title: "Remove Email Address from Account"
    },

    signIn: {
      title: "Signin Failed"
    },

    signUp: {
      title: "Signup Failed"
    },

    syncAddress: {
      title: "Syncing Address"
    },

    syncEmails: {
      title: "Syncing Email Addresses"
    },

    syncEmailKeypair: {
      title: "Sync Keys for Address"
    },

    xhrError: {
      title: "Communication Error"
    }

  };


  return Errors;
}());


