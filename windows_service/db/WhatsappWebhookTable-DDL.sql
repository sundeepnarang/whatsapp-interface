-- DNN.dbo.SOS_WhatsappWebhookRequests definition

-- Drop table

-- DROP TABLE DNN.dbo.SOS_WhatsappWebhookRequests;

CREATE TABLE DNN.dbo.SOS_WhatsappWebhookRequests (
    WAWebhookRequestID int IDENTITY(1,1) NOT NULL,
    FromApplicationName nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    SenderName nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    SenderWAId nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    MessageType  nvarchar(20)  COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    MessageText  nvarchar(1024)  COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    APIResponse nvarchar(1024) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    CreatedOn datetime NULL,
    CONSTRAINT PK_SOS_WAWebhookRequestID PRIMARY KEY (WAWebhookRequestID),
);