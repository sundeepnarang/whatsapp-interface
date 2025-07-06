-- DNN.dbo.SOS_WhatsappWebhookRequests definition

-- Drop table

-- DROP TABLE DNN.dbo.SOS_WhatsappWebhookRequests;

CREATE TABLE DNN.dbo.SOS_WhatsappWebhookRequests (
    WAWebhookRequestID int IDENTITY(1,1) NOT NULL,
    FromApplicationName nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    SenderWAId nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    MessageType nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    MessageText nvarchar(1024) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    APIResponse nvarchar(1024) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    CreatedOn datetime DEFAULT getdate() NOT NULL,
    CONSTRAINT PK_SOS_WhatsappWebhookRequests PRIMARY KEY (WAWebhookRequestID)
);

