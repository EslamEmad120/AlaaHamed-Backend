'use strict';

/**
 * question1 service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::question1.question1');
