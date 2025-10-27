"use client"

import classes from '../styles/fullpage.module.css';
import { useActionState, startTransition } from 'react';
import ModalContext from '@/store/ModalContext';
import { useContext, useEffect } from 'react';
import { StateType, FormAction } from './form-types';
import { ModalType } from '../utils/types-modal';


interface FormProps {
  buttonText: string;
  placeholder: string;
  name: string;
  formAction: FormAction;
  initialState: StateType;
}

const Form = ({  buttonText, placeholder, name, formAction, initialState }: FormProps) => {
    // declare sets of state to watch the server actions
    const [state, dispatch, pending] = useActionState<StateType, FormData>(formAction, initialState);
    const modalCtx = useContext(ModalContext);

    useEffect(() => {
        console.log(state);
        if (state.status === 200) {
            console.log('IN THE USE EFFECT show the modal.... as we are status 200', state.data);
            if (state.message.indexOf('Game Created') > -1) {
                modalCtx.setModal(ModalType.CREATE_PRIVATE_LEAGUE, state.message.split('-')[1]);
                modalCtx.showModal();
            } else {
                modalCtx.setModal(ModalType.JOINED_PRIVATE_LEAGUE);
            }
        }
    }, [state.status]);

    // functions to handle the submit of the form that just dispatch the formData to the server actions, use state value in the rendered HTML
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            // dispatch the formAction which is joinSubmit or createSubmit
            dispatch(formData);
        });
    };

    return <form onSubmit={handleSubmit}>
        <input name={ name } type="text" className={classes.inputText} placeholder={ placeholder }/>
        <button type="submit" className={classes.button}>{ pending ? 'Please wait...' : buttonText }</button>
        {state && state.status !== 200 && <p>{ state.message }</p>}
    </form>
}

export default Form;