import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';

const FormStepOne = (props) => {
  const [form] = useForm();

  const validateInput = () => {
    form.validateFields().then((values) => {
      props.submittedValues(values);
      props.handleNextButton();
    });
  };

  return (
    <Form form={form} onFinish={validateInput}>
      <Form.Item label="Field One" name="f_one_s_one" initialValue={props.f_one_s_one}
                 rules={[{ required: true, message: 'Cannot be empty!' }]}>
        <Input placeholder="Input your value here" />
      </Form.Item>
      <Form.Item label="Field Two" name="f_two_s_one" initialValue={props.f_two_s_one}
                 rules={[{ required: true, message: 'Cannot be empty!' }]}>
        <Input placeholder="Input your value here" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormStepOne;
