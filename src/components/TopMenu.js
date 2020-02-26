import React, { useState, useEffect, memo } from 'react';
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
    cursor: pointer;
    height: 100%;
    width: 100%;
  }

  & #deleteRec,
  #play,
  #stop,
  #rec {
    width: 1.8rem;
    height: 1.5rem;
  }

  & #deleteRec {
    margin-left: 1rem;
    padding: 1.4px;
  }
  & #play {
    color: ${({ isPlaying }) => (isPlaying ? 'green' : null)};
  }
  & #rec {
    color: ${({ isRecording }) => (isRecording ? 'red' : null)};
    padding: 1.5px;
  }
  [data-label] {
    position: relative;
    & ::after {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      content: attr(data-label);
      font-size: 0.6rem;
      color: var(--dark-blue);
      bottom: -0.8rem;
      transform: translateX(-50%);
      left: 50%;
      width: min-content;
      height: 1rem;
    }
  }
`;

function WrappedTopMenu() {
  const dispatch = useDispatch();
  const isRecording = useSelector(({ recording }) => recording.isRecording);
  const isPlaying = useSelector(({ recording }) => recording.isPlaying);
  const [todoName, setTodoName] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const [error, setError] = useState(null);
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
    if (!todoName) {
      setError('Name is required.');
      setTimeout(() => {
        setError(null);
      }, 1500);
      return;
    }
    const date = new Date();
    const newTodo = {
      id: uuid(),
      name: todoName,
      description: todoDesc,
      creationDate: date
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
            <div id="rec" data-label="Rec">
              <RecBtn onClick={handleStartRecording} />
            </div>
            <div id="stop" data-label="Stop">
              <StopBtn onClick={handleStopRecording} />
            </div>
            <div id="play" data-label="Play">
              <PlayBtn onClick={handlePlaySession} />
            </div>
            <div id="deleteRec" data-label="Delete">
              <DeleteBtn onClick={handleDeleteSession} />
            </div>
          </RecordControl>
          <StyledAddTodoBtn onClick={handleModal}>+</StyledAddTodoBtn>
        </StyledWrapper>
      </Container>
      {isModalOpen ? (
        <Modal close={handleModal} open={isModalOpen}>
          <TodoForm
            title="ADD TODO"
            error={error}
            isOpen={isModalOpen}
            setModal={handleModal}
            controlInput={handleInput}
            name={todoName}
            desc={todoDesc}
            isOpen={isModalOpen}
          >
            <Button colorProp="#f7ab1b" onClick={handleAddTodo}>
              ADD
            </Button>
          </TodoForm>
        </Modal>
      ) : null}
    </SyledTopMenu>
  );
}

const TopMenu = memo(WrappedTopMenu);

export default TopMenu;
