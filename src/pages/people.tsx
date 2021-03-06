import { useState, useEffect, FC } from "react";
import Layout from "../components/layout";
import { PersonCard, PageNumbering } from "../components/components";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { Person } from "../types";

export const PEOPLE = gql`
	query People($page: Int!) {
		people(pageNumber: $page) {
			count
			hasMore
			results {
				id
				name
				height
				mass
				gender
				homeworld {
					name
					gravity
					terrain
					population
				}
			}
		}
	}
`;

export const SEARCH_PEOPLE = gql`
	query searchPerson($name: String!) {
		searchPerson(name: $name) {
			count
			hasMore
			results {
				id
				name
				height
				mass
				homeworld {
					name
					gravity
					terrain
					population
				}
			}
		}
	}
`;

const People: FC = () => {
	const [getPeople, setPeople] = useState<Person[]>();
	const [hasMore, setHasMore] = useState<boolean>(false);
	const [totalCount, setTotalCount] = useState<number>(0);

	const [getPageNumber, setPageNumber] = useState<number>(1);

	const [searchName, setSearchName] = useState("");

	const [searchPeople, { data: searchData }] = useLazyQuery(SEARCH_PEOPLE);

	const search_post = () => {
		searchPeople({
			variables: { name: searchName },
		});
	};

	const { data } = useQuery(PEOPLE, {
		variables: { page: getPageNumber },
	});

	useEffect(() => {
		setPeople(data?.people?.results);
		setHasMore(data?.people?.hasMore);
		setTotalCount(data?.people?.count);

		if (searchData) {
			setPeople(searchData?.searchPerson?.results);
			setHasMore(searchData?.searchPerson?.hasMore);
			setTotalCount(searchData?.people?.count);
		}

		if (searchName.length === 0) {
			setPeople(data?.people?.results);
			setHasMore(data?.people?.hasMore);
			setTotalCount(data?.people?.count);
		}
	}, [data, searchData, searchName]);

	return (
		<Layout pagename="People">
			<div className="container sm:px-10 pt-20">
				<div className="flex justify-evenly w-full mt-5 mb-5">
					<input
						type="search"
						className="w-3/4 bg-purple-white shadow rounded border-0 p-3 mr-2"
						placeholder="Search by name..."
						onChange={(e) => setSearchName(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								search_post();
							}
						}}
					/>
					<div
						className="pin-r pin-t mt-3 mr-4 text-purple-lighter"
						onClick={search_post}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
				<div className="w-auto grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap2 md:gap-6 mb-10">
					{getPeople &&
						getPeople?.map((person) => {
							return (
								<PersonCard
									key={person.id}
									id={person.id}
									name={person.name}
									gender={person.gender}
									mass={person.mass}
									height={person.height}
									homeworld={person.homeworld}
								/>
							);
						})}
				</div>

				<div className="flex flex-row justify-between mt-5 mb-10">
					{getPageNumber !== 1 && (
						<button className="ml-0 mr-auto py-1 px-3 bg-gray-500 hover:bg-blue-700 rounded-lg text-white text-center flex flex-row items-center">
							<div
								className="flex flex-row justify-between items-center"
								onClick={() => setPageNumber(getPageNumber - 1)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M7 16l-4-4m0 0l4-4m-4 4h18"
									/>
								</svg>
								<span>Previous</span>
							</div>
						</button>
					)}

					<PageNumbering
						currentPageNumber={getPageNumber}
						total={totalCount}
						switchPage={(number) => {
							setPageNumber(number);
						}}
					/>

					{hasMore && (
						<button className="ml-auto mr-0 py-1 px-3 bg-gray-500 hover:bg-blue-700 rounded-lg text-white text-center flex flex-row items-center">
							<div
								className="flex flex-row justify-between items-center"
								onClick={() => setPageNumber(getPageNumber + 1)}
							>
								<span>Next</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M14 5l7 7m0 0l-7 7m7-7H3"
									/>
								</svg>
							</div>
						</button>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default People;
