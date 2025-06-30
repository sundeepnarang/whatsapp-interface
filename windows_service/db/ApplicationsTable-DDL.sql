-- DNN.dbo.SOS_WHATSAPP_APPLICATION_CREDS definition

-- Drop table

-- DROP TABLE DNN.dbo.SOS_WHATSAPP_APPLICATION_CREDS;

CREATE TABLE DNN.dbo.SOS_Whatsapp_Application_Creds (
    WhatsappApplicationID int IDENTITY(1,1) NOT NULL,
    AppName nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    Token nvarchar(300) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    PhoneNumber nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    CONSTRAINT PK_SOS_Whatsapp_Application_Creds PRIMARY KEY (WhatsappApplicationID)
);
