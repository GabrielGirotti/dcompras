import { List } from "@/types/index";
import ListCard from "./ListCard";
import { statusTranslation } from "@/translates/es";

type AllListsProps = {
  lists: List[];
};

type GroupedLists = {
  [key: string]: List[];
};

const initialValuesStatus: GroupedLists = {
  toShop: [],
  toChangeSome: [],
  bought: [],
  ideas: [],
};

const statusStyles: { [key: string]: string } = {
  toShop: "bg-blue text-white",
  toChangeSome: "bg-black text-white",
  bought: "bg-yellow text-black",
  ideas: "bg-yellow/30 text-black",
};

export default function AllLists({ lists }: AllListsProps) {
  const groupedLists = lists.reduce((acc, list) => {
    let currentGroup = acc[list.status] ? [...acc[list.status]] : [];
    currentGroup = [...currentGroup, list];
    return { ...acc, [list.status]: currentGroup };
  }, initialValuesStatus);

  return (
    <>
      <h2 className="text-black font-poppins text-2xl font-semibold ">
        Listas
      </h2>

      <div className="flex flex-col  max-w-[90vw] w-[500px] lg:flex-row lg:justify-center lg:gap-5 lg:items-start lg:w-[90vw]">
        {Object.entries(groupedLists).map(([status, lists]) => (
          <div
            key={status}
            className=" flex flex-col justify-between items-center lg:w-auto"
          >
            <h3
              className={` uppercase p-1 mt-5 font-semibold font-poppins  w-full text-center ${statusStyles[status]} lg:px-5`}
            >
              {statusTranslation[status]}
            </h3>
            <ul className=" max-w-[90vw] w-[500px] lg:w-auto ">
              {lists.length === 0 ? (
                <li className="py-2 text-center font-poppins text-black font-semibold">
                  No Hay listas
                </li>
              ) : (
                lists.map((list) => <ListCard key={list._id} list={list} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
