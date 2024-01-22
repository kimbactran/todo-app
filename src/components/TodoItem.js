import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import style from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import toast from 'react-hot-toast';
import TodoModal from './TodoModal';
import CheckBox from './CheckBox';

const child = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
    }
}

function TodoItem({todo}) {
    const [modalOpen, setUpdateModalOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(todo.status === 'complete') {
            setChecked(true);
        } else {
            setChecked(false)
        }
    }, [todo.status]);
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
        toast.success('Todo Deleted Successfully!')
    }
    const handleUpdate = () => {
        setUpdateModalOpen(true);
    }
    const handleCheck = () => {
        setChecked(!checked);
        dispatch(updateTodo({
            ...todo,
            status: checked? 'incomplete' : 'complete',
        }
        ))
    }
  return (
    <>
    <motion.div className={style.item} variants={child}>
        <div className={style.todoDetails}>
            <CheckBox checked={checked} handleCheck={handleCheck}></CheckBox>
            <div className={style.texts}>
                <p 
                className={getClasses([
                    style.todoText, 
                    todo.status === 'complete' && style
                    ['todoText--completed']])}
                    >
                    {todo.title}
                </p>
                <p className={style.time}>{todo.time}</p>
            </div>
        </div>
        <div className={style.todoActions}>
                <div className={style.icon}
                onClick={handleDelete}
                onKeyDown={handleDelete}
                role='button'
                tabIndex={0}
                >
                    <MdDelete/>
                </div>
                <div className={style.icon}
                onClick={handleUpdate}
                onKeyDown={handleUpdate}
                role='button'
                tabIndex={0}>
                    <MdEdit/>
                </div>
            </div>
    </motion.div>
    <TodoModal todo={todo} type='update' modalOpen={modalOpen} setModalOpen={setUpdateModalOpen}></TodoModal>
    </>
  )
}

export default TodoItem