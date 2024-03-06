import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';

const FormStepTwo = (props) => {
  const [form] = useForm();

  const validateInput = () => {
    form.validateFields().then((values) => {
      props.submittedValues(values);
      props.handleNextButton();
    });
  };

  const storeValues = () => {
    const values = form.getFieldsValue();
    props.submittedValues(values);
    props.handleBackButton();
  };

  return (
    <Form form={form} onFinish={validateInput}>
      <Form.Item label="Field One" name="f_one_s_two" initialValue={props.f_one_s_two}
                 rules={[{ required: true, message: 'Cannot be empty!' }]}>
        <Input placeholder="Input your value here" />
      </Form.Item>
      <Form.Item label="Field Two" name="f_two_s_two" initialValue={props.f_two_s_two}
                 rules={[{ required: true, message: 'Cannot be empty!' }]}>
        <Input placeholder="Input your value here" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
        <Button type="default" onClick={storeValues}>
          Back
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormStepTwo;
