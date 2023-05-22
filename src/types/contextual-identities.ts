export enum Color {
  blue = '#37adff',
  turquoise = '#00c79a',
  green = '#51cd00',
  yellow = '#ffcb00',
  orange = '#ff9f00',
  red = '#ff613d',
  pink = '#ff4bda',
  purple = '#af51f5',
  toolbar = '#000000',
}

export type ColorKeys = keyof typeof Color;

export const ColorValues = {
  blue: '#37adff',
  turquoise: '#00c79a',
  green: '#51cd00',
  yellow: '#ffcb00',
  orange: '#ff9f00',
  red: '#ff613d',
  pink: '#ff4bda',
  purple: '#af51f5',
  toolbar: '#000000',
};

export enum Icon {
  fingerprint = 'resource://usercontext-content/fingerprint.svg',
  briefcase = 'resource://usercontext-content/briefcase.svg',
  dollar = 'resource://usercontext-content/dollar.svg',
  cart = 'resource://usercontext-content/cart.svg',
  vacation = 'resource://usercontext-content/vacation.svg',
  gift = 'resource://usercontext-content/gift.svg',
  food = 'resource://usercontext-content/food.svg',
  fruit = 'resource://usercontext-content/fruit.svg',
  pet = 'resource://usercontext-content/pet.svg',
  tree = 'resource://usercontext-content/tree.svg',
  chill = 'resource://usercontext-content/chill.svg',
  circle = 'resource://usercontext-content/circle.svg',
  fence = 'resource://usercontext-content/fence.svg',
}

export type IconKeys = keyof typeof Icon;

export const IconValues = {
  fingerprint: 'resource://usercontext-content/fingerprint.svg',
  briefcase: 'resource://usercontext-content/briefcase.svg',
  dollar: 'resource://usercontext-content/dollar.svg',
  cart: 'resource://usercontext-content/cart.svg',
  vacation: 'resource://usercontext-content/vacation.svg',
  gift: 'resource://usercontext-content/gift.svg',
  food: 'resource://usercontext-content/food.svg',
  fruit: 'resource://usercontext-content/fruit.svg',
  pet: 'resource://usercontext-content/pet.svg',
  tree: 'resource://usercontext-content/tree.svg',
  chill: 'resource://usercontext-content/chill.svg',
  circle: 'resource://usercontext-content/circle.svg',
  fence: 'resource://usercontext-content/fence.svg',
};

export type ContextualIdentity = browser.contextualIdentities.ContextualIdentity;
