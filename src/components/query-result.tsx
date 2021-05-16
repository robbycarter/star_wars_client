import React from 'react';

/**
 * Query Results conditionally renders Apollo useQuery hooks states:
 * loading, error or its children when data is ready
 */
const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return (
      <span>Loading</span>
    );
  }

  if (!data) {
    return <p>Nothing to show...</p>;
  }
  
  if (data) {
    return children;
  }
};

export default QueryResult;

