// styledComponents.ts
import tw from "tailwind-styled-components";

export const Label = tw.label`
  block mb-2
  ${(props) => props.className}
`;

export const Input = tw.input`
  block w-full px-8 py-1 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500 bg-new-gray
  ${(props) => props.className}
`;

export const Select = tw.select`
  block w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500
  bg-new-gray
  ${(props) => props.className}
`;

export const CheckboxContainer = tw.div`
  flex bg-new-gray
  ${(props) => props.className}
`;

export const CheckboxInput = tw.input`
  mr-2 bg-new-gray
  ${(props) => props.className}
`;

export const RadioInput = tw.input`
  mr-2 bg-new-gray
  ${(props) => props.className}
`;