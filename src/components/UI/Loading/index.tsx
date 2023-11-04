interface Props {
  className?: string;
}

const Loading = ({ className = "" }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`${className} loading-circle`}></div>
    </div>
  );
};

export default Loading;
