using datamodel from '../db/dbmodel';

service CatalogService {

    entity Employees as projection on datamodel.Employees;

}