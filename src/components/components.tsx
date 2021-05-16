import { INavBarProps, Person } from "../types";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export const Navbar: FC<INavBarProps> = ({ pagename }) => {
  return (
    <nav
      className="py-2 px-10 fixed flex flex-row items-center w-full bg-blue-800"
      style={{ color: "#FFFFFF" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link to="/">
          <button className="hover:font-bold">Home</button>
        </Link>
        <span> / {pagename}</span>
      </div>
    </nav>
  );
};

export const PersonCard: FC<Person> = ({
  id,
  name,
  gender,
  height,
  mass,
  homeworld,
}) => {
  return (
    <div
      key={id}
      className="w-auto cursor-pointer border-2 rounded border-gray-500  hover:border-blue-700"
    >
      <Link to={`/person/${id}`}>
        <div className="px-5 py-5 min-h-30 bg-white flex flex-col justify-between items-start static rounded-md">
          <div className="flex flex-row w-full justify-between items-center mb-2">
            <div>
              <h3 className="text-1xl" style={{ fontWeight: "bold" }}>
                {name}
              </h3>
            </div>
          </div>
          <div className="flex flex-col w-full capitalize">
            <span>Gender: {gender}</span>
            <span>Height: {height}</span>
            <span>Mass: {mass}</span>
            <span>Homeworld: {homeworld?.name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const PersonDetails: FC<Person> = ({
  id,
  name,
  gender,
  height,
  mass,
  homeworld,
}) => {
  return (
    <div className="max-w-md w-full lg:flex">
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-black font-bold text-xl mb-2">{name}</div>
          <p className="text-grey-darker text-base">
            {name} ({gender === "n/a" ? "Unknown Gender" : gender}) has a height
            of {height} and weighs {mass}.
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-black leading-none">
              <span className="font-medium">Origin Planet: </span>
              <span className="capitalize"> {homeworld?.name}</span>
            </p>
            <p className="text-grey-dark">
              {homeworld?.name} has a population of {homeworld?.population}. It
              is a {homeworld?.terrain} terrain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

