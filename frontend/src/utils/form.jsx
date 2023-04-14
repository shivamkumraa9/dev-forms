export function handleChangeUtil(event, formData, setFormData) {
  const { target } = event;
  const { name, value } = target;
  setFormData({
    ...formData,
    [name]: target.type === 'checkbox' ? target.checked : value,
  });
}

export function checkPasswords(password1, password2) {
  if (password1 !== password2) {
    return 'Passwords do not matched';
  }
  if (password1.length < 6) {
    return 'Passwords should have the min length of 6';
  }
  return '';
}
