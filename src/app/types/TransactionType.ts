export interface TransactionType {
  TRNTYPE: string;
  DTPOSTED: string;
  TRNAMT: string;
  FITID: string;
  REFNUM: string;
  MEMO: string;
}

export interface OFXResponse {
  OFX: {
    SIGNONMSGSRSV1: {
      SONRS: {
        STATUS: {
          CODE: string;
          SEVERITY: string;
        };
        DTSERVER: string;
        LANGUAGE: string;
        FI: {
          ORG: string;
          FID: string;
        };
      };
    };
    BANKMSGSRSV1: {
      STMTTRNRS: {
        TRNUID: string;
        STATUS: {
          CODE: string;
          SEVERITY: string;
        };
        STMTRS: {
          CURDEF: string;
          BANKACCTFROM: {
            BANKID: string;
            ACCTID: string;
            ACCTTYPE: string;
          };
          BANKTRANLIST: {
            DTSTART: string;
            DTEND: string;
            STMTTRN: Array<{
              TRNTYPE: string;
              DTPOSTED: string;
              TRNAMT: string;
              FITID: string;
              REFNUM: string;
              MEMO: string;
            }>;
          };
          LEDGERBAL: {
            BALAMT: string;
            DTASOF: string;
          };
        };
      };
    };
  };
  header: {
    "Content-Disposition": string;
    "Content-Type": string;
    OFXHEADER: string;
    DATA: string;
    VERSION: string;
    SECURITY: string;
    ENCODING: string;
    CHARSET: string;
    COMPRESSION: string;
    OLDFILEUID: string;
    NEWFILEUID: string;
  };
}

export interface FIType {

  ORG: string;
  FID: string;

}
