-- DNN.dbo.SOS_WhatsappNotificationRequests definition

-- Drop table

-- DROP TABLE DNN.dbo.SOS_WhatsappNotificationRequests;

CREATE TABLE DNN.dbo.SOS_WhatsappNotificationRequests (
    WANotificationRequestID int IDENTITY(1,1) NOT NULL,
    FromApplicationName nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    RecipientNumber nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    TemplateName nvarchar(512) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    TemplateVars nvarchar(1024) NOT NULL,
    APIReturnMessage nvarchar(1024) NULL,
    WAMessageId nvarchar(255) NULL,
    WAMessageStatus nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'sent' NOT NULL,
    RequestStatus nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'SENT' NOT NULL,
    CreatedOn datetime DEFAULT GET_DATE() NOT NULL,
    SendBy datetime DEFAULT GET_DATE() NOT NULL,
    SentOn datetime DEFAULT GET_DATE() NOT NULL,
    CONSTRAINT PK_SOS_WANotificationRequestID PRIMARY KEY (WANotificationRequestID)
);
