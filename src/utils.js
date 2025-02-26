/*
 * Flow JS Testing
 *
 * Copyright 2020-2021 Dapper Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {config, withPrefix} from "@onflow/fcl"
import {createServer} from "net"

export const isObject = arg => typeof arg === "object" && arg !== null
export const isString = obj => typeof obj === "string" || obj instanceof String
export const isAddress = address => /^0x[0-9a-f]{0,16}$/.test(address)

export function getAvailablePorts(count = 1) {
  if (count === 0) return Promise.resolve([])
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.listen(0, () => {
      const port = server.address().port
      server.close(async err => {
        if (err) reject(err)
        resolve([...(await getAvailablePorts(count - 1)), port])
      })
    })
  })
}

export const getServiceAddress = async () => {
  return withPrefix(await config().get("SERVICE_ADDRESS"))
}
