import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    avg1m: 0,
    budget: 0,
    product: 'รายรับรวม',
    before: 0,
    current: 0,
  },
  {
    key: '2',
    avg1m: 0,
    budget: 0,
    product: 'ต้นทุนส่งเสริมการขาย',
    before: 0,
    current: 0,
  },
  {
    key: '3',
    avg1m: 0,
    budget: 0,
    product: 'สัดส่วนต (%)ต่อยอดขาย',
    before: 0,
    current: 0,
  },
  {
    key: '4',
    avg1m: 0,
    budget: 0,
    product: 'กำไรสุทธิ',
    before: 0,
    current: 0,
  },
  {
    key: '5',
    avg1m: 0,
    budget: 0,
    product: 'สัดส่วน (%) ต่อยอดขาย',
    before: 0,
    current: 0,
  },
];

export default class NewTab extends React.Component {
  render() {
    return (
      <Table dataSource={data} bordered>
        <Column title="ผลิตภัณฑ์" dataIndex="product" key="product" width="30%" />
        <ColumnGroup title="ประมาณการยอดขาย">
          <Column title="เฉลี่ย 1 เดือน" dataIndex="avg1m" key="avg1m" />
          <Column title="ประมาณการ" dataIndex="budget" key="budget" />
        </ColumnGroup>
        <ColumnGroup title="ยอดขายที่เกิดขึ้นจริง">
          <Column title="ก่อนหน้า" dataIndex="before" key="before" />
          <Column title="ปีปัจจุบัน" dataIndex="current" key="current" />
        </ColumnGroup>
      </Table>
    );
  }
}
