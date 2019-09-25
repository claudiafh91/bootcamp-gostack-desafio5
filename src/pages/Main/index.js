import React, { Component } from 'react';
import {Link }from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner} from 'react-icons/fa';

import Container from '../../components/Container';
import { SubmitButton, List, Input, Form } from './styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    console.log('didmount');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories)});
    }
  }
    // Salvar os dados de localStorage
    componentDidUpdate(_, prevState) {
      const repositories = this.state.repositories;

      if (prevState.repositories !== repositories) {
        localStorage.setItem('repositories', JSON.stringify(repositories));
      }
    }

  handleInputChange = input => {
    this.setState({
      newRepo: input.target.value,
      error: false,
    });
  };

  handleSubmit = async form => {
    form.preventDefault();

    try {

      this.setState({loading: true});

      const { newRepo, repositories} = this.state;

      const repository = repositories.findIndex(
          elem => elem.name.toLowerCase() === newRepo
        );

      if ( repository !== -1 ) {
        throw new Error('Repositório duplicado');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });

    } catch(err) {
      this.setState({
        error: true,
        loading: false,
      });

      console.log(err.name, err.message);
    }

  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <Input
            value={newRepo}
            onChange={this.handleInputChange}
            error={error}
          />

          <SubmitButton disabled={loading}>
            { loading ? (
            <FaSpinner color="#FFF" size={14} />
            ) : (
            <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
