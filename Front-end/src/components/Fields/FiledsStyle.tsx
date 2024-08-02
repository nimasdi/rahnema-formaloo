// styledComponents.ts
import tw from "tailwind-styled-components";


export const Container = tw.div`
  px-16
`;


export const Label = tw.label`
  block mb-2
  ${(props) => props.className}
`;

export const Input = tw.input`
  block w-full px-8 py-1 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500 bg-new-gray
  ${(props) => props.className}
`;

export const Select = tw.select`
  block w-full px-2 py-1 text-sm border border-new-gray rounded focus:border-blue-500 focus:ring-blue-500
  bg-new-gray
  ${(props) => props.className}
`;

export const CheckboxContainer = tw.label`
  flex my-1 cursor-pointer rounded has-[:checked]:bg-blue-checked
  ${(props) => props.className}
`;

export const CheckboxInput = tw.input`
  mr-2 bg-new-gray checked:border-red-500
  ${(props) => props.className}
`;

export const RadioInput = tw.input`
  mr-2 bg-new-gray checked:border-red-500
  ${(props) => props.className}
`;

export const Title = tw.p`py-2 font-bold text-lg first-letter:uppercase ${(
  props
) => props.className}`;

export const Option = tw.label;
