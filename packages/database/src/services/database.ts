import atdb from "@databases/pg";
import { sql } from "@databases/pg";
import tables from "@databases/pg-typed";
import type DatabaseSchemaType from "../__generated__/index.js";
const DatabaseSchema = await import("../__generated__/schema.json");

export { sql };

const createConnectionPool = atdb.default;
const defineTables = tables.default;

export const db = createConnectionPool({
	connectionString: process.env["DATABASE_URL"],
	bigIntMode: "bigint",
});

// You can list whatever tables you actually have here:
export const {
	abstract_part_type: AbstractPartTypeSchema,
	attachment_point: AttachmentPointSchema,
	brand: BrandSchema,
	branded_part: BrandedPartSchema,
	driver_class: DriverClassSchema,
	model: ModelSchema,
	part: PartSchema,
	part_grade: PartGradeSchema,
	part_type: PartTypeSchema,
	player: PlayerSchema,
	player_type: PlayerTypeSchema,
	pt_skin: PlayerTypeSkinSchema,
	skin_type: SkinTypeSchema,
	stock_assembly: StockAssemblySchema,
	stock_vehicle_attributes: StockVehicleAttributesSchema,
	sva_car_class: StockVehicleAttributesCarClassSchema,
	sva_mode_restriction: StockVehicleAttributesModeRestrictionSchema,
	vehicle: VehicleSchema,
	warehouse: WarehouseSchema,
	login: LoginSchema,
	profile: ProfileSchema,
} = defineTables<DatabaseSchemaType>({
	databaseSchema: DatabaseSchema.default,
});
export type { DatabaseSchema };
