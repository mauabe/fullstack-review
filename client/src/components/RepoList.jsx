import React from 'react';
import RepoListEntryItem from './RepoListEntryItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => (    
    <RepoListEntryItem key = {repo.id} repo={repo} />
    ))}
  </div>
)

export default RepoList;