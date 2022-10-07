import RickAndMortyIcon from 'assets/icons/RickAndMorty';
import { Character, Info, Pagination } from 'components';
import { onlyLatinValidation } from 'helper';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getCharactersThunk } from 'store/ducks/characterSlice/actions';
import {
  getCharacters,
  loadingCharacters,
  pagesCharacters,
} from 'store/ducks/characterSlice/selectors';
import styled from 'styled-components';
import { colors } from 'styles';
import { Button, Modal } from 'UI';
import spinner from 'assets/preloader/spinner.gif';

type FormType = {
  name: string;
  status: string;
};

const Characters: FC = () => {
  const [_, setSearchParams] = useSearchParams({ page: '1', name: '', status: '' });
  const [query, setQuery] = useState({ page: 1, name: '', status: '' });
  const [isShowModal, setIsShowModal] = useState(false);
  const [characterId, setCharacterId] = useState(0);
  const [statusValue, setStatusValue] = useState('');

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    defaultValues: {
      status: '',
      name: '',
    },
    mode: 'onChange',
  });

  const characters = useSelector(getCharacters);
  const loading = useSelector(loadingCharacters);
  const totalPages = useSelector(pagesCharacters);

  const onSubmit = async (data: FormType) => {
    await setQuery({ page: 1, name: data.name ? data.name : '', status: statusValue });
    setSearchParams({ page: '1', name: data.name ? data.name : '', status: statusValue });
  };

  const characterClickHandler = (id: number) => {
    setCharacterId(id);
    setIsShowModal(true);
  };

  const labelsList = [
    { name: 'All', value: '' },
    { name: 'Alive', value: 'alive' },
    { name: 'Maybe Dead', value: 'unknown' },
    { name: 'Dead', value: 'dead' },
  ];

  useEffect(() => {
    dispatch(getCharactersThunk(query));
  }, [dispatch, query]);

  return (
    <Root>
      <LogoContainer>
        <RickAndMortyIcon />
      </LogoContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Button
          text="Reset"
          action={() => {
            reset();
            setStatusValue('');
          }}
        />
        <InnerContainer>
          <Controller
            control={control}
            name="name"
            rules={{
              pattern: {
                value: onlyLatinValidation,
                message: 'Enter only latin characters',
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  isError={Boolean(errors.name)}
                  type="text"
                  placeholder="Search by name.."
                  {...field}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              </>
            )}
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <RadioContainer>
                {labelsList.map((item) => (
                  <StyledLabel key={item.name}>
                    {item.name}
                    <Radio
                      {...field}
                      type="radio"
                      checked={statusValue === item.value}
                      onChange={() => setStatusValue(item.value)}
                      defaultChecked={item.value === ''}
                      value={item.value}
                    />
                  </StyledLabel>
                ))}
              </RadioContainer>
            )}
          />
        </InnerContainer>
        <Button text="Search" />
      </Form>
      <Pagination
        query={query}
        setQuery={setQuery}
        totalPages={totalPages}
        setSearchParams={setSearchParams}
      />
      <ItemsContainer>
        {loading ? (
          <Preloader src={spinner} alt="spinner" />
        ) : characters?.results ? (
          characters.results.map((item) => (
            <Character key={item.id} {...item} onClick={() => characterClickHandler(item.id)} />
          ))
        ) : (
          <AlternativeText>Nothing found :(</AlternativeText>
        )}
      </ItemsContainer>
      {totalPages > 0 && (
        <Pagination
          query={query}
          setQuery={setQuery}
          totalPages={totalPages}
          setSearchParams={setSearchParams}
        />
      )}
      {isShowModal && (
        <Modal onClose={setIsShowModal}>
          <Info id={characterId} />
        </Modal>
      )}
    </Root>
  );
};

export default Characters;

const Radio = styled.input`
  width: 1.5em;
  height: 1.5em;
  margin: 0;

  border: 2px solid ${colors.lightTextColor};

  -webkit-appearance: none;
  appearance: none;
  border-radius: 50%;
  cursor: pointer;

  ::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 0.75em;
    height: 0.75em;
    margin: 3px;
  }

  :checked {
    ::after {
      background-color: ${colors.hoverColor};
    }
`;

const ErrorMessage = styled.span`
  position: absolute;
  top: 32px;

  font-size: 12px;
  color: ${colors.indicatorNegative};
`;

const Preloader = styled.img`
  margin: 20px auto;
  max-width: 100px;
  height: 100px;
`;

const AlternativeText = styled.span`
  font-size: 22px;
  text-align: center;
  color: ${colors.indicatorNegative};

  @media (max-width: 530px) {
    font-size: 18px;
  } ;
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 530px) {
    justify-content: center;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LogoContainer = styled.div`
  padding: 20px;
`;

const StyledLabel = styled.label`
  display: flex;

  gap: 10px;
  padding: 5px;
  border: 1px solid ${colors.hoverColor};

  align-items: center;
  color: ${colors.lightTextColor};
  border-radius: 8px;
  cursor: pointer;

  :active {
    border: 1px solid ${colors.lightTextColor};
  }
`;

const Input = styled.input<{ isError: boolean }>`
  border-radius: 10px;
  height: 32px;
  padding: 5px 10px;
  color: ${colors.lightTextColor};
  background-color: ${colors.backgroundColor};
  border: none;
  outline: none;

  &:focus {
    padding: 4px 9px;
    border: 1px solid ${({ isError }) => (isError ? colors.indicatorNegative : colors.hoverColor)};
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  margin: 20px 0 40px;
  width: 100%;
  gap: 16px;
  justify-content: center;

  @media (max-width: 530px) {
    flex-direction: column;
    padding: 0 10px;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1216px;
  margin: 0 auto;
  gap: 16px;

  @media (max-width: 650px) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
  }
`;

const Root = styled.div`
  min-height: 100vh;
  padding-bottom: 20px;
  background-color: ${colors.darkTextColor};
`;
