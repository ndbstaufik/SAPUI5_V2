namespace datamodel;

using
{
    sap,
    cuid
}
from '@sap/cds/common';

entity Employees : cuid
{
    first_name : String(100) not null;
    last_name : String(100) not null;
    position : String(30) not null;
    Experience : Integer not null;
}
