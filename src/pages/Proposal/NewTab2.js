import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

export default class EditableTable2 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'รายละเอียด',
        dataIndex: 'Detail',
        width: '30%',
        editable: true,
      },
      {
        title: 'งบประมาณ (บาท)',
        dataIndex: 'Budget',
        editable: true,
        render: () => <input types="text" defaultValue="0" />,
      },
      {
        title: 'ยอดใช้จ่าย',
        dataIndex: 'Cost',
        editable: true,
      },
      {
        title: 'หมายเหตุ',
        dataIndex: 'Ref',
        editable: true,
        render: () => <input type="text" />,
      },
    ];

    this.state = {
      dataSource: [
        {
          Detail: '1.เงินสดรวมมูลค่า',
          Budget: '',
          Cost: '',
          Ref: '',
        },
        {
          Detail: '2.สินค้ารวมมูลค่า',
          Budget: '',
          Cost: '',
          Ref: '',
        },
        {
          Detail: '2.1.สินค้าเบียร์',
          Budget: '',
          Cost: '',
          Ref: '',
        },
        {
          Detail: '2.2.สินค้าโซดา',
          Budget: '',
          Cost: '',
          Ref: '',
        },
        {
          Detail: '2.3.สินค้าน้ำ',
          Budget: '',
          Cost: '',
          Ref: '',
        },
        {
          Detail: '2.4.ข้าว',
          Budget: '',
          Cost: '',
          Ref: '',
        },
        {
          Detail: '2.5.อื่นๆ',
          Budget: '',
          Cost: '',
          Ref: '',
        },
        {
          Detail: '3.สื่อพิเศษตกแต่งร้าน รวมมูลค่า',
          Budget: '',
          Cost: '',
          Ref: '',
        },
        {
          Detail: '4.กิจกรรม (Event Concert) รวมมูลค่า',
          Budget: '',
          Cost: '',
          Ref: '',
        },
        {
          Detail: '5.ค่าขนส่ง',
          Budget: '',
          Cost: '',
          Ref: '',
        },
      ],
      // count: 2,
    };
  }

  render() {
    const { dataSource } = this.state;

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
