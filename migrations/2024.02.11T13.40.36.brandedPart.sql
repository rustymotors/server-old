CREATE TABLE BrandedPart (
	BrandedPartID INTEGER NOT NULL,
	PartTypeID INTEGER NOT NULL,
	ModelID INTEGER NOT NULL,
	MfgDate TIMESTAMP NOT NULL,
	QtyAvail INTEGER NOT NULL,
	RetailPrice INTEGER NOT NULL,
	MaxItemWear SMALLINT,
	EngineBlockFamilyID INTEGER DEFAULT 0 NOT NULL,
	CONSTRAINT SYS_PK_11801 PRIMARY KEY (BrandedPartID),
	CONSTRAINT BRANDEDPART_MODELBRANDEDPART FOREIGN KEY (ModelID) REFERENCES Model(ModelID),
	CONSTRAINT BRANDEDPART_PARTTYPEBRANDEDPART1 FOREIGN KEY (PartTypeID) REFERENCES PartType(PartTypeID)
);
CREATE INDEX BRANDEDPART_ENGINEBLOCKFAMILYID ON BrandedPart (EngineBlockFamilyID);
CREATE INDEX SYS_IDX_BRANDEDPART_MODELBRANDEDPART_12255 ON BrandedPart (ModelID);
CREATE INDEX SYS_IDX_BRANDEDPART_PARTTYPEBRANDEDPART1_12269 ON BrandedPart (PartTypeID);
CREATE UNIQUE INDEX SYS_IDX_SYS_PK_11801_11802 ON BrandedPart (BrandedPartID);