import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import Transactions from '../../../components/Transactions';

it("should initialize without crashing", () => {
    const component = renderer.create(<Transactions />);
});

it("should initialize without crashing", () => {
    const component = renderer.create(<Transactions />);
    let transactions = component.toJSON();
    expect(transactions).toMatchSnapshot();
});

it("should initialize with expect text", () => {
    const expectText = "<Table />Total Balance for this page is: 0Number of transactions is: 0";
    const component = shallow(<Transactions />);
    let transactions = component.text();
    expect(transactions).toEqual(expectText);
});

it("should have method with name initColumns", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().initColumns.name).toBe("initColumns");
});

it("should return default columns", () => {
    const component = shallow(<Transactions />),
    expectColumns = [
        {
            title: 'Company',
            dataIndex: 'Company',
            key: 'Company',
            width: 400
        }, {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
            width: 100
        }, {
            title: 'Ledger',
            dataIndex: 'Ledger',
            key: 'Ledger',
            width: 400,
            render: (text) => (
                <a href="#Ledger">{text}</a>
            ),
            onCellClick: (record) => {
                this.renderSpecificCategory(record.Ledger);
            },
        }, {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
            width: 200,
            render: (text) => (
                <a href="#Date">{text}</a>
            ),
            onCellClick: (record) => {
                this.renderSpecificDate(record.Date);
            }
        }, {
            title: 'Apeartions',
            dataIndex: '',
            key: 'opeartions',
            render: () => <a href="#">Delete</a>
        }
    ], actualColumn = component.instance().columns;
    expect(actualColumn === expectColumns);
});

it("should have method with name loadDefaultTransactionData", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().loadDefaultTransactionData.name).toBe("loadDefaultTransactionData");
});

it("should have method with name getTotalBalance", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().getTotalBalance.name).toBe("getTotalBalance");
});

it("should call getTotalBalance with 0 balance data", () => {
    const component = shallow(<Transactions />),
          actualResult = component.instance().getTotalBalance([1,2,3]);
    expect(actualResult === 6);
});

it("should have method with name setTransactionData", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().setTransactionData.name).toBe("setTransactionData");
});

it("should have method with name beautifyTransactionData", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().beautifyTransactionData.name).toBe("beautifyTransactionData");
});

it("should call beautifyTransactionData with two companies names", () => {
    const component = shallow(<Transactions />),
          expectResult = ["Company": "Box", "Company": "ABC"],
          actualResult = component.instance().beautifyTransactionData(
            [{"Company": "Box xxxxxx#63245"},{"Company": "xxxxxxx12389. ABC"}]);
    expect(actualResult === expectResult);
});

it("should have method with name getCleanVenderName", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().getCleanVenderName.name).toBe("getCleanVenderName");
});

it("should have method with name getTransactionWithoutDuplicates", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().getTransactionWithoutDuplicates.name).toBe("getTransactionWithoutDuplicates");
});

it("should call getTransactionWithoutDuplicates to remove duplicate objects", () => {
    const component = shallow(<Transactions />),
          input = [{"Company": "Bench", "Ledger": "Travel", "Amount": "-10.00", "Date": "2013-12-03"},
                   {"Company": "Bench", "Ledger": "Travel", "Amount": "-10.00", "Date": "2013-12-03"},
                   {"Company": "ABC", "Ledger": "Travel", "Amount": "-10.00", "Date": "2013-12-04"}],
          expectResult = [{"Company": "ABC", "Ledger": "Travel", "Amount": "-10.00", "Date": "2013-12-04"}],
          actual = component.instance().getTransactionWithoutDuplicates(input);
    expect(actual === expectResult);
});

it("should have method with name renderSpecificCategory", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().renderSpecificCategory.name).toBe("renderSpecificCategory");
});

it("should have method with name getSpecificCategoryTxnDataByLedger", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().getSpecificCategoryTxnDataByLedger.name).toBe("getSpecificCategoryTxnDataByLedger");
});

it("should call getSpecificCategoryTxnDataByLedger with Travel category", () => {
    const component = shallow(<Transactions />),
          input = [{"Company": "Bench", "Ledger": "Office", "Amount": "-10.00", "Date": "2013-12-03"},
                   {"Company": "Bench", "Ledger": "Office", "Amount": "-10.00", "Date": "2013-12-04"},
                   {"Company": "ABC", "Ledger": "Travel", "Amount": "-10.00", "Date": "2013-12-04"}],
          expectResult = [{"Company": "ABC", "Ledger": "Travel", "Amount": "-10.00", "Date": "2013-12-04"}],
          actual = component.instance().getSpecificCategoryTxnDataByLedger("Travel", input);
    expect(actual === expectResult);
});

it("should have method with name renderSpecificDate", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().renderSpecificDate.name).toBe("renderSpecificDate");
});

it("should have method with name getSpecificCategoryTxnDataByDate", () => {
    const component = shallow(<Transactions />);
    expect(component.instance().getSpecificCategoryTxnDataByDate.name).toBe("getSpecificCategoryTxnDataByDate");
});

it("should call getSpecificCategoryTxnDataByDate with 2013-12-04 only", () => {
    const component = shallow(<Transactions />),
          input = [{"Company": "Bench", "Ledger": "Office", "Amount": "-10.00", "Date": "2013-12-03"},
                   {"Company": "Bench", "Ledger": "Office", "Amount": "-10.00", "Date": "2013-12-04"},
                   {"Company": "ABC", "Ledger": "Travel", "Amount": "-10.00", "Date": "2013-12-04"}],
          expectResult = [{"Company": "ABC", "Ledger": "Travel", "Amount": "-10.00", "Date": "2013-12-04"}],
          actual = component.instance().getSpecificCategoryTxnDataByDate("2013-12-04", input);
    expect(actual === expectResult);
});
