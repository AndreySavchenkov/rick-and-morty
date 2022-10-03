import ArrowLeft from 'assets/icons/ArrowLeft';
import ArrowRight from 'assets/icons/ArrowRight';
import React, { FC } from 'react'
import styled from 'styled-components';
import { colors } from 'styles';

type QueryType = {
  page: number;
  name: string;
  status: string;
}

type SearchParamsType = {
  page: string;
  name: string;
  status: string;
}

type PaginationType = {
  query: QueryType;
  totalPages: number;
  setSearchParams: (data: SearchParamsType) => void;
  setQuery: (data: QueryType) => void;
};

const Pagination: FC<PaginationType> = ({ query, totalPages, setQuery, setSearchParams }) => {

  const currentPage = query.page;

  const prevPageHandler = () => {
    if (currentPage > 1) {
      setQuery({ ...query, page: currentPage - 1 });
      setSearchParams({ ...query, page: String(currentPage - 1), name: query.name })
    }
  };

  const nextPageHandler = () => {
    if (totalPages > currentPage) {
      setQuery({ ...query, page: currentPage + 1 });
      setSearchParams({ ...query, page: String(currentPage + 1), name: query.name })
    }
  }

  return (
    <Root>
      <Button onClick={prevPageHandler}><ArrowLeft width={24} height={24} />Prev</Button>
      <PagesContainer>{currentPage} / {totalPages}</PagesContainer>
      <StyledButton onClick={nextPageHandler}>Next<ArrowRight width={24} height={24} /></StyledButton>
    </Root>
  )
}

export default Pagination;

const PagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-weight: 600;
  border: 1px solid ${colors.hoverColor};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 0;
  cursor: pointer;
  border-radius: 8px;
  color: ${colors.lightTextColor};
  border: 1px solid ${colors.hoverColor};

  &:active{
    border: 1px solid ${colors.lightTextColor};
  }
`;

const StyledButton = styled(Button)`
  padding: 5px 0 5px 10px;
`;

const Root = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
`;