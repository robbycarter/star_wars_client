import React from "react";
import { render } from "react-dom";
import Pages from './pages';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from '@apollo/client/react';
import './styles.css';

const client = new ApolloClient({
	uri: "https://ppmhm.sse.codesandbox.io/graphql",
	cache: new InMemoryCache(),
});

render(
	<ApolloProvider client={client}>
		<Pages />
	</ApolloProvider>,
	document.getElementById("root")
);
