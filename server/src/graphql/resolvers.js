import User from "../db/userSchema";
import Month from "../db/monthlyExpSchema";
import Expense from "../db/expensesSchema";
export const resolvers = {
  userResult: {
    __resolveType: (obj) => {
      if (obj.msg) {
        return "errMessage";
      }
      if (obj._id) {
        return "User";
      }
      return null;
    },
  },
  monthResult: {
    __resolveType: (obj) => {
      if (obj.msg) {
        return "errMessage";
      }
      if (obj._id) {
        return "MonthExp";
      }
      return null;
    },
  },
  expenseResult: {
    __resolveType: (obj) => {
      if (obj.msg) {
        return "errMessage";
      }
      if (obj._id) {
        return "Expenses";
      }
      return null;
    },
  },
  allMonthsResult: {
    __resolveType: (obj) => {
      if (obj.msg) {
        return "errMessage";
      }
      if (obj.allMonths) {
        console.log(obj);
        return "MonthExpArray";
      }
      return null;
    },
  },
  allExpensesResult: {
    __resolveType: (obj) => {
      if (obj.msg) {
        return "errMessage";
      }
      if (obj.allExpenses) {
        return "ExpensesArray";
      }
      return null;
    },
  },
  Query: {
    getAllMonths: (parent, { userId }) =>
      User.findById(userId)
        .then((response) => {
          var allMonths = [];
          response.totalExpenses.forEach((val) => {
            Month.findById(val)
              .then((currentMonth) => {
                allMonths.push(currentMonth);
              })
              .catch((err) => ({ msg: err.message }));
          });
          // this function was returning empty array as it returns
          //the value before execution of the above code
          const val = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({ allMonths });
            }, 1000);
          });
          return val.then((response) => response);
        })
        .catch((err) => ({ msg: err.message })),
    getAllExpenses: (parent, { monthId }) =>
      Month.findById(monthId)
        .then((response) => {
          var allExpenses = [];
          response.allExpenses.forEach((val) => {
            Expense.findById(val)
              .then((currentExpense) => {
                allExpenses.push(currentExpense);
              })
              .catch((err) => ({ msg: err.message }));
          });
          const val = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({ allExpenses });
            }, 1000);
          });
          return val.then((response) => response);
        })
        .catch((err) => ({ msg: error.msg })),
    getUser: (parent, { userId }) =>
      User.findOne({userId})
        .then((resolve) => {
            return resolve;
        })
        .catch((err) => ({ msg: err.message })),
  },
  Mutation: {
    createUser: (parent, { userId, totalAmount, cashPrice }) =>
      User.create({
        userId,
        totalAmount: totalAmount + cashPrice,
        savings: totalAmount + cashPrice,
        cashPrice,
      })
        .then((response) => response)
        .catch((err) => ({ msg: err.message })),
    changeCash: (parent, { userId, isIncremented, cashAmount }) =>
      User.findById(userId)
        .then((response) => {
          if (isIncremented) {
            response.cashPrice += cashAmount;
            response.savings += cashAmount;
            response.totalAmount += cashAmount;
          } else {
            response.cashPrice -= cashAmount;
            response.savings -= cashAmount;
            response.totalAmount -= cashAmount;
          }
          response.save();
          return response;
        })
        .catch((err) => ({ msg: err.message })),
    createMonth: (parent, { user, currentMonth, totalAmount, gotMoneyOn }) =>
      Month.create({
        user,
        currentMonth,
        totalAmount,
        gotMoneyOn,
      })
        .then((response) => {
          User.findById(user)
            .then((currentUser) => {
              currentUser.totalAmount += totalAmount;
              currentUser.savings = currentUser.totalAmount;
              currentUser.totalExpenses.push(response);
              currentUser.save();
            })
            .catch((err) => ({ msg: err.message }));
          response.currentAmount = totalAmount;
          response.amountSaved = totalAmount;
          response.save();
          return response;
        })
        .catch((err) => ({ msg: err.message })),
    createExpense: (
      parent,
      {
        title,
        expType,
        amount,
        Note,
        badChoice,
        month,
        paidByCash,
        dateOfPurchase,
      }
    ) =>
      Expense.create({
        title,
        expType,
        amount,
        Note,
        badChoice,
        month,
        dateOfPurchase,
        paidByCash,
      })
        .then((response) => {
          Month.findById(month)
            .then((currentMonth) => {
              console.log(currentMonth);
              if (!paidByCash) {
                if (expType === "credit") {
                  currentMonth.currentAmount += amount;
                  currentMonth.totalAmount += amount;
                } else {
                  currentMonth.currentAmount -= amount;
                  currentMonth.amountSpent += amount;
                }
                currentMonth.amountSaved =
                  currentMonth.totalAmount - currentMonth.amountSpent;
              }
              currentMonth.allExpenses.push(response);
              currentMonth.save();
              User.findById(currentMonth.user).then((currentUser) => {
                if (!paidByCash) {
                  if (expType === "credit") {
                    currentUser.savings += amount;
                    currentUser.totalAmount += amount;
                  } else {
                    currentUser.expenses += amount;
                    currentUser.savings -= amount;
                  }
                } else {
                  currentUser.cashPrice -= amount;
                  currentUser.expenses += amount;
                  currentUser.savings -= amount;
                }
                currentUser.save();
              });
            })
            .catch((err) => ({ msg: err.message }));
          return response;
        })
        .catch((err) => ({ msg: err.message })),
    removeMonth: async (parent, { _id }) =>
      Month.findByIdAndRemove(_id)
        .then(async (response) => {
          const currentUserId = response.user;
          var totalAmountDeleted = 0;
          await User.findById(currentUserId)
            .then(async (currentUser) => {
              currentUser.totalAmount -= response.totalAmount;
              currentUser.savings -= response.totalAmount;
              var monthInd;
              currentUser.totalExpenses.forEach((val, ind) => {
                if (val === _id) {
                  monthInd = ind;
                }
              });
              currentUser.totalExpenses.splice(monthInd, 1);
              await response.allExpenses.forEach((val) => {
                Expense.findById(val)
                  .then((currentExpense) => {
                    totalAmountDeleted += currentExpense.amount;
                    if (currentExpense.paidByCash) {
                      currentUser.cashPrice += currentExpense.amount;
                    }
                  })
                  .catch((err) => ({ msg: err.message }));
                Expense.findByIdAndRemove(val)
                  .then((response) => console.log("removed-expenses..."))
                  .catch((err) => ({ msg: err.message }));
              });
              //have to find an ethical way to solve this issue
              setTimeout(() => {
                console.log("totalAmountDeleted:", totalAmountDeleted);
                currentUser.expenses -= totalAmountDeleted;
                currentUser.savings += totalAmountDeleted;
                currentUser.save();
              }, 1000);
            })
            .catch((err) => ({ msg: err.message }));
          return response;
        })
        .catch((err) => ({ msg: err.message })),
    removeExpense: (parent, { _id }) =>
      Expense.findByIdAndRemove(_id)
        .then((response) => {
          const currentMonthId = response.month;
          const paidByCash = response.paidByCash;
          Month.findById(currentMonthId)
            .then((currentMonth) => {
              const currentUserId = currentMonth.user;
              User.findById(currentUserId)
                .then((currentUser) => {
                  currentUser.expenses -= response.amount;
                  currentUser.savings += response.amount;
                  if (paidByCash) {
                    currentUser.cashPrice += response.amount;
                  }
                  currentUser.save();
                })
                .catch((err) => ({ msg: err.message }));
              if (!paidByCash) {
                currentMonth.currentAmount += response.amount;
                currentMonth.amountSpent -= response.amount;
                currentMonth.amountSaved =
                  currentMonth.totalAmount - currentMonth.amountSpent;
              }
              var expenseId;
              currentMonth.allExpenses.forEach((val, ind) => {
                if (val === _id) {
                  expenseId = ind;
                }
              });
              currentMonth.allExpenses.splice(expenseId, 1);
              currentMonth.save();
            })
            .catch((err) => ({ msg: err.message }));
          return response;
        })
        .catch((err) => ({ msg: err.message })),
    removeUser: (parent, { _id }) =>
      User.findByIdAndRemove(_id)
        .then((response) => {
          response.totalExpenses.forEach((val) => {
            Month.findByIdAndRemove(val)
              .then((currentMonth) => {
                currentMonth.allExpenses.forEach((val) => {
                  Expense.findByIdAndRemove(val)
                    .then((currentExpense) => console.log("expense deleted"))
                    .catch((err) => ({ msg: err.message }));
                });
              })
              .catch((err) => ({ msg: err.message }));
          });
          return response;
        })
        .catch((err) => ({ msg: err.message })),
    editMonth: (parent, { _id, currentMonth, gotMoneyOn }) =>
      Month.findByIdAndUpdate(_id, { currentMonth, gotMoneyOn })
        .then((response) => response)
        .catch((err) => ({ msg: err.message })),
    editExpense: (parent, { _id, title, Note, badChoice, dateOfPurchase }) =>
      Expense.findByIdAndUpdate(_id, { title, Note, badChoice, dateOfPurchase })
        .then((response) => response)
        .catch((err) => ({ msg: err.message })),
  },
};
