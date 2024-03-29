import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineClose } from 'react-icons/md';
import style from '../styles/modules/modal.module.scss';
import Button from './Button';
import { format } from 'date-fns'; 
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

const dropIn = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  };

function TodoModal({type, modalOpen, setModalOpen, todo}) {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');
    const dispatch = useDispatch();
    useEffect(() => {
        if(type === 'update' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        } else {
            setTitle('');
            setStatus('incomplete');
        }
    }, [type, todo, modalOpen])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            toast.error('Please enter a title.');
            return;
        }
        if (title && status) {
            if(type === 'add') {
                dispatch(addTodo({
                    id: uuid(),
                    title,
                    status,
                    time: format(new Date(), 'p, MM/dd/yyyy'),
                }));
                toast.success("Task Add Successfully!")
            } 
            if(type === 'update') {
                if(todo.title !== title || todo.status !== status) {
                    dispatch(updateTodo({
                        ...todo,
                        title,
                        status
                    }));
                toast.success("Update Task Successfully!")
                } else {
                    toast.error('No Changes.');
                    return;
                }
            }
            setModalOpen(false);
        }
    }
  return (
    <AnimatePresence>
    {modalOpen && (
    <motion.div className={style.wrapper} initial={{opacity: 0}}
    animate={{opacity: 1}} exit={{opacity: 0}}>
        <motion.div className={style.container} variants={dropIn}
        initial='hidden' animate='visible' exit='exit'>
            <motion.div className={style.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role='button'
            initial={{top: 40, opacity: 0}}
            animate={{top: -10, opacity: 1}}
            exit={{top: 40, opacity: 0}}>
                <MdOutlineClose/>
            </motion.div>
            <form className={style.form}
            onSubmit={(e) => handleSubmit(e)}>
                <h1 className={style.formTitle}>{type === 'add' ? 'Add' : 'Update'} Task </h1>
                <label htmlFor='title'>Title
                    <input 
                    type = 'text' 
                    id = 'title' 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}></input>
                </label>
                <label htmlFor='status'>Status
                <select name='status' id = 'status' value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value='incomplete'>Incomplete</option>
                    <option value='complete'>Complete</option>
                </select>
                </label>
                <div className={style.buttonContainer}>
                    <Button type='submit' variant='primary'>{type === 'add' ? 'Add' : 'Update'} Task</Button>
                    <Button type='button' variant='secondary' 
                    onClick={() => setModalOpen(false)}
                    onKeyDown={() => setModalOpen(false)}
                    >Cancel</Button>
                </div>
            </form>
        </motion.div>
    </motion.div>

    )}
    </AnimatePresence>
  )
}

export default TodoModal