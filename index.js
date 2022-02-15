function createEmployeeRecord(employeeArr) {
    const employeeObj = {}
    employeeObj.firstName = employeeArr[0]
    employeeObj.familyName = employeeArr[1]
    employeeObj.title = employeeArr[2]
    employeeObj.payPerHour = employeeArr[3]
    employeeObj.timeInEvents = []
    employeeObj.timeOutEvents = []

    return employeeObj
}

function createEmployeeRecords(arrayOfArrays) {
    const arrayOFEmployeeObjects = arrayOfArrays.map(createEmployeeRecord)
    return arrayOFEmployeeObjects
}

function createTimeInEvent(dateStamp) {
    const time = dateStamp.split(" ")[1]
    this.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(time),
            date: dateStamp.split(" ")[0]
        }
    )

    return this
}

function createTimeOutEvent(dateStamp) {
    const time = dateStamp.split(" ")[1]
    this.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(time),
            date: dateStamp.split(" ")[0]
        }
    )

    return this
}

function hoursWorkedOnDate(dateStamp) {
   const punchIn = this.timeInEvents.find(event => event.date === dateStamp).hour
   const punchOut = this.timeOutEvents.find(event => event.date === dateStamp).hour

   return (punchOut - punchIn)/100
}

function wagesEarnedOnDate(dateStamp) {
   return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp)
}

// function allWagesFor() {
//     const allDates = this.timeInEvents.map(event => event.date)
//     console.log(allDates)
//     //wagesEarnedOnDate.call(allDates)
// }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(record => record.firstName === firstNameString)
}

// function calculatePayroll(collection) {
//     console.log(collection)
//    console.log(allWagesFor.call(this, collection))
// }

function calculatePayroll(collection) {
    const payRoll = collection.map(employee => allWagesFor.call(employee))
    return payRoll.reduce((a,b) => a+b)
 }