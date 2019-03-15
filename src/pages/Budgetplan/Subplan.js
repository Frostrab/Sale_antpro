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
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import TableForm from './TableForm1';
import styles from './style1.less';

const Panel = Collapse.Panel;
const Step = Steps.Step;

function callback(key) {
  console.log(key);
}

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

function onChange2(e) {
  console.log(`checked = ${e.target.checked}`);
}
const { Option } = Select;

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const fieldLabels = {
  DatePicker: 'ปี',
  Activitie: 'กิจกรรม',
  Plan: 'แผนงาน',
  Unit: 'หน่วยงาน',
  Center: 'ศูนย์ต้นทุน',
  Budget: 'การคุมงบ',
  Perman: 'จำนวนกิจกรรมต่อคน',
  Per: 'ต่อ',
  Status: 'สถานะ',
  Month1: 'เดือน 1',
  Month2: 'เดือน 2',
  Month3: 'เดือน 3',
  Month4: 'เดือน 4',
  Month5: 'เดือน 5',
  Month6: 'เดือน 6',
  Month7: 'เดือน 7',
  Month8: 'เดือน 8',
  Month9: 'เดือน 9',
  Month10: 'เดือน 10',
  Month11: 'เดือน 11',
  Month12: 'เดือน 12',
  Bath: 'บาท',
  Total: 'รวม',
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
//   submitting: loading.effects['form/submitSubplan'],
// }))
@Form.create()
class Subplan extends PureComponent {
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
          type: 'form/submitSubplan',
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
        title="สร้างแผนงานย่อย"
        // content="รายละเอียด"
        wrapperClassName={styles.Subplan}
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
                  <Form.Item label={fieldLabels.DatePicker}>
                    {getFieldDecorator('DatePicker', {
                      rules: [{ required: true, message: 'ปี' }],
                    })(<DatePicker placeholder={['Select Date']} style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* -------1-------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Activitie}>
                    {getFieldDecorator('Activitie', {
                      rules: [{ required: true, message: 'กิจกรรม' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
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
              </Row>
              {/* -------2------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Unit}>
                    {getFieldDecorator('Unit', {
                      rules: [{ required: true, message: 'หน่วยงาน' }],
                    })(
                      <Select placeholder="--หน่วยงาน--">
                        <Option value="หน่วยงาน 1">หน่วยงาน 1</Option>
                        <Option value="หน่วยงาน 2">หน่วยงาน 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Checkbox onChange={onChange}>หน่วยงานภายใต้</Checkbox>
                </Col>
              </Row>
              {/* -------3------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Center}>
                    {getFieldDecorator('Center', {
                      rules: [{ required: true, message: 'ศูนย์ต้นทุน' }],
                    })(
                      <Select placeholder="--ศูนย์ต้นทุน--">
                        <Option value="ศูนย์ต้นทุน 1">ศูนย์ต้นทุน 1</Option>
                        <Option value="ศูนย์ต้นทุน 2">ศูนย์ต้นทุน 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Budget}>
                    {getFieldDecorator('Budget', {
                      rules: [{ required: true, message: 'การคุมงบ' }],
                    })(
                      <Select placeholder="--การคุมงบ--">
                        <Option value="การคุมงบ 1">การคุมงบ 1</Option>
                        <Option value="การคุมงบ 2">การคุมงบ 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={12} sm={24}>
                  <Checkbox onChange={onChange2}>ประเมิณ</Checkbox>
                </Col>
              </Row>
              {/* -------4------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Perman}>
                    {getFieldDecorator('Perman', {
                      rules: [{ required: true, message: 'จำนวนกิจกรรมต่อคน' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Per}>
                    {getFieldDecorator('Per', {
                      rules: [{ required: true, message: 'ต่อ' }],
                    })(
                      <Select placeholder="--จำนวนกี่คน--">
                        <Option value="1">1 คน</Option>
                        <Option value="2">2 คน</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {/* -------5------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Status}>
                    {getFieldDecorator('Status', {
                      rules: [{ required: true, message: 'สถานะ' }],
                    })(
                      <Select placeholder="--สถานะ--">
                        <Option value="สถานะ 1">สถานะ 1</Option>
                        <Option value="สถานะ 2">สถานะ 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
              </Row>
              {/* -------6------- */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Month1}>
                    {getFieldDecorator('Month1', {
                      rules: [{ required: true, message: 'เดือน 1' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Month2}>
                    {getFieldDecorator('Month2', {
                      rules: [{ required: true, message: 'เดือน 2' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Month3}>
                    {getFieldDecorator('Month3', {
                      rules: [{ required: true, message: 'เดือน 3' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* row1 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Month4}>
                    {getFieldDecorator('Month4', {
                      rules: [{ required: true, message: 'เดือน 4' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Month5}>
                    {getFieldDecorator('Month5', {
                      rules: [{ required: true, message: 'เดือน 5' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Month6}>
                    {getFieldDecorator('Month6', {
                      rules: [{ required: true, message: 'เดือน 6' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* row2 */}

              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Month7}>
                    {getFieldDecorator('Month7', {
                      rules: [{ required: true, message: 'เดือน 7' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Month8}>
                    {getFieldDecorator('Month8', {
                      rules: [{ required: true, message: 'เดือน 8' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Month9}>
                    {getFieldDecorator('Month9', {
                      rules: [{ required: true, message: 'เดือน 9' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* row3 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Month10}>
                    {getFieldDecorator('Month10', {
                      rules: [{ required: true, message: 'เดือน 10' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Month11}>
                    {getFieldDecorator('Month11', {
                      rules: [{ required: true, message: 'เดือน 11' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Month12}>
                    {getFieldDecorator('Month12', {
                      rules: [{ required: true, message: 'เดือน 12' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* row4 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Total}>
                    {getFieldDecorator('Total', {
                      rules: [{ required: true, message: 'รวม' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* row5 */}
            </Form>
          </Panel>
          {/* End Card */}

          <Panel key="2" header="รายละเอียด">
            {/* {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)} */}
          </Panel>
        </Collapse>
        <FooterToolbar style={{ width }} />
      </PageHeaderWrapper>
    );
  }
}

export default Subplan;
