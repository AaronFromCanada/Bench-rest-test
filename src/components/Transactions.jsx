import React, {Component} from 'react';
import Table from "rc-table";
import TransactionServices from "../services/TransactionServices";

const data = [
    {
        Company: 'Little Leaf Baby',
        Amount: 28,
        Ledger: 'some where',
        Date: "2013-02-13",
        key: '1'
    }
];

export default class Transactions extends Component {

    constructor() {
        super();
        this.transactionServices = new TransactionServices();
        this.initColumns();
    }

    componentDidMount() {
        // eslint-disable-next-line
        ["1","2","3","4"].map((item)=> {
            this.loadDefaultTransactionData(item);
        });
    }

    initColumns() {
        this.columns = [
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
            }
        ];
    }

    loadDefaultTransactionData(pageNumber) {
        this.transactionServices.getTransactionsByPage(pageNumber)
          .then((response) => {
              if(response && response.status === 200) {
                  this.setTransactionData(response.data);
                  return response.status;
              } else if (response && response.status !== 200) {
                  return response.status;
              } else {
                  return "Response is undefined";
              }
          });
    }

    getTotalBalance(data) {
        let totalBalance = 0;
        if(data) {
            totalBalance = data.reduce((previous, current) =>
                parseFloat(previous) + parseFloat(current.Amount), 0)
        }
        return totalBalance.toFixed(2);
    }

    setTransactionData(data) {
        if(data && data.transactions) {
            data.transactions = this.beautifyTransactionData(data.transactions);
            // eslint-disable-next-line
            if(this.state && this.state.transactionData) {
                // eslint-disable-next-line
                this.state.transactionData =
                    this.state.transactionData.concat(data.transactions);
                // eslint-disable-next-line
                this.state.transactionData =
                    this.getTransactionWithoutDuplicates(this.state.transactionData);
                this.setState({transactionData: this.state.transactionData});
            } else {
                data.transactions = this.getTransactionWithoutDuplicates(data.transactions);
                this.setState({transactionData: data.transactions});
            }
        }
    }

    beautifyTransactionData(transactionData) {
        if(transactionData && Array.isArray(transactionData)) {
            transactionData.forEach((item) => {
                item.Company = this.getCleanVenderName(item.Company);
            });
        }
        return transactionData;
    }

    getCleanVenderName(name) {
        let result = "";
        if (name && typeof name === "string") {
            result = name.replace(/#|\d.|[x+]|[@]|USD/g, "").replace(/ +/g, " ");
        }
        return result;
    }

    getTransactionWithoutDuplicates(transactionData) {
        if(Array.isArray(transactionData)) {
            transactionData = transactionData.filter((item, index, self) => {
                return self.findIndex((innerItem) => {
                    return innerItem.Company === item.Company &&
                           innerItem.Ledger === item.Ledger &&
                           innerItem.Amount === item.Amount &&
                           innerItem.Date === item.Date;
                }) === index;
            });
        }
        return transactionData;
    }

    //List transaction by Category
    renderSpecificCategory(category) {
        if (this.state && this.state.transactionData) {
            this.setState({transactionData:
              this.getSpecificCategoryTxnDataByLedger(category, this.state.transactionData)});
        }
    }

    getSpecificCategoryTxnDataByLedger(category, transactionData) {
        if(Array.isArray(transactionData)) {
            transactionData = transactionData.filter((item) => item.Ledger === category);
        }
        return transactionData;
    }

    //List transaction by Date
    renderSpecificDate(date) {
        if (this.state && this.state.transactionData) {
            this.setState({transactionData:
              this.getSpecificCategoryTxnDataByDate(date, this.state.transactionData)});
        }
    }

    getSpecificCategoryTxnDataByDate(date, transactionData) {
        if(Array.isArray(transactionData)) {
            transactionData = transactionData.filter((item) => item.Date === date);
        }
        return transactionData;
    }

    render() {
        const totalBalance = this.state && this.state.transactionData ?
                this.getTotalBalance(this.state.transactionData) : 0,
              numberOfTransaction = this.state && this.state.transactionData ?
                this.state.transactionData.length : 0;
        return (
          <div>
            <Table columns={this.columns}
                   data={this.state && this.state.transactionData ?
                          this.state.transactionData : data.transaction}/>
            <p>Total Balance for this page is: {totalBalance}</p>
            <p>Number of transactions is: {numberOfTransaction}</p>
          </div>
        );
    }
}
