import React from "react";


const RepoListEntryItem = props => (
  <div>
  <a href={props.repo.url}> {props.repo.username} </a>
  <div> Star Count : {props.repo.stars} </div>
  </div>
);

export default RepoListEntryItem;