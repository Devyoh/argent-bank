import React from "react";
import './account.css'

const Account = ({ title, accountNumber, amount, description }) => {
  return (
    <div className="accountWrapper">
      <div className="accountContentWrapper">
        <p className="account-title">
          {title} ({accountNumber})
        </p>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-contentwrapper-button">
        <button className="transaction-button">View transactions</button>
      </div>
    </div>
  );
};

export default Account;
