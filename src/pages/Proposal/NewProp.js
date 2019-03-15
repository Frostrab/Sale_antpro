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
  Radio,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import TableForm from './TableForm3';
import styles from './style3.less';
import NewTab from './NewTab.js';
import NewTab2 from './NewTab2.js';

const Panel = Collapse.Panel;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const Step = Steps.Step;

function callback(key) {
  console.log(key);
}

// function onChangeRad(e) {
//   console.log('radio checked', e.target.value);
//   this.setState({
//     value: e.target.value,
//   });
// }

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
  ProjectStart: 'ระยะเวลาที่เริ่มต้น',
  ProjectEnd: 'ระยะเวลาที่สิ้นสุด',
  Shop: 'ร้านค้า',
  Address: 'ที่อยู่',
  Dealer: 'ผู้ติดต่อ',
  Contact: 'เบอร์ติดต่อ',
  Project: 'โครงการ',
  Condition1: 'เงื่อนไขการจ่าย',
  ProjectRange: 'ระยะเวลาโครงการ',
  Condition2: 'เงื่อนไข',
  MainProduct: 'ผลิตภัณฑ์หลัก',
  Goal: 'ประมาณการยอดขาย',
  Supportbudget: 'งบประมาณสนับสนุน',
  Percent: '% to Sale',
  Method: 'วิธีการ',
  Ref: 'อ้างอิง Proposal',
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
//   submitting: loading.effects['form/submitNewProp'],
// }))
@Form.create()
class NewProp extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
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
          type: 'form/submitNewProp',
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
        wrapperClassName={styles.NewProp}
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
                    })(<Input placeholder="" />)}
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
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* -------3------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Shop}>
                    {getFieldDecorator('Shop', {
                      rules: [{ required: true, message: 'ร้านค้า' }],
                    })(
                      <Select placeholder="--ร้านค้า--">
                        <Option value="ร้านค้า 1">ร้านค้า 1</Option>
                        <Option value="ร้านค้า 2">ร้านค้า 2</Option>
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
                <Col lg={14} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Address}>
                    <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* -------5------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Dealer}>
                    {getFieldDecorator('Dealer', {
                      rules: [{ required: true, message: 'ผู้ติดต่อ' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* -------6------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Contact}>
                    {getFieldDecorator('Contact', {
                      rules: [{ required: true, message: 'เบอร์ติดต่อ' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* row1 */}
              <Row gutter={16}>
                <Col lg={14} md={12} sm={24}>
                  {/* Radio Button */}
                  <Form.Item label={fieldLabels.Project}>
                    <RadioGroup onChange={this.onChangeRad} value={this.state.value}>
                      <Radio value={1}>SH</Radio>
                      <Radio value={2}>SE</Radio>
                      <Radio value={3}>SN</Radio>
                      <Radio value={4}>SO</Radio>
                    </RadioGroup>
                  </Form.Item>
                  {/* Radio Button */}
                </Col>
              </Row>
              {/* row2 */}

              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.ProjectStart}>
                    {getFieldDecorator('ProjectStart', {
                      rules: [{ required: true, message: 'ระยะเวลาเริ่มต้น' }],
                    })(<DatePicker placeholder={['Select Date']} style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.ProjectEnd}>
                    {getFieldDecorator('ProjectEnd', {
                      rules: [{ required: true, message: 'ระยะเวลาที่สิ้นสุด' }],
                    })(<DatePicker placeholder={['Select Date']} style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* row3 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Condition1}>
                    {getFieldDecorator('Condition1', {
                      rules: [{ required: true, message: 'เงื่อนไขการจ่าย' }],
                    })(
                      <Select placeholder="--เงื่อนไข--">
                        <Option value="เงื่อนไข 1">เงื่อนไข 1</Option>
                        <Option value="เงื่อนไข 2">เงื่อนไข 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.ProjectRange}>
                    {getFieldDecorator('ProjectRange', {
                      rules: [{ required: true, message: 'ระยะเวลาโครงการ' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* row4 */}
              <Row gutter={16}>
                <Col lg={24} md={12} sm={24}>
                  <Checkbox.Group style={{ width: '50%' }} onChange={onChange}>
                    <Row>
                      <Checkbox value="A">1.เพื่อสร้างความสัมพันธุ์ที่ดีกับร้านค้า</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="B">2.เพื่อเพิ่มยอดขายสินค้า</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="C">3.เพื่อสกัดกั้นคู่แข่ง</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="D">4.เพื่อต่อระยะโครงการ</Checkbox>
                    </Row>
                  </Checkbox.Group>
                </Col>
              </Row>

              {/* row5 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Condition2}>
                    {getFieldDecorator('Condition2', {
                      rules: [{ required: true, message: 'เงื่อนไข' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.MainProduct}>
                    {getFieldDecorator('MainProduct', {
                      rules: [{ required: true, message: 'ผลิตภัณฑ์หลัก' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* row6 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Goal}>
                    {getFieldDecorator('Goal', {
                      rules: [{ required: true, message: 'ประมาณการยอดขาย' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* row7 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Supportbudget}>
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              {/* row8 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Percent}>
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              {/* row9 */}
              <Row gutter={16}>
                <Col lg={14} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Method}>
                    <TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              {/* row8 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Ref}>
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              {/* row8 */}
            </Form>
          </Panel>
          {/* End Card */}
          <Panel key="2" header="รายละเอียดค่าใช้จ่าย">
            <NewTab2 />
          </Panel>
          <Panel key="3" header="เป้าหมาย">
            <NewTab />
          </Panel>
        </Collapse>
        <FooterToolbar style={{ width }} />
      </PageHeaderWrapper>
    );
  }
}

export default NewProp;
