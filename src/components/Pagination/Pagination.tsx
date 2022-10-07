import ArrowLeft from 'assets/icons/ArrowLeft';
import ArrowRight from 'assets/icons/ArrowRight';
import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';

type SearchParamsType = {
  page: string;
  name: string;
  status: string;
};

type PaginationType = {
  query: QueryType;
  totalPages: number;
  setQuery: (data: QueryType) => void;
  setSearchParams: (data: SearchParamsType) => void;
};

const Pagination: FC<PaginationType> = ({ query, totalPages, setQuery, setSearchParams }) => {
  const currentPage = query.page;

  const prevPageHandler = () => {
    if (currentPage > 1) {
      setQuery({ ...query, page: currentPage - 1 });
      setSearchParams({ ...query, page: String(currentPage + 1), name: query.name });
    }
  };

  const nextPageHandler = () => {
    if (totalPages > currentPage) {
      setQuery({ ...query, page: currentPage + 1 });
      setSearchParams({ ...query, page: String(currentPage + 1), name: query.name });
    }
  };

  const pagesInfo = totalPages > 0 ? `${currentPage} / ${totalPages}` : 0;

  return (
    <Root>
      <Button onClick={prevPageHandler}>
        <ArrowLeft width={24} height={24} />
        Prev
      </Button>
      <PagesContainer>{pagesInfo}</PagesContainer>
      <StyledButton onClick={nextPageHandler}>
        Next
        <ArrowRight width={24} height={24} />
      </StyledButton>
    </Root>
  );
};

export default Pagination;

type QueryType = {
  page: number;
  name: string;
  status: string;
};

const PagesContainer = styled.div`
  display: flex;

  width: 60px;
  height: 60px;
  border: 1px solid ${colors.hoverColor};

  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
`;

const Button = styled.div`
  display: flex;

  padding: 5px 10px 5px 0;
  border: 1px solid ${colors.hoverColor};

  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  color: ${colors.lightTextColor};

  &:active {
    border: 1px solid ${colors.lightTextColor};
  }
`;

const StyledButton = styled(Button)`
  padding: 5px 0 5px 10px;
`;

const Root = styled.div`
  display: flex;

  width: 100%;
  margin: 20px 0;
  gap: 10px;

  align-items: center;
  justify-content: center;
  color: white;
`;
