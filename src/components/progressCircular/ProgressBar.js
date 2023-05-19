import React from "react";
import tw, { styled } from "twin.macro";
const Relative = tw.div`relative pt-1`;
const OverflowHidden = tw.div`overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-600`;
const ProgressBar = styled.div(({ value }) => [
    tw`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center`,
    value < 30 ? tw`bg-red-600` : value < 70 ? tw`bg-orange-500` : tw`bg-primary-500`,
  ]);const ProgressLabel = tw.div`flex justify-between text-xs text-gray-500`;

const Progress = ({ value, label }) => {
  return (
    <Relative>
      <OverflowHidden>
        <ProgressBar  value={value} style={{ width: `${value}%` }}></ProgressBar>
      </OverflowHidden>
      <ProgressLabel>
        <span>{label}</span>
        <span>{value}%</span>
      </ProgressLabel>
    </Relative>
  );
};
const  ProgressBarr=({value,label})=> {
  return <Progress value={value} label={label} />;
}
export default ProgressBarr
