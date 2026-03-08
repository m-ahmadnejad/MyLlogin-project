import { validUsers } from "./loginData";

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
};

export const checkoutUsers = {
    validUser:{
    firstName: 'Mojgan',
    lastName: 'Test',
    postalCode: '123'
  }}
export const InvalidCheckout=[
   {
    title:'empty first name',
    firstName: '',
    lastName: 'Test',
    postalCode: '123',
    getError :'Error: First Name is required'
  },

  {
    title :'empty last name',
    firstName: 'Mojgan',
    lastName: '',
    postalCode: '123',
    getError :'Error: Last Name is required'
  },

  {
    title : 'empty postal code',
    firstName: 'Mojgan',
    lastName: 'Test',
    postalCode: '',
    getError :'Error: Postal Code is required'
  }
];