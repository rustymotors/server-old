import { integer, smallint } from "drizzle-orm/pg-core";

import { pgSchema } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("mcos");

export const tunables = mySchema.table("tunables", {
  clubCreationFee: integer("club_creation_fee").notNull(),
  clubCreationMinimumLevel: integer("club_creation_minimum_level").notNull(),
  clubOfficerMinimumLevel: integer("club_officer_minimum_level").notNull(),
  racePPDefeatedOpponent: integer("race_pp_defeated_opponent").notNull(),
  racePPPlaceLost: integer("race_pp_place_lost").notNull(),
  racePenaltyPerRank: integer("race_penalty_per_rank").notNull(),
  raceBonusPerRank: integer("race_bonus_per_rank").notNull(),
  raceBonusPerMileSponsored: integer("race_bonus_per_mile_sponsored").notNull(),
  raceBonusPerMileOpen: integer("race_bonus_per_mile_open").notNull(),
  levelsTunelog: integer("levels_tunelog").notNull(),
  levelsSlope: integer("levels_slope").notNull(),
  levelsOffset: integer("levels_offset").notNull(),
  maxEZStreetLevel: integer("max_ez_street_level").notNull(),
  clubWaitPeriodBetweenClubs: integer(
    "club_wait_period_between_clubs"
  ).notNull(),
  turfwarCaptionBonus: integer("turfwar_caption_bonus").notNull(),
  turfwarMemberBonus: integer("turfwar_member_bonus").notNull(),
  topDogBonus: integer("top_dog_bonus").notNull(),
  rankAdvancementBonus: integer("rank_advancement_bonus").notNull(),
  ttCashRewardFirst: integer("tt_cash_reward_first").notNull(),
  ttCashRewardSecond: integer("tt_cash_reward_second").notNull(),
  ttCashRewardThird: integer("tt_cash_reward_third").notNull(),
  ttPointsRewardFirst: integer("tt_points_reward_first").notNull(),
  ttPointsRewardSecond: integer("tt_points_reward_second").notNull(),
  ttPointsRewardThird: integer("tt_points_reward_third").notNull(),
  universalRepairCostModifier: integer(
    "universal_repair_cost_modifier"
  ).notNull(),
  universalScrapValueModifier: integer(
    "universal_scrap_value_modifier"
  ).notNull(),
  adCost1Day: integer("ad_cost_1_day").notNull(),
  adCost2Days: integer("ad_cost_2_days").notNull(),
  adCost3Days: integer("ad_cost_3_days").notNull(),
  adCost4Days: integer("ad_cost_4_days").notNull(),
  adCost5Days: integer("ad_cost_5_days").notNull(),
  adCost6Days: integer("ad_cost_6_days").notNull(),
  adCost7Days: integer("ad_cost_7_days").notNull(),
  tradeInModifier: integer("trade_in_modifier").notNull(),
  simStreetMaxWager: integer("sim_street_max_wager").notNull(),
  pointAward1stPlace: integer("point_award_1st_place").notNull(),
  pointAward2ndPlace: integer("point_award_2nd_place").notNull(),
  pointAward3rdPlace: integer("point_award_3rd_place").notNull(),
  pointAward4thPlace: integer("point_award_4th_place").notNull(),
  pointAward5thPlace: integer("point_award_5th_place").notNull(),
  pointAward6thPlace: integer("point_award_6th_place").notNull(),
  arcadeRacePointModifier: integer("arcade_race_point_modifier").notNull(),
  mcotsPoolingFrequency: integer("mcots_pooling_frequency").notNull(),
  starterCash: integer("starter_cash").notNull(),
  enableChearEmails: smallint("enable_chear_emails").notNull(),
  salaryPerLevel: integer("salary_per_level").notNull(),
  clubMaxMembers: integer("club_max_members").notNull(),
  clubRegistrationFee: integer("club_registration_fee").notNull(),
  clubReRegistrationFee: integer("club_reregistration_fee").notNull(),
  classifiedAdBillRate: integer("classified_ad_bill_rate").notNull(),
  classifiedAdMaxDays: integer("classified_ad_max_days").notNull(),
  classifiedAdMaxSize: integer("classified_ad_max_size").notNull(),
  classifiedAdMaxPerPersona: integer("classified_ad_max_per_persona").notNull(),
  papAwardPercentage: integer("pap_award_percentage").notNull(),
  dealOfTheDayBrandedPartId: integer(
    "deal_of_the_day_branded_part_id"
  ).notNull(),
  dealOfTheDayDiscount: integer("deal_of_the_day_discount").notNull(),
});
