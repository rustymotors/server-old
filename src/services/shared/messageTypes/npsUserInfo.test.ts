// mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { NPSUserInfo } from "./npsUserInfo";
import { MSG_DIRECTION } from "../../MCServer/MCOTS/NPSMsg";

describe("NPSUserInfo", () => {
  test("can create an instance", () => {
    const testPacket = Buffer.concat([
      Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x84, 0x5f, 0xed]),
      Buffer.alloc(98),
    ]);
    const npsUserInfo = new NPSUserInfo(MSG_DIRECTION.RECIEVED);
    npsUserInfo.deserialize(testPacket);
    expect(npsUserInfo.userId).toBe(8675309);
  });
});
