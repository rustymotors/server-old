import { driverClass, playerType } from "@rustymotors/schema";
import {
  index,
  integer,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { pgSchema } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("mcos");

export const player = mySchema.table(
  "player",
  {
    playerId: integer("player_id").notNull().primaryKey(),
    customerId: integer("customer_id").notNull(),
    playerTypeId: integer("player_type_id")
      .references(() => playerType.playerTypeId)
      .notNull(),
    sanctionedScore: integer("sanctioned_score"),
    challengeScore: integer("challenge_score"),
    lastLoggedIn: timestamp("last_logged_in", {
      mode: "date",
      withTimezone: false,
    }),
    timesLoggedIn: integer("times_logged_in").notNull(),
    bankBalance: integer("bank_balance").notNull(),
    numCarsOwned: smallint("num_cars_owned").notNull(),
    isLoggedIn: smallint("is_logged_in"),
    driverStyle: smallint("driver_style").notNull(),
    lpCode: integer("lp_code").notNull(),
    lpText: varchar("lp_text", { length: 9 }),
    carNum1: varchar("car_num_1", { length: 2 }).notNull().default(""),
    carNum2: varchar("car_num_2", { length: 2 }).notNull().default(""),
    carNum3: varchar("car_num_3", { length: 2 }).notNull().default(""),
    carNum4: varchar("car_num_4", { length: 2 }).notNull().default(""),
    carNum5: varchar("car_num_5", { length: 2 }).notNull().default(""),
    carNum6: varchar("car_num_6", { length: 2 }).notNull().default(""),
    dlNumber: varchar("dl_number", { length: 20 }),
    persona: varchar("persona", { length: 30 }).notNull(),
    address: varchar("address", { length: 128 }),
    residence: varchar("residence", { length: 20 }),
    vehicleId: integer("vehicle_id").default(0),
    currentRaceId: integer("current_race_id").default(0),
    offlineDriverSkill: integer("offline_driver_skill").default(0),
    offlineGrudge: integer("offline_grudge").default(0),
    offlineReputation: integer("offline_reputation").default(0),
    totalTimePlayed: integer("total_time_played").default(0),
    carInfoSetting: integer("car_info_setting").default(0),
    stockClassicClass: smallint("stock_classic_class"),
    stockMuscleClass: smallint("stock_muscle_class").references(
      () => driverClass.driverClassId
    ),
    modifiedClassicClass: smallint("modified_classic_class").references(
      () => driverClass.driverClassId
    ),
    modifiedMuscleClass: smallint("modified_muscle_class").references(
      () => driverClass.driverClassId
    ),
    outlawClass: smallint("outlaw_class").references(
      () => driverClass.driverClassId
    ),
    dragClass: smallint("drag_class").references(
      () => driverClass.driverClassId
    ),
    challengeRung: integer("challenge_rung").default(0),
    offlineAiCarClass: smallint("offline_ai_car_class").default(0),
    offlineAiSkinId: integer("offline_ai_skin_id").default(0),
    offlineAiCarBptId: integer("offline_ai_car_bpt_id").default(0),
    offlineAiState: integer("offline_ai_state").default(0),
    bodytype: integer("bodytype").default(0),
    skinColor: integer("skin_color").default(0),
    hairColor: integer("hair_color").default(0),
    shirtColor: integer("shirt_color").default(0),
    pantsColor: integer("pants_color").default(0),
    offlineDriverStyle: integer("offline_driver_style").default(0),
    offlineDriverAttitude: integer("offline_driver_attitude").default(0),
    evadedFuzz: integer("evaded_fuzz").default(0),
    pinksWon: integer("pinks_won").default(0),
    numUnreadMail: integer("num_unread_mail").default(0),
    totalRacesRun: integer("total_races_run").default(0),
    totalRacesWon: integer("total_races_won").default(0),
    totalRacesCompleted: integer("total_races_completed").default(0),
    totalWinnings: integer("total_winnings").default(0),
    insuranceRiskPoints: integer("insurance_risk_points").default(0),
    insuranceRating: integer("insurance_rating").default(0),
    challengeRacesRun: integer("challenge_races_run").default(0),
    challengeRacesWon: integer("challenge_races_won").default(0),
    challengeRacesCompleted: integer("challenge_races_completed").default(0),
    carsLost: integer("cars_lost").default(0),
    carsWon: integer("cars_won").default(0),
  },
  (table) => {
    return {
      numUnreadMailIdx: index("player_num_unread_mail_idx").on(
        table.numUnreadMail
      ),
      offlineAiCarBptIdIdx: index("player_offline_ai_car_bpt_id_idx").on(
        table.offlineAiCarBptId
      ),
      stockMuscleClassIdx: index("player_stock_muscle_class_idx").on(
        table.stockMuscleClass
      ),
      modifiedClassicClassIdx: index("player_modified_classic_class_idx").on(
        table.modifiedClassicClass
      ),
      modifiedMuscleClassIdx: index("player_modified_muscle_class_idx").on(
        table.modifiedMuscleClass
      ),
      outlawClassIdx: index("player_outlaw_class_idx").on(table.outlawClass),
      dragClassIdx: index("player_drag_class_idx").on(table.dragClass),
      playerTypeIdIdx: index("player_player_type_id_idx").on(
        table.playerTypeId
      ),
    };
  }
);
