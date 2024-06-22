CREATE TABLE PartType (
	PartTypeID INTEGER NOT NULL,
	AbstractPartTypeID INTEGER NOT NULL,
	PartType VARCHAR(100) NOT NULL,
	PartFilename VARCHAR(20),
	PartGradeID INTEGER,
	CONSTRAINT SYS_PK_11991 PRIMARY KEY (PartTypeID),
	CONSTRAINT PARTTYPE_ABSTRACTPARTTYPEPARTTYPE FOREIGN KEY (AbstractPartTypeID) REFERENCES AbstractPartType(AbstractPartTypeID),
	CONSTRAINT PARTTYPE_PARTGRADEPARTTYPE FOREIGN KEY (PartGradeID) REFERENCES PartGrade(PartGradeID)
);
CREATE INDEX SYS_IDX_PARTTYPE_ABSTRACTPARTTYPEPARTTYPE_12453 ON PartType (AbstractPartTypeID);
CREATE INDEX SYS_IDX_PARTTYPE_PARTGRADEPARTTYPE_12463 ON PartType (PartGradeID);
CREATE UNIQUE INDEX SYS_IDX_SYS_PK_11991_11992 ON PartType (PartTypeID);
