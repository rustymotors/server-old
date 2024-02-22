CREATE TABLE AbstractPartType (
	AbstractPartTypeID INTEGER NOT NULL,
	ParentAbstractPartTypeID INTEGER,
	DependsOn INTEGER,
	PartFilename VARCHAR(20),
	EAPT VARCHAR(100) NOT NULL,
	GAPT VARCHAR(100),
	FAFT VARCHAR(100),
	SAFT VARCHAR(100),
	IAFT VARCHAR(100),
	JAFT VARCHAR(100),
	SWAFT VARCHAR(100),
	BAFT VARCHAR(100),
	ModifiedRule INTEGER DEFAULT 0,
	EUT TEXT,
	GUT TEXT,
	FUT TEXT,
	SUT TEXT,
	IUT TEXT,
	JUT TEXT,
	SWUT TEXT,
	BUT TEXT,
	PartPaired INTEGER DEFAULT 0,
	SchematicPicname1 VARCHAR(9),
	SchematicPicname2 VARCHAR(9),
	BlockFamilyCompatibility INTEGER DEFAULT 0,
	RepairCostModifier NUMERIC(100,7) DEFAULT 0,
	ScrapValueModifier NUMERIC(100,7) DEFAULT 0,
	GarageCategory INTEGER DEFAULT 0,
	CONSTRAINT SYS_PK_11740 PRIMARY KEY (AbstractPartTypeID),
	CONSTRAINT ABSTRACTPARTTYPE_R_191 FOREIGN KEY (DependsOn) REFERENCES AbstractPartType(AbstractPartTypeID),
	CONSTRAINT ABSTRACTPARTTYPE_R2 FOREIGN KEY (ParentAbstractPartTypeID) REFERENCES AbstractPartType(AbstractPartTypeID)
);
CREATE INDEX SYS_IDX_ABSTRACTPARTTYPE_R_191_15170 ON AbstractPartType (DependsOn);
CREATE INDEX SYS_IDX_ABSTRACTPARTTYPE_R2_15181 ON AbstractPartType (ParentAbstractPartTypeID);
CREATE UNIQUE INDEX SYS_IDX_SYS_PK_11740_11741 ON AbstractPartType (AbstractPartTypeID);