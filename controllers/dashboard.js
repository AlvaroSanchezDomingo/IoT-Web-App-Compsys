"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js");
const uuid = require("uuid");
const axios = require('axios')

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "IoT Dashboard",
    };

    axios.get('http://blynk-cloud.com/c3bUKILDyi0R_dXa4hr3el77KoLYW49b/get/v1')
      .then(resp => {
        console.log(resp.data);
        const value = resp.data[0];
        console.log(value);
        const viewData = {
          title: "IoT Dashboard",
          relay : value
        };
        response.render("dashboard", viewData);
      })
      .catch(err => {
        // Handle Error Here
        console.error(err);
        response.render("dashboard", viewData);
      });

    //response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
