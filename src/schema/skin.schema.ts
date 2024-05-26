import { partType, player, skinType } from "@rustymotors/schema";
import {
  index,
  integer,
  smallint,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { pgSchema } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("mcos");

export const skin = mySchema.table(
  "skin",
  {
    skinId: integer("skin_id").notNull().primaryKey(),
    creatorId: integer("creator_id")
      .references(() => player.playerId)
      .notNull(),
    skinTypeId: integer("skin_type_id")
      .references(() => skinType.skinTypeId)
      .notNull(),
    partTypeId: integer("part_type_id")
      .references(() => partType.partTypeId)
      .notNull(),
    defaultFlag: smallint("default_flag").notNull().default(0),
    eSkin: varchar("e_skin", { length: 100 }).notNull(),
    gSkin: varchar("g_skin", { length: 32 }),
    fSkin: varchar("f_skin", { length: 32 }),
    sSkin: varchar("s_skin", { length: 32 }),
    iSkin: varchar("i_skin", { length: 32 }),
    jSkin: varchar("j_skin", { length: 32 }),
    swSkin: varchar("sw_skin", { length: 32 }),
    bSkin: varchar("b_skin", { length: 32 }),
    price: integer("price").notNull(),
    partFilename: varchar("part_filename", { length: 20 }),
    h0: smallint("h0"),
    s0: smallint("s0"),
    v0: smallint("v0"),
    c0: smallint("c0"),
    x0: smallint("x0"),
    y0: smallint("y0"),
    h1: smallint("h1"),
    s1: smallint("s1"),
    v1: smallint("v1"),
    c1: smallint("c1"),
    x1: smallint("x1"),
    y1: smallint("y1"),
    h2: smallint("h2"),
    s2: smallint("s2"),
    v2: smallint("v2"),
    c2: smallint("c2"),
    x2: smallint("x2"),
    y2: smallint("y2"),
    h3: smallint("h3"),
    s3: smallint("s3"),
    v3: smallint("v3"),
    c3: smallint("c3"),
    x3: smallint("x3"),
    y3: smallint("y3"),
    h4: smallint("h4"),
    s4: smallint("s4"),
    v4: smallint("v4"),
    c4: smallint("c4"),
    x4: smallint("x4"),
    y4: smallint("y4"),
    h5: smallint("h5"),
    s5: smallint("s5"),
    v5: smallint("v5"),
    c5: smallint("c5"),
    x5: smallint("x5"),
    y5: smallint("y5"),
    h6: smallint("h6"),
    s6: smallint("s6"),
    v6: smallint("v6"),
    c6: smallint("c6"),
    x6: smallint("x6"),
    y6: smallint("y6"),
    h7: smallint("h7"),
    s7: smallint("s7"),
    v7: smallint("v7"),
    c7: smallint("c7"),
    x7: smallint("x7"),
    y7: smallint("y7"),
    creatorName: varchar("creator_name", { length: 24 }),
    commentText: varchar("comment_text", { length: 128 }),
  },
  (table) => {
    return {
      idIdx: uniqueIndex("skin_id_idx").on(table.skinId),
      skinCreatorIdIdx: index("skin_creator_id_idx").on(table.creatorId),
      skinSkinTypeIdIdx: index("skin_skin_type_id_idx").on(table.skinTypeId),
    };
  }
);
