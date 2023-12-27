namespace datamodel;

using
{
    sap,
    cuid
}
from '@sap/cds/common';

entity Employees
{
    key ID : UUID @odata.Type:'Edm.String';
    first_name : String(100) not null;
    last_name : String(100) not null;
    position : String(30) not null;
    Experience : Integer64 not null;
}
