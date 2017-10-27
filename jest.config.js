/**
 *******************************************************************************
 * Copyright 2017-present Jonathan Barronville <jonathan@belairlabs.com>       *
 *                                                                             *
 * Licensed under the Apache License, Version 2.0 (the "License");             *
 * you may not use this file except in compliance with the License.            *
 * You may obtain a copy of the License at                                     *
 *                                                                             *
 *     http://www.apache.org/licenses/LICENSE-2.0                              *
 *                                                                             *
 * Unless required by applicable law or agreed to in writing, software         *
 * distributed under the License is distributed on an "AS IS" BASIS,           *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.    *
 * See the License for the specific language governing permissions and         *
 * limitations under the License.                                              *
 *******************************************************************************
 */

const configuration = {
  // clearMocks: true, // TODO: Figure out if I really want this enabled.
  collectCoverage: true,

  globals: {
    'ts-jest': {skipBabel: true}
  },

  mapCoverage: true,
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  notify: true,
  // resetMocks: true, // TODO: Figure out if I really want this enabled.
  // resetModules: true, // TODO: Figure out if I really want this enabled.
  testEnvironment: 'node',

  testMatch: ['**/__tests__/**/*.ts'],

  timers: 'fake',

  transform: {'^.+\\.ts?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'},

  verbose: true
}

module.exports = exports = configuration
