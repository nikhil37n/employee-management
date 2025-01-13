export interface Employee {
  // Type for dynamic access to specific properties
  [key: string]: any;
  manager: string;
  empId: number;
  empName: string;
  designation: string;
  email: string;
  phone: number;
}

export interface EmployeeModel {
  list: Employee[];
  employeeobj: Employee;
  errormessage: string;
}
