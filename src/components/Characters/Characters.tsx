import RickAndMorty from 'assets/icons/RickAndMorty';
import { Character, Pagination } from 'components';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getCharactersThunk } from 'store/ducks/characterSlice/actions';
import { charactersSelectors } from 'store/ducks/characterSlice/selectors';
import styled from 'styled-components';
import { colors } from 'styles';

type FormType = {
  name: string;
  status: any;
}

const Characters: FC = () => {
  const [query, setQuery] = useState({ page: 1, name: '', status: '' });
  let [searchParams, setSearchParams] = useSearchParams({ page: '1', name: '' });
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<FormType>({
    defaultValues: {
      status: '',
      name: ''
    }
  });

  const characters = useSelector(charactersSelectors.characters);
  const loading = useSelector(charactersSelectors.loadingCharacters);
  const totalPages = useSelector(charactersSelectors?.pagesCharacters);

  const onSubmit = async (data: FormType) => {
    await setQuery({ page: 1, name: data.name ? data.name : '', status: data.status });
    setSearchParams({ page: '1', name: data.name ? data.name : '', status: data.status });

    console.log(data);
  }

  useEffect(() => { dispatch(getCharactersThunk(query)) }, [dispatch, query]);

  return (
    <Root>
      <RickAndMorty />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller control={control} name='name' render={({ field }) => (
          <Input type='text' placeholder='Search by name..' {...field} />
        )} />
        <Controller control={control} name='status' render={({ field }) => (
          <>
            <StyledLabel>
              All
              <input {...field} type='radio' value='' />
            </StyledLabel>
            <StyledLabel>
              Alive
              <input {...field} type='radio' value='alive' />
            </StyledLabel>
            <StyledLabel>
              Maybe Dead
              <input {...field} type='radio' value='unknown' />
            </StyledLabel>
            <StyledLabel>
              Dead
              <input {...field} type='radio' value='dead' />
            </StyledLabel>
          </>
        )} />
        <Button type='submit'>Search</Button>
      </Form>
      <Pagination query={query} totalPages={totalPages} setQuery={setQuery} setSearchParams={setSearchParams} />
      <ItemsContainer>
        {characters?.results?.map(item => (
          <Character key={item.id} {...item} location={item.location.name} />
        ))}
      </ItemsContainer>
      <Pagination query={query} totalPages={totalPages} setQuery={setQuery} setSearchParams={setSearchParams} />
    </Root>
  )
}

export default Characters;

const StyledLabel = styled.label`
  color: ${colors.lightTextColor};
  padding: 5px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid ${colors.hoverColor};

  :active{
    border: 1px solid ${colors.lightTextColor};
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  color: ${colors.lightTextColor};
  background-color: ${colors.hoverColor};
  outline: none;
  border: none;

  &:active {
    padding: 4px 9px;
    border: 1px solid ${colors.lightTextColor};
  }
`;

const Input = styled.input`
  border-radius: 10px;
  padding: 5px 10px;
  color: ${colors.lightTextColor};
  background-color: ${colors.backgroundColor};
  border: none;
  outline: none;

  &:focus{
    padding: 4px 9px;
    border: 1px solid ${colors.hoverColor};
  }
`;

const Form = styled.form`
  display: flex;
  margin-top: 20px;
  width: 100%;
  gap: 10px;
  justify-content: center;
`;

const Loading = styled.span`
  color: ${colors.lightTextColor};
  font-size: 28px;
  margin: 0 auto;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  max-width: 1216px;
  margin: 0 auto;
  gap: 16px;
  
  @media (max-width: 1260px) {
    justify-content: center;
  }
`;

const Root = styled.div`
  background-color: ${colors.darkTextColor};
  padding-bottom: 20px;
`;