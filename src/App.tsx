import React from 'react';
import styled from 'styled-components';
import { UserData } from './models/user-data.model';

import { format } from 'date-fns';
import Header from './components/Header/Header';
import Data from './components/Data/Data';
import Commits from './components/Commits/Commits';
import Preview from './components/Preview/Preview';
import { QUERIES } from './constants/constants';

export default function App() {

  const [data, setData] = React.useState<UserData>({
    date: new Date(),
    hours: 0,
    file: null
  });
  console.log('data', data);

  const month = React.useMemo(() => !!data.date ? format(data.date, 'yyyy-MM') : '', [data]);

  const setDate = React.useCallback((date: Date | null) => {
    setData(d => ({ ...d, date: date }));
  }, []);

  const setHours = React.useCallback((hours: string) => {
    setData(d => ({ ...d, hours: isNaN(+hours) ? d.hours : +hours }));
  }, []);

  const handleUploadDocument = React.useCallback((file: File | null) => {
    if (file === null) {
      setData(d => ({ ...d, file: null }));
      return;
    }

    const reader = new FileReader();

    reader.onerror = function (evt) {
      console.error("error reading file", evt);
    };

    reader.onload = function (evt) {
      const content = evt.target!.result;
      setData(d => ({ ...d, file: content }));
    };

    reader.readAsBinaryString(file);
  }, []);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <DataWrapper>
        <Data
          data={data}
          onDateUpdated={setDate}
          onHoursUpdated={setHours}
          onDocumentUploaded={handleUploadDocument} />
      </DataWrapper>
      <CommitsWrapper>
        <Commits
          month={month}
        />
      </CommitsWrapper>
      <PreviewWrapper>
        <Preview hours={data.hours} />
      </PreviewWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  background-color: ${p => p.theme.primary100};
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-areas:
  'header header'
  'data data'
  'commits preview';
  gap: 8px;
  padding-inline: 8px;

  @media ${QUERIES.tabletAndSmaller}{
    display: flex;
    flex-direction: column;
  }
`;

const HeaderWrapper = styled.div`
  grid-area: header;
`;

const DataWrapper = styled.div`
  grid-area: data;
`;

const CommitsWrapper = styled.div`
  grid-area: commits;
`;

const PreviewWrapper = styled.div`
  grid-area: preview;
`;