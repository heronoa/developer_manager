import { capitalize } from "@/services/format";
import { defaultColor, possibleOccupations, possiblesStacks } from "@/utils/constants";

interface Props {
  value: string;
}

const TinyItem = ({ value }: Props) => {
  const color =
    possiblesStacks?.[capitalize(value) as keyof typeof possiblesStacks] ||
    possibleOccupations?.[
      value?.toLocaleLowerCase() as keyof typeof possibleOccupations
    ] || defaultColor;

  return (
    <div
      style={{ background: color }}
      className="text-white rounded-full p-2 w-fit text-center min-w-[50px]"
    >
      {value}
    </div>
  );
};

export default TinyItem;
