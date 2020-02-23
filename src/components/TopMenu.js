import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  startRecording,
  stopRecording,
  deleteRecordingSession,
  playRecordingSession
} from '../store/actions';
import uuid from 'uuid/v4';
import RecBtn from '@material-ui/icons/FiberManualRecord';
import PlayBtn from '@material-ui/icons/PlayArrowRounded';
import StopBtn from '@material-ui/icons/StopRounded';
import DeleteBtn from '@material-ui/icons/DeleteSweepRounded';
import TodoForm from './TodoForm';
import Container from './Container';
import Modal from './Modal';
import Button from './Button';

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

  & #deleteRec {
    font-size: 1.3em;
    margin-left: 1rem;
  }
  & #play {
    color: ${({ isPlaying }) => (isPlaying ? 'green' : null)};
  }
  & #stop {
  }
  & #rec {
    color: ${({ isRecording }) => (isRecording ? 'red' : null)};
    font-size: 1.2em;
  }
`;

function TopMenu() {
  const dispatch = useDispatch();
  const isRecording = useSelector(({ recording }) => recording.isRecording);
  const isPlaying = useSelector(({ recording }) => recording.isPlaying);
  const [todoName, setTodoName] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      setTodoName('');
      setTodoDesc('');
    }
  }, [isModalOpen]);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function handleInput(e) {
    if (e.target.name === 'name') {
      setTodoName(e.target.value);
    } else {
      setTodoDesc(e.target.value);
    }
  }

  const handleAddTodo = () => {
    const date = new Date();
    const newTodo = {
      id: uuid(),
      name: todoName,
      description: todoDesc,
      creationDate: date,
      timestamp: date.valueOf()
    };
    dispatch(addTodo(newTodo));
    handleModal();
  };

  const handleStartRecording = () => {
    dispatch(startRecording());
  };
  const handleStopRecording = () => {
    dispatch(stopRecording());
  };

  const handleDeleteSession = () => {
    dispatch(deleteRecordingSession());
  };

  const handlePlaySession = async () => {
    await dispatch(playRecordingSession());
    console.log('Test Finished');
  };

  return (
    <SyledTopMenu>
      <Container>
        <StyledWrapper>
          <h2>TODO SPA</h2>
          <RecordControl isRecording={isRecording} isPlaying={isPlaying}>
            <RecBtn id="rec" onClick={handleStartRecording} />
            <StopBtn id="stop" onClick={handleStopRecording} />
            <PlayBtn id="play" onClick={handlePlaySession} />
            <DeleteBtn id="deleteRec" onClick={handleDeleteSession} />
          </RecordControl>
          <StyledAddTodoBtn onClick={handleModal}>+</StyledAddTodoBtn>
        </StyledWrapper>
      </Container>
      <Modal close={handleModal} open={isModalOpen}>
        <TodoForm
          title="ADD TODO"
          isOpen={isModalOpen}
          setModal={handleModal}
          controlInput={handleInput}
          name={todoName}
          desc={todoDesc}
        >
          <Button color="#f7ab1b" onClick={handleAddTodo}>
            ADD
          </Button>
        </TodoForm>
      </Modal>
    </SyledTopMenu>
  );
}

export default TopMenu;
