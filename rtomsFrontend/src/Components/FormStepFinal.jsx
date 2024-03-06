import React from 'react';
import { Form, Input, Button } from 'antd';

const FormStepFinal = (props) => {
  const [form] = Form.useForm();

  const validateInput = () => {
    form.validateFields().then((values) => {
      props.submittedValues(values);
        props.handleConfirmButton(values);
        // props.handleNextButton();
    });
  };

  const storeValues = () => {
    const values = form.getFieldsValue();
    props.submittedValues(values);
    props.handleBackButton();
  };

  return (
    <Form form={form} onFinish={validateInput}>
      <Form.Item label="Field One" name="f_one_s_final" initialValue={props.f_one_s_final}
                 rules={[{ required: true, message: 'Cannot be empty!' }]}>
        <Input placeholder="Input your value here" />
      </Form.Item>
      <Form.Item label="Field Two" name="f_two_s_final" initialValue={props.f_two_s_final}
                 rules={[{ required: true, message: 'Cannot be empty!' }]}>
        <Input placeholder="Input your value here" />
      </Form.Item>
      <Form.Item>
        <Button type="default" onClick={storeValues}>
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormStepFinal;
