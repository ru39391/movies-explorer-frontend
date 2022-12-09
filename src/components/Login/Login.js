import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import FormError from '../FormError/FormError';
import { validationParams, validationMessData } from '../../utils/constants';

function Login({ formTitle, btnCaption, footerText, footerTitle, footerUrl, popupData, isPopupOpen, togglePopupVisibility, handleForm }) {
  const [BtnDisabled, setBtnDisabled] = React.useState(true);
  const [LoginFormData, setLoginFormData] = React.useState({});
  const [FormErrorsData, setFormErrorsData] = React.useState({});

  const inputValidators = {
    email: (value) => {
      if(value) {
        return validationParams.email.test(value);
      }
      return;
    },
    password: (value) => {
      if(value) {
        return validationParams.password.test(value);
      }
      return;
    },
  }

  function validateInputs(data) {
    const inputData = {};
    const dataArr = Object.keys(data);
    for(let i = 0; i < dataArr.length; i++) {
      inputData[dataArr[i]] = inputValidators[dataArr[i]](data[dataArr[i]]);
    }
    setFormErrorsData(inputData);
    return inputData;
  }

  function validateFormData(data) {
    const inputArr = Object.values(validateInputs(data));
    if(inputArr.length === Object.keys(inputValidators).length && inputArr.every(item => Boolean(item))) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData({
      ...LoginFormData,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleForm(LoginFormData);
  }

  React.useEffect(() => {
    validateFormData(LoginFormData);
  }, [LoginFormData]);

  return (
    <AuthForm formTitle={formTitle} btnCaption={btnCaption} btnDisabled={BtnDisabled} footerText={footerText} footerTitle={footerTitle} footerUrl={footerUrl} popupData={popupData} isPopupOpen={isPopupOpen} togglePopupVisibility={togglePopupVisibility} onSubmit={handleSubmit}>
      <div className="form__item">
        <label className="form__label">E-mail</label>
        <input className="form__field" name="email" type="email" value={LoginFormData.email || ''} onChange={handleChange} required />
        {LoginFormData.email && !FormErrorsData.email && <FormError errorText={validationMessData.email} />}
      </div>
      <div className="form__item">
        <label className="form__label">Пароль</label>
        <input className="form__field" name="password" type="password" value={LoginFormData.password || ''} onChange={handleChange} required />
        {LoginFormData.password && !FormErrorsData.password && <FormError errorText={validationMessData.password} />}
      </div>
    </AuthForm>
  );
}

export default Login;
