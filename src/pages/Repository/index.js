import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
 import { Loading, Owner, IssueList, Select,
          ButtonPage, Page, FilterIssue, Pagination} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    issues_state: "open",
    page: { number: 1, firstPage: true, lastPage: false},
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const issues_state = this.state.issues_state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issues_state,
          per_page: 10,
          page: 1,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  listIssues = async () => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const  {issues_state, page}  = this.state;

    this.setState({
      loading: true,
    });

    const issues= await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issues_state,
        per_page: 10,
        page: page.number,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
      page: {number: page.number, firstPage: page.firstPage, lastPage: !issues.data.length},
    });
  }

  handleSelectChange = async select => {

    await this.setState({
      issues_state: select.target.value,
      page: {number: 1 , firstPage: true, lastPage: false}
    });
    this.listIssues();
  };

  nextPage = async () => {
    const number = ++this.state.page.number;

    await this.setState({
      page: {number , firstPage: false, lastPage: false},
    });

    this.listIssues();
  }

  lastPage = async () => {
    const number = --this.state.page.number;
    const firstPage = (number === 1);

    await this.setState({
      page: {number , firstPage, lastPage: false},
    });

    this.listIssues();
  }

  render() {
    const { repository, issues, loading, issues_state, page} = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

         <FilterIssue>
          <span>Show issues:</span>
          <Select id="state" value={issues_state} onChange={this.handleSelectChange}>
              <option value="open" >open</option>
              <option value="closed" >closed</option>
              <option value="all" >all</option>
          </Select >
          <Pagination>
          <ButtonPage type="button" available={page.firstPage} onClick={this.lastPage} >
            <FaArrowLeft color="#FFF" size={10} />
          </ButtonPage>
          <Page>{page.number}</Page>
          <ButtonPage type="button" available={page.lastPage} onClick={this.nextPage}>
            <FaArrowRight color="#FFF" size={10} />
          </ButtonPage>
          </Pagination>
        </FilterIssue >

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
