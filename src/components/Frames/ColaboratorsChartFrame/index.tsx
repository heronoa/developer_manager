import { useUsers } from "@/hooks/useUsers";
import { possibleOccupations, possiblesStacks } from "@/utils/constants";
import { Chart } from "react-google-charts";

const ColaboratorsChartsFrame = () => {
  const { allUsers } = useUsers();

  const getUsersByOccupation = (): any[] => {
    const data: any[] = [];
    Object.keys(possibleOccupations).forEach(occ => {
      const filteredUsers = allUsers.filter(e => e.occupation.includes(occ));
      data.push([occ, filteredUsers.length]);
    });
    return data;
  };

  const getUsersByProjects = () => {
    const data: any[] = [];
    const mappedValues = allUsers.map(user => user.projects.length);
    const iterableArray = new Array(Math.max(...mappedValues) + 1);
    console.log({ mappedValues, iterableArray });

    iterableArray
      .fill("value")
      .forEach((item, index) =>
        data.push([
          `${mappedValues.filter(e => e === index).length} Colaboradores`,
          index,
          "gold",
          null,
        ]),
      );
    return data;
  };

  const dataP = [
    [
      "Colaboradores",
      "Numero de projetos",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ...getUsersByProjects(),
  ];

  const data = [
    ["Colaboradores", "Área de atuação"],
    ...getUsersByOccupation(),
  ];

  const options = {
    title: `Distribuição de Colaboradores`,
    titlePosition: "none",
    titleTextStyle: {
      textAlignment: "center",
      fontSize: 18,
      bold: true,
    },
    backgroundColor: "transparent",
    legend: { position: "bottom" },
    // outerHeight: "200px",
    // innerHeight: "400px",
  };
  const optionsP = {
    title: "Colaboradores por projetos",
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };

  return (
    <div className="flex flex-col md:flex-row mx-auto w-[90%] justify-center items-center shadow-lg">
      <div>
        <Chart
          graphID="holder-chart"
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          //   height={"500px"}
          className="h-[600px] md:h-[85vh] "
        />
      </div>
      <div>
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={dataP}
          options={optionsP}
        />
      </div>
    </div>
  );
};

export default ColaboratorsChartsFrame;
