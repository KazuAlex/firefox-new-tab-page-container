import { Color as IColor } from '@/shared/interfaces/Color';

export enum EColors {
  blue = "#37adff",
  turquoise = "#00c79a",
  green = "#51cd00",
  yellow = "#ffcb00",
  orange = "#ff9f00",
  red = "#ff613d",
  pink = "#ff4bda",
  purple = "#af51f5",
  toolbar = "#000000",
}

export const OColors: any = {
  blue: "#37adff",
  turquoise: "#00c79a",
  green: "#51cd00",
  yellow: "#ffcb00",
  orange: "#ff9f00",
  red: "#ff613d",
  pink: "#ff4bda",
  purple: "#af51f5",
  toolbar: "#000000",
};

export const Colors: IColor[] = [
  {id: 'blue', code: EColors.blue},
  {id: 'turquoise', code: EColors.turquoise},
  {id: 'green', code: EColors.green},
  {id: 'yellow', code: EColors.yellow},
  {id: 'orange', code: EColors.orange},
  {id: 'red', code: EColors.red},
  {id: 'pink', code: EColors.pink},
  {id: 'purple', code: EColors.purple},
  {id: 'toolbar', code: EColors.toolbar},
];
