// mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

const { logger } = require('../logger');

class LobbyInfo {


  // DWORD   clubNumPlayers;
  // DWORD   clubNumLaps;
  // DWORD   clubNumRounds;
  // WORD    clubNight;
  // WORD    clubWeather;
  // WORD    clubBackwards;
  // DWORD  bestLapTime; // (64hz ticks)
  // DWORD  lobbyDifficulty;
  // DWORD  ttPointForQualify;
  // DWORD  ttCashForQualify;
  // DWORD  ttPointBonusFasterIncs;
  // DWORD  ttCashBonusFasterIncs;
  // DWORD  ttTimeIncrements;

  // DWORD  ttvictory_1st_points;
  // DWORD  ttvictory_1st_cash;
  // DWORD  ttvictory_2nd_points;
  // DWORD  ttvictory_2nd_cash;
  // DWORD  ttvictory_3rd_points;
  // DWORD  ttvictory_3rd_cash;
  // WORD   minLevel;
  // DWORD  minResetSlice;
  // DWORD  maxResetSlice;
  // WORD   newbieFlag;
  // WORD   driverHelmetFlag;
  // WORD   clubNumPlayersMax;
  // WORD   clubNumPlayersMin;
  // WORD   clubNumPlayersDefault;
  // WORD   numClubsMax;
  // WORD   numClubsMin;
  // float  racePointsFactor;
  // WORD   bodyClassMax;
  // WORD   powerClassMax;

  // WORD   partPrizesMax;      // max allowed for this lobby
  // WORD   partPrizesWon;      // current users prizes for this lobby
  // DWORD  clubLogoID;         // Logo ID for Turf owner
  // WORD   bteamtrialweather;  // Team Trials Weather Flag
  // WORD   bteamtrialnight;    // Team Trials Night Flag
  // WORD   bteamtrialbackward; // Team Trials Backwards Flag
  // WORD   teamtrialnumlaps;   // Team Trials Number of Laps
  // DWORD  teamtrialbaseTUP;   // Team Trials Base Time Under Par
  // float  raceCashFactor;
  constructor(lobbyJson) {
    // DWORD    lobbyID;
    this.lobbyId = lobbyJson.lobbyId;
    // DWORD    raceTypeID;
    this.racetypeId = lobbyJson.racetypeId;
    // DWORD    turfID;
    this.turfId = lobbyJson.turfId;

    // char NPSRiffName[MC_MAX_NPS_RIFF_NAME]; // 32
    this.NPSRiffName = lobbyJson.NPSRiffName;
    // char eTurfName[256];
    this.eTurfName = lobbyJson.eTurfName;
    // char clientArt[11];
    this.clientArt = lobbyJson.clientArt;
    // DWORD    elementID;
    this.elementId = lobbyJson.elementId;
    // DWORD    turfLength;
    this.turfLength = lobbyJson.turfLength;
    // DWORD    startSlice;
    this.startSlice = lobbyJson.startSlice;
    // DWORD    endSlice;
    this.endSlice = lobbyJson.endSlice;
    // float    dragStageLeft;
    this.dragStageLeft = lobbyJson.dragStageLeft;
    // float    dragStageRight;
    this.dragStageRight = lobbyJson.dragStageRight;
    // DWORD    dragStagingSlice;
    this.dragStagingSlice = lobbyJson.dragStagingSlice;
    // float    gridSpreadFactor;
    this.gridSpreadFactor = lobbyJson.gridSpreadFactor;
    // WORD    linear;
    this.linear = lobbyJson.linear;
    // WORD    numplayersmin;
    this.numplayersmin = lobbyJson.numplayersmin;
    // WORD    numplayersmax;
    this.numplayersmax = lobbyJson.numplayersmax;
    // WORD    numplayersdefault;
    this.numplayersdefault = lobbyJson.numplayersdefault;
    // WORD    bnumplayersenabled;
    this.bnumplayersenabled = lobbyJson.bnumplayersenabled;
    // WORD    numlapsmin;
    this.numlapsmin = lobbyJson.numlapsmin;
    // WORD    numlapsmax;
    this.numlapsmax = lobbyJson.numlapsmax;
    // WORD    numlapsdefault;
    this.numlapsdefault = lobbyJson.numlapsdefault;
    // WORD    bnumlapsenabled;
    this.bnumlapsenabled = lobbyJson.bnumlapsenabled;
    // WORD    numroundsmin;
    this.numroundsmin = lobbyJson.numroundsmin
    // WORD    numroundsmax;
    this.numroundsmax = lobbyJson.numroundsmax
    // WORD    numroundsdefault;
    this.numroundsdefault = lobbyJson.numroundsdefault
    // WORD    bnumroundsenabled;
    this.bnumroundsenabled = lobbyJson.bnumroundsenabled
    // WORD    bweatherdefault;
    this.bweatherdefault = lobbyJson.bweatherdefault
    // WORD    bweatherenabled;
    this.bweatherenabled = lobbyJson.bweatherenabled
    // WORD    bnightdefault;
    this.bnightdefault = lobbyJson.bnightdefault
    // WORD    bnightenabled;
    this.bnightenabled = lobbyJson.bnightenabled
    // WORD    bbackwarddefault;
    this.bbackwarddefault = lobbyJson.bbackwarddefault
    // WORD    bbackwardenabled;
    this.bbackwardenabled = lobbyJson.bbackwardenabled
    // WORD    btrafficdefault;
    this.btrafficdefault = lobbyJson.btrafficdefault
    // WORD    btrafficenabled;
    this.btrafficenabled = lobbyJson.btrafficenabled
    // WORD    bdamagedefault;
    this.bdamagedefault = lobbyJson.bdamagedefault
    // WORD    bdamageenabled;
    this.bdamageenabled = lobbyJson.bdamageenabled
    // WORD    baidefault;
    this.baidefault = lobbyJson.baidefault
    // WORD    baienabled;
    this.baienabled = lobbyJson.baienabled

    // char   topDog[MC_NAME_LENGTH]; = 13
    // Also used for TimeTrial's "Last Weeks Champion"?
    this.topDog = lobbyJson.topDog
    // char   turfOwner[MAX_CLUB_NAME_LENGTH+1]; = 33 (including the +1)
    this.turfOwner = lobbyJson.turfOwner
    // DWORD  qualifyingTime;
    this.qualifyingTime = lobbyJson.qualifyingTime
  }
}

class LobbyMsg {
  constructor(noLobbies, moreToCome, LobbyInfoArr) {
    this.msgNo = 325;

    this.noLobbies = noLobbies;
    this.moreToCome = moreToCome;
    this.lobbyInfoArr = LobbyInfoArr;

    this.buffer = Buffer.alloc(5);
    this.buffer.writeInt16LE(this.msgNo);
    this.buffer.writeInt16LE(this.noLobbies, 2);
    this.buffer.writeInt8(this.moreToCome, 4);

    logger.debug(this.buffer);

    return this;
  }

  /**
                      * dumpPacket
                      */
  dumpPacket() {
    logger.info('[LobbyMsg]======================================');
    logger.debug('MsgNo:       ', this.msgNo.toString());
    logger.debug('customerId:  ', this.customerId.toString());
    logger.debug('personaId:   ', this.personaId.toString());
    logger.info('[LobbyMsg]======================================');
  }
}

module.exports = { LobbyInfo, LobbyMsg };
