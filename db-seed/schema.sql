USE rrms;

CREATE TABLE accounts(
    AccountID INTEGER NOT NULL AUTO_INCREMENT,
    Account TEXT NULL,
    `Account Name` TEXT NULL,
    Address TEXT NULL,
    Address2 TEXT NULL,
    City TEXT NULL,
    State TEXT NULL,
    ZipCode INT NULL,
    County TEXT NULL,
    Township TEXT NULL,
    Phone TEXT NULL,
    `Site Type` TEXT NULL,
    `Online Date` TEXT NULL,
    `First Signal Date` TEXT NULL,
    LastSigDate TEXT NULL,
    `Offline Date` TEXT NULL,
    `OOS Cat` TEXT NULL,
    DeviceType TEXT NULL,
    `Site Group` TEXT NULL,
    `Site Group(s)` TEXT NULL,
    SiteGroupName TEXT NULL,
    DispatchType TEXT NULL,
    Permits TEXT NULL,
    PRIMARY KEY (AccountID)
);

CREATE TABLE issues(
    IssueID INTEGER NOT NULL AUTO_INCREMENT,
    Issue TEXT NOT NULL,
    PRIMARY KEY (IssueID)
);

CREATE TABLE queue(
    QueueID INTEGER NOT NULL AUTO_INCREMENT,
    Account TEXT NULL,
    `Account Name` TEXT NULL,
    Address TEXT NULL,
    Address2 TEXT NULL,
    City TEXT NULL,
    State TEXT NULL,
    ZipCode INT NULL,
    `Online Date` TEXT NULL,
    IssueID INTEGER NOT NULL,
    PRIMARY KEY (QueueID),
    FOREIGN KEY (IssueID) REFERENCES issues(IssueID)
);