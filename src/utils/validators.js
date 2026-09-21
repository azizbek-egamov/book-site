export function validateRequired(value, fieldName) {
  if (!value || String(value).trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
}

export function validatePrice(price) {
  const num = Number(price);
  if (isNaN(num) || num <= 0) {
    return 'Price must be a valid number greater than 0';
  }
  return null;
}

export function validatePhone(phone) {
  const phoneRegex = /^\+998\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return 'Phone number must be in format +998XXXXXXXXX';
  }
  return null;
}

export function validateBookForm(data) {
  const errors = {};
  
  const titleError = validateRequired(data.title, 'Title');
  if (titleError) errors.title = titleError;
  
  const authorError = validateRequired(data.author, 'Author');
  if (authorError) errors.author = authorError;

  const priceError = validatePrice(data.price);
  if (priceError) errors.price = priceError;
  
  const categoryError = validateRequired(data.categoryId, 'Category');
  if (categoryError) errors.categoryId = categoryError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateCustomerForm(data) {
  const errors = {};
  
  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.name = nameError;
  
  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;
  
  const addressError = validateRequired(data.address, 'Address');
  if (addressError) errors.address = addressError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
