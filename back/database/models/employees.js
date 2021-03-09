var mongoose =require("mongoose");

var employeeSchema = new mongoose.Schema({
    employeeID: Number,
    employeeName: String,
    employeeDesgn: String,
    employeeSalary: Number
});

var Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;