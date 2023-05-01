import React, { useEffect, useState } from 'react';
import { Button, Card, Select } from 'antd';
import { Checkbox, Form, Input } from 'antd';
import Item from 'antd/es/list/Item';
import { BsCurrencyBitcoin } from 'react-icons/bs';

function Converter1() {
  const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';
  const [cryptolist, setCrytolist] = useState([]);
  const [inputValue, setinputvalue] = useState('0');
  const [firstSelect, setfirstselect] = useState('Bitcoin');
  const [secondSelect, setsecondselect] = useState('Ether');
  const [result, setresult] = useState('0');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const data = jsonData.rates;
    const tempArray = [];
    for (const [key, value] of Object.entries(data)) {
      const tempObj = {
        value: value.name,
        label: value.name,
        rate: value.value,
      };
      tempArray.push(tempObj);
    }
    setCrytolist(tempArray);
  }

  useEffect(() => {
    if (cryptolist.length === 0) {
      return;
    }
    const firstSelectRate = cryptolist.find((item) => {
      return item.value === firstSelect;
    }).rate;

    const secondSelectRate = cryptolist.find((item) => {
      return item.value === secondSelect;
    }).rate;

    const resultvalue = (inputValue * secondSelectRate) / firstSelectRate;
    setresult(resultvalue);
  }, [inputValue, firstSelect, secondSelect]);


  return (
    <div className="container" style={{ backgroundColor: "#00CED1", padding: "20px" }}>
      <Card className="crypto-card" title={<h1><BsCurrencyBitcoin />Cryto converter</h1>} style={{ width: "500px", margin: "0 auto" }}>
        <Form>
          <Form.Item>
            <input
              onChange={(event) => setinputvalue(event.target.value)}
              style={{ width: '350px' }}
            />
          </Form.Item>
        </Form>
        <div className="select-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Select
            style={{ width: '120px' }}
            defaultValue="Bitcoin"
            options={cryptolist}
            onChange={(value) => setfirstselect(value)}
          />
          <Select
            style={{ width: '120px' }}
            defaultValue="Ether"
            options={cryptolist}
            onChange={(value) => setsecondselect(value)}
          />
        </div>
        <p style={{ fontSize: "18px", marginTop: "10px" }}>{inputValue} {firstSelect} = {result} {secondSelect}</p>
      </Card>
    </div>
  );
}

export default Converter1;
