interface Props {
    value: string
}

const TinyItem = ({ value }: Props) => {
  return <div className="bg-yellow-600 text-white rounded-full p-2 w-fit text-center">{value}</div>;
};

export default TinyItem