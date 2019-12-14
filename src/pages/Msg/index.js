import React, { Component } from 'react'
import { createForm, formShape } from 'rc-form';

class Form extends Component {
  state = {
    msg: ''
  }
  static propTypes = {
    form: formShape,
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    let that = this
    return (
      <div>
        <input {...getFieldProps('normal')} />
        <br></br>
        <input {...getFieldProps('required', {
          onChange(e) {
            that.setState({
              msg: e.target.value
            })
           }, 
          initialValue: that.state.msg,
          rules: [{ required: true }],
        })} />
        {(errors = getFieldError('required')) ? errors.join(',') : null}
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default createForm()(Form);