'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  jwt: { // 实现登录 token
    enable: true,
    package: 'egg-jwt',
  },
  captcha: {
    enable: true,
    package: 'egg-svg-captcha',
  },
};
