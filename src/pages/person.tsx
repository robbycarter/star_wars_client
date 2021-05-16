import Layout from "../components/layout";
import { PersonDetails } from "../components/components";
import { useQuery, gql } from "@apollo/client";
import QueryResult from "../components/query-result";
import { useParams } from "react-router-dom";
import { PersonParams } from "../types";

export const Person_Query = gql`
	query Person($id: ID!) {
		person(id: $id) {
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
`;

const Person = () => {
	const { id } = useParams<PersonParams>();
	
	const { loading, error, data } = useQuery(Person_Query, {
		variables: { id },
	});

	const person = data?.person;

	return (
		<Layout pagename="People">
			<div className="container sm:px-10 pt-20">
				<div className="flex items-center border-b-2 w-auto mb-10">
					<QueryResult error={error} loading={loading} data={person}>
						{person ? (
							<PersonDetails
								key={person.id}
								id={person.id}
								name={person.name}
								gender={person.gender}
								mass={person.mass}
								height={person.height}
								homeworld={person.homeworld}
							/>
						) : (
							""
						)}
					</QueryResult>
				</div>
			</div>
		</Layout>
	);
};

export default Person;
