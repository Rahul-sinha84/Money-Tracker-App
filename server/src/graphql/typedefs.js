import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getAllMonths(userId: ID!): allMonthsResult
    getAllExpenses(monthId: ID!): allExpensesResult
    getUser(userId: ID!): userResult
  }
  type User {
    _id: ID
    userId: String!
    savings: Float
    expenses: Float
    totalAmount: Float!
    cashPrice: Float
    totalExpenses: [ID]
  }
  type MonthExp {
    _id: ID
    totalAmount: Float
    amountSpent: Float
    amountSaved: Float
    currentAmount: Float
    gotMoneyOn: String
    currentMonth: String
    allExpenses: [ID]
    user: ID!
  }
  type Expenses {
    _id: ID
    title: String!
    expType: String!
    amount: Float!
    dateOfPurchase: String
    Note: String
    badChoice: Boolean
    month: ID!
  }
  type errMessage {
    msg: String
  }
  type MonthExpArray {
    allMonths: [MonthExp]
  }
  type ExpensesArray {
    allExpenses: [Expenses]
  }
  union expenseResult = errMessage | Expenses
  union userResult = errMessage | User
  union monthResult = errMessage | MonthExp
  union allMonthsResult = errMessage | MonthExpArray
  union allExpensesResult = errMessage | ExpensesArray
  type Mutation {
    createUser(
      userId: String!
      totalAmount: Float!
      cashPrice: Float
    ): userResult
    changeCash(
      userId: String!
      isIncremented: Boolean!
      cashAmount: Float!
    ): userResult
    removeUser(_id: ID!): userResult
    createMonth(
      user: ID!
      currentMonth: String!
      gotMoneyOn: String!
      totalAmount: Float!
    ): monthResult
    editMonth(_id: ID!, currentMonth: String, gotMoneyOn: String): monthResult
    removeMonth(_id: ID!): monthResult
    createExpense(
      title: String!
      expType: String!
      amount: Float!
      Note: String!
      badChoice: Boolean!
      month: ID!
      paidByCash: Boolean!
      dateOfPurchase: String
    ): expenseResult
    editExpense(
      _id: ID!
      title: String
      Note: String
      badChoice: Boolean
      dateOfPurchase: String
    ): expenseResult
    removeExpense(_id: ID!): expenseResult
  }
`;
