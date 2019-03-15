import React, { PureComponent } from 'react';
import {
  Card,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  Input,
  Select,
  Popover,
  Checkbox,
  Collapse,
  Steps,
  // Table,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import TableForm from './TableForm2';
import styles from './style2.less';

import Tables from './Tables';
import Tables2 from './Tables2';
import Uploads from './Uploads';

// import Axios
import axios from 'axios';

const Panel = Collapse.Panel;
const { TextArea } = Input;
const { Option } = Select;

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const Step = Steps.Step;


function callback(key) {
  console.log(key);
}

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

// function onChange2(e) {
//   console.log(`checked = ${e.target.checked}`);
// }


const fieldLabels = {
  DatePicker: 'วันที่',

  Unit: 'หน่วยงาน',
  Center: 'ศูนย์ต้นทุน',
  Budget: 'การคุมงบ',
  Perman: 'จำนวนกิจกรรมต่อคน',
  Per: 'ต่อ',
  Status: 'สถานะ',
  Total: 'รวม',
  DocID: 'เลขที่เอกสาร',
  YearPicker: 'ปี',
  CoProduct: 'ผลิตภัณฑ์ร่วมรายการ',
  Applicant: 'ผู้ขออนุมัติ',
  Activitie: 'กิจกรรม',
  Plan: 'แผนงาน',
  Subplan: 'แผนงานย่อย',
  Agent: 'ตัวแทนจำหน่าย',
  List: 'รายการ',
  Category: 'ประเภทรายการ',
  Range: 'ระยะเวลาของรายการ',
  To: 'ถึง',
  Method: 'วิธีการ',
};

// const tableData = [
//   {
//   key: '1',
//   workId: '00001',
//   name: 'John Brown',
//   department: 'New York No. 1 Lake Park',
// },
// {
//   key: '2',
//   workId: '00002',
//   name: 'Jim Green',
//   department: 'London No. 1 Lake Park',
// },
// {
//   key: '3',
//   workId: '00003',
//   name: 'Joe Black',
//   department: 'Sidney No. 1 Lake Park',
//   },
// ];

// @connect(({ loading }) => ({
//   submitting: loading.effects['form/submitNewjob'],
// }))
@Form.create()
class Newjob extends PureComponent {
  state = {
    width: '100%',
    person:[],
  };
 

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
    // Test Axios
    axios.get('https://digitalsignature.herokuapp.com/api/Values')
  .then(function (response) {
    // handle success
    console.log(`aa`,response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  // End Axios
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'form/submitNewjob',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { width } = this.state;

  
    return (
      
      
      <PageHeaderWrapper
        title="สร้างแผนงาน"
        // content="รายละเอียด"
        wrapperClassName={styles.Newjob}
      >
        <Card>
          <Steps>
            <Step status="finish" title="User" icon={<Icon type="user" />} />
            <Step status="finish" title="Approver" icon={<Icon type="solution" />} />
            <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
          </Steps>
        </Card>
        <Collapse defaultActiveKey={['1']} onChange={callback} style={{ marginBottom: 20 }}>
          <Panel key="1" header="รายละเอียด">
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.DocID}>
                    {getFieldDecorator('DocID', {
                      rules: [{ required: true, message: 'เลขที่เอกสาร' }],
                    })(<Input placeholder="" name="DocID" disabled/>)}
                  </Form.Item>
                </Col>
              </Row>
              {/* -------1-------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.DatePicker}>
                    {getFieldDecorator('DatePicker', {
                      rules: [{ required: true, message: 'วันที่' }],
                    })(<DatePicker placeholder={['Select Date']} style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* -------2------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.CoProduct}>
                    {getFieldDecorator('CoProduct', {
                      rules: [{ required: true, message: 'หน่วยงาน' }],
                    })(
                      <Select placeholder="--เลือกผลิตภัณฑ์--">
                        <Option value="ผลิตภัณฑ์ 1">ผลิตภัณฑ์ 1</Option>
                        <Option value="ผลิตภัณฑ์ 2">ผลิตภัณฑ์ 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* -------3------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Applicant}>
                    {getFieldDecorator('Applicant', {
                      rules: [{ required: true, message: 'ผู้ขออนุมัติ' }],
                    })(
                      <Select placeholder="--ผู้ขออนุมัติ--">
                        <Option value="ผู้ขออนุมัติ 1">ผู้ขออนุมัติ 1</Option>
                        <Option value="ผู้ขออนุมัติ 2">ผู้ขออนุมัติ 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  {/* <Form.Item label={fieldLabels.YearPicker}>
                  {getFieldDecorator('YearPicker', {
                    rules: [{ required: true, message: 'วันที่' }],
                  })(
                    <DatePicker placeholder={['Select Date']} style={{ width: '100%' }} />
                  )}
                 
                </Form.Item> */}
                </Col>
              </Row>
              {/* <Row>
            <Col lg={6} md={12} sm={24}>
              <Checkbox onChange={onChange2}>ประเมิณ</Checkbox>
              </Col>
            </Row> */}
              {/* -------4------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Activitie}>
                    {getFieldDecorator('Activitie', {
                      rules: [{ required: true, message: 'กรุณาเลือกกิจกรรม' }],
                    })(
                      <Select placeholder="--กิจกรรม--">
                        <Option value="กิจกรรม 1">กิจกรรม 1</Option>
                        <Option value="กิจกรรม 2">กิจกรรม 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* -------5------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Plan}>
                    {getFieldDecorator('Plan', {
                      rules: [{ required: true, message: 'แผนงาน' }],
                    })(
                      <Select placeholder="--แผนงาน--">
                        <Option value="แผนงาน 1">แผนงาน 1</Option>
                        <Option value="แผนงาน 2">แผนงาน 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Subplan}>
                    {getFieldDecorator('Subplan', {
                      rules: [{ required: true, message: 'แผนงานย่อย' }],
                    })(
                      <Select placeholder="--แผนงานย่อย--">
                        <Option value="แผนงานย่อย 1">แผนงานย่อย 1</Option>
                        <Option value="แผนงานย่อย 2">แผนงานย่อย 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {/* -------6------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Agent}>
                    {getFieldDecorator('Agent', {
                      rules: [{ required: true, message: 'ตัวแทนจำหน่าย' }],
                    })(
                      <Select placeholder="--ตัวแทนจำหน่าย--">
                        <Option value="ตัวแทนจำหน่าย 1">ตัวแทนจำหน่าย 1</Option>
                        <Option value="ตัวแทนจำหน่าย 2">ตัวแทนจำหน่าย 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* row1 */}
              <Row gutter={16}>
                <Col lg={14} md={12} sm={24}>
                  <Form.Item label={fieldLabels.List}>
                    <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              {/* row2 */}

              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Category}>
                    {getFieldDecorator('Category', {
                      rules: [{ required: true, message: 'ประเภทรายการ' }],
                    })(
                      <Select placeholder="--ประเภทรายการ--">
                        <Option value="ประเภทรายการ 1">ประเภทรายการ 1</Option>
                        <Option value="ประเภทรายการ 2">ประเภทรายการ 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* row3 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Range}>
                    {getFieldDecorator('Range', {
                      rules: [{ required: true, message: 'ระยะเวลาของรายการ' }],
                    })(<DatePicker placeholder={['Select Date']} style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.To}>
                    {getFieldDecorator('To', {
                      rules: [{ required: true, message: 'ถึง' }],
                    })(<DatePicker placeholder={['Select Date']} style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* row4 */}
              <Row gutter={16}>
                <Col lg={14} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Method}>
                    <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              {/* row5 */}
              <Row gutter={16}>
                <Col lg={14} md={12} sm={24}>
                  <Checkbox onChange={onChange}>ส่งข้อมูลไปยัง E-Voucher</Checkbox>
                </Col>
              </Row>
              {/* row6 */}
              <Row gutter={16}>
                <Col lg={14} md={12} sm={24}>
                  <Checkbox onChange={onChange}>มีข้อตกลงทางการค้า</Checkbox>
                </Col>
              </Row>
              {/* row7 */}
            </Form>
          </Panel>
          {/* End Card */}
          <Panel key="2" header="ร้านค้าร่วมรายการ">
            <Tables2 />
          </Panel>
          <Panel key="3" header="รายละเอียดค่าใช้จ่าย">
            <Tables />
          </Panel>
          <Panel key="4" header="เอกสารแนบ">
            <Uploads />
          </Panel>
        </Collapse>
        <FooterToolbar style={{ width }} />
      </PageHeaderWrapper>
    );
  }
}

export default Newjob;
