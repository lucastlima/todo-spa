import React, { useState } from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';
import TodoForm from './TodoForm';
import Container from './Container';
import Modal from './Modal';

const SyledTopMenu = styled.div`
  display: flex;
  height: 4rem;
  z-index: 1;
  flex-direction: column;
  background-color: var(--white);
  padding: 0.5rem 1rem;
  justify-content: center;
  color: var(--dark-blue);
  box-shadow: var(--shadow-two);
`;

const StyledAddTodoBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 2.5rem;
  cursor: pointer;
  color: var(--dark-blue);

  &:hover {
    transform: scale(1.08);
    text-shadow: var(--shadow-one);
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const RecordControl = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  & svg {
    font-size: 1.6rem;
    cursor: pointer;
  }
  & #rec {
    font-size: 1.2em;
  }
  & #cleanRec {
    font-size: 1.3em;
    margin-left: 1rem;
  }
`;

function TopMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <SyledTopMenu>
      <Container>
        <StyledWrapper>
          <h2>TODO SPA</h2>
          <RecordControl>
            <FiberManualRecordIcon id="rec" />
            <PlayArrowRoundedIcon />
            <StopRoundedIcon />
            <DeleteSweepRoundedIcon id="cleanRec" />
          </RecordControl>
          <StyledAddTodoBtn onClick={handleModal}>+</StyledAddTodoBtn>
        </StyledWrapper>
      </Container>
      <Modal close={handleModal} open={isModalOpen}>
        <TodoForm isOpen={isModalOpen} handleModal={handleModal} />
      </Modal>
    </SyledTopMenu>
  );
}

export default TopMenu;
