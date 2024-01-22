import PostgresDriver from '../../database/drivers/PostgresDriver.js';

class Customer extends PostgresDriver {
    constructor() {
      super();
      this.table = 'customers';
      this.filterable = ['id', 'name', 'email', 'phone']
      this.fillable = ['name', 'email', 'phone', 'coordinate_x', 'coordinate_y']
    }
}
  
export default Customer;