import React, {useState} from 'react'
import Button, { SelectButton } from './Button';
import style from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterStatus } from '../slices/todoSlice';

function AppHeader() {
    const [modalOpen, setModalOpen] = useState(false);
    const filterStatus = useSelector((state) => state.todo.filterStatus);
    const dispatch = useDispatch();
    const updateFilter = (e) => {
        console.log('update select');
        dispatch(updateFilterStatus(e.target.value));
    }
  return (
    <div className={style.appHeader}>
        <Button variant='primary' onClick={() => setModalOpen(true)}>Add task</Button>
        <SelectButton id='status' value={filterStatus} onChange={updateFilter}>
            <option value='all'>all</option>
            <option value='incomplete'>Incomplete</option>
            <option value='complete'>Complete</option>
        </SelectButton>
        <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen}></TodoModal>
    </div>
  )
}

export default AppHeader