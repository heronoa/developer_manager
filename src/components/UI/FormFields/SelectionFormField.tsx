import {
  minimumOccupationsToProjects,
  possiblesStacks,
} from "@/utils/constants";
import TinyItem from "../Items/TinyItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useUsers } from "@/hooks/useUsers";
import { IUserDataType } from "@/@types";
import PrimaryDataItem from "../Items/PrimaryDataItem";
import { stringVerifier } from "@/services/errorHandler";

interface Props {
  type: string;
  states?: [any | any[], Dispatch<SetStateAction<any | any[]>>];
  setError: Dispatch<SetStateAction<string | null>>;
}

const SelectionFormField = ({ type, states, setError }: Props) => {
  const [searchStr, setSearchStr] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUserDataType[]>([]);
  const [showSelection, setShowSelection] = useState<boolean>(false);
  const { allUsers } = useUsers();

  useEffect(() => {
    if (
      !stringVerifier(
        selectedUsers.flatMap(e => e.occupation),
        minimumOccupationsToProjects,
      )
    ) {
      return setError(
        `Um projeto precisa ter no mínimo um ${minimumOccupationsToProjects.join(
          " um ",
        )}`,
      );
    }
    setError(null);
  }, [selectedUsers, setError, showSelection]);

  const renderInputBox = (type: string) => {
    if (type === "teamUids") {
      return selectedUsers.map((e, index) => (
        <div
          key={index}
          onClick={() =>
            handleUserSelection({
              name: e.name,
              uid: e.uid,
              occupation: e.occupation,
            })
          }
        >
          <TinyItem value={e.name.split(" ")[0]} />
        </div>
      ));
    }

    if (type === "stack") {
      return selectedItems.map((e, index) => (
        <div key={index} onClick={() => handleSelection(e)}>
          <TinyItem value={e} />
        </div>
      ));
    }

    return;
  };

  const renderItems = (type: string) => {
    if (type === "teamUids") {
      return (
        <div className="mb-10 flex flex-col gap-6">
          Selecionados
          <div className="flex gap-4 flex-wrap">
            {selectedUsers.map((e, index) => (
              <div
                key={index}
                className="w-full border-solid border-b border-b-gray-400 ml-2 pb-2"
                onClick={() =>
                  handleUserSelection({
                    name: e.name,
                    uid: e.uid,
                    occupation: e.occupation,
                  })
                }
              >
                {e.name}
                <br />
                <div>
                  {e.occupation.map((e, index) => (
                    <TinyItem key={index} value={e} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          Opções
          <div className="flex gap-4 flex-wrap">
            {allUsers
              .filter(item => {
                return (
                  (searchStr !== ""
                    ? item.name.toLowerCase().startsWith(searchStr)
                    : true) &&
                  !selectedUsers?.map(e => e.uid).includes(item.uid)
                );
              })
              .map((e, index) => (
                <div
                  key={index}
                  className="w-full border-solid border-b border-b-gray-400 ml-2 pb-2"
                  onClick={() =>
                    handleUserSelection({
                      name: e.name,
                      uid: e.uid,
                      occupation: e.occupation,
                    })
                  }
                >
                  {e.name}
                  <br />
                  <div>
                    {e.occupation.map((e, index) => (
                      <TinyItem key={index} value={e} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    }

    if (type === "stack") {
      return (
        <div className="mb-10 flex flex-col gap-6">
          Selecionados
          <div className="flex gap-4 flex-wrap">
            {selectedItems.map((e, index) => (
              <div key={index} onClick={() => handleSelection(e)}>
                <TinyItem value={e} />
              </div>
            ))}
          </div>
          Opções
          <div className="flex gap-4 flex-wrap">
            {Object.keys(possiblesStacks)
              .filter(item => {
                return (
                  (searchStr !== ""
                    ? item.toLowerCase().startsWith(searchStr)
                    : true) && !selectedItems.includes(item)
                );
              })
              .map((e, index) => (
                <div key={index} onClick={() => handleSelection(e)}>
                  <TinyItem value={e} />
                </div>
              ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const handleSelection = (element: string) => {
    setSelectedItems(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      const index = newState.indexOf(element);

      if (index !== -1) {
        newState.splice(index, 1);
      } else {
        newState.push(element);
      }
      if (states) {
        states[1](newState);
      }
      return newState;
    });
  };
  const handleUserSelection = (element: {
    name: string;
    uid: string;
    occupation: string[];
  }) => {
    setSelectedUsers(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      const index = newState.map((e: any) => e.uid).indexOf(element.uid);

      if (index !== -1) {
        newState.splice(index, 1);
      } else {
        newState.push(element);
      }

      if (states) {
        states[1](
          newState.map(
            (e: { uid: string; name: string; occupation: string }) => e.uid,
          ),
        );
      }
      return newState;
    });
  };

  return (
    <div className="relative" onMouseLeave={() => setShowSelection(false)}>
      {showSelection && (
        <div className="absolute flex flex-col bg-gray-200 p-4 w-[100%] h-[400%] bottom-0 z-10 rounded-lg overflow-scroll">
          <div className="h-8 relative flex justify-end mb-4">
            <input
              type="text"
              value={searchStr}
              onChange={evt => setSearchStr(evt.target.value)}
              className="h-8 mb-2 pr-[40px] bg-transparent border-b border-b-blue-900 dark:border-b-white focus:outline-none"
            />
            <div className="absolute top-[20%] right-3 text-blue-900 dark:text-white">
              <AiOutlineSearch className=" w-[24px] h-[24px] " />
            </div>
          </div>
          {renderItems(type)}
        </div>
      )}
      <div
        onClick={() => setShowSelection(true)}
        className="z-20 relative border border-solid bg-white rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center overflow-hidden"
      >
        {renderInputBox(type)}
      </div>
    </div>
  );
};

export default SelectionFormField;
